function Sparkle({ size = 20, color = '#F472B6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}

function WaveDivider({ fromColor, toColor, extra }) {
  return (
    <div className="wave-section" style={{ background: toColor, marginTop: '-6px', marginBottom: '-6px' }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
           style={{ display: 'block', marginTop: '-1px' }}>
        <path fill={fromColor}
          d="M0,0 L0,40 C240,80 480,60 720,50 C960,40 1200,70 1440,40 L1440,0 Z" />
      </svg>
    </div>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const smoothScroll = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    const start = window.scrollY;
    const dist = y - start;
    const dur = Math.min(1800, Math.max(800, Math.abs(dist) * 0.5));
    let startTime = null;
    const ease = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / dur, 1);
      window.scrollTo(0, start + dist * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
      <img src="v3/logo.png" alt="Sóley R." className="nav-logo-img" style={{height: '48px', width: 'auto'}} />
      <div className="nav-links">
        <a href="#work" onClick={(e) => smoothScroll(e, '#work')}>Work</a>
        <a href="#about" onClick={(e) => smoothScroll(e, '#about')}>About</a>
        <a href="#contact" onClick={(e) => smoothScroll(e, '#contact')}>Contact</a>
      </div>
      <div className="nav-wave">
        <svg viewBox="0 0 1440 16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(245,237,224,0.94)"
            d="M0,0 L0,4 C180,14 360,6 540,10 C720,14 900,6 1080,10 C1260,14 1380,6 1440,4 L1440,0 Z" />
        </svg>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-greeting">Graphic Designer</div>
          <h1 className="hero-name">
            <span className="hero-name-line"><span>Sóley</span></span>
            <span className="hero-name-line"><span>Ragnarsdóttir</span></span>
          </h1>
          <p className="hero-desc">
            Concept-driven. Detail-obsessed. Iceland-based.
          </p>
          <div className="hero-buttons">
            <a href="#work" className="btn-primary">
              See my work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <a href="#contact" className="btn-outline">Get in touch</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-glow"></div>
          <div className="hero-blob">
            <img src={getRes("portrait")} alt="Sóley Ragnarsdóttir"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          </div>
          <div className="hero-float hero-float-1" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="hero-float hero-float-2" style={{ animation: 'float 7s ease-in-out 0.5s infinite', background: '#0D9488' }}></div>
          <div className="hero-float hero-float-3" style={{ animation: 'float 5s ease-in-out 1s infinite' }}></div>
          <div className="hero-float hero-float-4" style={{ animation: 'float 8s ease-in-out 0.8s infinite' }}></div>
          <div className="hero-sparkle hero-sparkle-1"><Sparkle size={20} color="#E8449A" /></div>
          <div className="hero-sparkle hero-sparkle-2"><Sparkle size={15} color="#8B5CF6" /></div>
          <div className="hero-sparkle hero-sparkle-3"><Sparkle size={17} color="#F472B6" /></div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen, onHoverCard }) {
  const [hovered, setHovered] = React.useState(false);
  const glowStyle = hovered ? {
    boxShadow: `0 8px 40px ${project.accent}55, 0 0 80px ${project.accent}22`
  } : {};
  return (
    <div className="p-card reveal"
         onClick={() => onOpen(project)}
         onMouseEnter={() => { onHoverCard(true); setHovered(true); }}
         onMouseLeave={() => { onHoverCard(false); setHovered(false); }}>
      <div className="p-card-img" style={glowStyle}>
        <img src={project.cover} alt={project.title} />
      </div>
      <div className="p-card-bottom">
        <span className="p-card-name">{project.title}</span>
        <span className="p-card-tag" style={{ background: project.accent + '22', color: project.accent }}>
          {project.type}
        </span>
      </div>
    </div>
  );
}

function Projects({ onOpen, onHoverCard }) {
  const [showAll, setShowAll] = React.useState(false);
  const p = PROJECTS;
  const visible = showAll ? p : p.slice(0, 6);
  const rows = [];
  for (let i = 0; i < visible.length; i += 2) {
    rows.push(visible.slice(i, i + 2));
  }

  const handleSeeMore = () => {
    setShowAll(true);
    /* Re-observe new cards after render */
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
        }, { threshold: 0.05 });
        obs.observe(el);
      });
    }, 50);
  };

  return (
    <section className="projects-section" id="work">
      <div className="section-header reveal">
        <div>
          <div className="section-eyebrow" style={{ background: '#0D9488' }}>Portfolio</div>
          <h2 className="section-title">Projects made with<br/><span className="pink">passion</span></h2>
        </div>
      </div>
      <div className="projects-grid">
        {rows.map((row, ri) => (
          <div className="project-row r-half" key={ri}>
            {row.map(proj => (
              <ProjectCard key={proj.id} project={proj} onOpen={onOpen} onHoverCard={onHoverCard} />
            ))}
          </div>
        ))}
      </div>
      {!showAll && (
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button className="btn-see-more" onClick={handleSeeMore}>
            See more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  const isOpen = !!project;
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      const t = setTimeout(() => setVisible(true), 30);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  React.useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen]);

  const pageImages = React.useMemo(() => {
    if (!project) return [];
    const imgs = [];
    for (let i = 1; i <= project.pages; i++) {
      imgs.push(getRes(project.id + '_' + String(i).padStart(2, '0')));
    }
    return imgs;
  }, [project]);

  if (!isOpen) return null;

  return (
    <React.Fragment>
      <div className={`modal-bg${visible ? ' open' : ''}`} onClick={onClose}></div>
      <div className={`modal-drawer${visible ? ' open' : ''}`}>
        <div className="modal-head">
          <span className="modal-title">{project.title}</span>
          <div className="modal-actions">
            <span className="modal-cat">{project.type}</span>
            <button className="modal-close" onClick={onClose}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18"></path><path d="M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="modal-body">
          {pageImages.map((src, i) => (
            <img key={i} src={src} alt={`${project.title} page ${i + 1}`}
                 loading={i > 2 ? 'lazy' : 'eager'} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

function About() {
  return (
    <React.Fragment>
      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="section-eyebrow reveal">About me</div>
          <p className="about-text reveal s1">
            Sóley Ragnarsdóttir is a <span className="highlight">concept-driven graphic designer</span>.
            She holds a BA in Graphic Design from Teesside University and works at the intersection
            of branding and product design. Her practice is focused on building cohesive, idea-led
            brands and campaigns — balancing strategy with curiosity to create design that
            <span className="highlight">communicates clearly</span> and feels authentic.
          </p>
        </div>
        <div className="about-deco about-deco-1"></div>
        <div className="about-deco about-deco-2"></div>
      </section>
      <WaveDivider fromColor="#0D9488" toColor="#7C3AED" />
    </React.Fragment>
  );
}

function Contact() {
  return (
    <React.Fragment>
      <section className="contact-section" id="contact">
        <div className="contact-deco contact-deco-1"></div>
        <div className="contact-deco contact-deco-2"></div>
        <div className="reveal">
          <h2 className="contact-heading">Let's create something<br/><span className="yellow">together</span></h2>
        </div>
        <div className="reveal s1">
          <a href="mailto:soley@soleyragnars.com" className="contact-email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="M22 4L12 13L2 4"></path>
            </svg>
            soley@soleyragnars.com
          </a>
        </div>
        <div className="contact-socials reveal s2">
          <a href="https://www.behance.net/sleyragnars1" className="contact-soc">
            Behance
          </a>
          <a href="https://www.instagram.com/soleyragnars_design/" className="contact-soc">
            Instagram
          </a>
        </div>
      </section>
      <WaveDivider fromColor="#7C3AED" toColor="#F5EDE0" extra={true} />
    </React.Fragment>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <span className="footer-copy">© 2026 Sóley Ragnarsdóttir</span>
      <button className="footer-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top ↑
      </button>
    </footer>
  );
}

Object.assign(window, {
  Sparkle, WaveDivider, SiteNav, Hero, ProjectCard, Projects,
  ProjectModal, About, Contact, SiteFooter
});
