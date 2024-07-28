import { action, makeObservable, observable } from "mobx";
import IUser from "../interfaces/user.model";

class AuthenticateStore {
    isAuthenticated = false;
    user: IUser = {email: "", token: ""}

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
        this.user = user
    }

    logout() {
        this.isAuthenticated = false;
        this.user = {email: "", token: ""}
    }
}

const authenticateStore = new AuthenticateStore();

export default authenticateStore;