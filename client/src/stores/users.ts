import { api } from "./session";



export function getUsers() {
  return api<ListEnvelope<User>>('users');
}

export function getUser(id: string) {
  return api<User>(`users/${id}`)
}

export function addUser(user: User) {
    return api<User>(`users`, user);
}

export function updateUser(id: string, user: User) {
    return api<User>(`Users/${id}`, user, 'PATCH');
}

export function deleteUser(id: string) {
    return api<{deletedCount:boolean}>(`users/${id}`,{}, 'DELETE');
}

export interface ListEnvelope<T> {
    users: T[]
    total: number
    skip: number
    limit: number

  }
  
  export interface User {
    _id: string
    email: string
    name: string
    gender: string
    description: string
    thumbnail: string
    images: string[]
  }