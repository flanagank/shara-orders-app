<template>
  <Page class="page">
    <ActionBar title="" class="action-bar header" backgroundColor="#bd2122">
      <StackLayout
        orientation="horizontal"
        height="38"
        alignItems="left"
        class="actionBarContainer"
      >
        <StackLayout class="HLeft" style="margin-top:5;" width="33.3%">
          <Image
            col="0"
            row="0"
            horizontalAlignment="left"
            class="status-img"
            src="~/images/ic_back_96.png"
            @tap="homeTap"
          />
        </StackLayout>
        <StackLayout class="HMid" alignItems="left" width="33.3%">
          <Label
            text="Checkout"
            ios:height="30"
            ios:marginTop="3"
            android:paddingBottom="5"
            class="panel-bar-heading font-awesome"
            color="#fff"
          />
        </StackLayout>
        <StackLayout class="HRight" width="33.3%"> <Label v-model="cart_total" class="order-total-top" /></StackLayout>
      </StackLayout>

    </ActionBar>

    <RadSideDrawer
      ref="drawer"
      @drawerOpened="onDrawerOpened()"
      @drawerClosed="onDrawerClosed()"
    >
      <StackLayout ~drawerContent backgroundColor="#eee">
        <StackLayout height="80%"></StackLayout>
        <StackLayout class="">
          <Label
            text="  Settings"
            paddingLeft="30%"
            color="black"
            class="drawerItemText font-awesome"
            margin="10"
          />
          <Label
            text="  Log out"
            paddingLeft="30%"
            color="black"
            class="drawerItemText font-awesome"
            margin="10"
          />
        </StackLayout>
      </StackLayout>

      <StackLayout ~mainContent>
        <DockLayout>
          <StackLayout dock="top" height="90%" width="100%" style="">
                <StackLayout class="content">
                  <GridLayout
                    width="100%"
                    columns="auto,*"
                    rows="auto,auto"
                    class=""
                    verticalAlignment="center"
                  >
                    <Label
                      row="0"
                      col="1"
                      class="item-name"
                      textwrap="true"
                      verticalAlignment="bottom"
                      horizontalAlignment="left"
                      :text="user.username"
                    />

                    <GridLayout row="3" col="1" rows="auto,auto,auto" columns="auto">
                      <Label
                        row="0"
                        col="0"
                        class="item-price"
                        :text="user.email"
                        verticalAlignment="top"
                        horizontalAlignment="left"
                      ></Label>

                      <Label
                        row="1"
                        col="0"
                        class="item-price"
                        :text="user.mobile_number"
                        verticalAlignment="top"
                        horizontalAlignment="left"
                      ></Label>

                         <TextField row="2"
                        col="0" v-model="order_comment"  width="100%" class="item-price input"  hint="Enter comment" />
                    </GridLayout>
                  </GridLayout>
                  <!-- <StackLayout width="100%" marginTop="5" class="line" /> -->

                  <!-- Here the problem in scroll transistion -->
                </StackLayout>
                  <StackLayout
                  width="100%"
                  orientation="vertical"
                  class="lineBreak"
                />
                <Label
                  class="items-header"
                  textwrap="true"
                  verticalAlignment="bottom"
                  text="Order Items"
                  horizontalAlignment="left"
                />
                <StackLayout width="100%" marginTop="5" class="line" /> 
            <ScrollView>
              <StackLayout style="font-size:18;">
              

              
                <GridLayout row="2" width="100%" backgroundColor="white" class="order_items_checkout">
                <ListView
                  ref="listview"
                  height="500" 
            
                  separatorColor="transparent"
                  for="cart_item in cart_items"
                >
                  <v-template>
                    <OrderItem :cart_item="cart_item" />
                  </v-template>
                </ListView>
                </GridLayout>          
              </StackLayout>
            </ScrollView>
          </StackLayout>

          <StackLayout
            dock="bottom"
            height="25%"
            style="border-color:#E4E4E4;border-width:1;background:#fff;"
          >
       

            <StackLayout orientation="horizontal">
              <StackLayout class="navItem" width="60%">
                <Label v-model="cart_total" class="order-total" />
              </StackLayout>

              <StackLayout class="navItem">
                <Button
                  text="Submit Order"
                  @tap="submitOrder"
                  class="btn btn-error m-b-20 check_out-btn"
                ></Button>
              </StackLayout>
            </StackLayout>
          </StackLayout>
        </DockLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import App from "./App";
