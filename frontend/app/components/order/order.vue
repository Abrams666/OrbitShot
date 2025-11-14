<template>
	<div id="order">
		<div id="items"></div>
	</div>
</template>

<script setup>
//values
const isMobile = ref(false);
const URL = "http://localhost:5000/";

//function

//run
onMounted(async () => {
	//get item
	const res = await fetch(`${URL}api/order/get`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ account: id.value, pwd: pwd.value }),
	});
	const data = await res.json();
	console.log("Hello", data.decodedToken.name);

	if (res.status == 200) {
		userId.value = data.decodedToken.id;
		userName.value = data.decodedToken.name;
	} else {
		localStorage.removeItem("token");
		userId.value = 0;
		window.location.href = "/login";
	}

	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>

<style scoped>
#order {
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
	width: 100%;
	height: 100%;
	background-color: var(--bg2);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	overflow-y: auto;
}
</style>
