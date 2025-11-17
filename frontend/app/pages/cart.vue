<template>
	<section id="cart">
		<h1><font-awesome-icon icon="fa-solid fa-cart-shopping" />Shopping Cart</h1>
		<div id="items">
			<cartCard v-for="item in itemData" @send="checked" :key="item.id" :id="item.id" :long="item.longtitude" :lat="item.latitude" />
		</div>
		<input type="button" @click="pay" value="Pay Bill" />
	</section>
</template>

<script setup>
//import
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import cartCard from "../components/cart/cartCard.vue";

//config
const config = useRuntimeConfig();

//values
const isMobile = ref(false);
const URL = config.public.apiBase;
const userId = ref(0);
const itemData = ref([]);
const checkedItems = ref([]);
const items = useCookie("items", {
	maxAge: 5 * 60,
	sameSite: "strict",
	secure: true,
});

//function
const pay = () => {
	if (checkedItems.value.length == 0) {
		alert("Please select at least one item to proceed to payment.");
		return;
	}
	items.value = checkedItems.value;
	window.location.href = "/pay";
};

const checked = (msg, id) => {
	if (msg == true) {
		checkedItems.value.push(id);
	} else if (msg == false) {
		const itemIndex = checkedItems.value.indexOf(id);
		if (itemIndex > -1) {
			checkedItems.value.splice(itemIndex, 1);
		}
	}
};

//run
onMounted(async () => {
	//token
	const token = localStorage.getItem("token");

	//verify
	if (token != null) {
		const res = await fetch(`${URL}api/auth/verify`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (res.status == 200) {
			const data = await res.json();
			const res2 = await fetch(`${URL}api/order/getcart`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ownerId: data.decodedToken.id }),
			});

			if (res2.status == 200) {
				const data2 = await res2.json();
				itemData.value = data2.data;
			} else {
				window.location.href = "/order";
			}
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
#cart {
	width: 96vw;
	height: 88vh;
	background-color: var(--bg2);
	padding: 2vw;
	padding-bottom: 2vh;
	padding-top: 10vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
}
#items {
	width: 96%;
	height: 75%;
	padding: 2%;
	background-color: var(--bg1);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	overflow-y: auto;
	gap: 10px;
}

#cart input {
	width: 40%;
	height: 40px;
	background-color: var(--dc1);
	border-radius: 999px;
	font-size: large;
	transition: transform 0.5s;
}

#cart input:hover {
	transform: scale(1.05);
	transition: transform 0.5s;
}
</style>
