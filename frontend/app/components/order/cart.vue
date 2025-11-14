<template>
	<div id="cart">
		<div id="items">
			<cartCard v-for="item in itemData" :key="item.id" :id="item.id" :long="item.longtitude" :lat="item.latitude" />
		</div>
		<input type="button" @click="pay" value="Pay Bill" />
	</div>
</template>

<script setup>
//import
import cartCard from "./cartCard.vue";

//values
const isMobile = ref(false);
const URL = "http://localhost:5000/";
let itemData = ref([]);

//function
const pay = () => {};

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
				console.log(itemData.value);
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
	width: 96%;
	height: 91%;
	background-color: var(--bg1);
	padding: 2%;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

#items {
	width: 96%;
	height: 81%;
	padding: 2%;
	background-color: var(--bg2);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	overflow-y: auto;
}

#cart input {
	width: 50%;
	height: 10%;
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
