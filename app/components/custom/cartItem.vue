<template>
    <StackLayout class="main">

        <StackLayout class="content">

            <!-- <Image stretch="aspectFill" class="card-img" @tap="onClickButton()"
                :src="item.cover" /> -->
            <GridLayout width="100%" columns="auto,*" rows="auto,auto" class=""
                verticalAlignment="center">

                <Label row="0" col="1" class="item-name" textwrap="true"
                    verticalAlignment="bottom" horizontalAlignment="left"
                    :text="cart_item.title"  @tap="onClickButton()" />
                <GridLayout row="1" col="1" rows="auto" columns="auto">
      
                    <Label row="0" col="0" class="item-price"  :text="cart_item.line_total"  verticalAlignment="top" horizontalAlignment="left" ></Label>

                </GridLayout>
            </GridLayout>
            <StackLayout width="100%" marginTop="5" class="line" />

            <!-- Here the problem in scroll transistion -->
            <CartItemFooter :cart_item="cart_item"></CartItemFooter>
        </StackLayout>

        <StackLayout width="100%" class="lineBreak" />

    </StackLayout>
</template>

<script>
    import CartItemFooter from "./cartItemfooter";
    import {
        isIOS,
        isAndroid
    } from "tns-core-modules/platform";
    export default {
        props: ["cart_item"],
        components: {
            CartItemFooter
        },
        computed: {
            categoryIcon() {
             
            }
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
                // this.animateLike();
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
                this.$emit("clicked", this.item);
            }
        },
        data() {
            return {
         
            };
        }
    };
</script>
<style scoped>

.item-price {
        font-size: 22;
        font-weight: bold;
        vertical-align: middle;
        color: #828282;
margin-left:2;
  
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