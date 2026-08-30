import { env } from "@/env";
import type { AppConfig } from "./app-config.d";
export type * from "./app-config.d";

export const appConfig: AppConfig = {
  profile: {
    name: "Charan Teja Yandrapati",
    title: "Web Application Developer",
    avatar: {
      src: "/images/charanteja-yandrapati.jpeg",
      alt: "Charanteja Yandrapati",
      fallback: "CY",
    },
    avatar2: {
      src: "/images/charanteja-yandrapati-2.webp",
      alt: "Charanteja Yandrapati",
      fallback: "CY",
    },
    skills: [
      { label: "React", variant: "primary" },
      { label: "NodeJS", variant: "success" },
      { label: "TypeScript", variant: "primary" },
      { label: "TanStack", variant: "success" },
      { label: "Tailwind CSS", variant: "outline" },
    ],
    socialLinks: [
      {
        platform: "github",
        label: "GitHub",
        href: "https://github.com/charan379",
        target: "_blank",
      },
      {
        platform: "Linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/charanteja-yandrapati/",
        target: "_blank",
      },
      {
        platform: "whatsapp",
        label: "WhatsApp",
        href: "https://wa.me/919502116185",
        target: "_blank",
      },
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/charanteja_yandrapati/",
        target: "_blank",
      },
      {
        platform: "phone",
        label: "Phone",
        href: "tel:+919502116185",
      },
      {
        platform: "email",
        label: "Email",
        href: "mailto:yandrapaticharanteja@gmail.com",
      },
    ],
    resume: {
      label: "Download CV",
      href: "/resume/Charanteja_yandrapati_resume.pdf",
      download: true,
    },
  },
  intro: {
    description:
      "Passionate Web Application Developer with expertise in building responsive, high-performance, and visually captivating modern web applications using React, TypeScript, TanStack, and modern design systems.",
    typingPhrases: [
      "Hi there! 👋",
      "I'm Charan Teja Yandrapati.",
      "Crafting interactive web experiences.",
      "Let's build something awesome!",
    ],
    letterFx: {
      words: [
        "Charan Teja .Y",
        "Web Application Dev.",
        "Creative Web & UI Designer.",
      ],
      intervalMs: 5000,
      speed: "medium",
    },
  },
  education: {
    title: "Education & Certifications",
    description:
      "Academic qualifications, degrees, and professional certifications.",
    studies: [
      {
        id: "MBA",
        course: "Master of Business Administration (MBA)",
        institution: "Kirshna Chaithanya institute of Management",
        university: "Vikrama Simhapuri University",
        location: "Nellore, Andhra Pradesh, India",
        timeframe: "2019 - 2021",
        description: "Studied Master of Business Administration (MBA).",
      },
      {
        id: "BSC",
        course: "Bachelor of Computer Science (B.sc)",
        institution: "Kirshna Chaithanya Degree & P.G College",
        university: "Vikrama Simhapuri University",
        location: "Nellore, Andhra Pradesh, India",
        timeframe: "2016 - 2019",
        description: "Studied Bachelor of Computer Science (Bsc. Computers).",
      },
      {
        id: "MPC",
        course: "Intermediete (M.P.C)",
        institution: "Sri Chaithanya Junior College",
        university: "Board of Intermediate Education, Andhra Pradesh (BIEAP)",
        location: "Nellore, Andhra Pradesh, India",
        timeframe: "2014 - 2016",
        description:
          "Studied Intermediate (M.P.C - Mathematics, Physics, Chemistry).",
      },
      {
        id: "SSC",
        course: "SSC, 10th Class",
        institution: "Sri Vani English Medium High School",
        university: "Board of Secondary Education, Andhra Pradesh (BSEAP)",
        location: "Nellore, Andhra Pradesh, India",
        timeframe: "2014",
        description:
          "Completed Secondary School Certificate Education (SSC, 10th Class).",
      },
    ],
    certifications: [
      {
        id: "github-foundations",
        title: "GitHub Foundations",
        issuedBy: "GitHub",
        issuedOn: "27 March 2025",
        description:
          "Mastered version control and collaborative development workflows using GitHub. Gained expertise in repository management, branching strategies, pull requests, and effective collaboration practices essential for modern software development.",
        link: "https://www.credly.com/go/76khDDRL",
        verifyAt: "https://www.credly.com/go/76khDDRL",
        images: [
          {
            src: "/images/certifications/GitHubFoundations_Badge20250326-27-4gp210_page-0001.jpg",
            alt: "GitHub Foundations Badge",
          },
        ],
        glowColor: "purple",
      },
      {
        id: "azure-fundamentals",
        title: "Microsoft Certified: Azure Fundamentals",
        issuedBy: "Microsoft",
        issuedOn: "27 December 2024",
        description:
          "Acquired a solid foundation in cloud computing principles and Azure services. Developed skills in deploying and managing cloud resources, understanding security, compliance, and pricing models, essential for cloud-based application development.",
        link: "https://learn.microsoft.com/api/credentials/share/en-us/CharantejaYandrapati-5235/200C2E7091A77732?sharingId=8D9B97F8B5A21660",
        verifyAt:
          "https://learn.microsoft.com/api/credentials/share/en-us/CharantejaYandrapati-5235/200C2E7091A77732?sharingId=8D9B97F8B5A21660",
        images: [
          {
            src: "/images/certifications/Credentials-azure-fundamentals.jpg",
            alt: "Microsoft Certified: Azure Fundamentals",
          },
        ],
        glowColor: "blue",
      },
      {
        id: "m365-fundamentals",
        title: "Microsoft Certified: M365 Fundamentals",
        issuedBy: "Microsoft",
        issuedOn: "18 June 2024",
        description:
          "Gained foundational knowledge of Azure Active Directory (Entra ID) and SSO authentication. Applied this understanding to implement SSO login for a Node.js API product, enhancing secure access management and integrating with Microsoft's identity platform.",
        link: "https://learn.microsoft.com/api/credentials/share/en-us/CharantejaYandrapati-5235/3C46F377408D55CF?sharingId=8D9B97F8B5A21660",
        verifyAt:
          "https://learn.microsoft.com/api/credentials/share/en-us/CharantejaYandrapati-5235/3C46F377408D55CF?sharingId=8D9B97F8B5A21660",
        images: [
          {
            src: "/images/certifications/Credentials-m365-fundamentals.jpg",
            alt: "Microsoft Certified: M365 Fundamentals",
          },
        ],
        glowColor: "cyan",
      },
      {
        id: "mongodb-si-associate",
        title: "SI Associate Certification (MongoDB)",
        issuedBy: "MongoDB",
        issuedOn: "24 April 2024",
        description:
          "Validated expertise in MongoDB database management as a System Integrator, including schema design, CRUD operations, indexing, and aggregation. Acquired practical skills in performance optimization, data modeling, and efficient handling of NoSQL data structures.",
        link: "https://learn.mongodb.com/c/zBE6va5AQSqKbLiRD0ZKEg",
        verifyAt: "https://learn.mongodb.com/c/zBE6va5AQSqKbLiRD0ZKEg",
        images: [
          {
            src: "/images/certifications/charanteja-yandrapati-cc113abd-ae40-412a-8a6c-b8910f464a12-certificate_page-0001.jpg",
            alt: "MongoDB SI Associate Certification",
          },
        ],
        glowColor: "green",
      },
    ],
  },
  work: {
    title: "Work Experience",
    subtitle: "Career history, leadership roles, and technical achievements.",
    startDate: "2022-05-01",
    experiences: [
      {
        id: "cognizant-cts",
        company: "Cognizant (CTS)",
        role: "Tech Lead",
        timeframe: "March 2026 - Present",
        location: "Bangalore, Karnataka, India",
        employmentType: "Full-time",
        status: "current",
        achievements: [
          "Architected scalable frontend solutions for an enterprise AI Automation Platform integrated with ServiceNow, streamlining ITSM incident resolution.",
          "Engineered high-performance web applications using React, TypeScript, and the TanStack Ecosystem (Query, Table, Router).",
          "Optimized enterprise data grids and SLA dashboards with TanStack Table, implementing virtualization, multi-column filtering, and pagination.",
          "Implemented asynchronous data caching, background polling, and optimistic UI mutations using TanStack Query for real-time ticket state management.",
          "Enforced code quality through technical code reviews, strict ESLint rules, SonarQube static analysis, Vitest unit testing.",
        ],
        technologies: [
          "React",
          "TypeScript",
          "TanStack Query",
          "TanStack Table",
          "TanStack Router",
          "ServiceNow",
          "Azure DevOps",
          "SonarQube",
          "Vitest",
        ],
      },
      {
        id: "hinduja-tech",
        company: "Hinduja Tech Limited",
        role: "Software Developer",
        timeframe: "July 2025 - March 2026",
        location: "Chennai, Tamil Nadu, India",
        employmentType: "Full-time",
        achievements: [
          "Developed a real-time Vehicle Metrics Application for IoT fleet management, monitoring telematics, GPS location, and battery diagnostics.",
          "Integrated RESTful APIs and WebSockets with React Google Maps and Recharts to deliver live telemetry visual dashboards.",
          "Optimized application responsiveness and cross-device performance utilizing React Context, Redux, and TanStack Table/Query.",
          "Established automated testing and static code analysis standards using ESLint, SonarQube, and Jest within Agile/Scrum sprints.",
        ],
        technologies: [
          "React",
          "TypeScript",
          "WebSocket",
          "Google Maps API",
          "Recharts",
          "Redux",
          "Material-UI",
          "Jest",
        ],
      },
      {
        id: "infosys",
        company: "Infosys",
        role: "Senior Systems Associate",
        timeframe: "May 2022 - July 2025",
        location: "Chennai, Tamil Nadu, India",
        employmentType: "Full-time",
        achievements: [
          "Engineered scalable microservices using Node.js, Express.js, and MongoDB, developing secure RESTful APIs for enterprise integration.",
          "Implemented enterprise identity management and authentication workflows using Azure AD OAuth 2.0 / Entra ID and SSO.",
          "Built responsive UI features in React.js with Redux and Context API for modular state management and seamless user experiences.",
          "Streamlined automated CI/CD deployment pipelines using Jenkins and Azure DevOps to ensure rapid and reliable production rollouts.",
        ],
        technologies: [
          "React",
          "Node.js",
          "MongoDB",
          "Azure AD OAuth 2.0",
          "Express.js",
          "Jenkins",
          "Azure DevOps",
        ],
        images: [
          {
            src: "/images/work/infosys-operations-executive/infosys-icon.jpg",
            alt: "Infosys",
          },
          {
            src: "/images/work/infosys-operations-executive/Microsoft_Azure-Logo.wine.png",
            alt: "Microsoft Azure",
          },
          {
            src: "/images/work/infosys-operations-executive/servicenow.webp",
            alt: "ServiceNow",
          },
        ],
      },
      {
        id: "non-it-sales",
        company: "NON - IT | Sales and Services",
        role: "Back Office Executive | Off Role | Part Time",
        timeframe: "Jan 2021 - July 2022",
        location: "Nellore, Andhra Pradesh, India",
        employmentType: "Part-time | Off Role",
        achievements: [
          "Managed end-to-end customer service operations and CRM data workflows utilizing Oracle Siebel CRM.",
          "Coordinated field service engineer dispatching and scheduling to ensure high SLA compliance and resolution efficiency.",
          "Delivered professional technical support coordination, strengthening client satisfaction and service retention.",
        ],
        technologies: [
          "Siebel CRM",
          "Customer Operations",
          "Service Scheduling",
        ],
        images: [
          {
            src: "/images/work/voltas-back-office-executive/voltas.webp",
            alt: "Voltas",
          },
          {
            src: "/images/work/voltas-back-office-executive/oracle-siebel-crm-software-1000x1000.webp",
            alt: "Oracle Siebel CRM",
          },
        ],
      },
    ],
  },
  projects: {
    title: "Projects",
    subtitle:
      "A showcase of web applications, developer utilities, and software engineering initiatives.",
    projects: [
      {
        id: "d-infra-international",
        title: "D Infra International - Building India. Trading Globally.",
        summary:
          "A modern enterprise web platform for D Infra International, an infrastructure, construction materials, and global commodity trading enterprise. Engineered with React 19, TypeScript, TanStack, and Tailwind CSS, featuring high-speed SEO optimization, interactive product catalogs, international trade inquiries, and responsive glassmorphic UI architecture.",
        publishedAt: "2026-08-01",
        image:
          "/images/projects/d-infra-international/hero-d-infra-internatioal.jpg",
        technologies: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Tanstack",
          "Google Work Space",
        ],
        liveUrl: "https://www.dinfrainternational.com/",
        glowColor: "green",
        featured: true,
      },
      {
        id: "cine-pulse",
        title: "Cine Pulse - TMDB based Movie & TV WatchList Manager",
        summary:
          "CinePulse is a modern, high-performance web application for managing personal movie and TV series watchlists, favorites, custom collections, and viewing history. Powered by **The Movie Database (TMDB) API v3/v4**, CinePulse features authentic TMDB OAuth login, auto-detected regional watch providers, season/episode browsers, and clean Apple Human Interface Guidelines design.",
        publishedAt: "2026-07-01",
        image: "/images/projects/cinepulse/cinepulse-home.jpg",
        technologies: [
          "React",
          "TypeScript",
          "TMDB API",
          "Tailwind CSS",
          "Tanstack",
        ],
        liveUrl: "https://cinepulse.charanteja.com/",
        glowColor: "pink",
        featured: true,
      },
      {
        id: "sahasra-hospitals",
        title: "Sahasra Hospitals - Heart & Mind Care Clinic",
        summary:
          "A comprehensive digital healthcare web platform for Sahasra Heart & Mind Care clinic in Nellore, specializing in Interventional Cardiology and Addiction Psychiatry. Built with Next.js, React, TypeScript, and Material UI (MUI), featuring responsive appointment booking workflows, doctor profiles, clinical services directory, and interactive contact channels.",
        publishedAt: "2025-07-01",
        image: "/images/projects/sahasra-hospitals/sahasra-health-home.jpg",
        technologies: [
          "Next.js",
          "React",
          "TypeScript",
          "Material UI",
          "Tailwind CSS",
          "Vercel",
        ],
        liveUrl: "https://sahasra-hospital-app.vercel.app/",
        glowColor: "green",
        featured: false,
      },
      {
        id: "safekeep-js",
        title: "SafeKeep JS - Encrypted Data & Password Vault",
        summary:
          "A secure password and confidential data manager built using React and NodeJS, featuring robust AES encryption, OAuth 2.0 social authentication, and category management for sensitive credentials.",
        publishedAt: "2025-05-18",
        image: "/images/projects/safekeepjs/dashboard.png",
        technologies: [
          "React",
          "Node.JS",
          "TypeScript",
          "PostgreSQL",
          "TypeORM",
          "Ant Design",
          "OAuth 2.0",
        ],
        liveUrl: "https://safekeepjs-web.onrender.com",
        githubUrl: "https://github.com/charan379/safekeep-js",
        glowColor: "purple",
        featured: true,
      },
      {
        id: "goodwill-foundation",
        title: "Good Will Foundation - Osmania Medical College",
        summary:
          "A modern, responsive, and accessible non-profit portfolio website built for the Good Will Foundation at Osmania Medical College to showcase organizational mission, milestones, gallery, and donation drives.",
        publishedAt: "2025-09-27",
        image: "/images/projects/goodwillfoundation/home.png",
        technologies: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Vite",
          "Vercel",
          "Tanstack",
        ],
        liveUrl: "https://goodwillfoundation.co.in/",
        glowColor: "cyan",
        featured: true,
      },
      {
        id: "typeorm-query-utils",
        title: "TypeORM Query Utils - Dynamic NPM Package",
        summary:
          "A lightweight, production-ready open-source NPM package offering dynamic query-building utilities for TypeORM repositories, including multi-operator filtering, sorting, and pagination.",
        publishedAt: "2025-03-20",
        image: "/images/projects/typeorm-query-utils/npm-home.png",
        technologies: [
          "TypeScript",
          "TypeORM",
          "PostgreSQL",
          "NodeJS",
          "Express.js",
          "NPM Package",
        ],
        liveUrl: "https://www.npmjs.com/package/@charan379/typeorm-query-utils",
        githubUrl: "https://github.com/charan379/typeorm-query-utils",
        glowColor: "blue",
        featured: true,
      },
      {
        id: "react4movies-moviebunkers",
        title: "React4Movies | MovieBunkers - MERN Platform",
        summary:
          "A full-stack movie discovery platform integrating TMDB API, streaming provider availability, trailer players, advanced multi-criteria filtering, and role-based access control.",
        publishedAt: "2024-02-28",
        image: "/images/projects/moviebunkers/website-ss.jpg",
        technologies: [
          "React",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Tailwind CSS",
          "TMDB API",
          "JWT",
        ],
        liveUrl: "https://moviebunkers01.netlify.app",
        glowColor: "pink",
      },
      {
        id: "voltas-nsa-automation",
        title: "Voltas NSA Expense Entry Bot - UiPath RPA",
        summary:
          "An enterprise RPA solution built using UiPath REFramework automating technician TA/DA allowance claim creation into CRM, cutting processing time by 67% and eliminating manual data entry errors.",
        publishedAt: "2023-01-10",
        image: "/images/projects/voltas-nsa-bot-uipath/Assistant.jpg",
        technologies: [
          "UiPath Studio",
          "REFramework",
          "RPA",
          "Excel Automation",
          "Oracle Siebel CRM",
        ],
        githubUrl:
          "https://github.com/charan379/VoltasNonStandardExpenseEntryBot",
        glowColor: "green",
      },
    ],
  },
  contact: {
    title: "",
    subtitle: "Feel free to reach out for collaborations or inquiries.",
    formspreeFormId: env.VITE_FORMSPREE_FORM_ID || "",
    details: [
      {
        icon: "Mail",
        label: "Email",
        value: "yandrapaticharanteja@gmail.com",
        href: "mailto:yandrapaticharanteja@gmail.com",
        copyable: true,
      },
      {
        icon: "Phone",
        label: "Phone",
        value: "+91 9502116185",
        href: "tel:+919502116185",
        copyable: true,
      },
      {
        icon: "MapPin",
        label: "Location",
        value: "Bangalore, India",
      },
      {
        icon: "Clock",
        label: "Timezone",
        value: "IST (UTC+5:30)",
      },
    ],
  },
  seo: {
    baseUrl: env.VITE_BASE_URL || "",
    siteName: "Charan Teja Yandrapati | Portfolio",
    author: "Charan Teja Yandrapati",
    locale: "en_US",
    defaultTitle:
      "Charan Teja Yandrapati | Tech Lead & Web Application Developer",
    titleTemplate: "%s | Charan Teja Yandrapati",
    defaultDescription:
      "Portfolio of Charan Teja Yandrapati - Tech Lead, Web Application Developer, and Full Stack Engineer building high-performance web applications, AI automation platforms, and distributed systems.",
    defaultKeywords: [
      "Charan Teja",
      "Charan Teja Yandrapati",
      "Tech Lead",
      "Web Application Developer",
      "Full Stack Developer",
      "React",
      "TypeScript",
      "TanStack",
      "Node.js",
      "Portfolio",
    ],
    ogImage: "/og",
    twitterHandle: "@charanteja",
    googleAnalyticsId: env.VITE_GA_MEASUREMENT_ID || "",
    robots: {
      index: true,
      follow: true,
      googleBot:
        "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    },
    pages: {
      home: {
        title: "Charan Teja Yandrapati | Tech Lead & Web Application Developer",
        description:
          "Passionate Web Application Developer with expertise in building responsive, high-performance, and visually captivating modern web applications using React, TypeScript, and TanStack.",
        keywords: [
          "Frontend Architecture",
          "React 19",
          "TypeScript",
          "TanStack Router",
          "UI Engineering",
        ],
      },
      projects: {
        title: "Featured Projects | Charan Teja",
        description:
          "Explore featured software engineering initiatives, open-source NPM packages, and full-stack web applications built by Charan Teja.",
        keywords: [
          "SafeKeep JS",
          "D Infra International",
          "Cine Pulse",
          "Good Will Foundation",
          "TypeORM Query Utils",
          "React4Movies",
          "UiPath RPA",
        ],
      },
      education: {
        title: "Education & Certifications | Charan Teja",
        description:
          "Academic degrees, university studies, and professional cloud & developer certifications earned by Charan Teja.",
        keywords: [
          "MBA",
          "B.Sc Computer Science",
          "Microsoft Certified",
          "MongoDB Certified",
          "GitHub Certified",
        ],
      },
      work: {
        title: "Work Experience & Career | Charan Teja",
        description:
          "Career timeline, leadership milestones, and technical achievements at Cognizant, Hinduja Tech, and Infosys.",
        keywords: [
          "Cognizant",
          "Tech Lead",
          "Hinduja Tech",
          "Infosys",
          "Career History",
          "Work Experience",
        ],
      },
    },
  },
  navItems: [
    {
      to: "/",
      label: "Intro",
      icon: "Home",
      exact: true,
    },
    {
      to: "/projects",
      label: "Projects",
      icon: "FolderGit2",
      exact: false,
    },
    {
      to: "/education",
      label: "Education",
      icon: "GraduationCap",
      exact: false,
    },
    {
      to: "/work",
      label: "Work",
      icon: "BriefcaseBusiness",
      exact: false,
    },
  ],
  backgrounds: [
    {
      id: "local-video-1",
      type: "video",
      src: "/vedios/video1.mp4",
      poster:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2564&auto=format&fit=crop",
    },
    {
      id: "flowers",
      type: "image",
      src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2564&auto=format&fit=crop",
      alt: "Flowers",
    },
    {
      id: "orange-mountains",
      type: "image",
      src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2564&auto=format&fit=crop",
      alt: "Orange Mountains",
    },
    {
      id: "gradient-flow",
      type: "image",
      src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
      alt: "Vibrant Gradient Glow",
    },
  ],
  backgroundSettings: {
    imageIntervalMs: 8000, // 8 seconds for images
    videoIntervalMs: 16000, // 16 seconds for videos
    blurAmount: 0,
    autoRotate: true,
  },
};
