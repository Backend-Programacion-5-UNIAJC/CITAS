export type Role = 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';

export interface AuthUser {
  id: number;
  role: Role; 
}
export interface RegisterInput {
 name: string;
 email: string;
 password: string;
}