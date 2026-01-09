
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-brand font-bold text-lg">R</div>
            <span className="text-xl font-brand font-bold tracking-tight">Revital <span className="text-primary">Coffee</span></span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Mọi hạt cà phê chúng tôi chọn lựa đều kể một câu chuyện về sự nỗ lực và đam mê. Hãy cùng chúng tôi viết tiếp chương mới.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/profile.php?id=61577020004858" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-primary">Danh Mục</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#home" className="hover:text-white transition-colors">Trang Chủ</a></li>
            <li><a href="#menu" className="hover:text-white transition-colors">Thực Đơn</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">Về Chúng Tôi</a></li>
            <li><a href="#ecosystem" className="hover:text-white transition-colors">Hệ Sinh Thái</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-primary">Chính Sách</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Giao Hàng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bảo Mật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điều Khoản</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Nhượng Quyền</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-primary">Liên Hệ</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">A:</span> 306/5 Vườn Lài, An Phú Đông, Quận 12, Ho Chi Minh City, Vietnam
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">P:</span> 090 120 33 88
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">E:</span> revitalcoffee25@gmail.com
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">© 2024 Revital Coffee. All rights reserved.</p>
        <div className="flex gap-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <span>Made with passion in Vietnam</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;