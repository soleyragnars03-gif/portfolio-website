/* ===== Data ===== */
const PROJECTS = [
  { id: 1, title: 'Ísland Brewery', categories: ['branding'], color: '#7A6B55',
    headline: 'Craft a Nordic brewing identity from grain to glass.',
    behance: 'https://www.behance.net/' },
  { id: 2, title: 'Ljós Studio', categories: ['logo-design'], color: '#5E7280',
    headline: 'Give a creative studio its visual voice.',
    behance: 'https://www.behance.net/' },
  { id: 3, title: 'Reykjavik Arts Festival', categories: ['campaign'], color: '#806072',
    headline: 'Unite a city through art and design.',
    behance: 'https://www.behance.net/' },
  { id: 4, title: 'Norður Skincare', categories: ['branding', 'web-design'], color: '#607060',
    headline: 'Let nature lead the brand.',
    behance: 'https://www.behance.net/' },
  { id: 5, title: 'Sjávarborg Restaurant', categories: ['branding', 'logo-design'], color: '#556575',
    headline: 'Bring the sea to the table.',
    behance: 'https://www.behance.net/' },
  { id: 6, title: 'Hvítur Magazine', categories: ['web-design'], color: '#7A6E5E',
    headline: 'Design an editorial home for ideas.',
    behance: 'https://www.behance.net/' },
  { id: 7, title: 'Frost & Fire Spa', categories: ['campaign'], color: '#5E6078',
    headline: 'Balance warmth and ice in one campaign.',
    behance: 'https://www.behance.net/' },
  { id: 8, title: 'Hrafn Architecture', categories: ['logo-design', 'branding'], color: '#4E6260',
    headline: 'Mark the space between form and function.',
    behance: 'https://www.behance.net/' },
];

const FILTERS = [
  { id: 'all', label: 'All Work' },
  { id: 'branding', label: 'Branding' },
  { id: 'campaign', label: 'Campaign' },
  { id: 'logo-design', label: 'Logo Design' },
  { id: 'web-design', label: 'Web Design' },
];

const REVIEWS = [
  { name: 'Ólafur Kjartansson', company: 'Ísland Brewery',
    text: 'Sóley brought a rare clarity to our brand. She distilled everything we are into a visual language that feels both timeless and unmistakably ours.' },
  { name: 'Eva Lindström', company: 'Norður Skincare',
    text: 'Working with Sóley felt like a true partnership. She listened deeply, challenged our assumptions, and delivered work that exceeded what we imagined.' },
  { name: 'Magnús Þór Sigurðsson', company: 'Hrafn Architecture',
    text: 'She understood the quiet confidence we wanted. No excess, no noise — just a mark that holds its weight in every context.' },
];

const CATEGORY_LABELS = {
  'branding': 'Branding', 'campaign': 'Campaign',
  'logo-design': 'Logo Design', 'web-design': 'Web Design',
};

/* ===== Animated Text ===== */
function AnimatedText({ text, className, baseDelay = 0 }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span className="char-wrap" key={i}>
          <span className="char" style={{ animationDelay: `${baseDelay + i * 0.035}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ===== Nav (no logo, centered links) ===== */
function Nav({ activeSection }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <ul className="nav-links">
        {['about', 'work', 'reviews', 'contact'].map(s => (
          <li key={s}>
            <a href={`#${s}`} className={activeSection === s ? 'active' : ''}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ===== Hero (no tagline, no meta bar, editable photo) ===== */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-left" id="hero-inner">
        <h1>
          <div className="hero-name-first">
            <AnimatedText text="Sóley" baseDelay={0.3} />
          </div>
          <div className="hero-name-last">
            <AnimatedText text="Ragnarsdóttir" baseDelay={0.55} />
          </div>
        </h1>
      </div>
      <div className="hero-right">
        <image-slot
          id="hero-portrait"
          placeholder="Drop your portrait photo here"
          shape="rect"
          class="hero-photo-slot"
          style={{ width: '100%', height: '100%' }}
        ></image-slot>
      </div>
    </section>
  );
}

/* ===== About (no Čeština) ===== */
function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-label reveal">About</div>
        <p className="about-large-text reveal">
          Sóley Ragnarsdóttir is a graduate of the BA in Graphic Design at Teesside University's Prague campus. Her practice sits at the intersection of branding and product design, shaped by a Nordic sensibility for restraint, material honesty, and quiet detail. She is drawn to projects where identity and object meet — systems that don't just look considered on screen, but hold up in the hand, on the shelf, and around the table. She works in Icelandic, English, and Czech, bringing a Northern eye to brands and products that want to feel made, not manufactured.
        </p>
        <div className="about-langs reveal stagger-1">
          <span className="about-lang-tag">Íslenska</span>
          <span className="about-lang-tag">English</span>
        </div>
      </div>
    </section>
  );
}

