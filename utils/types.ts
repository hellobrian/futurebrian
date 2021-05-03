export interface Keyboard {
  name: string;
  id: string;
  thumbnail_public_id: string
}

export interface Keycap {
  name: string;
  id: string;
  thumbnail_public_id: string
}
  
export enum GridGalleryVariant {
  Keyboards = 'keyboards',
  Keycaps =  'keycaps'
}

export enum VariantEnum {
  Default = "default",
  Twitch = "twitch",
}
