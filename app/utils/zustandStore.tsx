"use client"
import { userInfo } from 'os'
import {create} from 'zustand'
type userInfoType={
username:string,
email:string,
id:string,
tasks:any[],
projects:any[],
categories:any[]
}

export interface storeStateType {
    userInfo: userInfoType;
    setUserCredentials: (data: { username: string; email: string; id: string }) => void;
    setUserData: (data: {tasks:any[],projects:any[],categories:any[]}) => void;

  }
  

export const useStore=create<storeStateType>((set)=>({
    userInfo:{username:"",email:"",id:"",tasks:[],projects:[],categories:[]},

    setUserCredentials: ({username,email,id}:{username:string,email:string,id:string})=> set((state:{userInfo:userInfoType})=>({userInfo:{...state.userInfo,username,email,id}})),
    setUserData:  ({tasks,projects,categories}:{tasks:any[],projects:any[],categories:any[]})=>set((state:{userInfo:userInfoType})=>({userInfo:{...state.userInfo,tasks,projects,categories}}))
}))