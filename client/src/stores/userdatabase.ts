import { reactive, watch } from "vue";
import type { User } from "./users";
import session, { api } from "./session";

const PATCH = 'PATCH';

export interface UserSession {
    quantity: number;
    user: User;
}

const userdata = reactive([] as UserSession[]);

export function load() {
    api(`userdata/${session.user?.email}`).then((data) => {
        userdata.splice(0, userdata.length, ...data as UserSession[]);
    });
}
watch(()=> session.user, load);

export function addUsertoUserDatabase(user: User, quantity: number = 1) {
    api(`userdata/${session.user?.email}`, { userId: user._id, quantity }).then((data) => {
        const i = userdata.findIndex((x) => x.user._id === user._id);
        if (i != -1) {
            userdata[i] = data as UserSession;
            session.messages.push({ type: 'success', text: `Updated ${user.name} in userdata to ${userdata[i].quantity}`});
        } else {
            userdata.unshift(data as UserSession);
            session.messages.push({ type: 'success', text: `Added ${user.name} to userdata`});
        }
    });
}

export function updateUserQuantity(id: string, quantity: number) {
    api<UserSession>(`userdata/${session.user?.email}/${id}/${quantity}`, {}, PATCH).then((data) => {
        const i = userdata.findIndex((x) => x.user._id === id);
        if (i != -1) {
            if(data){
                userdata[i] = data;
            }else{
                userdata.splice(i, 1);
            }
        }
    });
}

export default userdata;