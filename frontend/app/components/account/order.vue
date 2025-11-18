<template>
	<section>
		<h1>Settings</h1>
		<div>
			<p class="title">Name:</p>
			<p class="content">{{ userName }}</p>
			<button @click="editName">Edit</button>
		</div>
		<div>
			<p class="title">Password:</p>
			<p class="content">********</p>
			<button @click="editPassword">Edit</button>
		</div>
		<div>
			<p class="title">Delete Account:</p>
			<button id="deleteBtn" @click="deleteAccount">Delete</button>
		</div>
	</section>
</template>

<script setup>
//import
// import orderCom from "../components/order/order.vue";

//config
const config = useRuntimeConfig();

//values
const isMobile = ref(false);
const userId = ref(0);
const userName = ref("");
const URL = config.public.apiBase;

//functions
const deleteAccount = () => {};

const editName = () => {};

const editPassword = () => {};

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

div {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 10px;
}

.title {
	font-size: 1.2rem;
	font-weight: bold;
}

.content {
	width: 100%;
	height: auto;
	background-color: black;
	border-bottom: 1px solid var(--dc1);
	font-size: 1rem;
}

button {
	width: auto;
	height: auto;
	padding: 5px;
	background-color: var(--dc1);
	color: var(--tc1);
}

#deleteBtn {
	background-color: red;
	color: white;
	border: none;
}
</style>
