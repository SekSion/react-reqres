export interface IRegister {
    email:string;
    password:string;
}

export interface IRegisterResponse {
    id:number;
    token:string;
}