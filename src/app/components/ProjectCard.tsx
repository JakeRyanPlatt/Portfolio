export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group flex flex-col"
      style={{
        borderTop: '1px solid #1c1c1c',
        paddingTop: '28px',
        paddingBottom: '28px',
        transition: 'border-color 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#2dd4bf';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#1c1c1c';
      }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Image */}
        <div
          className="shrink-0 overflow-hidden"
          style={{ width: '100%', maxWidth: '220px', height: '140px' }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: 'grayscale(80%)' }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.62rem',
                  color: '#333',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                {project.index}
              </span>
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  lineHeight: 1.2,
                }}
              >
                {project.title}
              </h3>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 shrink-0">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    color: '#444',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#2dd4bf')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#444')}
                >
                  Repo ↗
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    color: '#444',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#2dd4bf')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#444')}
                >
                  Live ↗
                </a>
              )}
            </div>
          </div>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: '#666',
              lineHeight: 1.65,
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  color: '#444',
                  background: '#0f0f0f',
                  border: '1px solid #1c1c1c',
                  padding: '3px 8px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}