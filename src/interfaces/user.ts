export default interface User {
  hcp: number | undefined;
  name: string | undefined;
  url: string | undefined;
  id: string | undefined;
  email: string | undefined | null;
}

export interface AuthState {
  user: {
    email: string | null | undefined;
    uid: string | undefined;
    error: any;
    admin: boolean;
    url: string | undefined;
    name: string | undefined;
    hcp: number | undefined;
    loading: boolean;
  };
}
export interface LoginData {
  email: string;
  password: string;
}

export interface Users {
  users: User[];
}
