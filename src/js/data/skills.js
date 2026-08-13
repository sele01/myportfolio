/**
 * Skills Data
 *
 * Central place for all skill information.
 * Each skill has:
 * - name: Display name
 * - level: Proficiency 0-100 (used for progress bar)
 * - category: Which group it belongs to
 * - learning: true if currently learning
 */

export const skills = [
  // Frontend
  { name: "HTML5", level: 90, category: "frontend", learning: false },
  { name: "CSS3", level: 85, category: "frontend", learning: false },
  {
    name: "JavaScript (ES6+)",
    level: 80,
    category: "frontend",
    learning: false,
  },
  { name: "React", level: 30, category: "frontend", learning: true },

  // Backend
  { name: "Python", level: 75, category: "backend", learning: false },
  { name: "Django", level: 60, category: "backend", learning: false },
  { name: "PHP", level: 55, category: "backend", learning: false },
  { name: "Node.js", level: 40, category: "backend", learning: true },

  // DevOps
  { name: "Git & GitHub", level: 85, category: "devops", learning: false },
  { name: "Vite", level: 70, category: "devops", learning: false },
  { name: "Linux (Arch)", level: 75, category: "devops", learning: false },
  { name: "Docker", level: 20, category: "devops", learning: true },

  // Tools
  { name: "VS Code", level: 90, category: "tools", learning: false },
  { name: "Terminal", level: 85, category: "tools", learning: false },
  { name: "Figma", level: 50, category: "tools", learning: false },
  { name: "Hyprland", level: 70, category: "tools", learning: false },
];
