import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, Download, Mail, MapPin, Menu, Phone, X } from 'lucide-react';

type Project = {
  number: string;
  title: string;
  place: string;
  description: string;
  tags: string[];
};

const projects: Project[] = [
  {
    number: '01',
    title: 'Rural Development Programme Evaluation',
    place: 'IIM Ahmedabad, with Ministry of Rural Development',
    description: 'Utkarsh helped design and run a large evaluation of a government rural development programme. He built the survey, then travelled to three states for data collection, visiting villages and working directly with local teams. He hired and trained field teams of over 30 people in each district. Over 6,000 people were surveyed in person. Back in Delhi, he analyzed the data in R and Python and co-wrote the final report, which was presented to the Ministry.',
    tags: ['Field visits', 'Survey research', 'Government evaluation'],
  },
  {
    number: '02',
    title: "Public Perception Study for India's Olympic Bid 2036",
    place: 'IIM Ahmedabad, EY, Gujarat Sports Infrastructure Development',
    description: "Utkarsh worked on a large public perception survey of about 6,000 people to support India's official Olympic bid. This involved site visits and meetings with government officials in Gujarat. He also co-wrote the environmental sustainability plan for the bid, comparing it against international standards. The findings were presented directly to senior government officials and used in India's official bid.",
    tags: ['Field visits', 'Public policy', 'Sustainability research'],
  },
  {
    number: '03',
    title: 'Human-AI Interaction in Digital Learning',
    place: "Master's Thesis · IIT Delhi",
    description: 'For his thesis, Utkarsh studied how AI can improve digital learning. He built an AI system that reads both text and audio to recognize emotions during learning, and used a fine-tuned language model to generate easier-to-read learning content automatically.',
    tags: ['AI research', 'Education', 'Machine learning'],
  },
  {
    number: '04',
    title: 'AI Assistance and Task Performance',
    place: 'Humboldt University Berlin',
    description: "Utkarsh studied how people's trust in AI assistance affects how well they perform tasks. He used Bayesian modelling in Python to understand differences between individuals. The work was accepted for a poster presentation at a cognitive science conference in 2026.",
    tags: ['AI research', 'Statistical modelling'],
  },
  {
    number: '05',
    title: 'Pain Perception Modelling',
    place: "King's College London",
    description: 'Utkarsh re-analyzed data on the placebo effect and pain using computational models in MATLAB, comparing which models best explained the data. He also wrote a full study pre-registration for follow-up research. This work is being prepared for journal publication.',
    tags: ['Computational modelling', 'Research design'],
  },
  {
    number: '06',
    title: "Psychometric Scale for Children's Play",
    place: 'IIT Delhi, Department of Design',
    description: 'Utkarsh designed and tested a new scale to measure how much young children enjoy educational play. This involved in-person site visits, testing the scale with 130 children in Delhi, and validating it using standard statistical methods.',
    tags: ['Field visits', 'Instrument design', 'Child research'],
  },
  {
    number: '07',
    title: 'User Research for an AI Product',
    place: 'Vibe AI',
    description: 'Utkarsh ran in-person interviews and usability sessions with over 100 users to understand how people interact with an AI product. His findings were used directly by the product team to improve the design.',
    tags: ['User research', 'Product design'],
  },
  {
    number: '08',
    title: 'Consumer Research for Zomato',
    place: 'Zomato',
    description: 'Utkarsh studied how people choose and book restaurants using in-person usability testing. His recommendations led to an 18% drop in task time and a 15% rise in task success.',
    tags: ['User research', 'Usability testing'],
  },
];

