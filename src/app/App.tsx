import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsBadge';
import { ContactForm } from './components/ContactForm';
import { MarqueeTicker } from './components/MarqueeTicker';

export default function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: '#050505', color: '#fff' }}
    >
      <NavBar />
      <main>
        <Hero />

        <MarqueeTicker
          items={[
            'Full-Stack Development',
            'Network Engineer',
            'Python',
            'C#',
            'C',
            'Java',
            'React',
            'Node.js + Express',
            'SQLite',
            'REST APIs',
            'Figma to Code',
            'UI Design',
            'Component Systems',
          ]}
          direction="left"
          speed={36}
        />

        <ProjectsSection />

        <MarqueeTicker
          items={[
            'Available for Work',
            'Open to Collaboration',
            'React Developer',
            'Backend Engineer',
            'Design Systems',
            'API Architecture',
            'Database Design',
            'JakeRyanPlatt',
          ]}
          direction="right"
          speed={28}
          accent={true}
        />

        <SkillsSection />

        <MarqueeTicker
          items={[
            'Figma',
            'React',
            'TypeScript',
            'Node.js',
            'Express',
            'SQLite',
            'Tailwind CSS',
            'Git',
            'REST',
            'JWT Auth',
          ]}
          direction="left"
          speed={42}
        />

        <ContactForm />
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6"
        style={{ borderTop: '1px solid #111' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem',
              color: '#2a2a2a',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            © 2026 Jake Ryan Platt
          </span>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem',
              color: '#1e1e1e',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Figma · React · Node.js · SQLite
          </span>
        </div>
      </footer>
    </div>
  );
}