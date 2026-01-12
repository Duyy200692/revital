
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'coffee' | 'tea' | 'signature' | 'pastry';
  image: string;
  popular?: boolean;
}

export interface SignatureItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  price: string;
}

export interface MenuItem {
  label: string;
  href: string;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}

export interface CampaignStat {
  label: string;
  value: string;
}

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  colorTheme: string;
  stats: CampaignStat[];
  origin: string;
}