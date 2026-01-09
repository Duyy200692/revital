
import { Product, MenuItem, Campaign } from './types';

export const NAV_LINKS: MenuItem[] = [
  { label: 'Sản Phẩm', href: '#menu' },
  { label: 'Đặc Sản', href: '#about' },
  { label: 'Cửa Hàng', href: '#stores' },
  { label: 'Tin Tức', href: '#news' },
];

export const HERO_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    title: 'SỮA CHUA BÔNG BƯỞI',
    subtitle: 'Sữa Chua Ô Long Đá Xay',
    description: 'Sự kết hợp tinh tế giữa trà Ô Long đặc sản và vị sữa chua thanh mát, khơi gợi ký ức tuổi thơ với hương hoa bưởi nồng nàn.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920',
    ctaText: 'THỬ NGAY',
    colorTheme: '#FF6500',
    origin: 'Bảo Lộc, Lâm Đồng',
    stats: [
      { label: 'Độ cao', value: '1,200m' },
      { label: 'Lên men', value: 'Bán phần' },
      { label: 'Hương vị', value: 'Thanh khiết' }
    ]
  },
  {
    id: 'c2',
    title: 'PHIN GIẤY ĐẶC SẢN',
    subtitle: 'Tiện Lợi - Nguyên Bản',
    description: 'Thưởng thức hương vị cà phê đặc sản mọi lúc mọi nơi với bộ sản phẩm Phin Giấy mới nhất. Rang xay theo tiêu chuẩn Specialty.',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=1920',
    ctaText: 'KHÁM PHÁ',
    colorTheme: '#1A1A1A',
    origin: 'Cầu Đất, Đà Lạt',
    stats: [
      { label: 'SCA Score', value: '85+' },
      { label: 'Rang', value: 'Medium' },
      { label: 'Body', value: 'Dày, mượt' }
    ]
  },
  {
    id: 'c3',
    title: 'TRÀ TUYẾT SAN CỔ THỤ',
    subtitle: 'Hương Vị Tây Bắc',
    description: 'Những búp trà tinh khiết từ độ cao trên 2000m của những cây chè cổ thụ hàng trăm năm tuổi vùng Hà Giang.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=1920',
    ctaText: 'XEM CHI TIẾT',
    colorTheme: '#FF6500',
    origin: 'Vị Xuyên, Hà Giang',
    stats: [
      { label: 'Tuổi cây', value: '200+ năm' },
      { label: 'Độ cao', value: '2,100m' },
      { label: 'Thu hái', value: 'Thủ công' }
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Phin Giấy Đặc Sản',
    description: 'Cà phê đặc sản rang mộc, hương vị nồng nàn từ vùng cao nguyên Lâm Đồng.',
    price: '48.000đ',
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: '2',
    name: 'Ô Long Sữa Đặc Sản',
    description: 'Trà Ô Long được hái thủ công, kết hợp sữa tươi nguyên chất tạo vị béo thanh.',
    price: '55.000đ',
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: '3',
    name: 'Espresso Arabica Cầu Đất',
    description: 'Hạt Arabica Cầu Đất thượng hạng, rang vừa để giữ trọn vị chua thanh và hương hoa.',
    price: '45.000đ',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Trà Tuyết San Cổ Thụ',
    description: 'Lá trà từ những cây trà cổ thụ hàng trăm năm tuổi vùng Tây Bắc.',
    price: '65.000đ',
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Bánh Mì Ngàn Lớp Artisan',
    description: 'Bánh được làm thủ công mỗi sáng với bơ lạt cao cấp nhập khẩu.',
    price: '42.000đ',
    category: 'pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: 'Revital Cold Brew',
    description: 'Ủ lạnh 24 giờ từ hạt cà phê đặc sản, mang lại cảm giác sảng khoái tối đa.',
    price: '60.000đ',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800'
  }
];
