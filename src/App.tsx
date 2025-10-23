import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Actions from './components/Actions';
import Members from './components/Members';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Actions />
        <Members />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
