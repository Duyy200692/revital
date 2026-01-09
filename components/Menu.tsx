
import React, { useState } from 'react';
import { useStore } from '../StoreContext';
import { Product } from '../types';

const Menu: React.FC = () => {
  const { products, isAdmin, updateProduct, addProduct, deleteProduct } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: '0đ',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    popular: false
  });
  
  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'coffee', label: 'Cà Phê' },
    { id: 'tea', label: 'Trà' },
    { id: 'signature', label: 'Đặc Biệt' },
    { id: 'pastry', label: 'Bánh' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct);
    setIsAdding(false);
    setNewProduct({
      name: '', description: '', price: '0đ', category: 'coffee',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
      popular: false
    });
  };

  return (
    <div className="max-w-[1920px] mx-auto px-6 lg:px-10 xl:px-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 lg:mb-20 gap-6 lg:gap-8">
        <div className="space-y-2 lg:space-y-4">
          <h2 className="text-primary text-[10px] lg:text-sm font-brand font-black uppercase tracking-[0.4em]">Danh Mục Đặc Sản</h2>
          <h3 className="text-3xl lg:text-6xl font-brand font-bold text-dark tracking-tighter">
            Revital <span className="text-primary italic">Menu</span>
          </h3>
        </div>

        <div className="flex flex-nowrap overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto gap-2 lg:gap-3 custom-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 lg:px-10 py-2.5 lg:py-3 rounded-full text-[10px] lg:text-xs font-brand font-black uppercase tracking-widest transition-all ${
                activeCategory === cat.id ? 'bg-dark text-white shadow-lg' : 'bg-white border border-dark/5 text-gray-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-16">
        {isAdmin && (
          <div 
            onClick={() => setIsAdding(true)}
            className="group flex flex-col items-center justify-center border-4 border-dashed border-gray-100 rounded-[2.5rem] aspect-[4/5] hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="mt-4 font-brand font-black text-xs uppercase tracking-widest text-gray-400 group-hover:text-primary">Thêm Món Mới</span>
          </div>
        )}

        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-[2.5rem] aspect-[4/5] shadow-sm hover:shadow-2xl transition-all duration-500 bg-dark">
            {/* Image Layer */}
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"/>
            
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/20 to-transparent opacity-80"></div>

            {/* Admin Tools */}
            {isAdmin && (
              <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingId(product.id)}
                  className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="w-10 h-10 bg-dark text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:bg-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
              <div className="space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {product.popular && (
                  <span className="inline-block bg-primary text-white text-[9px] font-brand font-black uppercase tracking-widest px-3 py-1 rounded-full">Best Seller</span>
                )}
                <div className="flex justify-between items-end">
                  <h4 className="text-2xl font-brand font-bold text-white leading-tight pr-4">{product.name}</h4>
                  <span className="text-lg font-black text-primary shrink-0">{product.price}</span>
                </div>
                <p className="text-gray-300 text-xs font-sans leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{product.description}</p>
                <div className="pt-2 flex items-center gap-2 text-white font-brand font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Xem Chi Tiết</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD PRODUCT MODAL */}
      {isAdding && (
        <div className="fixed inset-0 z-[400] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-brand font-bold text-dark">Thêm Món Mới</h3>
              <button onClick={() => setIsAdding(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleAddSubmit}>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tên món</label>
                <input required className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Danh mục</label>
                  <select className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value as any})}>
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Giá (VD: 45.000đ)</label>
                  <input required className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hình ảnh (URL)</label>
                <input required className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Mô tả món</label>
                <textarea className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" rows={3} value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
              </div>
              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="isPopularNew" checked={newProduct.popular} onChange={(e) => setNewProduct({...newProduct, popular: e.target.checked})} />
                <label htmlFor="isPopularNew" className="text-sm font-bold text-dark">Đặt làm món Best Seller</label>
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-white font-brand font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.01] transition-transform">Thêm Vào Menu</button>
            </form>
          </div>
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 z-[400] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-brand font-bold text-dark">Sửa Sản Phẩm</h3>
              <button onClick={() => setEditingId(null)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setEditingId(null); }}>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tên sản phẩm</label>
                <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={products.find(p => p.id === editingId)?.name || ''} onChange={(e) => updateProduct(editingId, { name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Giá</label>
                  <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={products.find(p => p.id === editingId)?.price || ''} onChange={(e) => updateProduct(editingId, { price: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hình ảnh (URL)</label>
                  <input className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" value={products.find(p => p.id === editingId)?.image || ''} onChange={(e) => updateProduct(editingId, { image: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Mô tả ngắn</label>
                <textarea className="w-full bg-accent border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" rows={3} value={products.find(p => p.id === editingId)?.description || ''} onChange={(e) => updateProduct(editingId, { description: e.target.value })} />
              </div>
              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="isPopularEdit" checked={products.find(p => p.id === editingId)?.popular || false} onChange={(e) => updateProduct(editingId, { popular: e.target.checked })} />
                <label htmlFor="isPopularEdit" className="text-sm font-bold text-dark">Đặt làm món Best Seller</label>
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-white font-brand font-black uppercase tracking-widest rounded-2xl shadow-xl">Lưu Thay Đổi</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
