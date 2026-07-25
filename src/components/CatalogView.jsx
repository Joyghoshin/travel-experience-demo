import React from 'react';
import { experiences } from '../data/experiences';

export default function CatalogView({ onSelectExperience }) {
  const handleCardClick = (exp) => {
    if (onSelectExperience) {
      onSelectExperience(exp);
    } else {
      console.log('Experience selected:', exp.title);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-6 py-4 mb-8 shadow-sm">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
            PRODUCT DEMO PORTFOLIO
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Travel &amp; Experience Booking Flow</h2>
        </div>
        <span className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
          Live Interactive Prototype
        </span>
      </div>

      {/* Experience Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            onClick={() => handleCardClick(exp)}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col"
          >
            <div className="relative h-44 w-full">
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {exp.featured && (
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow">
                  Featured
                </span>
              )}
            </div>

            <div className="p-5 flex flex-col flex-1">
              <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                {exp.category}
              </span>
              <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1">{exp.title}</h3>
              <p className="text-xs text-slate-500 mb-3">
                {exp.location} • {exp.duration}
              </p>
              <p className="text-xs text-slate-500 flex-1 mb-4">{exp.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="block text-[10px] uppercase text-slate-400 font-semibold">From</span>
                  <span className="text-lg font-extrabold text-slate-900">${exp.price}</span>
                  <span className="text-xs text-slate-400"> / person</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // avoid double-triggering with the card click
                    handleCardClick(exp);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Book →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}