import OrderItem from "./custom/orderItem";
const appSettings = require("tns-core-modules/application-settings");  

export default {
  props: ["cart_item"],
  components: {
    OrderItem,
  },
  created() {},
  mounted() {
    this.getUser()
    this.getCartItems();
  },
  data() {
    return {
      drawerToggle: false,
      drawer1: "",
      drawer2: "",
      mainColor: "#1aa3ff",
      user: {
      },
      new_order: {   
            order_number: "",
            order_status: "PENDING",
            order_location: "0,0",
            order_comment: "",
            order_total: 0.00,
            user_id: 0,
            },
      new_order_items: [],
      cart_items: [],
      cart_total: 0.0,
      order_comment: ""
    };
  },
  methods: {
    onDrawerClosed() {
      this.drawerToggle = false;
    },
    onDrawerOpened() {
      this.drawerToggle = true;
    },
    toggleDrawer() {
      this.$refs.drawer.nativeView.toggleDrawerState();
    },
    homeTap() {
      this.$navigateTo(App, {
        clearHistory: true,
        animated: false,
      });
    },
    profileTap() {},
    conversationsTap() {
      // this.$navigateTo(Convs, {
      //     clearHistory: true,
      //     animated: false
      // });
    },
    notificationsTap() {},
    getUser() {
            
            this.user = JSON.parse(appSettings.getString("user"));
         
        },
    showDetails() {},
    submitOrder() {


            //this can be done unique in backend or update number ofer getting ID

            var new_order_number = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            new_order_number = new_order_number.toString().toUpperCase();
            this.new_order.order_number = new_order_number;
            this.new_order.order_total = this.cart_total;
            this.new_order.order_comment= this.order_comment;
             this.new_order.user_id = this.user.id;
            //this.new_order.order_location= GET USER GPS LOCATION;

            this.$ordersService.submitOrderHeader(this.new_order)
                        .then(response => {
                            var result = response.content.toJSON();
                            //add response codes //not full proof , can cause orphan record
                            if(result.id > 0){
                            
                                //alert(result.id)
                                const new_order_id = result.id;

                                this.$ordersCart.getdbConnection().then(db => {

                                        db.all(
                                            "SELECT * FROM orders_cart ").then((rows) => {

                                            for (var row in rows) {
                                                this.new_order_items.push({  product_id: rows[row][1],unit_price: parseFloat(rows[row][3]).toFixed(2),quantity: rows[row][4],line_total: parseFloat(rows[row][5]).toFixed(2),order_id: new_order_id } );
                                             
                                            }

                                            // Start upload items

                                            this.$ordersService.submitOrderDetails(this.new_order_items)
                                                            .then(response => {
                                                                var result = response.content.toJSON();
                                                            
                                                                if(result.length > 0){
                                                                    console.log('Clear cart now')
                                                                    this.$ordersCart.clearCart();
                                                                    alert({
                                                                        title: "New Order",
                                                                        message: "Your order has been submitted",
                                                                        okButtonText: "Ok"
                                                                        })
                                                                    .then(() => {
                                                                         this.$navigateTo(App, {
                                                                                clearHistory: true,
                                                                                animated: false,
                                                                            });

                                                                    });
                                                                }else{


                                                                }
                                                        
                                                            })
                                                            .catch(error => {
                                                            
                                                                
                                                });
                                               

                                            //End Upload Items

                                        });

                                }, error => {
                                    console.log("SELECT CART ERROR", error);
                                });

                             
                            }else{

                                this.alert(
                                    "Error! Invalid login details" + error
                                );

                            }
                    
                        })
                        .catch(error => {
                            this.processing = false;
                            this.alert(
                                 "Unfortunately we were unable to create your account."
                        );
                    });


    },
    getCartItems() {
      console.log("getCartItems");

      this.$ordersCart.getdbConnection().then(
        (db) => {
          db.all("SELECT * FROM orders_cart ").then((rows) => {
            this.cart_total = 0.0;
            for (var row in rows) {
              this.cart_items.push({
                id: rows[row][0],
                product_id: rows[row][1],
                title: rows[row][2],
                price: parseFloat(rows[row][3]).toFixed(2),
                quantity: rows[row][4],
                line_total: parseFloat(rows[row][5]).toFixed(2),
              });
              this.cart_total = (parseFloat(this.cart_total) + parseFloat(rows[row][5])).toFixed(2);
            }

          });
        },
        (error) => {
          console.log("SELECT CART ERROR", error);
        }
      );
    },
  },
};
</script>
<style scoped>
.status-img {
  margin-right: 20;
  width: 25;
  height: 25;
}
.items-header{
    margin-left:16;
    padding-left:5px;
    font-size: 17px;
    color: #b51213;
    font-weight: bold;
}
.panel-bar-heading {
  font-size: 18;
}

