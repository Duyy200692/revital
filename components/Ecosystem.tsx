
import React, { useState } from 'react';
import { useStore } from '../StoreContext';

const Ecosystem: React.FC = () => {
  const { services, isAdmin, updateService } = useStore();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const selectedService = services.find(s => s.id === selectedServiceId);
  const editingService = services.find(s => s.id === editingId);

  return (
    <section id="ecosystem" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-primary text-sm font-brand font-black uppercase tracking-[0.4em]">Integrated Lifestyle</h2>
          <h3 className="text-4xl md:text-6xl font-brand font-bold text-dark tracking-tighter">
            Hệ Sinh Thái <span className="text-primary italic">Revital</span>
          </h3>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg">Một điểm đến, đa trải nghiệm. Kết hợp ẩm thực, thể thao và chăm sóc sức khỏe.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              className={`group relative overflow-hidden rounded-[2.5rem] bg-accent transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${idx === 1 ? 'lg:translate-y-12' : ''}`}
            >
              {isAdmin && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setEditingId(service.id); }}
                  className="absolute top-6 right-6 z-30 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                </button>
              )}

              <div className="aspect-[3/4] overflow-hidden relative" onClick={() => setSelectedServiceId(service.id)}>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white pointer-events-none">
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-brand font-black uppercase tracking-widest ${service.color}`}>{service.id === 'coffee' ? 'Main' : 'Experience'}</span>
                    <h4 className="text-3xl font-brand font-bold tracking-tight">{service.title}</h4>
                    <p className="text-primary font-bold text-sm italic">{service.tagline}</p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">{service.description}</p>
                  <div className="pt-2">
                    <button onClick={() => setSelectedServiceId(service.id)} className="inline-flex items-center gap-2 text-white font-brand font-black text-xs uppercase tracking-widest hover:text-primary transition-colors pointer-events-auto">
                      Khám phá ngay
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Edit Modal for Service */}
      {editingId && editingService && (
        <div className="fixed inset-0 z-[400] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 lg:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-brand font-bold text-dark">Sửa {editingService.title}</h3>
              <button onClick={() => setEditingId(null)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setEditingId(null); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hình ảnh bìa (URL)</label>
                  <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm" value={editingService.image} onChange={(e) => updateService(editingId, { image: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Slogan</label>
                  <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm" value={editingService.tagline} onChange={(e) => updateService(editingId, { tagline: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Mô tả chi tiết</label>
                <textarea className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm" rows={4} value={editingService.longDescription} onChange={(e) => updateService(editingId, { longDescription: e.target.value })} />
              </div>
              <button type="submit" className="w-full py-5 bg-primary text-white font-brand font-black uppercase tracking-widest rounded-2xl shadow-xl">Cập nhật hệ sinh thái</button>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal (giữ nguyên logic cũ nhưng lấy data từ store) */}
      {selectedServiceId && selectedService && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedServiceId(null)}></div>
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl animate-slide-in-right overflow-y-auto custom-scrollbar">
            <button onClick={() => setSelectedServiceId(null)} className="absolute top-6 right-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <div className="relative h-72"><img src={selectedService.image} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div></div>
            <div className="p-8 lg:p-12 -mt-20 relative z-10">
              <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-brand font-black uppercase tracking-widest text-white mb-6 ${selectedService.color}`}>{selectedService.id === 'coffee' ? 'Revital Experience' : 'Premium Partner'}</span>
              <h2 className="text-4xl lg:text-5xl font-brand font-bold text-dark tracking-tighter mb-2">{selectedService.title}</h2>
              <p className="text-primary font-bold italic mb-8">{selectedService.tagline}</p>
              <div className="space-y-8 text-gray-600">
                <section><h4 className="text-dark font-brand font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2"><span className="w-6 h-1 bg-primary rounded-full"></span> Giới Thiệu</h4><p className="leading-relaxed text-lg font-sans">{selectedService.longDescription}</p></section>
                <div className="flex flex-col gap-4 pt-4">
                  {selectedService.bookingLink && <a href={selectedService.bookingLink} target="_blank" className="w-full py-4 bg-primary text-white font-brand font-black uppercase rounded-2xl text-center shadow-xl">Đặt lịch trải nghiệm</a>}
                  <a href={selectedService.facebookLink} target="_blank" className="w-full py-4 bg-dark text-white font-brand font-black uppercase rounded-2xl text-center shadow-xl hover:bg-primary transition-colors">Theo dõi Fanpage</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Ecosystem;
