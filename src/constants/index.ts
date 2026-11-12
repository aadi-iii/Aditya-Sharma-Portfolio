// contains all constants to be used throughout the project
import {
  css,
  git,
  github,
  html,
  javascript,
  nodejs,
  react,
  tailwindcss,
  python,
  java,
  c,
  fastapi,
  firebase,
  blood,
  dashboard,
  hospital,
  robot,
  universe,
  heart,
  summiz,
  amity,
  ewb,
} from "../assets/icons";

export type SidebarLink = {
  route: string;
  label: string;
};

export type SkillType =
  | "Programming Language"
  | "Frontend"
  | "Backend"
  | "Database & Cloud"
  | "Tools & Platforms";

export type Skill = {
  imageUrl: string;
  name: string;
  type: SkillType;
};

export type ExtraLinks = {
  source_code: string;
  linkedin: string;
  email: string;
  resume: string;
  location: string;
  tagline: string;
  title: string;
};

export type Experience = {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
};

export type Project = {
  iconUrl: string;
  theme: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  link: string;
  linkText?: string;
};

// sidebar links
export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    route: "/about",
    label: "About",
  },
  {
    route: "/projects",
    label: "Projects",
  },
  {
    route: "/contact",
    label: "Contact",
  },
];

// site name
export const SITE_NAME = "Aditya Sharma";

// extra links & profile info
export const EXTRA_LINKS: ExtraLinks = {
  source_code: "https://github.com/aadi-iii",
  linkedin: "https://www.linkedin.com/in/aditya-sharma-624177355/",
  email: "adityaa.sharma.mail@gmail.com",
  resume: "https://aadi-iii.github.io/Aditya-Sharma-Resume/",
  location: "Ghaziabad, Uttar Pradesh, India",
  tagline: "Building Digital Experiences Through Code & Creativity.",
  title: "Aspiring Full-Stack Web Developer | Computer Science Engineering Student",
};

// skills
export const SKILLS: Skill[] = [
  // Programming Languages
  {
    imageUrl: python,
    name: "Python",
    type: "Programming Language",
  },
  {
    imageUrl: java,
    name: "Java",
    type: "Programming Language",
  },
  {
    imageUrl: c,
    name: "C",
    type: "Programming Language",
  },
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Programming Language",
  },
  // Frontend Development
  {
    imageUrl: html,
    name: "HTML5",
    type: "Frontend",
  },
  {
    imageUrl: css,
    name: "CSS3",
    type: "Frontend",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  // Backend Development
  {
    imageUrl: fastapi,
    name: "FastAPI",
    type: "Backend",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },
  // Database & Cloud
  {
    imageUrl: firebase,
    name: "Firebase & Firestore",
    type: "Database & Cloud",
  },
  // Tools & Platforms
  {
    imageUrl: git,
    name: "Git",
    type: "Tools & Platforms",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Tools & Platforms",
  },
];

// experiences & education journey
export const EXPERIENCES: Experience[] = [
  {
    title: "JavaScript Developer Intern",
    company_name: "EWB Edutech",
    icon: ewb,
    iconBg: "#bae6fd",
    date: "Internship",
    points: [
      "Engineered an Interactive Product Inventory & Analytics Dashboard using core JavaScript, HTML5, and CSS3.",
      "Implemented dynamic product categorization, live search filtering, tax calculations, and real-time financial metrics.",
      "Strengthened frontend state management, DOM manipulation, modular JavaScript structure, and responsive UI performance.",
    ],
  },
  {
    title: "Diploma in Computer Science Engineering",
    company_name: "Amity University",
    icon: amity,
    iconBg: "#fef08a",
    date: "2024 – 2027",
    points: [
      "Pursuing diploma with strong foundational coursework in C, Java, Python, and Object-Oriented Programming.",
      "Focused on Full-Stack Web Development, REST API integration, cloud-connected apps, and database systems.",
      "Collaborating on multidisciplinary engineering prototypes and continuously exploring modern web technologies.",
    ],
  },
  {
    title: "Full-Stack Project Lead & Developer",
    company_name: "One Drop Platform",
    icon: blood,
    iconBg: "#fecaca",
    date: "Featured Project",
    points: [
      "Architected and deployed a live blood donation network connecting donors and recipients based on blood group, location, and availability.",
      "Integrated Firebase Authentication, Cloud Firestore real-time queries, QR code verification, and client-side PDF document generation.",
      "Designed seamless responsive workflows for both donors and seekers with cross-platform compatibility.",
    ],
  },
  {
    title: "IoT & Robotics Prototype Member",
    company_name: "Spider Robot Project",
    icon: robot,
    iconBg: "#fed7aa",
    date: "Robotics Prototype",
    points: [
      "Collaborated in a team to build a multi-legged spider-inspired robotic prototype utilizing servo motors.",
      "Implemented locomotion control algorithms using an Arduino Nano as the core controller.",
      "Demonstrated practical hardware-software integration, power management, and mechanical synchronization.",
    ],
  },
];

