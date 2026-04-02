export interface VerseLine {
  line1: string;
  line2: string;
}

export interface Section {
  type: 'doha' | 'chaupai';
  label: string;
  verses: VerseLine[];
}

export interface Chalisa {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  language: string;
  sections: Section[];
  ending: string[];
}
