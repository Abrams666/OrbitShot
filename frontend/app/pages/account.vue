<template>
	<section>
		<div id="page">
			<input type="button" @click="MyAccount" value="My Account" />
			<input type="button" @click="cart" value="Cart" />
			<input type="button" @click="myOrder" value="My Order" />
		</div>
		<div id="com">
			<creatCom v-if="showAccount" />
			<cartCom v-if="showCart" />
			<orderCom v-if="showOrder" />
		</div>
	</section>
</template>

<script setup>
//import
import creatCom from "../components/order/create.vue";
import orderCom from "../components/order/order.vue";
import cartCom from "../components/order/cart.vue";

//values
const isMobile = ref(false);
const userId = ref(0);
const userName = ref("");
const URL = "http://localhost:5000/";
const showAccount = ref(true);
const showCart = ref(false);
const showOrder = ref(false);

//functions
const nMyAccount = () => {
	showAccount.value = true;
	showCart.value = false;
	showOrder.value = false;
};

const cart = () => {
	showAccount.value = false;
	showCart.value = true;
	showOrder.value = false;
};

const myOrder = () => {
	showAccount.value = false;
	showCart.value = false;
	showOrder.value = true;
};

//run
onMounted(async () => {
	//token
	const token = localStorage.getItem("token");
	console.log("hello");

	//verify
	if (token != null) {
		const res = await fetch(`${URL}api/auth/verify`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (res.status == 200) {
			const data = await res.json();
			userId.value = data.decodedToken.id;
			userName.value = data.decodedToken.name;
		} else {
			localStorage.removeItem("token");
			userId.value = 0;
			window.location.href = "/login";
		}
	} else {
		userId.value = 0;
		window.location.href = "/login";
	}

	//window size
	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>

<style scoped>
section {
	width: 96%;
	height: 84vh;
	padding: 2%;
	padding-top: 13vh;
	padding-bottom: 3vh;
	background-color: var(--bg2);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
}

#page {
	width: 100%;
	height: 10%;
	display: flex;
	flex-direction: row;
	align-items: end;
	justify-content: space-between;
}

#page input {
	width: 33%;
	height: 100%;
	font-size: large;
	background-color: var(--bg1);
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	transition: transform 0.5s;
}

#page input:hover {
	transform: scale(1.05);
	transition: transform 0.5s;
}

#com {
	width: 100%;
	height: 90%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
