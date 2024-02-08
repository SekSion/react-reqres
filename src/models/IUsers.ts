export interface IUsers {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar?:string;
  }
  
  export interface IUserResponse {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    createdAt?: string; 
    updatedAt?: string; 
  }

  export interface IListResponse {
    data:Array<IUsers>;
    page:number;
    per_page:number;
    support: {
        text:string;
        url:string;
    }
    total:number;
    total_pages:number;
  }