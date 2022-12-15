import { api } from "./session";



export function getUsers() {
  return api<ListEnvelope<User>>('users');
}

export function getUser(email: string) {
  return api<User>(`users/${email}`)
}

export function addUser(user: User) {
    return api<User>(`users`, user);
}

export function updateUser(email: string, user: User) {
    return api<User>(`Users/${email}`, user, 'PATCH');
}

export function deleteUser(email: string) {
    return api<{deletedCount:boolean}>(`users/${email}`,{}, 'DELETE');
}

export interface ListEnvelope<T> {
    users: T[]

  }
  
  export interface User {
    _email: string
    email: string
    name: string
    gender: string
    description: string
    thumbnail: string
    images: string[]
  }