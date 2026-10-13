export type ResourceStatus = 'AVAILABLE' | 'LOW_STOCK' | 'LOANED' | 'UNAVAILABLE';

export type ResourceCategory =
  | 'NOVEL'
  | 'TECHNOLOGY'
  | 'HISTORY'
  | 'SCIENCE'
  | 'ADMINISTRATION'
  | 'CHILDREN'
  | 'OTHER';

export interface Resource {
  id: string;
  code: string;
  title: string;
  author: string;
  category: ResourceCategory | string;
  categoryLabel: string;
  isbn: string;
  publicationYear: number;
  totalCopies: number;
  availableCopies: number;
  location: string;
  status: ResourceStatus;
  coverUrl?: string;
  coverColor?: string;
  coverInitials?: string;
  publisher?: string;
  description?: string;
}

export interface CatalogFilterState {
  searchQuery: string;
  category: string;
  status: string;
  publicationYear: string;
}
