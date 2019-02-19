import axios from 'axios';
import { observable, action } from 'mobx';

function delay(fn, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            fn();
            resolve();
        }, ms);
    })
}

class AuthStore {
    @observable user = null;

    constructor() {

    }

    isLoggedIn() {
        return this.user;
    }

    @action setUser(user) {
        this.user = user;
    }

    @action async login() {
        await delay(() => {
            this.user = {
                name: 'Test User'
            }
        }, 1000);
    }

    @action logout() {
        try {
            this.user = null;
        }
        catch (err) {
            console.error(err);
        } finally {

        }
    }
}

export default new AuthStore();