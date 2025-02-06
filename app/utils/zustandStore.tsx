import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserInfo {
  username: string;
  email: string;
  id: string;
  tasks: any[];
  projects: any[];
  categories: any[];
}

interface StoreStateType {
  userInfo: UserInfo;
  setUserCredentials: (user: {
    username: string;
    email: string;
    id: string;
  }) => void;
  setUserData: (data: {
    tasks: any[];
    projects: any[];
    categories: any[];
  }) => void;
  reset: () => void;
}

export const useStore = create<StoreStateType>()(
  persist(
    (set) => ({
      userInfo: {
        username: "",
        email: "",
        id: "",
        tasks: [],
        projects: [],
        categories: [],
      },
      setUserCredentials: ({ username, email, id }) =>
        set((state) => ({
          userInfo: { ...state.userInfo, username, email, id },
        })),
      setUserData: ({ tasks, projects, categories }) =>
        set((state) => ({
          userInfo: { ...state.userInfo, tasks, projects, categories },
        })),
      reset: () =>
        set({
          userInfo: {
            username: "",
            email: "",
            id: "",
            tasks: [],
            projects: [],
            categories: [],
          },
        }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage), // ✅ Fixed
    },
  ),
);
