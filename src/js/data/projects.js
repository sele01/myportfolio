/**
 * Projects Data
 *
 * Central place for all project information.
 * Adding a new project = adding one object to this array.
 *
 * Each project has:
 * - title: Display name
 * - category: Which filter it belongs to
 * - description: Short summary shown on card
 * - tech: Array of technologies used
 * - github: Link to repository (empty string if none)
 * - status: 'complete', 'development', or 'upcoming'
 */

export const projects = [
  {
    title: "MyRecipe",
    category: "culture",
    description: "A recipe platform for creating and sharing recipes.",
    tech: ["Python", "Django", "HTML"],
    github: "https://github.com/sele01/MyRecipes",
    status: "complete",
  },
  {
    title: "RemoteSystem Controller",
    category: "opensource",
    description: "Remotely control and monitor computer performance.",
    tech: ["Java"],
    github: "https://github.com/sele01/RemoteSystemMonitor",
    status: "complete",
  },
  {
    title: "TeachMeET",
    category: "education",
    description:
      "AI-powered learning platform designed to transform education in Africa.",
    tech: ["Planning", "AI", "Mobile"],
    github: "https://github.com/sele01/TeachMeET",
    status: "upcoming",
  },
  {
    title: "EthioTrip",
    category: "culture",
    description: "Tour management platform for Ethiopian tourism.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    github: "https://github.com/sele01/ethiotrip",
    status: "complete",
  },
  {
    title: "Ttyper",
    category: "opensource",
    description: "Terminal-based typing speed test for developers.",
    tech: ["Python", "curses", "CLI"],
    github: "https://github.com/sele01/ttyper",
    status: "complete",
  },
  {
    title: "Bofe",
    category: "ecommerce",
    description: "E-commerce platform for modern online shopping.",
    tech: ["In Development"],
    github: "https://github.com/sele01/Bofe",
    status: "development",
  },
];
