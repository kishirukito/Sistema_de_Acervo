export type ResourceStatus = 'AVAILABLE' | 'LOW_STOCK' | 'LOANED' | 'UNAVAILABLE';

export type ResourceCategory =
  | '000'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';


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
