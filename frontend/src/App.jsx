import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

const App = () => {
  const { authUser, checkAuthFn, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuthFn();
  }, [checkAuthFn]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