// projects
export const PROJECTS: Project[] = [
  {
    iconUrl: blood,
    theme: "btn-back-red",
    name: "One Drop",
    category: "Full-Stack Web Application",
    description:
      "A life-saving blood donation platform connecting donors and recipients through blood group, location, and availability-based matching. Features Firebase authentication, Cloud Firestore database, dynamic QR code functionality, and PDF report generation.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Firebase Auth", "Cloud Firestore"],
    link: "https://1drop4u.online/",
    linkText: "Live Demo",
  },
  {
    iconUrl: dashboard,
    theme: "btn-back-blue",
    name: "Product Inventory & Analytics Dashboard",
    category: "JavaScript Development | Internship Project",
    description:
      "An interactive inventory management dashboard developed during the EWB Edutech internship. Implements dynamic product categorization, real-time inventory search, tax calculations, and financial statistics using core JavaScript concepts.",
    technologies: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation", "Data Analytics"],
    link: "https://aadi-iii.github.io/Interactive-Product-Inventory-Analytics-Dashboard/",
    linkText: "Live Demo",
  },
  {
    iconUrl: hospital,
    theme: "btn-back-green",
    name: "City Care Hospital",
    category: "Frontend Web Application",
    description:
      "A modern hospital management system frontend featuring a clean, responsive user interface and structured healthcare-related web pages. Designed and developed independently with focus on UX clarity.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    link: "https://aadi-iii.github.io/city-care-hospital-new/",
    linkText: "Live Demo",
  },
  {
    iconUrl: universe,
    theme: "btn-back-black",
    name: "Adiverse",
    category: "College Productivity & Learning Platform",
    description:
      "A college-focused learning platform concept designed to help students organize notes, learning resources, academic tasks, and study progress through an engaging, interactive knowledge-universe experience.",
    technologies: ["Concept & UI", "Web Development", "Student Productivity"],
    link: "https://github.com/aadi-iii",
    linkText: "GitHub / Concept",
  },
  {
    iconUrl: heart,
    theme: "btn-back-pink",
    name: "Love Calculator",
    category: "Interactive Web Application",
    description:
      "An interactive web application inspired by classic compatibility calculators, featuring an intuitive, vibrant user interface and dynamic JavaScript calculation algorithms.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Interactive UI"],
    link: "https://aadi-iii.github.io/Love-Calculator/",
    linkText: "Live Demo",
  },
  {
    iconUrl: summiz,
    theme: "btn-back-yellow",
    name: "Toxic Match",
    category: "Interactive Web Application",
    description:
      "A fun and engaging interactive web project built with vanilla JavaScript, HTML, and CSS, focusing on creative user interaction, state handling, and entertaining frontend experiences.",
    technologies: ["Vanilla JavaScript", "HTML5", "CSS3"],
    link: "https://aadi-iii.github.io/toxic-match/",
    linkText: "Live Demo",
  },
  {
    iconUrl: robot,
    theme: "btn-back-orange",
    name: "Spider Robot",
    category: "IoT / Robotics Project",
    description:
      "A team-built spider-inspired robotic prototype using a multi-legged mechanism controlled by servo motors. The project uses an Arduino Nano microcontroller for locomotion coordination.",
    technologies: ["Arduino Nano", "Servo Motors", "Robotics", "C/C++"],
    link: "https://github.com/aadi-iii",
    linkText: "Prototype Details",
  },
];
