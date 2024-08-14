import { Book } from "./Book";
import { User } from "./User";

// Define the state interface for posts
export interface BookState {
  posts: Book[];
  // userPosts: User;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
