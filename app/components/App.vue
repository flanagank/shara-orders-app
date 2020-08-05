<template>
	<page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
		<!-- @loaded="onLoaded" -->

		<GridLayout rows="auto,auto,*,auto" columns="auto">

			<GridLayout row="0" ref="navStatusBar" class="navStatusBar" backgroundColor="#bd2122" verticalAlignment="top" height="40"
			 width="100%" rows="auto" columns="*,auto,auto,auto">
				<Label col="0" row="0" v-model="cart_total" class="status-title"></Label>
					<!-- <Image col="1" row="0" @tap="search" horizontalAlignment="right" class="status-img"
							src="~/assets/images/search.png" /> -->
					<Image col="2" row="0" @tap="bell" horizontalAlignment="right" class="status-img"
							src="~/assets/images/bell.png" />
					<Image horizontalAlignment="right" stretch="aspectFill" col="3"
							row="0" class="status-profile" src="~/images/ic_logout.png" />
			</GridLayout>

			<GridLayout  row="1" ref="navTab" class="navTab" verticalAlignment="top" height="50"
					width="100%"  rows="auto" columns="auto,auto,auto">

					<GridLayout class="tabview" :class="selectedTabview==0?'active':''"
							@tap="popular" rows="*,auto" cols="auto" col="0" row="0"
							width="33%">
							<Image v-show="selectedTabview==0" row="0" class="navIcon"
									:src="selectedTabview==0?'~/assets/images/popular.png':''"/>
							<Label :class="selectedTabview==0?'active':''" row="1"
									text="BROWSE" class="tabviewText"></Label>
					</GridLayout>
					<GridLayout class="tabview" :class="selectedTabview==1?'active':''"
						@tap="showCart" rows="*,auto" cols="auto" col="1" row="0"
							width="34%">
							<Image v-show="selectedTabview == 1" row="0" class="navIcon"
									:src="selectedTabview==1?'~/assets/images/category.png':''"/>
							<Label :class="selectedTabview==1?'active':''" row="1"
									text="CART" class="tabviewText"></Label>							
					</GridLayout>
					<GridLayout class="tabview" :class="selectedTabview==2?'active':''"
							@tap="showPromos" rows="*,auto" cols="auto" col="2" row="0"
							width="33%">
							<Image v-show="selectedTabview == 2" row="0" class="navIcon"
									:src="selectedTabview==2?'~/assets/images/category.png':''"/>
							<Label :class="selectedTabview==2?'active':''" row="1"
									text="HISTORY" class="tabviewText"></Label>							
					</GridLayout>
			</GridLayout>

			<GridLayout v-show="selectedTabview == 0" row="2" width="100%" backgroundColor="white">
				<ListView ref="listview" separatorColor="transparent" for="item in items" >
					<v-template>
						<item :item="item" @clicked="showItem(item)" />
					</v-template>
				</ListView>
			</GridLayout>

			<GridLayout v-show="selectedTabview == 1" row="2" width="100%" backgroundColor="white">		
				<ListView ref="listview" separatorColor="transparent" for="cart_item in cart_items" >
					<v-template>
						<CartItem :cart_item="cart_item"> </CartItem>
					</v-template>
				</ListView>
				<AbsoluteLayout ref="fabItemPosition" marginTop="87%" marginLeft="80%">
				
				<FabButton  @onButtonTap="onButtonTap" />
			</AbsoluteLayout>
	
			</GridLayout>

			<GridLayout v-show="selectedTabview == 2" row="2" width="100%" backgroundColor="white">		
			</GridLayout>

			<navBottom row="3" />

		</GridLayout>
</page>
</template>
<script>
	// import { SwissArmyKnife } from "nativescript-swiss-army-knife";
	import { isIOS, isAndroid } from 'tns-core-modules/platform'
	import navBottom from "./custom/navBottom";
	import Item from "./custom/item";
	import Category from "./custom/category";
	import ItemDetails from "./ItemDetails";


	import CartItem from "./custom/cartItem";
	import FabButton from './FabButton'
	const gestures = require("ui/gestures"); 
	const app = require("application");

