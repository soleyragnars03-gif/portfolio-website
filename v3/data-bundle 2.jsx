/* Data with resource-based image lookups */
function getRes(id) { return (window.__resources && window.__resources[id]) || ''; }

const PROJECTS = [
  { id: 'sitotiskem', title: 'Sítotiskem', type: 'Branding',
    pages: 13, behance: 'https://www.behance.net/gallery/216702231/Sitotiskem-Branding',
    color: '#C4A882', accent: '#E8449A' },
  { id: 'heimasana', title: 'Heimasana', type: 'Branding',
    pages: 13, behance: 'https://www.behance.net/gallery/219210061/Heimasana-Branding',
    color: '#7BA68B', accent: '#0D9488' },
  { id: 'minutes', title: 'Make Your Minutes Matter', type: 'Campaign',
    pages: 14, behance: 'https://www.behance.net/gallery/241613333/Make-Your-Minutes-Matter-Campaign',
    color: '#A68B7B', accent: '#8B5CF6' },
  { id: 'montessori', title: 'Montessori', type: 'Identity · Web',
    pages: 6, behance: 'https://www.behance.net/gallery/226546243/Montessori-Visual-Identity-and-Web-Design',
    color: '#8BA67B', accent: '#34D399' },
  { id: 'ecostitch', title: 'Eco-Stitch', type: 'Sustainable Design',
    pages: 7, behance: 'https://www.behance.net/gallery/214965103/Eco-Stitch-Sustainable-Design',
    color: '#6B8B6E', accent: '#0D9488' },
  { id: 'volte', title: 'VOLTE!', type: 'Campaign',
    pages: 4, behance: 'https://www.behance.net/gallery/226549245/VOLTE-Postcard-Campaign-Design',
    color: '#8B7B6B', accent: '#FB923C' },
  { id: 'greyaway', title: 'Grey Away', type: 'Branding',
    pages: 13, behance: 'https://www.behance.net/gallery/215630899/Grey-Away-Branding',
    color: '#7B7D8B', accent: '#8B5CF6' },
  { id: 'bookcover', title: 'Book Covers', type: 'Editorial',
    pages: 4, behance: 'https://www.behance.net/gallery/211649451/Book-cover-design',
    color: '#8B7D72', accent: '#E8449A' },
  { id: 'sublimeppc', title: 'Sublimeppc', type: 'Web · Branding',
    pages: 9, behance: 'https://www.behance.net/gallery/221729969/Sublimeppc-website-branding',
    color: '#727D8B', accent: '#60A5FA' },
  { id: 'mealmate', title: 'MealMate', type: 'App Design',
    pages: 16, behance: 'https://www.behance.net/gallery/226257221/MealMate-Application',
    color: '#7BA67B', accent: '#34D399' },
];

/* Add cover getter */
PROJECTS.forEach(p => {
  Object.defineProperty(p, 'cover', { get() { return getRes(p.id + '_01'); } });
});

window.PROJECTS = PROJECTS;
window.getRes = getRes;
