<template>
    <!-- <GridLayout marginTop="5" width="100%" row="3" columns="auto,*,auto,auto" rows="auto"> -->
    <GridLayout columns="auto,auto" rows="auto">
      
        <StackLayout col="0" row="0" orientation="horizontal"
            marginRight="5" width="68%" marginLeft="0">
         <!-- <Label col="1" row="0" class="item-price"  :text="item.price" marginRight="15" ></Label> v-model="item_qty"-->
         <Label  class="item-quantity-label" text="Qty:"></Label>  
           <Image class="img-cart-qty" marginLeft="7" src="~/images/ic_minus_64.png" @tap="reduceQuantity"></Image><TextField class="item-quantity"  :text="item.item_qty"  hint="1"  /><Image  class="img-cart-qty" src="~/images/ic_plus_64.png" @tap="addQuantity"></Image>
        </StackLayout>

        <StackLayout col="1" row="0" orientation="horizontal" @tap="addToCart" marginLeft="5" >
            <!-- <Label ref="" class="like-icon layout fa" :text="'fa-share-square-o' | fonticon" /> -->
            
            <Image class="img-cart-add" src="~/images/cart_add.png"></Image>
            <Label class="add-to-cart" horizontalAlignment="right" text="Add"></Label>
        </StackLayout>

    </GridLayout>
</template>

<script>
    import {
        isIOS,
        isAndroid
    } from "tns-core-modules/platform";
    export default {
        props: ["item"],
        components: {},
        computed: {
            categoryIcon() {
                return "";
            }
        },
        created() {
            // this.isLike =  this.item.isLike
            // this.isHeart =  this.item.isFavorite

        },
        mounted() {

                

        },
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
              
            },
            toggleHeart() {
      
            },
            onClickButton() {
                this.$emit("clicked", this.item);
            },
            addToCart() {

                        console.log("Adding to cart")

                        this.new_cart_item.product_id= this.item.id,
                        this.new_cart_item.title = this.item.title,
                        this.new_cart_item.unit_price = this.item.price,
                        this.new_cart_item.quantity = this.item.item_qty,
                        this.new_cart_item.line_total = this.item.price * this.item.item_qty

                        if(this.$ordersCart.addItem(this.new_cart_item)){
                            console.log("Added to cart : " + this.new_cart_item.title)

                            var toast = new this.$toasty({ text: this.new_cart_item.title + ' added to cart',position:'CENTER' });
                            toast.show();

                            this.$parent.getCartItems();
                            

                        }

            },
             addQuantity() {

                        console.log("Adding Qty")
                        this.item.item_qty = this.item.item_qty + 1

            },
             reduceQuantity() {

                        console.log("Reduce Qty")
                        var val = this.item.item_qty - 1
                        if(val < 1){
                            val = 1
                        }

                        this.item.item_qty = val

            }

        },
        data() {
            return {
                isLike: false,
                isHeart: false,
                 new_cart_item: {
                    product_id: 0,
                    title: "",
                    unit_price: 0.00,
                    quantity: 1,
                    line_total: 0.00
                }
            };
        }
    };
</script>
<style scoped>


    .img-cart-qty{
        max-width: 50px;
        width: 80px;
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
        font-size: 22;
        font-weight: bold;
        vertical-align: middle;
        color: #828282;
        padding: 0 0 0 0;
        width: 200px;
    }

     .item-quantity {
        width: 100px;
        font-size: 18;
        vertical-align: middle;
    }

      .item-quantity-label {
        vertical-align: middle;
        color: #272525;
        font-size: 15;
    }

    .add-to-cart{
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
        margin-top: 10;
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