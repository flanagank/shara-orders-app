import * as http from "http";
const appSettings = require("tns-core-modules/application-settings");

export default class AuthService {

    // constructor(name) {
    //     this.name = name;
    // }

    isLoggedIn() {
        return false;
    }

    login(user) {


        var httpDeferred = http.request({
            url: appSettings.getString("appBaseURI", "") + "/login",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });

        return httpDeferred;

    }

    logout() {
        appSettings.setString("user", "");
        return true;
    }

    register(new_user) {

        var httpDeferred = http.request({
            url: appSettings.getString("appBaseURI", "") + "/register",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                username: new_user.email,
                email: new_user.email,
                mobile_number: new_user.mobile_number,
                address: new_user.address,
                password: new_user.password
            })
        });

        return httpDeferred;

    }
}