export default {
	components: {
		navBottom,
		Item,
		Category,
		CartItem,
		FabButton
	},
	computed: {

	},

	mounted () {
		this.getProducts();
		this.getCartItems();
		this.initAppDB();
	},
  data() {

    
        return {
			lastDelY: 0,
			headerCollapsed: false,
			selectedTab: 0,
			selectedTabview: 0,
			items:  [],
			category: [
			],
			cart_items: [],
			cart_total:0.00
		};

	
	},
	methods: {
		search(){
			console.log('search')
		},
		bell(){
			console.log('bell')
		},
		showItem(payload) {
			this.$navigateTo(ItemDetails,{
				props: {
					item: payload
				},
				animated: true,
				transition: {
					name: "slideTop",
					duration: 380,
					curve: "easeIn"
				}
			})
		},
		showCheckOut() {

				// Not working here
			
		},
		initAppDB(){
			this.$ordersCart.initDB();
		},	
		popular() {
			this.selectedTabview = 0;
		},
		showCart() {
			this.getCartItems();
			this.selectedTabview = 1;
			
		},
		onButtonTap(args){

		},
		showPromos() {
			this.selectedTabview = 2;
		},
		home() {
			this.selectedTab = 0;
		},
		cart() {
			this.getCartItems();
			this.selectedTab = 1;
			this.selectedTabview = 1;
		},
		history() {
			this.selectedTab = 2;
			this.selectedTabview = 2;
		},
		about() {
			this.selectedTab = 3;
        },
        getProducts(){

                console.log('getProducts')

                this.$productsService.listAll()
                    .then(response => {
                        var result = response.content.toJSON();
						console.log(JSON.stringify(result))


						for (var i = 0; i < result.length; i++){
  							var obj = result[i];
							console.log(obj.title)
							//create flexible object to add item-qty
							this.items.push({  id: obj.id,sku: obj.sku,title: obj.title,description: obj.description,price: obj.price,status: obj.status,category_id: obj.category_id,item_qty: 1 })

						}
					
                       // this.items =  result
                  
                    })
                    .catch(error => {
                        console.log(error)
                        this.items =  []
                    });

		},
        getCartItems(){

                console.log('getCartItems')

				this.cart_items = [];
				this.$ordersCart.getdbConnection().then(db => {

						db.all(
							"SELECT * FROM orders_cart ").then((rows) => {

						    this.cart_total = 0.00
							for (var row in rows) {
      							this.cart_items.push({ id: rows[row][0], product_id: rows[row][1],title: rows[row][2],price: parseFloat(rows[row][3]).toFixed(2),item_qty: rows[row][4],line_total: parseFloat(rows[row][5]).toFixed(2) });
								this.cart_total =   (parseFloat(this.cart_total) + parseFloat(rows[row][5])).toFixed(2)
								console.log('total ' + this.cart_total);
							
							 }

							 //this.cart_total = parseFloat(total).toFixed(2)

						});

				}, error => {
					console.log("SELECT CART ERROR", error);
				});



        }
               

	}
}

 

</script>

<style>
.tabview.active {
	border-bottom-color: white;
	border-bottom-width: 3;
	margin: 0;
	height: 50;
}
.tabviewText {
	margin-top: 15;
	margin-bottom: 5;
	font-size: 13;
	color: #d8d2d2;
	horizontal-align: center;
}
.tabviewText.active {
	margin-top: 0;
	margin-bottom: 5;
	font-weight: bold;
	color: white;
	vertical-align: center;
}
.navTab {
	background-color: #bd2122;
}
.navTabview {
	background-color: blue;
}
.status-img {
	margin-top: 4;
	margin-right: 20;
	width: 30;
	height: 30;
}
.status-profile {
	border-width: 1;
	border-color: #ffffff;
	background-color: #f1ebeb;
	border-radius: 50%;
	margin-top: 4;
	margin-right: 15;
	width: 30;
	height: 30;
}
.status-title {
	color: white;
	font-size: 18;
	margin-left: 15;
	margin-top: 8;
	horizontal-align: left;
	vertical-align: center;
}
</style>