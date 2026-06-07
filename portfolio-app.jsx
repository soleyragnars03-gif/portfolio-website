function App() {
  const [activeProject, setActiveProject] = React.useState(null);

  /* Scroll reveals */
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    const observe = () => {
      document.querySelectorAll('.reveal:not(.in-view)').forEach(el => observer.observe(el));
    };
    observe();
    /* Re-observe after DOM settles */
    const t = setTimeout(observe, 300);
    return () => { observer.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <div>
      <SiteNav />
      <Hero />
      <Projects onOpenProject={setActiveProject} />
      <About />
      <Contact />
      <SiteFooter />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
