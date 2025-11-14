<template>
	<div>
		<NuxtRouteAnnouncer />
		<NHeader />
		<NuxtPage />
		<NFooter />
	</div>
</template>

<script setup>
//import
import NHeader from "./components/pageStructure/NHeader.vue";
import NFooter from "./components/pageStructure/NFooter.vue";

//vals
const userId = ref(0);
const userName = ref("");
const isMobile = ref(false);
const URL = "http://localhost:5000/";

//mount
onMounted(() => {
	// //token
	// const token = localStorage.getItem("token");

	// //verify
	// if (token != null) {
	// 	console.log(token);
	// 	const res = await fetch(`${URL}api/auth/verify`, {
	// 		method: "POST",
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	});
	// 	const data = await res.json();
	// 	console.log("Hello", data.decodedToken.name);

	// 	if (res.status == 200) {
	// 		userId.value = data.decodedToken.id;
	// 		userName.value = data.decodedToken.name;
	// 	} else {
	// 		localStorage.removeItem("token");
	// 		userId.value = 0;
	// 	}
	// } else {
	// 	userId.value = 0;
	// }

	//window size
	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>
