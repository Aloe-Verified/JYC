import React from 'react';
import { FileTextIcon, StarIcon, CalendarIcon, MoreHorizontalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export interface Note {
  id: number;
  title: string;
  updatedAt: string;
  isFavorite?: boolean;
}

interface NoteItemProps {
  note: Note;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function NoteItem({ note, onClick, className = '', label }: NoteItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div 
      className={`group relative bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-ring/50 ${className}`}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <FileTextIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <h3 className="font-medium text-foreground truncate">
            {label || note.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {note.isFavorite && (
            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              // Handle more actions
            }}
          >
            <MoreHorizontalIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Content Preview */}
      <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {/* This would be replaced with actual content preview */}
        Click to open and start editing...
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-3 w-3" />
          <span>Updated {formatDate(note.updatedAt)}</span>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Add any additional metadata here */}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
