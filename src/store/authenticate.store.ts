import { action, makeObservable, observable } from "mobx";
import IUser from "../types/user.model";

class AuthenticateStore {
    isAuthenticated = false;
    user: IUser = {email: "", token: "", roles: []}

    constructor() {
        makeObservable(this, {
            isAuthenticated: observable,
            user: observable,
            login: action,
            logout: action
        })
    }

    login(user: IUser) {
        this.isAuthenticated = true;
        this.user = user;
        this.user.roles = this.getRolesFromToken(user.token);
    }

    logout() {
        this.isAuthenticated = false;
        this.user = {email: "", token: "", roles: []}
    }

    getRolesFromToken(token: string): string[] {
        return [];
    }
}

const authenticateStore = new AuthenticateStore();

export default authenticateStore;