export interface IProjectImage {
  url: string; // public URL served by Supabase Storage
  path: string; // storage key (bucket-relative), used when deleting
}

export interface IProject {
  id: string; // uuid
  name: string; // slug; also the storage folder
  title: string;
  subtitle: string;
  description: string; // HTML
  images: IProjectImage[];
  cover_url: string; // one of images[].url
  city: string;
  dateYear: string;
  dateMonth: string;
  sortOrder: number;
}

export interface ISiteSettings {
  fullName: string;
  roleLabel: string;
  heroIntro: string; // English intro paragraph
  aboutBio: string; // Persian about-me bio
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  avatarUrl: string;
  heroBgUrl: string;
  cvUrl: string;
}
