export type MatchLevel = 'high' | 'medium' | 'low';

export type AvailabilityStatus = 'AVAILABLE' | 'BORROWED' | 'UNAVAILABLE';

export interface ResourceSearchResult {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  pages: number;
  category: string;
  resourceType: string;
  subjects: string[];
  description: string;
  location: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
  availability: AvailabilityStatus;
  matchLevel: MatchLevel;
  coverGradient: {
    from: string;
    to: string;
  };
  coverInitials: string;
  aiSummary: string;
}

export interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  category: string;
  coverGradient: {
    from: string;
    to: string;
  };
  coverInitials: string;
}

export interface SearchFilterState {
  category: string;
  author: string;
  publicationYear: string;
  availability: string;
}

export type SortOption = 'relevance' | 'title' | 'recent';
