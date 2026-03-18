/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Photo } from '../types';

const vizzFolderImages = import.meta.glob('/public/gallery/vizz/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}');

const weeFolderImages = import.meta.glob('/public/gallery/wee/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}');

const toFolderPhotos = (entries: Record<string, unknown>, category: 'wedding' | 'kids'): Photo[] =>
  Object.keys(entries)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((path, index) => {
      const url = path.replace('/public', '');
      const filename = path.split('/').pop() ?? `${category}-${index + 1}`;
      return {
        id: `${category}-${index + 1}`,
        url,
        title: filename.replace(/\.[a-zA-Z0-9]+$/, ''),
        category,
        uploadedBy: 'system',
        uploadedAt: '2026-03-18',
      };
    });

const INITIAL_PHOTOS: Photo[] = [
  ...toFolderPhotos(vizzFolderImages, 'wedding'),
  ...toFolderPhotos(weeFolderImages, 'kids'),
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
    let customPhotos: Photo[] = [];
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Photo[];
        if (Array.isArray(parsed)) {
          customPhotos = parsed.filter(p => p.uploadedBy !== 'system');
        }
      } catch (err) {
        console.error('Failed to parse cached photos', err);
      }
    }
    return [...INITIAL_PHOTOS, ...customPhotos];
  });

  const persist = (updater: (current: Photo[]) => Photo[]) => {
    setPhotos((current) => {
      const updated = updater(current);
      const customPhotos = updated.filter(p => p.uploadedBy !== 'system');
      localStorage.setItem('vizz_photos', JSON.stringify(customPhotos));
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
