export enum StatusEnum {
  Interested = 'interested',
  Using = 'using',
  Purchased = 'purchased',
  Storage = 'storage'
}

export interface Keyboard {
  name: string;
  id: string;
  thumbnail_public_id: string
  status: StatusEnum
}

export interface Keycap {
  name: string;
  id: string;
  thumbnail_public_id: string;
  status: StatusEnum
}
  
export enum GridGalleryVariant {
  Keyboards = 'keyboards',
  Keycaps =  'keycaps'
}

export enum VariantEnum {
  Default = "default",
  Twitch = "twitch",
}
