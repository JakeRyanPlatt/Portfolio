import { ProjectCard, type Project } from './ProjectCard';

const projects: Project[] = [
  {
    id: 'p1',
    index: '001',
    title: 'Dashboard Analytics Platform',
    description:
      'Full-stack analytics dashboard with real-time data visualization, user auth, and a RESTful API backend. Designed end-to-end in Figma before implementation.',
    image: 'https://images.unsplash.com/photo-1737505598998-693328b57ae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbWluaW1hbCUyMGNvZGUlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBtb25vY2hyb21lfGVufDF8fHx8MTc3MzUzMjQ3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'Node.js', 'Express', 'SQLite', 'Figma'],
    liveUrl: 'https://github.com/JakeRyanPlatt',
    repoUrl: 'https://github.com/JakeRyanPlatt',
  },
  {
    id: 'p2',
    index: '002',
    title: 'Raspberry Pi Technical Communication',
    description:
      'Technical documentation and supporting shell scripts for configuring a Raspberry Pi 5 as a headless remote development environment. Covers SSH-based access, environment setup, and verification scripting — written as a course deliverable for a technical communication class. ',
    image: 'https://1000logos.net/wp-content/uploads/2024/08/Raspberry-Pi-Emblem.png',
    tags: ['RasberryPi', 'IOT', 'C/C++', 'Linux'],
    repoUrl: 'https://github.com/JakeRyanPlatt/RaspberryPi_Remote_Dev',
  },
  {
    id: 'p3',
    index: '003',
    title: 'Network Monitor Bottle+SQL',
    description:
      'Python network monitor that pings hosts, logs latency and availability to SQLite, and serves results via a Bottle WSGI web interface.',
    image: 'data:image/jpeg;base64,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',
    tags: ['Python3.11', 'Bottle', 'SQLite', 'Network Monitor'],
    repoUrl: 'https://github.com/JakeRyanPlatt/Network-Monitor-BottleSQL',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.62rem',
                color: '#333',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              002 — Selected Work
            </span>
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: '#fff',
                lineHeight: 1.05,
              }}
            >
              Projects
            </h2>
          </div>
          <a
            href="https://github.com/JakeRyanPlatt?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              color: '#444',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
              paddingBottom: '4px',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#2dd4bf')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#444')}
          >
            All repos ↗
          </a>
        </div>

        {/* Rule */}
        <div style={{ height: '1px', background: '#1c1c1c', marginBottom: '0' }} />

        {/* Project list */}
        <div>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}