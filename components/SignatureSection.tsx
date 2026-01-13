
import React, { useState } from 'react';
import { useStore } from '../StoreContext';
import { SignatureItem } from '../types';

const SignatureSection: React.FC = () => {
  const { signatureItems, isAdmin, updateSignatureItem, addSignatureItem, deleteSignatureItem } = useStore();
  const [activeIndex, setActiveIndex] = useState(0); 
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [newItem, setNewItem] = useState<Omit<SignatureItem, 'id'>>({
    name: '',
    tagline: '',
    description: '',
    image: '',
    color: 'from-primary/40 to-primary/10',
    price: '0đ'
  });

  const nextSlide = () => { setActiveIndex((prev) => (prev + 1) % signatureItems.length); };
  const prevSlide = () => { setActiveIndex((prev) => (prev - 1 + signatureItems.length) % signatureItems.length); };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.image || !newItem.name) return;
    await addSignatureItem(newItem);
    setIsAdding(false);
    setNewItem({ name: '', tagline: '', description: '', image: '', color: 'from-primary/40 to-primary/10', price: '0đ' });
  };

  const currentEditingItem = signatureItems.find(s => s.id === editingId);

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12 md:mb-16 text-center space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.5em] px-4 py-2 rounded-full">The Masterpiece</span>
            {isAdmin && (
              <button onClick={() => setIsAdding(true)} className="bg-dark text-white text-[10px] font-black uppercase px-4 py-2 rounded-full hover:bg-primary transition-all flex items-center gap-2 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                Thêm món đặc biệt
              </button>
            )}
          </div>
          <h2 className="text-5xl md:text-7xl font-brand font-bold text-dark tracking-tighter">
            Signature <span className="text-primary italic">Revital</span>
          </h2>
          <p className="max-w-xl text-gray-500 font-sans text-sm md:text-base">Mỗi món nước là một tác phẩm nghệ thuật, không giới hạn bởi bất kỳ khuôn mẫu nào.</p>
        </div>

        <div className="relative h-[550px] md:h-[650px] flex items-center justify-center">
          <div className="flex items-center justify-center w-full transition-all duration-700">
            {signatureItems.map((drink, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;
              const isAdjacent = Math.abs(offset) === 1;

              return (
                <div
                  key={drink.id}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer
                    ${isActive ? 'z-30 scale-110 md:scale-125 opacity-100' : 'z-10 scale-75 opacity-20'}
                    ${isAdjacent ? 'opacity-50' : ''}
                  `}
                  style={{ transform: `translateX(${offset * 100}%) translateZ(${isActive ? '100px' : '0px'})`, filter: isActive ? 'blur(0)' : 'blur(4px)', width: '320px' }}
                >
                  <SignatureCard drink={drink} isActive={isActive} isAdmin={isAdmin} onEdit={() => setEditingId(drink.id)} onDelete={() => deleteSignatureItem(drink.id)} />
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 flex items-center gap-6 z-40">
            <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dark/5 bg-white shadow-xl flex items-center justify-center text-dark hover:bg-primary transition-all group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-2">
              {signatureItems.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`}></div>
              ))}
            </div>
            <button onClick={nextSlide} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dark/5 bg-white shadow-xl flex items-center justify-center text-dark hover:bg-primary transition-all group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[500] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 lg:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-brand font-bold text-dark">Thêm Món Signature</h3>
              <button onClick={() => setIsAdding(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form className="space-y-6" onSubmit={handleAddSubmit}>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hình ảnh PNG 3D (URL)</label><input required className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={newItem.image} onChange={(e) => setNewItem({...newItem, image: e.target.value})} placeholder="Dùng link ảnh PNG không nền..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tên món</label><input required className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} /></div>
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Giá</label><input required className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} /></div>
              </div>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tagline</label><input required className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={newItem.tagline} onChange={(e) => setNewItem({...newItem, tagline: e.target.value})} /></div>
              <button type="submit" className="w-full py-5 bg-primary text-white font-brand font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-dark transition-colors">Tạo món signature mới</button>
            </form>
          </div>
        </div>
      )}

      {editingId && currentEditingItem && (
        <div className="fixed inset-0 z-[500] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 lg:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-brand font-bold text-dark">Sửa Món Đặc Biệt</h3>
              <button onClick={() => setEditingId(null)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setEditingId(null); }}>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hình ảnh 3D (URL PNG)</label><input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={currentEditingItem.image} onChange={(e) => updateSignatureItem(editingId, { image: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tên món</label><input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={currentEditingItem.name} onChange={(e) => updateSignatureItem(editingId, { name: e.target.value })} /></div>
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Giá</label><input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={currentEditingItem.price} onChange={(e) => updateSignatureItem(editingId, { price: e.target.value })} /></div>
              </div>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tagline</label><input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={currentEditingItem.tagline} onChange={(e) => updateSignatureItem(editingId, { tagline: e.target.value })} /></div>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Mô tả ngắn</label><textarea className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" rows={3} value={currentEditingItem.description} onChange={(e) => updateSignatureItem(editingId, { description: e.target.value })} /></div>
              <button type="submit" className="w-full py-5 bg-primary text-white font-brand font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-dark transition-colors">Lưu thay đổi</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

const SignatureCard: React.FC<{ drink: SignatureItem, isActive: boolean, isAdmin: boolean, onEdit: () => void, onDelete: () => void }> = ({ drink, isActive, isAdmin, onEdit, onDelete }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 20;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 20;
    setRotate({ x: rotateX, y: rotateY });
  };
  return (
    <div className="relative group perspective-1000 w-full flex flex-col items-center" onMouseMove={handleMouseMove} onMouseLeave={() => setRotate({ x: 0, y: 0 })}>
      {isAdmin && isActive && (
        <div className="absolute -top-12 right-0 z-[60] flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="w-10 h-10 bg-dark text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-red-500 hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
        </div>
      )}
      <div className="w-full aspect-square relative flex items-center justify-center transition-all duration-700 ease-out" style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, transformStyle: 'preserve-3d' }}>
        <div className={`absolute w-64 h-64 rounded-full blur-[100px] transition-opacity duration-1000 bg-primary/20 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 ${isActive ? 'animate-floating scale-110' : ''}`} style={{ transform: 'translateZ(180px)' }}>
          <img src={drink.image} alt={drink.name} className={`w-[90%] h-[90%] object-contain transition-all duration-700 ${isActive ? 'drop-shadow-[0_60px_70px_rgba(0,0,0,0.4)]' : 'drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)]'}`} />
        </div>
        <div className={`absolute -bottom-6 w-56 h-10 bg-black/15 blur-2xl rounded-[100%] transition-all duration-700 ${isActive ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`}></div>
      </div>
      <div className={`mt-10 text-center space-y-2 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">{drink.tagline}</span>
        <h4 className="text-3xl md:text-4xl font-brand font-bold text-dark">{drink.name}</h4>
        <p className="text-gray-400 text-xs leading-relaxed max-w-[260px] mx-auto line-clamp-2">{drink.description}</p>
        <div className="pt-4"><span className="text-xl font-brand font-black text-dark bg-white px-8 py-2.5 rounded-full border border-gray-100 shadow-xl">{drink.price}</span></div>
      </div>
    </div>
  );
};

export default SignatureSection;
