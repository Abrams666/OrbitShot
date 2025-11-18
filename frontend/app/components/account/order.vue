<template>
	<section>
		<h1>My Order</h1>
		<div><orderCard v-for="item in items" :key="item.id" :id="item.id" :long="item.long" :lat="item.lat" :status="item.status" /></div>
	</section>
</template>

<script setup>
//import
import orderCard from "./orderCard.vue";

//config
const config = useRuntimeConfig();

//values
const isMobile = ref(false);
const userId = ref(0);
const userName = ref("");
const URL = config.public.apiBase;
const items = ref([]);

//functions

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
			userId.value = data.decodedToken.id;
			userName.value = data.decodedToken.name;

			const res2 = await fetch(`${URL}api/order/getorder`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ownerID: userId.value }),
			});

			const data2 = await res2.json();

			if (res2.status == 200) {
				items.value = data2.orders;
			} else {
				items.value = [];
				console.error(data2.message);
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
section {
	width: 90%;
	height: auto;
	padding: 5%;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 20px;
}

h1 {
	height: 10%;
}

div {
	width: 96%;
	height: 60vh;
	padding: 2% 2%;
	background-color: var(--bg1);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 10px;
	overflow-y: auto;
}
</style>
