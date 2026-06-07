/* ===== Project Data ===== */
const PROJECTS = [
  { id: 'sitotiskem', title: 'Sítotiskem', type: 'Branding',
    ratio: 'landscape', pdf: 'uploads/sitotiskem.pdf',
    behance: 'https://www.behance.net/gallery/216702231/Sitotiskem-Branding',
    color: '#8B7D6B' },
  { id: 'heimasana', title: 'Heimasana', type: 'Branding',
    ratio: 'portrait', pdf: 'uploads/heimasana.pdf',
    behance: 'https://www.behance.net/gallery/219210061/Heimasana-Branding',
    color: '#6B7D6E' },
  { id: 'minutes', title: 'Make Your Minutes Matter', type: 'Campaign · Web',
    ratio: 'landscape', pdf: 'uploads/make-your-minutes-matter.pdf',
    behance: 'https://www.behance.net/gallery/241613333/Make-Your-Minutes-Matter-Campaign',
    color: '#7D6B6B' },
  { id: 'montessori', title: 'Montessori', type: 'Identity · Web',
    ratio: 'landscape', pdf: 'uploads/montessori.pdf',
    behance: 'https://www.behance.net/gallery/226546243/Montessori-Visual-Identity-and-Web-Design',
    color: '#6E7B6B' },
  { id: 'ecostitch', title: 'Eco-Stitch', type: 'Sustainable Design',
    ratio: 'portrait', pdf: 'uploads/eco-stitch.pdf',
    behance: 'https://www.behance.net/gallery/214965103/Eco-Stitch-Sustainable-Design',
    color: '#5E6E5E' },
  { id: 'volte', title: 'VOLTE!', type: 'Campaign',
    ratio: 'square', pdf: 'uploads/volte.pdf',
    behance: 'https://www.behance.net/gallery/226549245/VOLTE-Postcard-Campaign-Design',
    color: '#7B6B5E' },
  { id: 'greyaway', title: 'Grey Away', type: 'Branding',
    ratio: 'landscape', pdf: 'uploads/grey-away.pdf',
    behance: 'https://www.behance.net/gallery/215630899/Grey-Away-Branding',
    color: '#6B6E7B' },
  { id: 'bookcover', title: 'Book Covers', type: 'Editorial',
    ratio: 'portrait', pdf: 'uploads/book-cover.pdf',
    behance: 'https://www.behance.net/gallery/211649451/Book-cover-design',
    color: '#7B7068' },
  { id: 'sublimeppc', title: 'Sublimeppc', type: 'Web · Branding',
    ratio: 'landscape', pdf: 'uploads/sublimeppc.pdf',
    behance: 'https://www.behance.net/gallery/221729969/Sublimeppc-website-branding',
    color: '#687078' },
];

/* ===== Nav ===== */
function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

