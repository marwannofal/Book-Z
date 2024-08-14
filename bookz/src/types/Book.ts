interface ImageObject {
  url: string;
  id: string;
}
export interface Book {
  id: number;
  title: string;
  condition: string;
  description: string;
  availability: string;
  category: string;
  images: ImageObject[];
  imageUrls: string[];
  userId: number;
  userName: string;
  phoneNumber: string | null;
}
