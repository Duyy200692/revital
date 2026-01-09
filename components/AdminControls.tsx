
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
    <div className="fixed bottom-4 left-4 z-[100]">
      {isAdmin ? (
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAdmin(false)}
            className="bg-dark text-white px-4 py-2 rounded-full font-brand text-xs font-bold shadow-xl border border-white/10 flex items-center gap-2 hover:bg-primary transition-colors"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            ĐANG CHẾ ĐỘ ADMIN (THOÁT)
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowLogin(true)}
          className="w-10 h-10 bg-dark/20 backdrop-blur-md text-dark hover:bg-primary hover:text-white transition-all rounded-full flex items-center justify-center opacity-0 hover:opacity-100"
          title="Admin Login"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6 z-[200]">
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-sm shadow-2xl">
            <h3 className="text-2xl font-brand font-bold text-dark mb-6">Đăng nhập Admin</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Mật khẩu (admin123)</label>
                <input 
                  type="password" 
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-accent border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowLogin(false)} className="flex-1 py-4 bg-gray-100 text-dark font-bold rounded-2xl">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20">Vào Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControls;