.order_items_checkout {
  border: #828282 solid 1px;
}

.check_out-btn {
  color: #d62526;
  padding-left: 10px !important;
  padding-right: 10px !important;
  width: 90%;
}
 .input {
     font-size: 15;
        placeholder-color: #A8A8A8;
    }
.order-total-top {
  font-size: 18;
  font-weight: bold;
  vertical-align: middle;
  color: #ffffff;
   padding: 10 0 0 0;
  width: 100%;
  margin-left: 3;
  horizontal-align: left;
}

.order-total {
  font-size: 22;
  font-weight: bold;
  vertical-align: middle;
  color: #d62526;
  padding: 15 0 0 0;
  width: 100%;
  margin-left: 10;
}

.item-price {
  font-size: 15;

  vertical-align: middle;
  color: #828282;
  margin-left: 2;
}
.item-category {
  font-size: 14;
  color: #828282;
}

.rating-icon {
  padding-top: 3;
  color: #ffe900;
  font-size: 14;
  margin-left: 10;
}

.rating-value {
  margin-left: 5;
}

.liked-active {
  color: #4080ff;
}

.heart-active {
  color: #b51213;
}

.default {
  color: #828282;
}

.layout {
  vertical-align: bottom;
  color: #828282;
  font-size: 14;
  height: 30;
  padding: 5 0 5 0;
}

.like-icon {
  vertical-align: bottom;
  height: 30;
  font-size: 16;
  margin-right: 2;
  padding: 5 5 5 5;
}

.item-name {
  font-size: 14;
  font-weight: bold;
}

.item-category {
  font-size: 14;
  color: #828282;
}

.category-icon {
  text-align: center;
  padding-top: 5;
  color: white;
  border-color: white;
  vertical-align: center;
  font-size: 25;
  border-width: 1;
  border-radius: 50%;
  margin-top: 4;
  margin-right: 15;
  width: 40;
  height: 40;
}

.content {
  margin-left: 16;
  margin-right: 16;
  margin-bottom: 3;
  margin-top: 5;
}

.card-img {
  width: 100%;
  height: 150;
  margin-bottom: 5;
}

.line {
  height: 0.5;
  border: none;
  color: #e0e0e0;
  background-color: #e0e0e0;
}

.lineBreak {
  height: 7;
  border: none;
  color: #e0e0e0;
  background-color: #e0e0e0;
}
</style>
