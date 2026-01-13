
import React, { useState, useMemo } from 'react';
import { useStore } from '../StoreContext';
import { SignatureItem } from '../types';

const SignatureSection: React.FC = () => {
  const { signatureItems, isAdmin, deleteSignatureItem, updateSignatureItem } = useStore();
  const [activeIndex, setActiveIndex] = useState(0); 
  const [editingItem, setEditingItem] = useState<SignatureItem | null>(null);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % signatureItems.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + signatureItems.length) % signatureItems.length);

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      await updateSignatureItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center space-y-3">
          <div className="overflow-hidden">
            <span className="block bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.5em] px-4 py-2 rounded-full reveal-text">Artisan Collection</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-brand font-bold text-dark tracking-tighter reveal-text">
            Signature <span className="text-primary italic">Vibe</span>
          </h2>
        </div>

        {/* Dynamic Canvas Container */}
        <div className="relative h-[600px] md:h-[750px] flex items-center justify-center">
          {signatureItems.map((drink, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;

            return (
              <div
                key={drink.id}
                onClick={() => setActiveIndex(index)}
                className={`absolute transition-all duration-1000 ease-olipop cursor-pointer
                  ${isActive ? 'z-30 opacity-100' : 'z-10 opacity-0 pointer-events-none'}
                `}
                style={{ 
                  transform: `translateX(${offset * 100}%)`,
                  width: '100%',
                  height: '100%'
                }}
              >
                <SignatureCanvas 
                  drink={drink} 
                  isActive={isActive} 
                  isAdmin={isAdmin} 
                  onDelete={() => deleteSignatureItem(drink.id)} 
                  onEdit={() => setEditingItem(drink)}
                />
              </div>
            );
          })}

          {/* Controls Overlay */}
          <div className="absolute bottom-4 flex items-center gap-8 z-50">
            <button onClick={prevSlide} className="group p-4 rounded-full border border-dark/5 bg-white shadow-xl hover:bg-primary transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-3">
              {signatureItems.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-700 ${activeIndex === idx ? 'w-12 bg-primary' : 'w-3 bg-gray-200 hover:bg-gray-300'}`}
                ></button>
              ))}
            </div>
            <button onClick={nextSlide} className="group p-4 rounded-full border border-dark/5 bg-white shadow-xl hover:bg-primary transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal for Signature Item */}
      {editingItem && (
        <div className="fixed inset-0 z-[500] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 lg:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-brand font-bold text-dark">Sửa món Đặc Biệt</h3>
              <button onClick={() => setEditingItem(null)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleEditSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tên món</label>
                  <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tagline</label>
                  <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm" value={editingItem.tagline} onChange={(e) => setEditingItem({...editingItem, tagline: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Giá</label>
                  <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm" value={editingItem.price} onChange={(e) => setEditingItem({...editingItem, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Màu Aura (Hex)</label>
                  <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm" value={editingItem.color} onChange={(e) => setEditingItem({...editingItem, color: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hình ảnh chính (URL)</label>
                <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm" value={editingItem.image} onChange={(e) => setEditingItem({...editingItem, image: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Các nguyên liệu bay (Links, cách nhau bằng dấu phẩy)</label>
                <textarea 
                  className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" 
                  rows={4}
                  value={editingItem.props?.join(', ')}
                  onChange={(e) => setEditingItem({...editingItem, props: e.target.value.split(',').map(s => s.trim())})}
                  placeholder="link1.png, link2.png, ..."
                />
              </div>
              <button type="submit" className="w-full py-5 bg-primary text-white font-brand font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform">
                Lưu thay đổi
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

const SignatureCanvas: React.FC<{ 
  drink: SignatureItem, 
  isActive: boolean, 
  isAdmin: boolean, 
  onDelete: () => void,
  onEdit: () => void
}> = ({ drink, isActive, isAdmin, onDelete, onEdit }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const propElements = useMemo(() => {
    const list = drink.props || [];
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      img: list[i % list.length] || '',
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 800,
      z: (Math.random() - 0.5) * 1000,
      scale: 0.3 + Math.random() * 0.7,
      speed: 8 + Math.random() * 10,
      delay: Math.random() * 2
    }));
  }, [drink.props]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 30;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 30;
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center perspective-3000 preserve-3d" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
    >
      {/* Admin Actions Overlay */}
      {isAdmin && isActive && (
        <div className="absolute top-10 right-10 z-[100] flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* BACKGROUND LAYER */}
      <div 
        className="absolute inset-0 z-0 preserve-3d pointer-events-none transition-transform duration-1000 ease-olipop"
        style={{ transform: `rotateX(${rotate.x * 0.5}deg) rotateY(${rotate.y * 0.5}deg) translateZ(-200px)` }}
      >
        {propElements.slice(0, 4).map(p => (
          <div 
            key={p.id}
            className={`absolute w-32 md:w-48 transition-all duration-1000 ${isActive ? 'animate-prop' : 'opacity-0'}`}
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              transform: `translateZ(${p.z}px) scale(${p.scale})`,
              animationDelay: p.delay + 's',
              animationDuration: p.speed + 's',
              filter: 'blur(2px) grayscale(0.2)'
            }}
          >
            <img src={p.img} alt="Ingredient" className="w-full object-contain drop-shadow-2xl" />
          </div>
        ))}
      </div>

      {/* CENTER PRODUCT */}
      <div 
        className="relative z-20 preserve-3d flex items-center justify-center transition-all duration-700 ease-olipop" 
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(400px)`, 
        }}
      >
        <div className={`absolute w-[400px] h-[400px] rounded-full aura-glow transition-opacity duration-1000 ${isActive ? 'opacity-30' : 'opacity-0'}`} style={{ backgroundColor: drink.color }}></div>

        <img 
          src={drink.image} 
          alt={drink.name} 
          className={`w-[70%] md:w-[380px] object-contain transition-all duration-1000 ${isActive ? 'scale-110 drop-shadow-[0_80px_100px_rgba(0,0,0,0.5)]' : 'scale-50 opacity-0'}`} 
        />
      </div>

      {/* FOREGROUND LAYER */}
      <div 
        className="absolute inset-0 z-40 preserve-3d pointer-events-none transition-transform duration-1000 ease-olipop"
        style={{ transform: `rotateX(${rotate.x * 1.5}deg) rotateY(${rotate.y * 1.5}deg) translateZ(800px)` }}
      >
        {propElements.slice(4).map(p => (
          <div 
            key={p.id}
            className={`absolute w-40 md:w-56 transition-all duration-1000 ${isActive ? 'animate-prop' : 'opacity-0'}`}
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              transform: `translateZ(${p.z}px) scale(${p.scale})`,
              animationDelay: p.delay + 's',
              animationDuration: p.speed + 's',
              filter: 'brightness(1.1) drop-shadow(0 20px 30px rgba(0,0,0,0.3))'
            }}
          >
            <img src={p.img} alt="Ingredient" className="w-full object-contain" />
          </div>
        ))}
      </div>

      {/* INFO OVERLAY */}
      <div className={`absolute bottom-20 text-center space-y-3 transition-all duration-1000 ease-olipop z-50 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em]">{drink.tagline}</span>
        <h4 className="text-3xl md:text-5xl font-brand font-bold text-dark tracking-tighter drop-shadow-sm">{drink.name}</h4>
        <div className="pt-6">
          <span className="text-xl font-brand font-black text-white bg-dark px-10 py-4 rounded-full shadow-2xl hover:bg-primary transition-all cursor-pointer inline-block transform hover:scale-105 active:scale-95">
            {drink.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignatureSection;
