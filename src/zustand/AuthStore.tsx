import { create } from "zustand";

interface AuthStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem("groceryUser") || null,
  setUser: (user) => {
    localStorage.setItem("groceryUser", user);
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("groceryUser");
    set({ user: null });
  },
}));

export default useAuthStore;