/* ===== Custom Cursor ===== */
function CustomCursor() {
  const cursorRef = React.useRef(null);

  React.useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const onEnter = () => cursor.classList.add('visible');
    const onLeave = () => cursor.classList.remove('visible');

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    const observe = () => {
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      mo.disconnect();
      document.querySelectorAll('.project-card').forEach(card => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef}>View</div>;
}

/* ===== Portfolio (3 visible + "All Work" reveal, behance links, editable images) ===== */
function Portfolio() {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [showAll, setShowAll] = React.useState(false);
  const [animKey, setAnimKey] = React.useState(0);

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.categories.includes(activeFilter));

  const visible = showAll || activeFilter !== 'all' ? filtered : filtered.slice(0, 3);
  const hasMore = activeFilter === 'all' && !showAll && filtered.length > 3;

  const handleFilter = (id) => {
    setActiveFilter(id);
    setShowAll(false);
    setAnimKey(k => k + 1);
  };

  const total = filtered.length;

  return (
    <section className="work-section" id="work">
      <div className="work-header reveal">
        <h2 className="work-title">Selected<br/>Work</h2>
        <div className="filter-bar">
          {FILTERS.map(f => (
            <button key={f.id}
              className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => handleFilter(f.id)}
            >{f.label}</button>
          ))}
        </div>
      </div>
      <div className="project-list" key={`list-${animKey}`}>
        {visible.map((project, i) => (
          <a className="project-card" key={project.id}
             href={project.behance} target="_blank" rel="noopener noreferrer"
             style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="project-image-col">
              <image-slot
                id={`project-img-${project.id}`}
                placeholder={`Drop image for ${project.title}`}
                shape="rounded"
                radius="6"
                class="project-image-slot"
                style={{ backgroundColor: project.color }}
              ></image-slot>
            </div>
            <div className="project-info-col">
              <div className="project-counter">
                {String(i + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
              </div>
              <div className="project-category">
                {project.categories.map(c => CATEGORY_LABELS[c]).join(' · ')}
              </div>
              <h3 className="project-headline">{project.headline}</h3>
            </div>
          </a>
        ))}
      </div>
      {hasMore && (
        <div className="show-all-btn">
          <button onClick={() => setShowAll(true)}>All Work</button>
        </div>
      )}
    </section>
  );
}

/* ===== Reviews (accent bar hover instead of lift) ===== */
function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-container">
        <div className="reviews-header reveal">
          <div className="reviews-label">Testimonials</div>
          <h2 className="reviews-title">What Clients Say</h2>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div className={`review-card reveal stagger-${i + 1}`} key={i}>
              <div className="review-quote-mark">"</div>
              <p className="review-text">{r.text}</p>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-company">{r.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Contact ===== */
function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="reveal">
        <h2 className="contact-heading">Let's Work<br/>Together</h2>
      </div>
      <div className="reveal stagger-2">
        <a href="mailto:soley@soleyragnars.com" className="contact-email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="M22 7l-10 7L2 7"></path>
          </svg>
          soley@soleyragnars.com
        </a>
      </div>
      <div className="contact-socials reveal stagger-3">
        <a href="#" className="social-link">Instagram</a>
        <a href="#" className="social-link">Behance</a>
        <a href="#" className="social-link">LinkedIn</a>
      </div>
      <p className="footer-copy reveal stagger-3">© 2026 Sóley Ragnarsdóttir</p>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Portfolio, About, Reviews, Contact, CustomCursor });
