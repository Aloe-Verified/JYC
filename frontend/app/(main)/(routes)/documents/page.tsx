'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NoteItem, Note } from '../../_components/NoteItem';
import { PlusIcon, SearchIcon, GridIcon, ListIcon, SortAscIcon, FilterIcon, ChevronDownIcon, FolderIcon, FileTextIcon } from 'lucide-react';

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

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set(['workspace']));

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
    }
  ];

  // Flatten pages for display
  const flattenPages = (pages: Page[], level: number = 0): (Page & { level: number })[] => {
    let result: (Page & { level: number })[] = [];
    pages.forEach(page => {
      result.push({ ...page, level });
      if (page.children) {
        result.push(...flattenPages(page.children, level + 1));
      }
    });
    return result;
  };

  const allPages = flattenPages(samplePages);
  const filteredPages = allPages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpanded = (pageId: string) => {
    const newExpanded = new Set(expandedPages);
    if (newExpanded.has(pageId)) {
      newExpanded.delete(pageId);
    } else {
      newExpanded.add(pageId);
    }
    setExpandedPages(newExpanded);
  };

  const renderPageItem = (page: Page, level: number = 0) => {
    const isExpanded = expandedPages.has(page.id);
    const hasChildren = page.children && page.children.length > 0;
    const indentClass = level > 0 ? `ml-${Math.min(level * 4, 16)}` : '';

    return (
      <div key={page.id} className={indentClass}>
        <div className="flex items-center group">
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(page.id)}
              className="p-1 rounded-sm hover:bg-sidebar-accent transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronDownIcon
                className={`h-3 w-3 transition-transform ${
                  isExpanded ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
          )}
          
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => setSelectedPage(page.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm font-medium transition-colors w-full min-w-0 text-left ${
                selectedPage === page.id 
                  ? 'bg-sidebar-accent text-sidebar-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
              }`}
            >
              {hasChildren ? (
                <FolderIcon className="h-4 w-4 flex-shrink-0" />
              ) : (
                <FileTextIcon className="h-4 w-4 flex-shrink-0" />
              )}
              <span className="truncate">{page.title}</span>
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
    <div className="flex h-full">
      {/* Left Sidebar - Page Hierarchy */}
      <div className="w-64 border-r border-border bg-sidebar flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="font-semibold text-sidebar-foreground">Pages</h2>
        </div>

        {/* Search in Sidebar */}
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
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Documents</h1>
              <p className="text-muted-foreground mt-1">
                {selectedPage ? `Viewing: ${allPages.find(p => p.id === selectedPage)?.title}` : 'All documents'}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                {viewMode === 'grid' ? <ListIcon className="h-4 w-4" /> : <GridIcon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <SortAscIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <FilterIcon className="h-4 w-4" />
              </Button>
              <Button className="gap-2">
                <PlusIcon className="h-4 w-4" />
                New Document
              </Button>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="flex-1 overflow-auto p-6">
          {filteredPages.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
              {filteredPages.map(page => (
                <NoteItem
                  key={page.id}
                  note={{
                    id: page.id,
                    title: page.title,
                    updatedAt: page.updatedAt,
                    isFavorite: page.isFavorite
                  }}
                  label={page.title}
                  onClick={() => setSelectedPage(page.id)}
                  className={selectedPage === page.id ? 'ring-2 ring-ring' : ''}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No pages found matching "{searchQuery}"</p>
              <p className="text-sm mt-1">Try adjusting your search terms</p>
            </div>
          )}

          {/* Empty state when no search */}
          {searchQuery === '' && filteredPages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No pages yet</p>
              <p className="text-sm mt-1">Create your first page to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}