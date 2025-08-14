'use client';

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { FileTextIcon, StarIcon, MoreHorizontalIcon, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Note {
    id?: string;
    title?: string;
    updatedAt: string;
    isFavorite?: boolean;
    isTrash?: boolean;
}

export interface NoteItemProps {
    note?: Note;
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
}

export const NoteItem = ({
    note,
    label,
    onClick,
    icon: IconComponent = FileTextIcon,
    className
}: NoteItemProps) => {
    const handleClick = () => {
        onClick();
    };

    const noteTitle = note?.title || label;
    const noteDate = note?.updatedAt || new Date().toISOString();

    return (
        <div 
            className={cn(
                "group relative p-3 rounded-lg border border-transparent hover:border-border/50",
                "bg-card hover:bg-accent/30 transition-all duration-200 cursor-pointer",
                "hover:shadow-sm",
                className
            )}
            onClick={handleClick}
        >
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                    <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-foreground transition-colors truncate">
                        {noteTitle}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        <span>Updated {format(new Date(noteDate), 'MMM d, yyyy')}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {note?.isFavorite && (
                        <button 
                            className="p-1 rounded hover:bg-accent transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                // TODO: Handle favorite toggle
                            }}
                        >
                            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                        </button>
                    )}
                    
                    <button 
                        className="p-1 rounded hover:bg-accent transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Handle more options
                        }}
                    >
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Hover indicator */}
            <div className="absolute inset-0 rounded-lg ring-2 ring-ring/0 group-hover:ring-ring/20 transition-all duration-200 pointer-events-none" />
        </div>
    );
};   