import * as http from "http";
const appSettings = require("tns-core-modules/application-settings");
export default class ProductsService {


    listAll() {



        var httpDeferred = http.request({
            url: appSettings.getString("appBaseURI", "") + "/products",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        return httpDeferred;

    }


}