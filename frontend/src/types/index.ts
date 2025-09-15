export interface CrisisResource {
  id: number;
  name: string;
  category: 'domestic-violence' | 'mental-health' | 'legal-aid' | 'housing';
  location: string;
  phone: string;
  website: string;
  available24h: boolean;
  description: string;
}

export interface ApiResponse {
  success: boolean;
  count: number;
  data: CrisisResource[];
  error?: string;
}

export interface SearchFilters {
  location: string;
  category: string;
}

export interface SearchState {
  filters: SearchFilters;
  results: CrisisResource[];
  loading: boolean;
  error: string | null;
}