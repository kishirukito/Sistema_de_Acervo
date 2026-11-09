export interface UserProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  initials: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface SecurityPasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface PasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
