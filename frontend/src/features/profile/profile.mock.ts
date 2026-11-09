import type { UserProfileData } from './profile.types';

export const PROFILE_STORAGE_KEY = 'sistema-acervo-user-profile';

export const DEFAULT_MOCK_PROFILE: UserProfileData = {
  id: 'usr-admin-camila',
  fullName: 'Camila Flores',
  email: 'camila.flores@biblioteca.com',
  phone: '493 000 0000',
  role: 'Administradora',
  initials: 'CF',
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
