/* ===== Tweak Defaults ===== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headingFont": "Space Grotesk"
}/*EDITMODE-END*/;

const HEADING_FONTS = {
  'Space Grotesk': "'Space Grotesk', system-ui, sans-serif",
  'Syne': "'Syne', system-ui, sans-serif",
  'Outfit': "'Outfit', system-ui, sans-serif",
};

/* ===== Main App ===== */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeSection, setActiveSection] = React.useState('hero');

  /* Apply tweaks to CSS vars */
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-heading', HEADING_FONTS[t.headingFont] || HEADING_FONTS['Space Grotesk']);
  }, [t.headingFont]);

  /* Scroll-triggered reveal */
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });

  /* Active section tracking — use scroll position for accuracy */
  React.useEffect(() => {
    const sectionIds = ['hero', 'about', 'work', 'reviews', 'contact'];
    
    const findActive = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', findActive, { passive: true });
    findActive();
    return () => window.removeEventListener('scroll', findActive);
  }, []);

  /* Hero parallax + scroll progress */
  React.useEffect(() => {
    let ticking = false;
    const progressBar = document.getElementById('scroll-progress');

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const docH = document.body.scrollHeight - vh;
        const heroProgress = Math.min(scrollY / vh, 1);

        const heroInner = document.getElementById('hero-inner');
        if (heroInner) {
          heroInner.style.opacity = 1 - heroProgress * 0.85;
          heroInner.style.transform =
            `scale(${1 - heroProgress * 0.05}) translateY(${heroProgress * -30}px)`;
        }

        if (progressBar && docH > 0) {
          progressBar.style.transform = `scaleX(${scrollY / docH})`;
        }

        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="scroll-progress" id="scroll-progress"></div>
      <Nav activeSection={activeSection} />
      <Hero />
      <About />
      <Portfolio />
      <Reviews />
      <Contact />
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true"></div>

      <TweaksPanel>
        <TweakSection label="Typography" />
        <TweakRadio
          label="Heading font"
          value={t.headingFont}
          options={['Space Grotesk', 'Syne', 'Outfit']}
          onChange={(v) => setTweak('headingFont', v)}
        />
      </TweaksPanel>
    </div>
  );
}

/* ===== Mount ===== */
const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(React.createElement(App));
