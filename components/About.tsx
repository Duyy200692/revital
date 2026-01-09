
import React, { useState } from 'react';
import { useStore } from '../StoreContext';

const About: React.FC = () => {
  const { aboutData, isAdmin, updateAbout } = useStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateImage = (index: number, url: string) => {
    const newImages = [...aboutData.images];
    newImages[index] = url;
    updateAbout({ images: newImages });
  };

  const handleUpdateStat = (index: number, key: 'label' | 'value', val: string) => {
    const newStats = [...aboutData.stats];
    newStats[index] = { ...newStats[index], [key]: val };
    updateAbout({ stats: newStats });
  };

  return (
    <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Admin Edit Button */}
      {isAdmin && (
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute -top-10 right-6 z-20 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          title="Chỉnh sửa giới thiệu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4 pt-12">
          <img 
            src={aboutData.images[0]} 
            alt="Process" 
            className="rounded-3xl h-64 w-full object-cover shadow-lg hover:scale-[1.02] transition-transform"
          />
          <img 
            src={aboutData.images[1]} 
            alt="Coffee" 
            className="rounded-3xl h-80 w-full object-cover shadow-lg hover:scale-[1.02] transition-transform"
          />
        </div>
        <div className="space-y-4">
          <img 
            src={aboutData.images[2]} 
            alt="Beans" 
            className="rounded-3xl h-80 w-full object-cover shadow-lg hover:scale-[1.02] transition-transform"
          />
          <img 
            src={aboutData.images[3]} 
            alt="Interior" 
            className="rounded-3xl h-64 w-full object-cover shadow-lg hover:scale-[1.02] transition-transform"
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-primary text-sm font-brand font-black uppercase tracking-[0.3em]">Our Legacy</h2>
          <h3 className="text-4xl md:text-5xl font-brand font-bold text-dark leading-tight tracking-tighter">
            {aboutData.titlePart1} <br />
            <span className="text-primary italic">{aboutData.titlePart2}</span>
          </h3>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed font-sans">
          {aboutData.description}
        </p>
        <div className="grid grid-cols-2 gap-8">
          {aboutData.stats.map((stat, idx) => (
            <div key={idx} className="space-y-2 border-l-4 border-primary pl-4">
              <h4 className="text-3xl font-brand font-bold text-dark">{stat.value}</h4>
              <p className="text-sm text-gray-400 font-brand font-black uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
        <button className="px-10 py-4 bg-dark text-white font-brand font-black uppercase tracking-widest text-xs rounded-full hover:bg-primary transition-all shadow-xl shadow-dark/10">
          Xem Thêm Về Chúng Tôi
        </button>
      </div>

      {/* Admin Edit Modal for About Section */}
      {isEditing && (
        <div className="fixed inset-0 z-[500] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl p-8 lg:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-brand font-bold text-dark">Sửa Phần Giới Thiệu</h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }}>
              {/* Titles & Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tiêu đề (Phần 1)</label>
                  <input 
                    className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" 
                    value={aboutData.titlePart1}
                    onChange={(e) => updateAbout({ titlePart1: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tiêu đề (Phần 2 - In nghiêng)</label>
                  <input 
                    className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" 
                    value={aboutData.titlePart2}
                    onChange={(e) => updateAbout({ titlePart2: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Đoạn giới thiệu ngắn</label>
                <textarea 
                  className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" 
                  rows={4}
                  value={aboutData.description}
                  onChange={(e) => updateAbout({ description: e.target.value })}
                />
              </div>

              {/* Images Grid */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-dark mb-4">Hình ảnh (4 ảnh)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutData.images.map((img, idx) => (
                    <div key={idx}>
                      <label className="block text-[10px] font-black text-gray-400 mb-1">Ảnh {idx + 1} (URL)</label>
                      <input 
                        className="w-full bg-accent border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-primary outline-none" 
                        value={img}
                        onChange={(e) => handleUpdateImage(idx, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-dark mb-4">Thông số thống kê</h4>
                <div className="grid grid-cols-2 gap-6">
                  {aboutData.stats.map((stat, idx) => (
                    <div key={idx} className="space-y-2 p-4 bg-accent/50 rounded-2xl">
                      <input 
                        className="w-full bg-white border-none rounded-xl px-4 py-2 text-xl font-bold text-primary focus:ring-2 focus:ring-primary outline-none" 
                        value={stat.value}
                        onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                      />
                      <input 
                        className="w-full bg-white border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 focus:ring-2 focus:ring-primary outline-none" 
                        value={stat.label}
                        onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-primary text-white font-brand font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform"
              >
                Cập nhật toàn bộ phần giới thiệu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
