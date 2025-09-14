import React, { useState } from 'react';
import { PlusIcon, FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPage, CreatePageRequest } from '@/lib/api';
import { toast } from 'sonner';

interface NewDocumentItemProps {
  onCreatePage?: (pageData: any) => void;
  className?: string;
  variant?: 'button' | 'card';
}

export function NewDocumentItem({ onCreatePage, className = '', variant = 'card' }: NewDocumentItemProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePage = async () => {
    if (variant === 'button') {
      // For button variant, create with default title
      await createNewPage('Untitled');
    } else {
      // For card variant, show input
      setIsCreating(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    
    if (title.trim()) {
      await createNewPage(title.trim());
    }
    setIsCreating(false);
  };

  const createNewPage = async (title: string) => {
    setIsLoading(true);
    try {
      const pageData: CreatePageRequest = {
        title,
        position: 0,
      };

      const response = await createPage(pageData);
      
      if (response.success && response.data) {
        toast.success('Page created successfully!');
        onCreatePage?.(response.data);
      } else {
        toast.error(response.error || 'Failed to create page');
      }
    } catch (error) {
      console.error('Error creating page:', error);
      toast.error('Failed to create page. Please try again.');
    } finally {
      setIsLoading(false);
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  if (variant === 'button') {
    return (
      <Button 
        onClick={handleCreatePage}
        disabled={isLoading}
        className={`gap-2 ${className}`}
      >
        <PlusIcon className="h-4 w-4" />
        {isLoading ? 'Creating...' : 'New Document'}
      </Button>
    );
  }

  if (isCreating) {
    return (
      <div className={`bg-background border-2 border-dashed border-primary/50 rounded-lg p-6 hover:border-primary transition-colors ${className}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <FileTextIcon className="h-5 w-5 text-primary" />
            <Input
              name="title"
              placeholder="Untitled"
              autoFocus
              className="border-none bg-transparent text-lg font-medium placeholder:text-muted-foreground focus:ring-0 focus:outline-none"
              onBlur={handleCancel}
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div 
      className={`group bg-background border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-primary/50 transition-all duration-200 cursor-pointer hover:shadow-sm ${className}`}
      onClick={handleCreatePage}
    >
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <PlusIcon className="h-6 w-6 text-primary" />
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
            New Page
          </h3>
          <p className="text-sm text-muted-foreground">
            Click to create a new page
          </p>
        </div>
      </div>
    </div>
  );
}
