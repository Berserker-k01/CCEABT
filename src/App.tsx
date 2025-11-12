import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Network from './pages/Network';
import News from './pages/News';
import Contact from './pages/Contact';
import Partners from './pages/Partners';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
