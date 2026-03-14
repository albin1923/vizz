import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Photo } from '../types';

const INITIAL_PHOTOS: Photo[] = [
  { id: '1', url: '/gallery/1.jpeg', title: 'Elegance & Grace', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-01-15' },
  { id: '2', url: '/gallery/2.jpeg', title: 'Together Forever', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-01-20' },
  { id: '3', url: '/gallery/3.jpeg', title: 'The Bouquet', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-02-01' },
  { id: '4', url: '/gallery/4.jpeg', title: 'Royal Romance', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-02-10' },
  { id: '5', url: '/gallery/5.jpeg', title: 'Heritage Love', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-02-14' },
  { id: '6', url: '/gallery/6.jpeg', title: 'Guruvayur Bliss', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-03-01' },
  { id: '7', url: '/gallery/7.jpeg', title: 'Joyful Walk', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-01-10' },
  { id: '8', url: '/gallery/8.jpeg', title: 'Intimate Moments', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-01-25' },
  { id: '9', url: '/gallery/9.jpeg', title: 'Sacred Bond', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-02-05' },
  { id: '10', url: '/gallery/10.jpeg', title: 'Dreamy Frames', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-03-02' },
];

interface PhotoState {
  photos: Photo[];
  addPhoto: (photo: Omit<Photo, 'id' | 'uploadedAt'>) => void;
  removePhoto: (id: string) => void;
  getByCategory: (cat: 'wedding' | 'kids') => Photo[];
}

const PhotoContext = createContext<PhotoState | null>(null);

export function PhotoProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<Photo[]>(() => {
    const saved = localStorage.getItem('vizz_photos');
    if (!saved) return INITIAL_PHOTOS;
    try {
      const parsed = JSON.parse(saved) as Photo[];
      if (!Array.isArray(parsed)) return INITIAL_PHOTOS;
      return parsed;
    } catch {
      return INITIAL_PHOTOS;
    }
  });

  const persist = (updater: (current: Photo[]) => Photo[]) => {
    setPhotos((current) => {
      const updated = updater(current);
      localStorage.setItem('vizz_photos', JSON.stringify(updated));
      return updated;
    });
  };

  const addPhoto = useCallback(
    (photo: Omit<Photo, 'id' | 'uploadedAt'>) => {
      const newPhoto: Photo = {
        ...photo,
        id: crypto.randomUUID(),
        uploadedAt: new Date().toISOString().split('T')[0],
      };
      persist((current) => [newPhoto, ...current]);
    },
    []
  );

  const removePhoto = useCallback(
    (id: string) => {
      persist((current) => current.filter((p) => p.id !== id));
    },
    []
  );

  const getByCategory = useCallback(
    (cat: 'wedding' | 'kids') => photos.filter((p) => p.category === cat),
    [photos]
  );

  return (
    <PhotoContext.Provider value={{ photos, addPhoto, removePhoto, getByCategory }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const ctx = useContext(PhotoContext);
  if (!ctx) throw new Error('usePhotos must be used within PhotoProvider');
  return ctx;
}
