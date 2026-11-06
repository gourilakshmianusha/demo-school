import React, { useState } from 'react';
import { Camera, Video, Maximize2, X, Play, Shield } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Kreedo Lab' | 'Kids Park' | 'Exhibitions' | 'Sports';
  image: string;
  caption: string;
  academicYear: string;
}

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal_1',
      title: 'School Main Campus Building & Assembly Ground',
      category: 'Campus',
      image: '/src/assets/images/school_campus_hero_1793884221999.jpg',
      caption: 'Neat educational campus located in Shakti Colony, Hubli, with manicured courtyard and flagpole.',
      academicYear: '2024-2025',
    },
    {
      id: 'gal_2',
      title: 'Swami Vivekananda Kids Park Play Area',
      category: 'Kids Park',
      image: '/src/assets/images/swami_vivekananda_park_1793884223926.jpg',
      caption: 'Landscaped outdoor children’s park with swings, slides, and trees promoting physical agility and social play.',
      academicYear: '2024-2025',
    },
    {
      id: 'gal_3',
      title: 'Pre-Primary Kreedo Early Childhood Lab',
      category: 'Kreedo Lab',
      image: '/src/assets/images/kreedo_preprimary_lab_1793884223521.jpg',
      caption: 'Children actively learning using Montessori and Kreedo wooden sensory manipulatives.',
      academicYear: '2024-2025',
    },
    {
      id: 'gal_4',
      title: 'Annual Science & Art-Integrated Learning Exhibition',
      category: 'Exhibitions',
      image: '/src/assets/images/art_science_exhibition_1793884224487.jpg',
      caption: 'Students demonstrating working hydraulic generators, solar power models, and regional traditional craft charts.',
      academicYear: '2024-2025',
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* 1. Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          Visual Memories & Campus Life
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Photo & Video Gallery
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Browse authentic photographs capturing our vibrant classrooms, Kreedo early learning discoveries, playground activities, and project exhibitions.
        </p>

        <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
          <Shield className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            <strong>Child Privacy Policy:</strong> Class photos and student media are screened and published with parental consent in accordance with school privacy guidelines.
          </span>
        </div>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-xl">
        {['all', 'Campus', 'Kreedo Lab', 'Kids Park', 'Exhibitions'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeCategory === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat === 'all' ? 'All Albums' : cat}
          </button>
        ))}
      </div>

      {/* 3. Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setPreviewItem(item)}
            className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="h-64 sm:h-80 overflow-hidden bg-slate-100 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                {item.category}
              </div>

              <div className="absolute top-3 right-3 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-slate-900">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                  Session {item.academicYear}
                </span>
                <h3 className="text-base font-bold font-serif leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Video Gallery Showcase */}
      <div className="bg-slate-900 text-white rounded-xl p-8 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Video className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold font-serif text-white">Video Spotlights & Presentations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Kreedo Early Learning</span>
              <h4 className="text-sm font-bold text-white">Kreedo Lab Pedagogy in Action</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Watch how sensory manipulatives enable 3 to 5 year old learners to grasp numerical concepts and phonetics naturally.
              </p>
            </div>
            <button
              onClick={() => alert('Official school video archives are streamed via the school YouTube/media channel.')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Watch Video Feature</span>
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Campus Environment</span>
              <h4 className="text-sm font-bold text-white">Swami Vivekananda Kids Park Tour</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A video walkthrough showcasing the landscaped park, safe equipment, and children's daily physical fitness routines.
              </p>
            </div>
            <button
              onClick={() => alert('Official school video archives are streamed via the school YouTube/media channel.')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Watch Video Feature</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 p-2 text-white bg-slate-800/80 hover:bg-slate-700 rounded-full z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={previewItem.image}
                alt={previewItem.title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 text-white space-y-2 bg-slate-900">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <span>{previewItem.category}</span>
                <span aria-hidden="true">·</span>
                <span>Session {previewItem.academicYear}</span>
              </div>
              <h3 className="text-lg font-bold font-serif">{previewItem.title}</h3>
              <p className="text-xs text-slate-300">{previewItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