/* ===== Hero ===== */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <div className="hero-greeting">Hello, I'm</div>
        <h1 className="hero-name">
          <span className="hero-name-line"><span>Sóley</span></span>
          <span className="hero-name-line"><span>Ragnarsdóttir</span></span>
        </h1>
        <p className="hero-tagline">Graphic designer crafting brands with quiet detail</p>
        <a href="#work" className="hero-cta">
          View my work
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="hero-photo-wrap">
        <div className="hero-blob-accent"></div>
        <div className="hero-blob">
          <image-slot
            id="hero-portrait"
            placeholder="Drop your portrait here"
            shape="rect"
            style={{ width: '100%', height: '100%' }}
          ></image-slot>
        </div>
        <div className="hero-dots">
          {Array.from({ length: 12 }, (_, i) => (
            <span className="hero-dot" key={i}></span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Project Card ===== */
function ProjectCard({ project, onClick }) {
  return (
    <div className={`project-card ${project.ratio}`} onClick={() => onClick(project)}>
      <div className="project-card-image">
        <image-slot
          id={`proj-${project.id}`}
          placeholder={`${project.title}`}
          shape="rounded"
          radius="14"
          style={{ width: '100%', backgroundColor: project.color }}
        ></image-slot>
        <div className="project-card-overlay">
          <span className="project-card-overlay-text">Open project</span>
        </div>
      </div>
      <div className="project-card-info">
        <span className="project-card-title">{project.title}</span>
        <span className="project-card-type">{project.type}</span>
      </div>
    </div>
  );
}

/* ===== Projects Section ===== */
function Projects({ onOpenProject }) {
  const p = PROJECTS;
  return (
    <section className="projects-section" id="work">
      <div className="section-label reveal">Selected Work</div>
      <h2 className="projects-heading reveal stagger-1">
        Projects built with <em>care</em>
      </h2>
      <div className="projects-grid">
        <div className="project-row split-7-5 reveal stagger-2">
          <ProjectCard project={p[0]} onClick={onOpenProject} />
          <ProjectCard project={p[1]} onClick={onOpenProject} />
        </div>
        <div className="project-row wide reveal">
          <ProjectCard project={p[2]} onClick={onOpenProject} />
        </div>
        <div className="project-row split-5-7 reveal">
          <ProjectCard project={p[3]} onClick={onOpenProject} />
          <ProjectCard project={p[4]} onClick={onOpenProject} />
        </div>
        <div className="project-row triple reveal">
          <ProjectCard project={p[5]} onClick={onOpenProject} />
          <ProjectCard project={p[6]} onClick={onOpenProject} />
          <ProjectCard project={p[7]} onClick={onOpenProject} />
        </div>
        <div className="project-row wide reveal">
          <ProjectCard project={p[8]} onClick={onOpenProject} />
        </div>
      </div>
    </section>
  );
}

/* ===== Project Modal ===== */
function ProjectModal({ project, onClose }) {
  const isOpen = !!project;

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <React.Fragment>
      <div className={`project-modal-backdrop ${isOpen ? 'open' : ''}`}
           onClick={onClose}></div>
      <div className={`project-modal ${isOpen ? 'open' : ''}`}>
        {project && (
          <React.Fragment>
            <div className="project-modal-header">
              <span className="project-modal-title">{project.title}</span>
              <div className="project-modal-meta">
                <span className="project-modal-tag">{project.type}</span>
                <a href={project.behance} target="_blank" rel="noopener"
                   className="project-modal-behance">Behance ↗</a>
                <button className="project-modal-close" onClick={onClose}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18"></path><path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="project-modal-body">
              <iframe src={project.pdf} title={project.title}></iframe>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

/* ===== About ===== */
function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <div>
          <div className="section-label reveal">About</div>
          <p className="about-text reveal stagger-1">
            Sóley Ragnarsdóttir is a graphic designer and graduate of Teesside
            University's Prague campus, working at the intersection of branding
            and product design. Shaped by a Nordic sensibility for restraint,
            material honesty, and quiet detail — she is drawn to projects where
            identity and object meet.
          </p>
        </div>
        <div className="about-right">
          <div className="about-detail-group reveal stagger-2">
            <div className="about-detail-label">Services</div>
            <div className="about-detail-value">
              Brand Identity<br/>Visual Systems<br/>
              Campaign Design<br/>Web Design<br/>
              Editorial &amp; Print
            </div>
          </div>
          <div className="about-detail-group reveal stagger-2">
            <div className="about-detail-label">Languages</div>
            <div className="about-lang-tags">
              <span className="about-lang-tag">Íslenska</span>
              <span className="about-lang-tag">English</span>
              <span className="about-lang-tag">Čeština</span>
            </div>
          </div>
          <div className="about-detail-group reveal stagger-3">
            <div className="about-detail-label">Education</div>
            <div className="about-detail-value">
              BA Graphic Design<br/>Teesside University, Prague
            </div>
          </div>
        </div>
      </div>
      <div className="about-blob-bg"></div>
    </section>
  );
}

/* ===== Contact ===== */
function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="reveal">
        <h2 className="contact-heading">Let's create<br/>something <em>together</em></h2>
      </div>
      <div className="reveal stagger-1">
        <a href="mailto:soley@soleyragnars.com" className="contact-email-link">
          soley@soleyragnars.com
        </a>
      </div>
      <div className="contact-socials reveal stagger-2">
        <a href="https://www.behance.net/" target="_blank" rel="noopener" className="contact-social">Behance</a>
        <a href="#" className="contact-social">Instagram</a>
        <a href="#" className="contact-social">LinkedIn</a>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function SiteFooter() {
  return (
    <footer className="footer">
      <span className="footer-copy">© 2026 Sóley Ragnarsdóttir</span>
      <button className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top ↑
      </button>
    </footer>
  );
}

Object.assign(window, {
  SiteNav, Hero, Projects, ProjectCard, ProjectModal, About, Contact, SiteFooter, PROJECTS
});
