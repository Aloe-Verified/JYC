import React, { useState } from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  HomeIcon,
  FileTextIcon,
  FolderIcon,
  StarIcon,
  TrashIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { NoteItem } from "./NoteItem";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Page {
  id: string;
  title: string;
  parent?: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
  children?: Page[];
}

export function Navigation() {
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set(['workspace']));
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpanded = (pageId: string) => {
    const newExpanded = new Set(expandedPages);
    if (newExpanded.has(pageId)) {
      newExpanded.delete(pageId);
    } else {
      newExpanded.add(pageId);
    }
    setExpandedPages(newExpanded);
  };

  // Sample pages data - this would come from your backend
  const samplePages: Page[] = [
    {
      id: 'workspace',
      title: 'Workspace',
      parent: null,
      position: 0,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      children: [
        {
          id: 'quick-notes',
          title: 'Quick Notes',
          parent: 'workspace',
          position: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          children: [
            {
              id: 'meeting-notes',
              title: 'Meeting Notes',
              parent: 'quick-notes',
              position: 0,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-15T10:30:00Z',
              isFavorite: true
            },
            {
              id: 'daily-notes',
              title: 'Daily Notes',
              parent: 'quick-notes',
              position: 1,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-14T15:45:00Z'
            }
          ]
        },
        {
          id: 'projects',
          title: 'Projects',
          parent: 'workspace',
          position: 1,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T09:00:00Z',
          children: [
            {
              id: 'project-alpha',
              title: 'Project Alpha',
              parent: 'projects',
              position: 0,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-12T17:20:00Z',
              isFavorite: true
            },
            {
              id: 'project-beta',
              title: 'Project Beta',
              parent: 'projects',
              position: 1,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-11T14:30:00Z'
            }
          ]
        }
      ]
    },
    {
      id: 'favorites',
      title: 'Favorites',
      parent: null,
      position: 1,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      children: [
        {
          id: 'meeting-notes-fav',
          title: 'Meeting Notes',
          parent: 'favorites',
          position: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          isFavorite: true
        },
        {
          id: 'project-alpha-fav',
          title: 'Project Alpha',
          parent: 'favorites',
          position: 1,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-12T17:20:00Z',
          isFavorite: true
        }
      ]
    },
    {
      id: 'trash',
      title: 'Trash',
      parent: null,
      position: 2,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      children: [
        {
          id: 'old-notes',
          title: 'Old Notes',
          parent: 'trash',
          position: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-10T11:15:00Z'
        }
      ]
    }
  ];

  const renderPageItem = (page: Page, level: number = 0) => {
    const isExpanded = expandedPages.has(page.id);
    const hasChildren = page.children && page.children.length > 0;
    const indentClass = level > 0 ? `ml-${Math.min(level * 4, 16)}` : '';

    return (
      <div key={page.id} className={cn("w-full", indentClass)}>
        <div className="flex items-center group">
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(page.id)}
              className={cn(
                "p-1 rounded-sm hover:bg-sidebar-accent transition-colors",
                "opacity-0 group-hover:opacity-100"
              )}
            >
              <ChevronDownIcon
                className={cn(
                  "h-3 w-3 transition-transform",
                  isExpanded ? "rotate-0" : "-rotate-90"
                )}
              />
            </button>
          )}
          
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => console.log(`Clicked page: ${page.title}`)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm font-medium",
                "hover:bg-sidebar-accent transition-colors w-full min-w-0 text-left",
                "text-sidebar-foreground hover:text-sidebar-foreground"
              )}
            >
              {hasChildren ? (
                <FolderIcon className="h-4 w-4 flex-shrink-0" />
              ) : (
                <FileTextIcon className="h-4 w-4 flex-shrink-0" />
              )}
              <span className="truncate">{page.title}</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {page.isFavorite && (
              <button className="p-1 rounded-sm hover:bg-sidebar-accent">
                <StarIcon className="h-3 w-3 text-yellow-500 fill-current" />
              </button>
            )}
            <button className="p-1 rounded-sm hover:bg-sidebar-accent">
              <MoreHorizontalIcon className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Render children */}
        {hasChildren && isExpanded && page.children && (
          <div className="mt-1">
            {page.children.map(child => renderPageItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-md flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">JYC</span>
          </div>
          <span className="font-semibold text-sidebar-foreground">Notes</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {/* TODO: Add new page functionality */}}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-accent-foreground" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-sidebar-accent rounded-md text-sm text-sidebar-foreground placeholder-sidebar-accent-foreground border-none focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
          />
        </div>
      </div>

      {/* Page Tree Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {samplePages.map(page => renderPageItem(page))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start h-9 px-2 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => {/* TODO: Add settings functionality */}}
        >
          <SettingsIcon className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start h-9 px-2 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => {/* TODO: Add profile functionality */}}
        >
          <UserIcon className="h-4 w-4 mr-2" />
          Profile
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start h-9 px-2 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => {/* TODO: Add logout functionality */}}
        >
          <LogOutIcon className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
