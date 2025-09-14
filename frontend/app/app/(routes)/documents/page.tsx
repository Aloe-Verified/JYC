'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NoteItem } from '../../_components/NoteItem';
import { NewDocumentItem } from '../../_components/NewDocumentItem';
import { PlusIcon, SearchIcon, GridIcon, ListIcon, SortAscIcon, FilterIcon, ChevronDownIcon, FolderIcon, FileTextIcon, RefreshCwIcon } from 'lucide-react';
import { getAllPages, createPage, Page, CreatePageRequest } from '@/lib/api';
import { toast } from 'sonner';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [expandedPages, setExpandedPages] = useState<Set<number>>(new Set());
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Load pages from backend
  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPages();
      
      if (response.success && response.data) {
        setPages(response.data);
      } else {
        toast.error(response.error || 'Failed to load pages');
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      toast.error('Failed to load pages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePage = async (title: string = 'Untitled') => {
    try {
      setIsCreating(true);
      const pageData: CreatePageRequest = {
        title,
        position: pages.length,
      };

      const response = await createPage(pageData);
      
      if (response.success && response.data) {
        setPages(prev => [...prev, response.data!]);
        setSelectedPage(response.data.id);
        toast.success('Page created successfully!');
      } else {
        toast.error(response.error || 'Failed to create page');
      }
    } catch (error) {
      console.error('Error creating page:', error);
      toast.error('Failed to create page. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // Filter pages based on search query
  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageClick = (page: Page) => {
    setSelectedPage(page.id);
    // Here you could navigate to the page editor or open a modal
    console.log('Opening page:', page);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Documents</h1>
              <p className="text-muted-foreground text-sm">
                {pages.length} {pages.length === 1 ? 'page' : 'pages'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9 pr-3 py-2 bg-muted/50 rounded-md text-sm text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <ListIcon className="h-4 w-4" /> : <GridIcon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={loadPages} disabled={isLoading}>
                <RefreshCwIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            {/* New Document Button */}
            <NewDocumentItem 
              variant="button" 
              onCreatePage={(page) => handleCreatePage(page.title)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCwIcon className="h-4 w-4 animate-spin" />
              <span>Loading pages...</span>
            </div>
          </div>
        ) : filteredPages.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
            : 'space-y-3'
          }>
            {/* New Document Card (only in grid view) */}
            {viewMode === 'grid' && (
              <NewDocumentItem 
                variant="card"
                onCreatePage={(page) => handleCreatePage(page.title)}
              />
            )}
            
            {/* Pages */}
            {filteredPages.map(page => (
              <NoteItem
                key={page.id}
                note={{
                  id: page.id,
                  title: page.title,
                  updatedAt: page.updatedAt,
                }}
                onClick={() => handlePageClick(page)}
                className={selectedPage === page.id ? 'ring-2 ring-ring' : ''}
              />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">No pages found</h3>
              <p className="text-muted-foreground">
                No pages match "{searchQuery}"
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
                className="mt-4"
              >
                Clear search
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="space-y-4">
              <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center">
                <FileTextIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">No pages yet</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Get started by creating your first page. You can organize your notes, ideas, and thoughts in a clean, distraction-free environment.
                </p>
              </div>
              <NewDocumentItem 
                variant="button" 
                onCreatePage={(page) => handleCreatePage(page.title)}
                className="mt-6"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}