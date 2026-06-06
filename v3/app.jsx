function App() {
  const [activeProject, setActiveProject] = React.useState(null);
  const [cursorPos, setCursorPos] = React.useState({ x: -100, y: -100 });
  const [onCard, setOnCard] = React.useState(false);
  const [cursorVisible, setCursorVisible] = React.useState(false);
  const posRef = React.useRef({ x: -100, y: -100 });

  /* Smooth cursor */
  React.useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!cursorVisible) setCursorVisible(true);
    };
    const onLeave = () => setCursorVisible(false);
    const onEnter = () => setCursorVisible(true);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    let running = true;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      setCursorPos(prev => ({
        x: lerp(prev.x, posRef.current.x, 0.15),
        y: lerp(prev.y, posRef.current.y, 0.15),
      }));
      if (running) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return () => {
      running = false;
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [cursorVisible]);

  /* Scroll reveals */
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
    const observe = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => observer.observe(el));
    };
    observe();
    const t = setTimeout(observe, 400);
    return () => { observer.disconnect(); clearTimeout(t); };
  }, []);

  /* Parallax hero floats */
  React.useEffect(() => {
    const floats = document.querySelectorAll('.hero-float');
    const onScroll = () => {
      const y = window.scrollY;
      floats.forEach((el, i) => {
        const speed = 0.05 + i * 0.03;
        el.style.transform = `translateY(${-y * speed}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Loading: beige blob on dark → scales up to fill screen → overlay fades → website */
  const [loadState, setLoadState] = React.useState('waiting');

  React.useEffect(() => {
    // 1.5s: register the blob
    const t1 = setTimeout(() => setLoadState('expanding'), 1500);
    // After scale fills screen, fade out overlay
    const t2 = setTimeout(() => setLoadState('fading'), 3200);
    const t3 = setTimeout(() => setLoadState('gone'), 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const cursorClass = `custom-cursor${cursorVisible ? ' visible' : ''}${onCard ? ' hovering-card' : ''}`;

  return (
    <React.Fragment>
      {loadState !== 'gone' && (
        <div className={`loading-screen${loadState === 'expanding' ? ' expanding' : ''}${loadState === 'fading' ? ' expanding fading' : ''}`}>
          <div className="loading-blob-wrap">
            <div className="loading-blob"></div>
          </div>
        </div>
      )}

      <div>
        <div className={cursorClass} style={{ left: cursorPos.x, top: cursorPos.y }}>
        {onCard ? 'View project' : ''}
      </div>
      <SiteNav />
      <Hero />
      <WaveDivider fromColor="#F5EDE0" toColor="#1A1A1A" />
      <Projects onOpen={setActiveProject} onHoverCard={setOnCard} />
      <WaveDivider fromColor="#1A1A1A" toColor="#0D9488" />
      <About />
      <Contact />
      <SiteFooter />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
