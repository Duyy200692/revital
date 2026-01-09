
import React, { useState } from 'react';
import { useStore } from '../StoreContext';

const AdminControls: React.FC = () => {
  const { isAdmin, setIsAdmin } = useStore();
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Mật khẩu mẫu
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Mật khẩu không đúng!');
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {isAdmin ? (
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAdmin(false)}
            className="bg-dark text-white px-6 py-3 rounded-full font-brand text-xs font-black shadow-2xl border border-primary/50 flex items-center gap-3 hover:bg-primary transition-all scale-105"
          >
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            THOÁT CHẾ ĐỘ ADMIN
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowLogin(true)}
          className="w-14 h-14 bg-white/90 backdrop-blur-xl text-primary border-2 border-primary/20 shadow-2xl hover:bg-primary hover:text-white transition-all rounded-full flex items-center justify-center group relative"
          title="Đăng nhập Quản trị"
        >
          <div className="absolute -top-10 left-0 bg-dark text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            ĐĂNG NHẬP ADMIN
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-dark/80 backdrop-blur-md flex items-center justify-center p-6 z-[200]">
          <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-sm shadow-2xl animate-slide-in-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-brand font-bold text-dark text-center mb-2">Quản Trị Viên</h3>
            <p className="text-gray-400 text-center text-sm mb-8">Vui lòng nhập mật khẩu hệ thống</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Mật khẩu</label>
                <input 
                  type="password" 
                  autoFocus
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-accent border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowLogin(false)} className="flex-1 py-4 bg-gray-100 text-dark font-brand font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-colors">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white font-brand font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Xác nhận</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControls;
