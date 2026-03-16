export type SkillLevel = 'expert' | 'advanced' | 'intermediate' | 'learning';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'tools'| 'networking'|'systems'| 'cloud'| 'security';
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
  // Languages
  { id: 's1',  name: 'C',           level: 'intermediate',  category: 'languages' },
  { id: 's2',  name: 'C#',          level: 'intermediate',  category: 'languages' },
  { id: 's3',  name: 'Python',      level: 'intermediate',  category: 'languages' },
  { id: 's4',  name: 'JavaScript',  level: 'intermediate',  category: 'languages' },
  { id: 's5',  name: 'HTML / CSS',  level: 'intermediate',  category: 'languages' },
  { id: 's6',  name: 'PowerShell',  level: 'intermediate',  category: 'languages' },

  // Networking
  { id: 's7',  name: 'TCP/IP',          level: 'advanced',      category: 'networking' },
  { id: 's8',  name: 'DNS / DHCP',      level: 'advanced',      category: 'networking' },
  { id: 's9',  name: 'VPN',             level: 'intermediate',  category: 'networking' },
  { id: 's10', name: 'Routing & Switching', level: 'intermediate', category: 'networking' },
  { id: 's11', name: 'Wireshark',       level: 'intermediate',  category: 'networking' },
  { id: 's12', name: 'Cisco / Packet Tracer', level: 'intermediate', category: 'networking' },

  // Systems & Embedded
  { id: 's13', name: 'Microcontrollers', level: 'beginner',     category: 'systems' },
  { id: 's14', name: 'Linux (Ubuntu/Kali)', level: 'intermediate', category: 'systems' },
  { id: 's15', name: 'Windows Server', level: 'advanced',       category: 'systems' },
  { id: 's16', name: 'Active Directory', level: 'advanced',     category: 'systems' },

  // Cloud & Virtualization
  { id: 's17', name: 'Azure',        level: 'intermediate',     category: 'cloud' },
  { id: 's18', name: 'VMware vSphere', level: 'intermediate',   category: 'cloud' },
  { id: 's19', name: 'Hyper-V',      level: 'intermediate',     category: 'cloud' },

  // Security
  { id: 's20', name: 'Cybersecurity', level: 'intermediate',    category: 'security' },
  { id: 's21', name: 'Firewall Management', level: 'intermediate', category: 'security' },
  { id: 's22', name: 'IoT Security', level: 'beginner',         category: 'security' },

  // Tools
  { id: 's23', name: 'Git',          level: 'intermediate',     category: 'tools' },
  { id: 's24', name: 'SQL',          level: 'intermediate',     category: 'tools' },
  { id: 's25', name: 'Remote Desktop', level: 'advanced',       category: 'tools' },
];

const categoryMeta: { key: string; label: string }[] = [
  { key: 'languages',  label: 'Languages' },
  { key: 'networking', label: 'Networking' },
  { key: 'systems',    label: 'Systems & Embedded' },
  { key: 'cloud',      label: 'Cloud & Virtualization' },
  { key: 'security',   label: 'Security' },
  { key: 'tools',      label: 'Tools' },
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