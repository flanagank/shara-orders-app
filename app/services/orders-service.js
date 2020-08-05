import * as http from "http";
const appSettings = require("tns-core-modules/application-settings");

export default class OrdersService {



    isLoggedIn() {
        //TODO: Check if tocken exists
        return false;
    }

    submitOrderHeader(new_order) {


        var httpDeferred = http.request({
            url: appSettings.getString("appBaseURI", "") + "/orders",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(new_order)
        });

        return httpDeferred;

    }



    submitOrderDetails(order_details) {

        var httpDeferred = http.request({
            url: appSettings.getString("appBaseURI", "") + "/orderdetails",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(order_details)
        });

        return httpDeferred;

    }
}