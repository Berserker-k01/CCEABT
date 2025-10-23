import Header from './components/Header';
import Footer from './components/Footer';
import HomeClassic from './pages/HomeClassic';
import HomeImpact from './pages/HomeImpact';
import HomeMinimal from './pages/HomeMinimal';

function App() {
  const VARIANTS = ['classic', 'impact', 'minimal'] as const;
  type Variant = typeof VARIANTS[number];

  let variant: Variant;
  const key = 'homeVariant';
  const existing = typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null;
  if (existing && (VARIANTS as readonly string[]).includes(existing)) {
    variant = existing as Variant;
  } else {
    const random = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    variant = random;
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, variant);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {variant === 'classic' && <HomeClassic />}
        {variant === 'impact' && <HomeImpact />}
        {variant === 'minimal' && <HomeMinimal />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
