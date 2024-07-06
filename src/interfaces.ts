// src/interfaces.ts

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export interface Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
  }
  
  export interface SubDepartment {
    id: number;
    name: string;
  }