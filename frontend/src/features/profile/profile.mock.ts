import type { UserProfileData } from './profile.types';

export const PROFILE_STORAGE_KEY = 'sistema-acervo-user-profile';

export const DEFAULT_MOCK_PROFILE: UserProfileData = {
  id: '',
  fullName: 'Administrador General',
  email: 'admin@upd.edu.mx',
  phone: '493 000 0000',
  role: 'Administrador',
  initials: 'AG',
  createdAt: '2024-01-15T08:00:00Z',
};

export const getStoredProfile = (): UserProfileData => {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) return DEFAULT_MOCK_PROFILE;
    return { ...DEFAULT_MOCK_PROFILE, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_MOCK_PROFILE;
  }
};

export const saveStoredProfile = (profile: UserProfileData): void => {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to localStorage:', e);
  }
};
