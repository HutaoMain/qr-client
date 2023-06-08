import { create } from "zustand";

interface AuthStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem("school-event-user") || null,
  setUser: (user) => {
    localStorage.setItem("school-event-user", user);
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("school-event-user");
    set({ user: null });
  },
}));

export default useAuthStore;
