export type BackgroundMedia =
  | {
      id: string;
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      id: string;
      type: "video";
      src: string;
      poster?: string;
    };

export interface SkillItem {
  label: string;
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "destructive"
    | "outline";
}

export interface SocialLinkItem {
  platform: "github" | "instagram" | "phone" | "email" | "Linkedin" | "whatsapp" | string;
  label: string;
  href: string;
  target?: string;
}

export interface NavItem {
  to: string;
  label: string;
  icon: "User" | "GraduationCap" | "BriefcaseBusiness" | "FolderGit2" | string;
  exact?: boolean;
}

export interface ContactInfoItem {
  icon:
    | "Mail"
    | "Phone"
    | "MapPin"
    | "Clock"
    | "Globe"
    | "Linkedin"
    | "Github"
    | string;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  formspreeFormId?: string;
  details: ContactInfoItem[];
}

export interface LetterFxConfig {
  words: string[];
  intervalMs?: number;
  speed?: "fast" | "medium" | "slow";
}

export interface ResumeConfig {
  label?: string;
  href: string;
  download?: boolean | string;
}

export interface IntroConfig {
  description: string;
  typingPhrases: string[];
  letterFx: LetterFxConfig;
}

export interface AvatarConfig {
  src: string;
  alt: string;
  fallback: string;
}

export interface StudyItem {
  id: string;
  course: string;
  institution: string;
  university?: string;
  location?: string;
  timeframe: string;
  description?: string;
  status?: "completed" | "current" | "upcoming";
}

export interface CertificationImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuedBy: string;
  issuedOn: string;
  expiresOn?: string;
  description: string;
  link?: string;
  verifyAt?: string;
  pdf?: string;
  images?: CertificationImage[];
  glowColor?: "cyan" | "purple" | "blue" | "pink" | "green";
}

export interface EducationConfig {
  title: string;
  description?: string;
  studies: StudyItem[];
  certifications: CertificationItem[];
}

export interface WorkImage {
  src: string;
  alt: string;
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  role: string;
  timeframe: string;
  location?: string;
  employmentType?: string;
  achievements: string[];
  technologies?: string[];
  images?: WorkImage[];
  status?: "completed" | "current" | "upcoming";
}

export interface WorkConfig {
  title: string;
  subtitle?: string;
  startDate?: string;
  experiences: WorkExperienceItem[];
}

export interface ProjectImage {
  src: string;
  alt?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  publishedAt?: string;
  image?: string;
  images?: ProjectImage[];
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  glowColor?: "cyan" | "purple" | "blue" | "pink" | "green";
  featured?: boolean;
}

export interface ProjectsConfig {
  title: string;
  subtitle?: string;
  projects: ProjectItem[];
}

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string[];
}

export interface SeoConfig {
  baseUrl: string;
  siteName: string;
  author: string;
  locale: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImage: string;
  twitterHandle?: string;
  googleAnalyticsId?: string;
  robots: {
    index: boolean;
    follow: boolean;
    googleBot?: string;
  };
  pages: {
    home: PageSeoConfig;
    projects: PageSeoConfig;
    education: PageSeoConfig;
    work: PageSeoConfig;
  };
}

export interface AppConfig {
  profile: {
    name: string;
    title: string;
    avatar: AvatarConfig;
    avatar2?: AvatarConfig;
    resume?: ResumeConfig;
    skills: SkillItem[];
    socialLinks: SocialLinkItem[];
  };
  intro: IntroConfig;
  education: EducationConfig;
  work: WorkConfig;
  projects: ProjectsConfig;
  contact: ContactConfig;
  seo: SeoConfig;
  navItems: NavItem[];
  backgrounds: BackgroundMedia[];
  backgroundSettings: {
    imageIntervalMs: number;
    videoIntervalMs: number;
    blurAmount: number;
    autoRotate: boolean;
  };
}
