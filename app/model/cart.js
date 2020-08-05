import Sqlite from "nativescript-sqlite";

const DB_NAME = "shara_orders.db";

export default class CartModel {


    initDB() {

        var deferred = new Sqlite(DB_NAME).then(db => {
            // next: create table for storing walks data
            db.execSQL("CREATE TABLE IF NOT EXISTS orders_cart (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER,product_title TEXT, unit_price DECIMAL(18,2), quantity INTEGER, line_total DECIMAL(18,2) )").then(id => {


            }, error => {
                console.log("CREATE TABLE ERROR", error);
                //Flag 
            });
        }, error => {

        });

        return true;
    }

    addItem(cart_item) {

        var deferred = new Sqlite(DB_NAME).then(db => {

            db.execSQL("CREATE TABLE IF NOT EXISTS orders_cart (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER,product_title TEXT, unit_price DECIMAL(18,2), quantity INTEGER, line_total DECIMAL(18,2) )").then(id => {

                db.execSQL("INSERT INTO orders_cart (product_id,product_title, unit_price, quantity, line_total ) VALUES (?, ?, ?, ?, ?)", [cart_item.product_id, cart_item.title, cart_item.unit_price, cart_item.quantity, cart_item.line_total]).then(id => {

                }, error => {
                    console.log("INSERT ERROR", error);
                });

            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {

        });

        return true;
    }



    clearCart() {


        new Sqlite(DB_NAME).then(db => {

            db.execSQL("CREATE TABLE IF NOT EXISTS orders_cart (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER,product_title TEXT, unit_price DECIMAL(18,2), quantity INTEGER, line_total DECIMAL(18,2) )").then(id => {

                db.execSQL("DELETE FROM orders_cart ").then(id => {

                }, error => {
                    console.log("INSERT ERROR", error);
                });

            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {

        });



    }

    // listAll() {

    //     new Sqlite(DB_NAME).then(db => {

    //         db.all(
    //             "SELECT * FROM orders_cart ").then((rows) => {

    //             alert(rows);

    //         });

    //     }, error => {
    //         console.log("SELECT CART ERROR", error);
    //     });


    // }

    removeItem(cart_id) {


        new Sqlite(DB_NAME).then(db => {

            db.execSQL("CREATE TABLE IF NOT EXISTS orders_cart (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER,product_title TEXT, unit_price DECIMAL(18,2), quantity INTEGER, line_total DECIMAL(18,2) )").then(id => {

                db.execSQL("DELETE FROM orders_cart  WHERE id = ?", [cart_id]).then(id => {

                }, error => {
                    console.log("INSERT ERROR", error);
                });

            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {

        });



    }


    getdbConnection() {

        return new Sqlite(DB_NAME)

    }





}