import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Upload, Trash2, Image, Filter, Plus, X, Shield, Eye, Camera,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePhotos } from '../context/PhotoContext';
import type { Photo } from '../types';

const ROLE_BADGE: Record<string, { color: string; label: string }> = {
  admin: { color: 'bg-white text-[#2D7272]', label: 'Admin' },
  editor: { color: 'bg-white/60 text-[#2D7272]', label: 'Editor' },
  viewer: { color: 'bg-white/40 text-[#2D7272]', label: 'Viewer' },
};

export default function Admin() {
  const { user, logout, hasPermission } = useAuth();
  const { photos, addPhoto, removePhoto } = usePhotos();

  const [filter, setFilter] = useState<'all' | 'wedding' | 'kids'>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredPhotos =
    filter === 'all' ? photos : photos.filter((p) => p.category === filter);

  const badge = ROLE_BADGE[user?.role ?? 'viewer'];

  return (
    <div className="min-h-screen bg-[#2D7272]">
      {/* ─── Top Bar ─── */}
      <header className="sticky top-0 z-40 bg-[#245E5E] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16 gap-2">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm sm:text-lg font-light tracking-[0.2em] text-white">
              VIZZ <span className="font-bold">EYES</span>
            </Link>
            <span className="hidden sm:block text-white/30">|</span>
            <span className="hidden sm:block text-xs tracking-widest text-white/50 uppercase">Dashboard</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield size={14} className="text-white/50" />
              <span className="text-xs sm:text-sm text-white/80 max-w-20 truncate">{user?.username}</span>
              <span className={`text-[9px] sm:text-[10px] tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full ${badge.color}`}>
                {badge.label}
              </span>
            </div>
            <button
              onClick={logout}
              className="text-white/50 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-white/10"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<Camera size={18} />} label="Total Photos" value={photos.length} />
          <StatCard icon={<Image size={18} />} label="Weddings" value={photos.filter((p) => p.category === 'wedding').length} />
          <StatCard icon={<Eye size={18} />} label="Kids (Wee Eyes)" value={photos.filter((p) => p.category === 'kids').length} />
        </div>

        {/* ─── Toolbar ─── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-white/50" />
            {(['all', 'wedding', 'kids'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs tracking-widest px-4 py-2 rounded-full transition-colors capitalize ${
                  filter === f
                    ? 'bg-white text-[#2D7272]'
                    : 'bg-white/10 text-white/60 border border-white/20 hover:border-white/40'
                }`}
              >
                {f === 'kids' ? 'Wee Eyes' : f}
              </button>
            ))}
          </div>

          {hasPermission('upload') && (
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 bg-white text-[#2D7272] text-xs tracking-widest px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              <Plus size={14} /> ADD PHOTO
            </button>
          )}
        </div>

        {/* ─── Photo Grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                canRemove={hasPermission('remove')}
                onRequestDelete={() => setDeleteConfirm(photo.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <Image size={48} className="mx-auto mb-4" />
            <p className="tracking-widest text-sm">No photos in this category</p>
          </div>
        )}

        {/* ─── Permissions Notice ─── */}
        {!hasPermission('upload') && (
          <div className="mt-8 text-center p-6 bg-white/10 rounded-2xl border border-white/10">
            <Shield size={20} className="mx-auto mb-2 text-white/30" />
            <p className="text-sm text-white/50 tracking-wider">
              Your role (<strong>{user?.role}</strong>) does not have upload permissions.
              Contact an admin to upgrade.
            </p>
          </div>
        )}
      </main>

      {/* ─── Upload Modal ─── */}
      <AnimatePresence>
        {showUpload && (
          <UploadModal
            onClose={() => setShowUpload(false)}
            onUpload={(data) => {
              addPhoto({ ...data, uploadedBy: user?.username ?? '' });
              setShowUpload(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* ─── Delete Confirmation ─── */}
      <AnimatePresence>
        {deleteConfirm && (
          <DeleteModal
            onCancel={() => setDeleteConfirm(null)}
            onConfirm={() => {
              removePhoto(deleteConfirm);
              setDeleteConfirm(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white/10 rounded-2xl border border-white/10 p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-light text-white">{value}</p>
        <p className="text-[10px] tracking-widest text-white/40 uppercase">{label}</p>
      </div>
    </div>
  );
}

/* ─── Photo Card ─── */
function PhotoCard({
  photo,
  canRemove,
  onRequestDelete,
}: {
  photo: Photo;
  canRemove: boolean;
  onRequestDelete: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative aspect-square rounded-2xl overflow-hidden bg-white/10"
    >
      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35 md:bg-black/0 md:group-hover:bg-black/40 transition-colors duration-300 flex flex-col justify-between p-2 sm:p-3 opacity-100 md:opacity-0 md:group-hover:opacity-100">
        <div className="flex justify-between items-start">
          <span className="text-[9px] sm:text-[10px] tracking-wider bg-white/85 text-gray-700 px-2 py-1 rounded-full capitalize">
            {photo.category === 'kids' ? 'Wee Eyes' : photo.category}
          </span>
          {canRemove && (
            <button
              onClick={onRequestDelete}
              className="p-1.5 sm:p-2 bg-red-500/90 hover:bg-red-500 text-white rounded-lg transition-colors"
              title="Remove photo"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
        <div>
          <p className="text-white text-[11px] sm:text-xs tracking-wider line-clamp-2">{photo.title}</p>
          <p className="text-white/70 text-[9px] sm:text-[10px] tracking-wider">by {photo.uploadedBy} · {photo.uploadedAt}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Upload Modal ─── */
function UploadModal({
  onClose,
  onUpload,
}: {
  onClose: () => void;
  onUpload: (data: { url: string; title: string; category: 'wedding' | 'kids' }) => void;
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'wedding' | 'kids'>('wedding');
  const [preview, setPreview] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowed.includes(file.type)) {
      setUploadError('Please upload a JPG, PNG, WEBP, or AVIF image.');
      e.target.value = '';
      setPreview('');
      return;
    }

    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadError('Image size must be 10MB or less.');
      e.target.value = '';
      setPreview('');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview || !title.trim()) return;
    onUpload({ url: preview, title: title.trim(), category });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#245E5E] rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-xl border border-white/10 max-h-[92vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-light tracking-widest text-white">UPLOAD PHOTO</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Drop Zone */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-white/20 hover:border-white/40 rounded-2xl p-6 text-center cursor-pointer transition-colors"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-40 sm:h-48 object-cover rounded-xl" />
            ) : (
              <div className="py-8">
                <Upload size={24} className="mx-auto mb-3 text-white/30" />
                <p className="text-sm text-white/50 tracking-wider">Click to select an image</p>
                <p className="text-xs text-white/30 mt-1">PNG, JPG up to 10MB</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          {uploadError && (
            <p className="text-red-300 text-xs tracking-wide">{uploadError}</p>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs tracking-widest text-white/50 mb-2 uppercase">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Golden Hour Wedding"
              className="w-full border border-white/20 rounded-xl px-4 py-3 text-sm text-white bg-white/10 focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs tracking-widest text-white/50 mb-2 uppercase">Category</label>
            <div className="flex gap-3">
              {(['wedding', 'kids'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex-1 py-2.5 rounded-xl text-xs tracking-widest transition-colors ${
                    category === cat
                      ? 'bg-white text-[#2D7272]'
                      : 'bg-white/10 text-white/60 border border-white/20 hover:border-white/40'
                  }`}
                >
                  {cat === 'kids' ? 'WEE EYES' : 'WEDDING'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!preview || !title.trim()}
            className="w-full bg-white text-[#2D7272] py-3 rounded-xl hover:bg-white/90 transition-colors text-sm tracking-widest font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            UPLOAD
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ─── Delete Confirmation ─── */
function DeleteModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#245E5E] rounded-2xl w-full max-w-xs p-5 sm:p-6 text-center shadow-xl border border-white/10"
      >
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={18} className="text-red-400" />
        </div>
        <h3 className="text-sm font-medium text-white mb-2 tracking-wider">DELETE PHOTO?</h3>
        <p className="text-xs text-white/50 mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-xs tracking-widest bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-xs tracking-widest bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            DELETE
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
