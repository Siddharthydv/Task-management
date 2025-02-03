"use client"
import { useEffect } from "react";
import axios from "axios";
import { signIn, signOut,useSession } from "next-auth/react"
import { useStore } from "../utils/zustandStore";
import { useQuery } from "@tanstack/react-query";
export const Appbar = () => {
      const session =useSession();
      const sessionData=session?.data as {user:{name:string,email:string,id:string} }| null;
      const setUserCredentials=useStore((state)=> state.setUserCredentials);
      const{setUserData}=useStore();
      const {userInfo}=useStore();
      useEffect(()=>{
        async function initializeData(){
          if(sessionData){
              setUserCredentials({username:sessionData?.user?.name,email:sessionData?.user?.email,id:sessionData?.user?.id});
              // const categories=await axios.get('/api/protected/categories',{withCredentials:true}).then(res=>res.data);
              // const tasks=await axios.get('/api/protected/task',{withCredentials:true}).then(res=>res.data);
              // const projects=await axios.get('/api/protected/projects',{withCredentials:true}).then(res=>res.data);
              // setUserData({tasks:tasks,projects:projects,categories:categories})
          }
        }
        initializeData();
        // console.log(sessionData?.user)
      },[sessionData])
      
     
    
      // Fetch categories
      const { data: categories, isLoading: loadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
          const res = await axios.get("/api/protected/categories", { withCredentials: true });
          return res.data;
        },
      });
    
      // // Fetch tasks
      const { data: tasks, isLoading: loadingTasks } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
          const res = await axios.get("/api/protected/task", { withCredentials: true });
          return res.data;
        },
      });
    
      // // Fetch projects
      const { data: projects, isLoading: loadingProjects } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
          const res = await axios.get("/api/protected/projects", { withCredentials: true });
          return res.data;
        },
      });
      useEffect(() => {
        if (categories && tasks && projects) {
          setUserData({ tasks, projects, categories });
        }
      }, [categories, tasks, projects, setUserData]); 
    
      
      return (
        <div>
          {loadingCategories  || loadingProjects  || loadingTasks?(
            <p>Loading...</p>
          ) : (
            <div>
              userinfo={JSON.stringify(userInfo)}
              {/* <p>Categories: {JSON.stringify(categories)}</p> */}
              <p>Tasks: {JSON.stringify(tasks)}</p>
              {/* <p>Projects: {JSON.stringify(projects)}</p> */}
            </div>
          )}
        </div>
      );
    }
    
     
      
//     return <div >
//       {!sessionData && <button onClick={() => signIn()}>Signin</button>}
//       {sessionData && <button onClick={() => signOut()}>Sign out</button>}
//       {/* {JSON.stringify(session)} */}
//       userInfo={JSON.stringify(userInfo)}
//       categories={JSON.stringify(categories)}
//     </div>
// }