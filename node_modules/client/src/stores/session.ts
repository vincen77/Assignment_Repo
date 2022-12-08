import myFetch from "@/services/myFetch";
import { computed, reactive } from "vue";
import router from "@/router";
import LoginBadgeVue from "@/components/LoginBadge.vue";

const session = reactive( {
    user: null as User | null,
    loading: 0,
    error: null as string | null,
    messages: [] as Message[],
});
export default session;

export function setError(error: string | null) {
    session.error = error;
    if(error){
        session.messages.push({ type: 'danger', text: error});
    }
}

export const isLoading = computed(() => !! session.loading);

export async function api<T>(url: string, data: any = null, method?: string ){
    session.loading++;
    setError(null);
    try {
        return await myFetch<T>(url, data, method);
    } catch (error:any) {
        setError(error.message ?? error as string);
        throw error;
    }finally{
        session.loading--;
    }
    return {} as T;
}
export function login(email: string, password: string) {
    session.user = {
        email,
        password,
    };
    router.push("/");
}

export function logout() {
    session.user = null;
    router.push("/");
}

export interface User {
    email: string;
    password?: string;
    picture?: string;
}

export interface Message {
    text: string;
    type: 'danger' | 'warning' | 'success' | 'info';
}