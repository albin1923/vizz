import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, Role } from '../types';

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const DEMO_USERS: { username: string; password: string; role: Role }[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'editor', password: 'editor123', role: 'editor' },
  { username: 'viewer', password: 'viewer123', role: 'viewer' },
];

const PERMISSIONS: Record<Role, string[]> = {
  admin: ['upload', 'remove', 'view', 'manage_users'],
  editor: ['upload', 'view'],
  viewer: ['view'],
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('vizz_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username: string, password: string): boolean => {
    const found = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return false;
    const newUser: User = {
      id: crypto.randomUUID(),
      username: found.username,
      role: found.role,
    };
    setUser(newUser);
    sessionStorage.setItem('vizz_user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('vizz_user');
  }, []);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;
      return PERMISSIONS[user.role]?.includes(permission) ?? false;
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
