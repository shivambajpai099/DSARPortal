import { request } from "./requestQueue.interface";
export interface PageData {
  content: request[];
  totalElements?: number; //?indicates it is optional
  totalPages?: number;
  numberOfElements?: number;
  size?: number;
  number?: number;
  [propName: string]: any; //for any other additional properties
}
