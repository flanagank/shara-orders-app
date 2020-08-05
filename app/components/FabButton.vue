<template>
	<StackLayout class="fab-button"  @tap="onButtonTouch">
		<GridLayout rows="1,auto" horizontalAlignment="center" class="fab-icon" :class="buttonAnimation">
			<!-- <Label row="1" class="fab-dash--1" />
			<Label row="1" class="fab-dash--2" /> -->
              <Image row="1" class="fab-icon-image" src="~/images/ic_checkout_100.png" horizontalAlignment="center"></Image>
		</GridLayout>
	</StackLayout>
</template>


<script>

	import OrderCheckout from "./OrderCheckout";

	export default {
    props: {
        isActive: Boolean
    },
    computed: {
        buttonAnimation() {
            return this.isActive ? "iconActive" : "iconIdle"
        }
    },    
    methods: {
        onButtonTouch(args) {
		//alert("onButtonTouch");

		this.$navigateTo(OrderCheckout,{
				
				animated: true,
				transition: {
					name: "slideTop",
					duration: 380,
					curve: "easeIn"
				}
			})

        }
    }
}

</script>

<style scoped>
	.fab-button {
		width: 56;
		height: 56;
		background-color: orangered;
		border-radius: 28;
		vertical-align: center;
    }
    
    .fab-icon-image{
        width:90
    }

	.fab-icon {
		height: 30;
		width: 30;
	}

	.fab-dash--1,
	.fab-dash--2 {
		background-color: #fff;
		transform: translate(0, -2);
		height: 16;
		width: 3;
	}

	.fab-dash--1 {
		transform: rotate(90deg) translate(0, -2);
	}

	.iconActive {
		animation-name: iconActive;
		animation-duration: .25;
		animation-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
		animation-fill-mode: forwards;
	}

	.iconIdle {
		animation-name: iconActive;
		animation-duration: .25;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
		animation-direction: reverse;
	}

	@keyframes iconActive {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(225deg);
		}
	}
</style>