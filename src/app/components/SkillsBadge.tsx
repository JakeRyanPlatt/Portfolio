export type SkillLevel = 'expert' | 'advanced' | 'intermediate' | 'learning';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: 'design' | 'frontend' | 'backend' | 'database' | 'tools';
}

interface SkillsBadgeProps {
  skill: Skill;
}

const levelDots: Record<SkillLevel, number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  learning: 1,
};

export function SkillsBadge({ skill }: SkillsBadgeProps) {
  const dots = levelDots[skill.level];

  return (
    <div
      className="flex items-center justify-between gap-6 py-3"
      style={{ borderBottom: '1px solid #111' }}
    >
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          color: '#bbb',
          fontWeight: 400,
        }}
      >
        {skill.name}
      </span>
      <div className="flex items-center gap-1 shrink-0">
        {[1, 2, 3, 4].map((d) => (
          <span
            key={d}
            style={{
              width: '20px',
              height: '2px',
              background: d <= dots ? '#2dd4bf' : '#1e1e1e',
              display: 'block',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Skills Section ─────────────────────────────────────────── */

const skills: Skill[] = [
  { id: 's1',  name: 'Figma',       level: 'expert',       category: 'design' },
  { id: 's2',  name: 'React',       level: 'expert',       category: 'frontend' },
  { id: 's3',  name: 'JavaScript',  level: 'expert',       category: 'frontend' },
  { id: 's4',  name: 'TypeScript',  level: 'advanced',     category: 'frontend' },
  { id: 's5',  name: 'HTML / CSS',  level: 'expert',       category: 'frontend' },
  { id: 's6',  name: 'Tailwind',    level: 'advanced',     category: 'frontend' },
  { id: 's7',  name: 'Node.js',     level: 'advanced',     category: 'backend' },
  { id: 's8',  name: 'Express',     level: 'advanced',     category: 'backend' },
  { id: 's9',  name: 'REST APIs',   level: 'advanced',     category: 'backend' },
  { id: 's10', name: 'SQLite',      level: 'advanced',     category: 'database' },
  { id: 's11', name: 'SQL',         level: 'advanced',     category: 'database' },
  { id: 's12', name: 'Git',         level: 'advanced',     category: 'tools' },
];

const categoryMeta: { key: string; label: string }[] = [
  { key: 'design',   label: 'Design' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'tools',    label: 'Tools' },
];

export function SkillsSection() {
  const grouped = categoryMeta
    .map(({ key, label }) => ({
      label,
      skills: skills.filter((s) => s.category === key),
    }))
    .filter((g) => g.skills.length > 0);

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
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
          003 — Expertise
        </span>
        <div className="flex items-end justify-between mb-2">
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
            Skills
          </h2>
          {/* Level legend */}
          <div className="hidden md:flex items-center gap-5">
            {(['learning', 'intermediate', 'advanced', 'expert'] as SkillLevel[]).map((lvl) => (
              <div key={lvl} className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: '12px',
                        height: '2px',
                        background: d <= levelDots[lvl] ? '#2dd4bf' : '#1e1e1e',
                        display: 'block',
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    color: '#333',
                    letterSpacing: '0.08em',
                    textTransform: 'capitalize',
                  }}
                >
                  {lvl}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rule */}
        <div style={{ height: '1px', background: '#1c1c1c', marginBottom: '32px' }} />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
          {grouped.map(({ label, skills: catSkills }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  color: '#333',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                {label}
              </p>
              {catSkills.map((skill) => (
                <SkillsBadge key={skill.id} skill={skill} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}