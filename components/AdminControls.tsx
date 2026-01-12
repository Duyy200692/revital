
import React, { useState } from 'react';
import { useStore } from '../StoreContext';

const AdminControls: React.FC = () => {
  const { isAdmin, setIsAdmin, syncFullData } = useStore();
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Mật khẩu không đúng!');
    }
  };

  const handleSync = async () => {
    if (!confirm('Hành động này sẽ ĐÈ hoàn toàn dữ liệu trên Cloud bằng dữ liệu mới nhất trong code. Bạn có chắc không?')) return;
    
    setIsSyncing(true);
    try {
      await syncFullData();
      alert('Đồng bộ thành công rực rỡ! Bây giờ hãy F5 lại trang web trên điện thoại của bạn.');
    } catch (err) {
      console.error(err);
      alert('Lỗi khi đồng bộ: ' + (err as Error).message);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3">
      {isAdmin ? (
        <div className="flex flex-col gap-2">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className={`bg-white text-dark px-6 py-3 rounded-full font-brand text-[10px] font-black shadow-2xl border-2 border-primary flex items-center gap-3 hover:bg-primary hover:text-white transition-all ${isSyncing ? 'opacity-50' : 'animate-pulse'}`}
          >
            {isSyncing ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
            {isSyncing ? 'ĐANG LÊN CLOUD...' : 'ĐỒNG BỘ DỮ LIỆU MỚI'}
          </button>
          
          <button 
            onClick={() => setIsAdmin(false)}
            className="bg-dark text-white px-6 py-3 rounded-full font-brand text-[10px] font-black shadow-2xl border border-primary/50 flex items-center gap-3 hover:bg-primary transition-all"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            THOÁT ADMIN
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowLogin(true)}
          className="w-14 h-14 bg-white/90 backdrop-blur-xl text-primary border-2 border-primary/20 shadow-2xl hover:bg-primary hover:text-white transition-all rounded-full flex items-center justify-center group relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-dark/80 backdrop-blur-md flex items-center justify-center p-6 z-[200]">
          <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-sm shadow-2xl">
            <h3 className="text-2xl font-brand font-bold text-dark text-center mb-6">Đăng nhập Admin</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-accent border-none rounded-2xl px-5 py-4 outline-none"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowLogin(false)} className="flex-1 py-4 bg-gray-100 rounded-2xl font-black text-[10px] uppercase">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase">Vào</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControls;
