export interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  password: string | null;
  image: string | null;
  averageRating: number;
  token: string | null;
  books: Book[];
  ratings: number[];
}

interface Book {
  id: number;
  title: string;
  condition: string;
  description: string;
  availability: string;
  category: string;
  images: string[];
  imageUrls: string[];
  userId: number;
  userName: string;
  phoneNumber: string | null;
}
