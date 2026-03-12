export type Role = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  category: 'wedding' | 'kids';
  uploadedBy: string;
  uploadedAt: string;
}

export const PERMISSIONS: Record<Role, string[]> = {
  admin: ['upload', 'remove', 'view', 'manage_users'],
  editor: ['upload', 'view'],
  viewer: ['view'],
};
