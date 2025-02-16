"use client";
import { ReactNode, useEffect } from "react";

import { useSession } from "next-auth/react";
import { useStore } from "../utils/zustandStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Sidebar from "../components/SideBar";

//
export default function Layout({ children }: { children: ReactNode }) {
  const session = useSession();
  const sessionData = session?.data as {
    user: { name: string; email: string; id: string };
  } | null;
  const setUserCredentials = useStore((state) => state.setUserCredentials);
  const { setUserData } = useStore();
  useEffect(() => {
    async function initializeData() {
      if (sessionData) {
        setUserCredentials({
          username: sessionData?.user?.name,
          email: sessionData?.user?.email,
          id: sessionData?.user?.id,
        });
      }
    }
    initializeData();
    // const { setUser } = useStore();
  }, [sessionData, setUserCredentials]);

  // Fetch categories
  const { data: categories,  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/protected/categories", {
          withCredentials: true,
        });
        return res.data;
      } catch (error) {
        alert(error);
      }
    },
  });

  // // Fetch tasks
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/protected/task", {
          withCredentials: true,
        });
        return res.data;
      } catch (error) {
        alert(error);
      }
    },
  });

  // // Fetch projects
  const { data: projects} = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/protected/projects", {
          withCredentials: true,
        });
        return res.data;
      } catch (error) {
        alert(error);
      }
    },
  });

  //setuserData in zustand store if all the tasks categories and projects are available
  useEffect(() => {
    if (categories && tasks && projects) {
      setUserData({ tasks, projects, categories });
    }
  }, [categories, tasks, projects, setUserData]);

  return (
    <div className="p bborder h-screen  border-red-600">
      <div className="flex h-full overflow-hidden border rounded-md space-x-10   border-green-600">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
