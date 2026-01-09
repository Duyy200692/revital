
import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../StoreContext';

const Hero: React.FC = () => {
  const { campaigns, isAdmin, updateCampaign } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, campaigns.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + campaigns.length) % campaigns.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, campaigns.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentCampaign = campaigns[currentIndex];

  return (
    <div className="relative h-[600px] lg:h-[900px] w-full overflow-hidden bg-accent">
      <div 
        className="h-full w-full flex transition-transform duration-[800ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {campaigns.map((campaign, idx) => (
          <div key={campaign.id} className="min-w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${currentIndex === idx ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Admin Edit Button for Image/Slide */}
            {isAdmin && (
              <button 
                onClick={() => setEditingId(campaign.id)}
                className="absolute top-32 left-24 z-50 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Navigation & UI Controls (giữ nguyên layout cũ) */}
      <div className="absolute bottom-12 left-0 w-full z-40 px-6 lg:px-24 flex flex-row items-center justify-between pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          <button onClick={prevSlide} className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-dark hover:text-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextSlide} className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-dark hover:text-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="bg-white/90 backdrop-blur-md px-6 lg:px-8 py-3 lg:py-4 rounded-full flex items-center gap-4 shadow-2xl pointer-events-auto">
          <span className="text-xs font-black text-dark/60">0{currentIndex + 1}</span>
          <div className="flex gap-2 h-2 items-center">
            {campaigns.map((_, idx) => (
              <div key={idx} className={`h-full rounded-full transition-all duration-700 ${currentIndex === idx ? 'w-16 bg-primary' : 'w-4 bg-dark/10'}`}></div>
            ))}
          </div>
          <span className="text-xs font-black text-dark/30">0{campaigns.length}</span>
        </div>
      </div>

      {/* Admin Edit Modal for Hero Slide */}
      {editingId && (
        <div className="fixed inset-0 z-[300] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6 pointer-events-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 lg:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-brand font-bold text-dark">Sửa Slide Hero</h3>
              <button onClick={() => setEditingId(null)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setEditingId(null); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Đường dẫn hình ảnh</label>
                  <input 
                    className="w-full bg-accent border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary outline-none" 
                    value={campaigns.find(c => c.id === editingId)?.image || ''}
                    onChange={(e) => updateCampaign(editingId, { image: e.target.value })}
                  />
                  <p className="mt-2 text-[10px] text-gray-400 italic">Dán link ảnh từ Unsplash hoặc Facebook của bạn vào đây.</p>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Tiêu đề lớn</label>
                  <input 
                    className="w-full bg-accent border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" 
                    value={campaigns.find(c => c.id === editingId)?.title || ''}
                    onChange={(e) => updateCampaign(editingId, { title: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-primary text-white font-brand font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">Lưu thay đổi</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
