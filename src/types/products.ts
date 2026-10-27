import { ImageProps } from "next/image";

export interface TProducts {
  id: string;
  image: ImageProps["src"];
  imageAlt: string;
  category: string;
  title: string;
  price: number | string;
  originalPrice?: number | string;
  rating?: number;
  href?: string;
  badge?: string;
  soldCount?: number;
  stockCount?: number;
  initialFavorite?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
}