<template>
    <!-- <GridLayout marginTop="5" width="100%" row="3" columns="auto,*,auto,auto" rows="auto"> -->
    <GridLayout columns="auto,auto" rows="auto">
      
        <StackLayout col="0" row="0" orientation="horizontal"
            marginRight="5" width="68%" marginLeft="0">
         <!-- <Label col="1" row="0" class="item-price"  :text="item.price" marginRight="15" ></Label>-->
         <Label  class="item-quantity-label" text="Qty:"></Label>  
           <Image class="img-cart-qty" marginLeft="7" src="~/images/ic_minus_64.png"></Image><TextField class="item-quantity"  :text="cart_item.item_qty" hint="1"  /><Image  class="img-cart-qty" src="~/images/ic_plus_64.png" @tap="addQuantity"></Image>
        </StackLayout>

        <StackLayout col="1" row="0"  orientation="horizontal" @tap="removeFromCart" marginLeft="5" >
            <!-- <Label ref="" class="like-icon layout fa" :text="'fa-share-square-o' | fonticon" /> -->
            
                <Image class="img-cart-add" src="~/images/ic_trash.png" horizontalAlignment="right"></Image>
            <Label class="remove-cart" horizontalAlignment="right" text="Remove"></Label>
        </StackLayout>

    </GridLayout>
</template>

<script>
    import {
        isIOS,
        isAndroid
    } from "tns-core-modules/platform";
    export default {
        props: ["cart_item"],
        components: {},
        computed: {
           
        },
        created() {
            // this.isLike =  this.item.isLike
            // this.isHeart =  this.item.isFavorite

        },
        mounted() {},
        methods: {
            animateLike() {
                if (isIOS) {
                    return;
                }
                let imgLogo = this.$refs.like.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 100,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
            animateFavorite() {
                if (isIOS) {
                    return;
                }
                let imgLogo = this.$refs.favorite.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 50,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
            toggleLike() {
                this.animateLike();
                // this.item.isLike = !this.item.isLike;
                // if (this.item.isLike) {
                //     this.item.likes += 1;
                // } else {
                //     this.item.likes -= 1;
                // }
            },
            toggleHeart() {
                this.animateFavorite();
                // this.item.isFavorite = !this.item.isFavorite;
            },
            onClickButton() {
                this.$emit("clicked", this.cart_item);
            },
             addQuantity() {

                        console.log("Adding Qty")
                        this.item_qty = this.item_qty + 1

            },
            removeFromCart(){


                    confirm({
                    title: "Confirm",
                    message: "Are you sure you want to remove " + this.cart_item.title,
                    okButtonText: "Yes",
                    cancelButtonText: "Cancel"
                    }).then(result => {
                        if(this.$ordersCart.removeItem(this.cart_item.id)){
                            console.log("Removed" + this.cart_item.title)
                            this.reloadCartItems()
                            var toast = new this.$toasty({ text: this.cart_item.title + ' Removed ',position:'CENTER' });
                            toast.show();

                        }
                    });

            }, 
            reloadCartItems(){

                alert('reloadCartItems')

				this.$ordersCart.getdbConnection().then(db => {

						db.all(
							"SELECT * FROM orders_cart ").then((rows) => {

							var total = 0.00
							for (var row in rows) {
      							this.cart_items.push({ id: rows[row][0], product_id: rows[row][1],title: rows[row][2],price: parseFloat(rows[row][3]).toFixed(2),line_total: rows[row][5],item_qty: 1 });
								total =  total + parseFloat(rows[row][5]).toFixed(2)
								
								console.log('Price' + rows[row][5])
							 }

							 this.cart_total = parseFloat(total).toFixed(2)

						});

                }, error => {
                    console.log("SELECT CART ERROR", error);
                });



            }




        },
        data() {
            return {
                isLike: false,
                isHeart: false
                
            };
        }
    };
</script>
<style scoped>


    .img-cart-qty{
max-width: 50px;
width: 85px;
 vertical-align: middle;
    }
    .item-category {
        font-size: 14;
        color: #828282;
    }

    .rating-icon {
        padding-top: 3;
        color: #FFE900;
        font-size: 14;
        margin-left: 10;
    }

    .rating-value {
        margin-left: 5;
    }

    .liked-active {
        color: #4080FF;
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

    .item-price {
        font-size: 18;
        font-weight: bold;
        vertical-align: middle;
        color: #828282;
        padding: 0 0 0 0;
        width: 200px;
    }

     .item-quantity {
        width: 100px;
        font-size: 14;
        vertical-align: middle;
    }

      .item-quantity-label {
        vertical-align: middle;
        color: #272525;
        font-size: 16;
    }

    .add-to-cart{
        vertical-align: middle;
        font-size: 20;
        color: #c62828;
    }


      .remove-cart{
        vertical-align: middle;
        font-size: 15;
        color: #c62828;
    }




    .item-category {
        font-size: 14;
        color: #828282;
        font-size: 16px;
        
    }

        .right{
            float:right;
        }
    .category-icon {
        text-align: center;
        padding-top: 5;
        border-color: white;
        color: white;
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
        margin-top: 16;
    }

    .card-img {
        width: 100%;
        height: 150;
        margin-bottom: 10;
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