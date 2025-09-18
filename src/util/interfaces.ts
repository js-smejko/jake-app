export interface ImageProps {
  src: string;
  alt: string;
  caption?: string | boolean;
}

export interface FloatImageProps extends ImageProps {
  float?: 'left' | 'right';
};