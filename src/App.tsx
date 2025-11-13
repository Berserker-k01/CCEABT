import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Network from './pages/Network';
import News from './pages/News';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Admin from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Check if URL contains /cceabtadmin for admin access
    const path = window.location.pathname;
    if (path === '/cceabtadmin') {
      setCurrentPage('admin');
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL when navigating to admin page
    if (currentPage === 'admin') {
      window.history.pushState({}, '', '/cceabtadmin');
    } else if (window.location.pathname === '/cceabtadmin') {
      window.history.pushState({}, '', '/');
    }
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'network':
        return <Network />;
      case 'news':
        return <News />;
      case 'contact':
        return <Contact />;
      case 'partners':
        return <Partners />;
      case 'admin':
        return <Admin onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow pt-24">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
