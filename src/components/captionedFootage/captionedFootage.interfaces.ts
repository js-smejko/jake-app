export interface ImageProps {
  src: string;
  alt: string;
  caption?: string | boolean;
}

export interface CaptionedFloatFootageProps {
  alt?: string;
  caption?: string | boolean;
  float?: 'left' | 'right';
  children: React.ReactNode;
}