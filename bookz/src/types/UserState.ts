import { User } from "./User";

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface FetchUserState {
  fetchedUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