const experience = [
  ['Research Associate', 'IIM Ahmedabad'],
  ['Research Assistant', 'IIT Delhi'],
  ["Research Intern", "King's College London (remote)"],
  ['Research Collaborator', 'Humboldt University of Berlin (remote)'],
  ['Human-Computer Interaction Researcher', 'Vibe AI'],
  ['Secretary General', 'IITD Model United Nations'],
  ['Project Head', 'Project Shrimati, Enactus JMI'],
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Gallery({ title, number }: { title: string; number: string }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = ['Field notes', 'Working materials', 'Research setting'];
  const move = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };
  return (
    <div className="project-gallery" aria-label={`${title} gallery`} data-testid={`gallery-project-${number}`}>
      <div className="gallery-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="gallery-slide" key={slide}>
            <div className="photo-placeholder aspect-[1.55/1]">
              <span>Future photo · {slide} · {index + 1}/3</span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="bg-[hsl(var(--background)/.82)] px-2 py-1 text-[.62rem] mono-label text-[hsl(var(--muted-foreground))]">
          Archive {String(activeSlide + 1).padStart(2, '0')} / 03
        </span>
        <div className="flex gap-1.5">
          <button type="button" className="gallery-control" onClick={() => move(-1)} aria-label={`Previous ${title} slide`} data-testid={`button-previous-slide-${number}`}>
            <ArrowLeft size={14} strokeWidth={1.5} />
          </button>
          <button type="button" className="gallery-control" onClick={() => move(1)} aria-label={`Next ${title} slide`} data-testid={`button-next-slide-${number}`}>
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="mb-10 flex items-center gap-3 text-[hsl(var(--muted-foreground))]">
      <span className="mono-label text-[.68rem] text-[hsl(var(--accent))]">{index}</span>
      <span className="h-px w-8 bg-[hsl(var(--foreground)/.25)]" />
      <h2 className="mono-label text-[.68rem]">{children}</h2>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = ['home', 'about', 'projects', 'talks', 'experience', 'skills', 'contact'];
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.fade-in'));
    const reveal = (element: HTMLElement) => element.classList.add('is-visible');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        reveal(element);
      } else {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-grid min-h-[100dvh] overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--background)/.91)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#home" onClick={closeMenu} className="flex items-center gap-3" data-testid="link-home-logo" aria-label="Utkarsh Mishra home">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-[hsl(var(--primary))] text-[.62rem] font-semibold text-[hsl(var(--primary))]">UM</span>
            <span className="text-sm font-semibold tracking-[-.02em]">Utkarsh Mishra</span>
          </a>
          <button type="button" className="grid h-9 w-9 place-items-center md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} data-testid="button-toggle-navigation">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--background))] px-5 py-4 md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0`} aria-label="Main navigation">
            {nav.map((item, index) => (
              <a key={item} href={`#${item}`} onClick={closeMenu} className={`py-2 text-[.66rem] font-medium uppercase tracking-[.14em] transition-colors hover:text-[hsl(var(--accent))] ${index === 0 ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--muted-foreground))]'}`} data-testid={`link-nav-${item}`}>
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="home" className="mx-auto flex min-h-[100dvh] max-w-[1440px] items-center px-5 pb-16 pt-28 md:px-10 md:pt-32">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div className="fade-in">
            <p className="mono-label mb-8 text-[.67rem] text-[hsl(var(--accent))]">Independent research portfolio · 2026</p>
            <h1 className="max-w-4xl text-[clamp(3.65rem,9vw,9rem)] leading-[.83] tracking-[-.065em] text-[hsl(var(--primary))]">
              Utkarsh<br /><span className="display-serif italic font-normal text-[hsl(var(--foreground))]">Mishra</span>
            </h1>
            <div className="mt-10 max-w-xl border-l border-[hsl(var(--accent))] pl-5 md:pl-7">
              <p className="text-lg leading-[1.45] tracking-[-.02em] md:text-2xl">Researcher working across policy evaluation, cognitive science, and technology design.</p>
              <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">M.Sc. Cognitive Science, IIT Delhi · Research Associate, IIM Ahmedabad</p>
            </div>
            <a href="#projects" className="group mt-10 inline-flex items-center gap-3 border-b border-[hsl(var(--primary))] pb-2 text-xs font-semibold uppercase tracking-[.12em] text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="link-see-projects">
              See Projects <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
          </div>
          <div className="fade-in delay-2">
            <div className="hero-orbit" aria-label="Utkarsh Mishra monogram illustration" data-testid="graphic-monogram">
              <div className="orbit-core" />
              <span className="orbit-mark mark-one" /><span className="orbit-mark mark-two" /><span className="orbit-mark mark-three" />
              <div className="absolute bottom-3 left-0 right-0 flex justify-between text-[.6rem] text-[hsl(var(--muted-foreground))]">
                <span className="mono-label">Delhi · India</span><span className="mono-label">01—08</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-[hsl(var(--foreground)/.14)]" data-testid="section-about">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <SectionLabel index="01" children="About" />
          <div className="grid gap-10 md:grid-cols-[.6fr_1.4fr] md:gap-20">
            <p className="display-serif max-w-xs text-4xl leading-[.95] text-[hsl(var(--primary))]">Work close to the question.</p>
            <p className="max-w-3xl text-xl leading-[1.5] tracking-[-.02em] md:text-[2rem] md:leading-[1.32]" data-testid="text-about">
              Utkarsh&apos;s work spans government policy evaluation, cognitive science research, and human-AI interaction design. His experience is varied by design — he has run large surveys in rural India, built computational models of human behavior, and studied how people use AI tools in everyday settings. Much of his work involves direct site visits: meeting communities, training field teams, and collecting data in person rather than only from a desk. He currently works as a Research Associate at IIM Ahmedabad and holds an M.Sc. in Cognitive Science from IIT Delhi.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="border-t border-[hsl(var(--foreground)/.14)]" data-testid="section-projects">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <SectionLabel index="02" children="Projects" />
          <div className="space-y-20 md:space-y-28">
            {projects.map((project, index) => (
              <article key={project.number} className="fade-in grid gap-8 md:grid-cols-[.2fr_1fr_1fr] md:gap-10" data-testid={`card-project-${project.number}`}>
                <div className="flex items-start justify-between md:block">
                  <span className="display-serif text-4xl italic text-[hsl(var(--accent))]">{project.number}</span>
                  <span className="mono-label text-[.61rem] text-[hsl(var(--muted-foreground))] md:mt-5 md:block">Project file</span>
                </div>
                <div>
                  <h3 className="max-w-lg text-3xl leading-[1.04] tracking-[-.045em] text-[hsl(var(--primary))] md:text-5xl">{project.title}</h3>
                  <p className="mt-4 text-xs font-semibold uppercase leading-relaxed tracking-[.08em] text-[hsl(var(--accent))]">{project.place}</p>
                  <p className="mt-6 max-w-xl text-base leading-[1.7] text-[hsl(var(--muted-foreground))]" data-testid={`text-project-description-${project.number}`}>{project.description}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className="border border-[hsl(var(--foreground)/.16)] px-2.5 py-1 text-[.62rem] text-[hsl(var(--muted-foreground))]">{tag}</span>)}
                  </div>
                </div>
                <Gallery title={project.title} number={project.number} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="talks" className="border-t border-[hsl(var(--foreground)/.14)]" data-testid="section-talks">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <SectionLabel index="03" children="Talks" />
          <div className="grid gap-10 md:grid-cols-[.6fr_1.4fr] md:gap-20">
            <p className="display-serif text-4xl leading-[.95] text-[hsl(var(--primary))]">In the room.</p>
            <div>
              {[
                ['Poster', 'Trait Responsiveness and the Placebo Effect', 'ACCS 2026'],
                ['Poster', 'Perceived AI-Based Assistance and Task Performance', 'ACCS 2026'],
                ['Presentation', 'Presentation to Ministry of Rural Development', 'rural development findings'],
                ['Presentation', 'Presentation to Gujarat Sports Infrastructure Development', 'Olympic Bid findings'],
              ].map(([type, title, detail], index) => (
                <div key={title} className="fade-in skill-row grid gap-2 py-5 md:grid-cols-[.25fr_1fr_.55fr] md:items-baseline md:gap-5" data-testid={`talk-${index + 1}`}>
                  <span className="mono-label text-[.62rem] text-[hsl(var(--accent))]">{type}</span>
                  <span className="text-lg tracking-[-.02em]">{title}</span>
                  <span className="text-sm text-[hsl(var(--muted-foreground))] md:text-right">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="border-t border-[hsl(var(--foreground)/.14)]" data-testid="section-experience">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <SectionLabel index="04" children="Experience" />
          <div className="ml-auto max-w-4xl">
            {experience.map(([role, organisation], index) => (
              <div key={`${role}-${organisation}`} className="fade-in skill-row grid gap-2 py-5 md:grid-cols-[.9fr_1.1fr_.15fr] md:items-baseline md:gap-8" data-testid={`experience-${index + 1}`}>
                <h3 className="text-xl tracking-[-.025em]">{role}</h3>
                <p className="text-base text-[hsl(var(--muted-foreground))]">{organisation}</p>
                <span className="mono-label text-[.6rem] text-[hsl(var(--muted-foreground))] md:text-right">{String(index + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="border-t border-[hsl(var(--foreground)/.14)]" data-testid="section-skills">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <SectionLabel index="05" children="Skills" />
          <div className="grid gap-10 md:grid-cols-[.6fr_1.4fr] md:gap-20">
            <p className="display-serif text-4xl leading-[.95] text-[hsl(var(--primary))]">Tools for asking better questions.</p>
            <div>
              {[
                ['Statistics & Software', 'R, Python, MATLAB'],
                ['Field & Survey Research', 'Qualtrics, SurveyCTO, survey design, field team management'],
                ['Research Methods', 'Bayesian modelling, econometrics, EFA/CFA, mixed methods'],
              ].map(([label, value], index) => (
                <div key={label} className="fade-in skill-row grid gap-3 py-6 md:grid-cols-[.62fr_1.38fr] md:gap-8" data-testid={`skill-${index + 1}`}>
                  <h3 className="text-sm font-semibold text-[hsl(var(--accent))]">{label}</h3>
                  <p className="text-xl leading-snug tracking-[-.025em] md:text-2xl">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-[hsl(var(--foreground)/.14)]" data-testid="section-contact">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <SectionLabel index="06" children="Contact" />
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <h2 className="max-w-xl text-5xl leading-[.95] tracking-[-.06em] text-[hsl(var(--primary))] md:text-8xl">Let&apos;s compare notes.</h2>
              <p className="mt-7 max-w-md text-base leading-relaxed text-[hsl(var(--muted-foreground))]">For research, fieldwork, or thoughtful conversations about people and technology.</p>
            </div>
            <div className="md:justify-self-end">
              <div className="space-y-5">
                <a href="mailto:utkarshmishra9819@gmail.com" className="group flex items-center gap-4 text-base transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-email">
                  <Mail size={17} strokeWidth={1.5} /><span>utkarshmishra9819@gmail.com</span><ArrowDownRight size={15} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a href="tel:+918081251636" className="group flex items-center gap-4 text-base transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-phone">
                  <Phone size={17} strokeWidth={1.5} /><span>+91-80812-51636</span><ArrowDownRight size={15} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <p className="flex items-center gap-4 text-base text-[hsl(var(--muted-foreground))]" data-testid="text-location"><MapPin size={17} strokeWidth={1.5} /><span>Delhi, India</span></p>
              </div>
              <a href="/cv.pdf" className="mt-10 inline-flex items-center gap-3 bg-[hsl(var(--primary))] px-5 py-3 text-xs font-semibold uppercase tracking-[.1em] text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--accent))]" data-testid="link-download-cv" aria-label="Download CV PDF">
                <Download size={15} strokeWidth={1.7} /> Download CV
              </a>
              <p className="mt-3 text-[.62rem] text-[hsl(var(--muted-foreground))]">PDF path: /cv.pdf</p>
            </div>
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-[hsl(var(--foreground)/.14)] pt-5 text-[.62rem] text-[hsl(var(--muted-foreground))] md:flex-row">
            <span className="mono-label">Utkarsh Mishra · Research portfolio</span>
            <span className="mono-label">Questions welcome</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;