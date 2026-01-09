
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Campaign } from './types';
import { HERO_CAMPAIGNS, PRODUCTS } from './constants';

interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  color: string;
  address: string;
  phone: string;
  email: string;
  bookingLink?: string;
  facebookLink: string;
  gallery: string[];
}

interface AboutData {
  titlePart1: string;
  titlePart2: string;
  description: string;
  images: string[];
  stats: { label: string; value: string }[];
}

interface StoreContextType {
  campaigns: Campaign[];
  products: Product[];
  services: ServiceDetail[];
  aboutData: AboutData;
  isAdmin: boolean;
  setCampaigns: (c: Campaign[]) => void;
  setProducts: (p: Product[]) => void;
  setServices: (s: ServiceDetail[]) => void;
  setAboutData: (a: AboutData) => void;
  setIsAdmin: (admin: boolean) => void;
  updateCampaign: (id: string, data: Partial<Campaign>) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  updateService: (id: string, data: Partial<ServiceDetail>) => void;
  updateAbout: (data: Partial<AboutData>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('revital_campaigns');
    return saved ? JSON.parse(saved) : HERO_CAMPAIGNS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('revital_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [aboutData, setAboutData] = useState<AboutData>(() => {
    const saved = localStorage.getItem('revital_about');
    return saved ? JSON.parse(saved) : {
      titlePart1: 'Nơi Khởi Đầu Của',
      titlePart2: 'Sáng Tạo',
      description: 'Revital Coffee không chỉ là một quán cà phê, mà là một hành trình khơi dậy cảm hứng. Bắt đầu từ niềm đam mê với những hạt cà phê cao nguyên Việt Nam, chúng tôi đã tạo nên một không gian hiện đại dành cho những tâm hồn cần một "cú hích" để bứt phá.',
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1521017432531-fbd92d744264?auto=format&fit=crop&q=80&w=600"
      ],
      stats: [
        { label: 'Vùng Nguyên Liệu', value: '10+' },
        { label: 'Rang Xay Tự Nhiên', value: '100%' }
      ]
    };
  });

  const [services, setServices] = useState<ServiceDetail[]>(() => {
    const saved = localStorage.getItem('revital_services');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'coffee',
        title: 'Revital Coffee',
        tagline: 'Năng Lượng Phục Hồi',
        description: 'Không gian tối giản, hiện đại với hương vị cà phê đặc sản.',
        longDescription: 'Revital Coffee là trái tim năng lượng của hệ sinh thái...',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200',
        color: 'bg-primary',
        address: '306/5 Vườn Lài, Quận 12, HCM',
        phone: '090 120 33 88',
        email: 'revitalcoffee25@gmail.com',
        facebookLink: 'https://www.facebook.com/profile.php?id=61577020004858',
        gallery: []
      },
      {
        id: 'pickle',
        title: 'Pickle Bounce',
        tagline: 'Nhịp Đập Cộng Đồng',
        description: 'Sân chơi Pickleball sôi động, kết nối năng lượng trẻ trung.',
        longDescription: 'Pickle Bounce là cụm sân chuyên nghiệp đạt chuẩn quốc tế...',
        image: 'https://images.unsplash.com/photo-1707317770305-654e58b9f4f4?auto=format&fit=crop&q=80&w=1200',
        color: 'bg-blue-600',
        address: '306/5 Vườn Lài, Quận 12, HCM',
        phone: '083 382 1111',
        email: 'picklebounce25@gmail.com',
        bookingLink: 'https://datlich.alobo.vn/san/sport_pickle_bounce',
        facebookLink: 'https://www.facebook.com/picklebounce.vn',
        gallery: []
      },
      {
        id: 'pilates',
        title: 'BEAM Pilates',
        tagline: 'Sự Tĩnh Lặng Cao Cấp',
        description: 'Phòng tập Pilates chuẩn quốc tế với không gian tinh tế.',
        longDescription: 'BEAM Pilates mang đến trải nghiệm tập luyện chuyên sâu...',
        image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1200',
        color: 'bg-emerald-700',
        address: 'Phòng 7, Beam Academy - Quận 1',
        phone: '090 977 3133',
        email: 'beam.pilates@gmail.com',
        facebookLink: 'https://www.facebook.com/beampilates.vn',
        gallery: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('revital_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('revital_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('revital_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('revital_about', JSON.stringify(aboutData));
  }, [aboutData]);

  const updateCampaign = (id: string, data: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa món này khỏi menu không?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateService = (id: string, data: Partial<ServiceDetail>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const updateAbout = (data: Partial<AboutData>) => {
    setAboutData(prev => ({ ...prev, ...data }));
  };

  return (
    <StoreContext.Provider value={{ 
      campaigns, products, services, aboutData, isAdmin, 
      setCampaigns, setProducts, setServices, setAboutData, setIsAdmin,
      updateCampaign, updateProduct, addProduct, deleteProduct, updateService, updateAbout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
