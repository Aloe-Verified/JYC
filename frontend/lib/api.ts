/**
 * Utility functions for making authenticated API calls
 */

// Accept either a backend origin or the legacy origin ending in /api.
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '');

export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}/${endpoint.replace(/^\/+/, '')}`;
}

async function readResponse<T>(response: Response): Promise<T | undefined> {
  const text = await response.text();
  let data;
  try {
    data = text.trim() ? JSON.parse(text) : undefined;
  } catch {
    throw new Error(response.ok
      ? 'The server returned an invalid response.'
      : `Request failed (HTTP ${response.status}). Please try again.`);
  }
  if (!response.ok) {
    throw new Error(data?.message || `Request failed (HTTP ${response.status}). Please try again.`);
  }
  return data;
}

function redirectToLogin(): void {
  logout();
  if (typeof window !== 'undefined') window.location.replace('/login');
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  success: boolean;
}

/**
 * Get the stored authentication token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

/**
 * Make an authenticated API call
 */
export async function authenticatedFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  if (!token) {
    redirectToLogin();
    return { success: false, error: 'Please log in to continue.' };
  }

  const url = getApiUrl(endpoint);
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (response.status === 401) {
      redirectToLogin();
      throw new Error('Your session has expired. Please log in again.');
    }
    const data = await readResponse<T>(response);

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      success: false,
    };
  }
}

/**
 * Make a public API call (no authentication required)
 */
export async function publicFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = getApiUrl(endpoint);
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await readResponse<T>(response);

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      success: false,
    };
  }
}

/**
 * Check if the current user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  return !!token;
}

/**
 * Logout the current user
 */
export function logout(): void {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

/**
 * Page-related API calls
 */
export interface Page {
  id: number;
  title: string;
  position: number;
  parentId?: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    username: string;
  };
}

export interface CreatePageRequest {
  title: string;
  position?: number;
  parentId?: number;
}

/**
 * Create a new page
 */
export async function createPage(pageData: CreatePageRequest): Promise<ApiResponse<Page>> {
  return authenticatedFetch<Page>('/api/pages', {
    method: 'POST',
    body: JSON.stringify(pageData),
  });
}

/**
 * Get a page by ID
 */
export async function getPageById(id: number): Promise<ApiResponse<Page>> {
  return authenticatedFetch<Page>(`/api/pages/${id}`, {
    method: 'GET',
  });
}

/**
 * Get all pages for the current user
 */
export async function getAllPages(): Promise<ApiResponse<Page[]>> {
  return authenticatedFetch<Page[]>('/api/pages', {
    method: 'GET',
  });
}
