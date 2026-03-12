import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Photo } from '../types';

const INITIAL_PHOTOS: Photo[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', title: 'The Vow', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-01-15' },
  { id: '2', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800', title: 'Garden Wedding', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-01-20' },
  { id: '3', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800', title: 'First Dance', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-02-01' },
  { id: '4', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800', title: 'Bridal Moments', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-02-10' },
  { id: '5', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800', title: 'Ring Exchange', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-02-14' },
  { id: '6', url: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&q=80&w=800', title: 'Sunset Ceremony', category: 'wedding', uploadedBy: 'admin', uploadedAt: '2026-03-01' },
  { id: '7', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800', title: 'Little Explorer', category: 'kids', uploadedBy: 'admin', uploadedAt: '2026-01-10' },
  { id: '8', url: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&q=80&w=800', title: 'Bubble Joy', category: 'kids', uploadedBy: 'admin', uploadedAt: '2026-01-25' },
  { id: '9', url: 'https://images.unsplash.com/photo-1484665011766-9c5287e3d7e4?auto=format&fit=crop&q=80&w=800', title: 'Tiny Dancer', category: 'kids', uploadedBy: 'admin', uploadedAt: '2026-02-05' },
  { id: '10', url: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&q=80&w=800', title: 'Playtime', category: 'kids', uploadedBy: 'admin', uploadedAt: '2026-03-02' },
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
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });

  const persist = (updated: Photo[]) => {
    setPhotos(updated);
    localStorage.setItem('vizz_photos', JSON.stringify(updated));
  };

  const addPhoto = useCallback(
    (photo: Omit<Photo, 'id' | 'uploadedAt'>) => {
      const newPhoto: Photo = {
        ...photo,
        id: crypto.randomUUID(),
        uploadedAt: new Date().toISOString().split('T')[0],
      };
      persist([newPhoto, ...photos]);
    },
    [photos]
  );

  const removePhoto = useCallback(
    (id: string) => {
      persist(photos.filter((p) => p.id !== id));
    },
    [photos]
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
