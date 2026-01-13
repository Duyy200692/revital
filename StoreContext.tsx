
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Campaign, SignatureItem } from './types';
import { HERO_CAMPAIGNS, PRODUCTS } from './constants';
import { db } from './firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  writeBatch 
} from "firebase/firestore";

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
  signatureItems: SignatureItem[];
  aboutData: AboutData;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  updateCampaign: (id: string, data: Partial<Campaign>) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'> | Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateService: (id: string, data: Partial<ServiceDetail>) => Promise<void>;
  updateSignatureItem: (id: string, data: Partial<SignatureItem>) => Promise<void>;
  addSignatureItem: (item: Omit<SignatureItem, 'id'>) => Promise<void>;
  deleteSignatureItem: (id: string) => Promise<void>;
  updateAbout: (data: Partial<AboutData>) => Promise<void>;
  syncFullData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_SIGNATURES: SignatureItem[] = [
  {
    id: 's1',
    name: 'Revital Peach Fizz',
    tagline: 'Mùa Hè Sảng Khoái',
    description: 'Chiết xuất từ đào tươi mọng nước, kết hợp với soda craft tạo nên tầng vị thanh mát bùng nổ.',
    image: 'https://i.pinimg.com/736x/80/7e/4d/807e4d843818e5f294025a1734268e64.jpg',
    color: 'from-orange-300 to-rose-400',
    price: '65.000đ'
  },
  {
    id: 's2',
    name: 'Cold Brew Đậm Đặc',
    tagline: 'Sự Tỉnh Táo Tối Đa',
    description: 'Cà phê đặc sản ủ lạnh 24h, mang hương vị hạt dẻ và chocolate đắng nhẹ quyến rũ.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800',
    color: 'from-zinc-700 to-black',
    price: '75.000đ'
  },
  {
    id: 's3',
    name: 'Matcha Tuyết San',
    tagline: 'Vị Trà Tây Bắc',
    description: 'Sự kết hợp giữa Matcha Nhật Bản và bột trà Tuyết San cổ thụ, béo ngậy vị sữa yến mạch.',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800',
    color: 'from-emerald-400 to-teal-700',
    price: '68.000đ'
  },
  {
    id: 's4',
    name: 'Rosemary Latte',
    tagline: 'Hương Thơm Nồng Nàn',
    description: 'Sự kết hợp độc đáo giữa hương thảo tươi và cà phê sữa truyền thống.',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800',
    color: 'from-pink-300 to-purple-500',
    price: '59.000đ'
  },
  {
    id: 's5',
    name: 'Tropical Sunset',
    tagline: 'Rực Rỡ Hoàng Hôn',
    description: 'Hương vị trái cây nhiệt đới mix cùng trà hoa hibiscus đỏ rực, giàu vitamin và năng lượng.',
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=800',
    color: 'from-orange-500 to-red-600',
    price: '72.000đ'
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(HERO_CAMPAIGNS);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [signatureItems, setSignatureItems] = useState<SignatureItem[]>(DEFAULT_SIGNATURES);
  const [services, setServices] = useState<ServiceDetail[]>([
    {
      id: 'coffee',
      title: 'Revital Coffee',
      tagline: 'Năng Lượng Phục Hồi',
      description: 'Không gian tối giản, hiện đại với hương vị cà phê đặc sản.',
      longDescription: 'Revital Coffee là trái tim năng lượng của hệ sinh thái với không gian được thiết kế tỉ mỉ, giúp bạn tái tạo năng lượng sau những giờ làm việc căng thẳng.',
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
      longDescription: 'Pickle Bounce mang đến hệ thống sân tập đạt chuẩn quốc tế, là nơi kết nối cộng đồng yêu thể thao và năng động.',
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
      longDescription: 'BEAM Pilates mang đến trải nghiệm tập luyện chuyên sâu với máy móc hiện đại và đội ngũ huấn luyện viên tâm huyết.',
      image: 'https://cdn.prod.website-files.com/675034c8257ed13034dc8c73/67fe7192f767bde84c47b63b_Lo%CC%9B%CC%81p%201-2.png',
      color: 'bg-emerald-700',
      address: 'Phòng 7, Beam Academy - Quận 1',
      phone: '090 977 3133',
      email: 'beam.pilates@gmail.com',
      facebookLink: 'https://www.facebook.com/beampilates.vn',
      gallery: []
    }
  ]);
  const [aboutData, setAboutData] = useState<AboutData>({
    titlePart1: 'Nơi Khởi Đầu Của',
    titlePart2: 'Sáng Tạo',
    description: 'Revital Coffee không chỉ là một quán cà phê, mà là một hành trình khơi dậy cảm hứng và tái tạo năng lượng tinh thần.',
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
  });

  useEffect(() => {
    if (!db) return;
    const unsubCamp = onSnapshot(doc(db, "siteData", "campaigns"), (docSnap) => {
      if (docSnap.exists()) { const data = docSnap.data(); if (data && data.list) setCampaigns(data.list); }
    });
    const unsubProd = onSnapshot(collection(db, "products"), (snapshot) => {
      const prods = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Product));
      if (prods.length > 0) setProducts(prods);
    });
    const unsubServ = onSnapshot(doc(db, "siteData", "services"), (docSnap) => {
      if (docSnap.exists()) { const data = docSnap.data(); if (data && data.list) setServices(data.list); }
    });
    const unsubSig = onSnapshot(doc(db, "siteData", "signatures"), (docSnap) => {
      if (docSnap.exists()) { const data = docSnap.data(); if (data && data.list) setSignatureItems(data.list); }
    });
    const unsubAbout = onSnapshot(doc(db, "siteData", "about"), (docSnap) => {
      if (docSnap.exists()) setAboutData(docSnap.data() as AboutData);
    });
    return () => { unsubCamp(); unsubProd(); unsubServ(); unsubSig(); unsubAbout(); };
  }, []);

  const updateCampaign = async (id: string, data: Partial<Campaign>) => {
    const newList = campaigns.map(c => c.id === id ? { ...c, ...data } : c);
    await setDoc(doc(db, "siteData", "campaigns"), { list: newList });
  };
  const updateProduct = async (id: string, data: Partial<Product>) => { await updateDoc(doc(db, "products", id), data); };
  const addProduct = async (productData: any) => {
    const id = productData.id || Date.now().toString();
    await setDoc(doc(db, "products", id), { ...productData, id });
  };
  const deleteProduct = async (id: string) => { if (confirm('Xóa món này?')) await deleteDoc(doc(db, "products", id)); };
  const updateService = async (id: string, data: Partial<ServiceDetail>) => {
    const newList = services.map(s => s.id === id ? { ...s, ...data } : s);
    await setDoc(doc(db, "siteData", "services"), { list: newList });
  };
  const updateSignatureItem = async (id: string, data: Partial<SignatureItem>) => {
    const newList = signatureItems.map(s => s.id === id ? { ...s, ...data } : s);
    await setDoc(doc(db, "siteData", "signatures"), { list: newList });
  };
  const addSignatureItem = async (item: Omit<SignatureItem, 'id'>) => {
    const id = 'sig-' + Date.now();
    const newList = [...signatureItems, { ...item, id }];
    await setDoc(doc(db, "siteData", "signatures"), { list: newList });
  };
  const deleteSignatureItem = async (id: string) => {
    if (confirm('Xóa món đặc biệt này?')) {
      const newList = signatureItems.filter(s => s.id !== id);
      await setDoc(doc(db, "siteData", "signatures"), { list: newList });
    }
  };
  const updateAbout = async (data: Partial<AboutData>) => { await setDoc(doc(db, "siteData", "about"), { ...aboutData, ...data }); };
  const syncFullData = async () => {
    const batch = writeBatch(db);
    batch.set(doc(db, "siteData", "campaigns"), { list: campaigns });
    batch.set(doc(db, "siteData", "about"), aboutData);
    batch.set(doc(db, "siteData", "signatures"), { list: signatureItems });
    batch.set(doc(db, "siteData", "services"), { list: services });
    for (const p of products) { batch.set(doc(db, "products", p.id), p); }
    await batch.commit();
  };

  return (
    <StoreContext.Provider value={{ 
      campaigns, products, services, signatureItems, aboutData, isAdmin, setIsAdmin,
      updateCampaign, updateProduct, addProduct, deleteProduct, updateService, 
      updateSignatureItem, addSignatureItem, deleteSignatureItem, updateAbout,
      syncFullData
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
