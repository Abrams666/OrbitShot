<template>
	<div id="account">
		<nav>
			<h2><font-awesome-icon icon="fa-solid fa-user" />{{ userName }}</h2>
			<ul>
				<li><input type="button" @click="setting" value="Setting" /></li>
				<li><input type="button" @click="order" value="My Order" /></li>
				<li><input type="button" id="logout" @click="logout" value="Log out" /></li>
			</ul>
		</nav>
		<div id="coms">
			<settingCom v-if="showSetting" />
			<orderCom v-if="showOrder" />
		</div>
	</div>
</template>

<script setup>
//import
import settingCom from "../components/account/setting.vue";
import orderCom from "../components/account/order.vue";

//config
const config = useRuntimeConfig();

//values
const isMobile = ref(false);
const userId = ref(0);
const userName = ref("");
const URL = config.public.apiBase;
const showSetting = ref(true);
const showOrder = ref(false);

//functions
const setting = () => {
	showSetting.value = true;
	showOrder.value = false;
};

const order = () => {
	showSetting.value = false;
	showOrder.value = true;
};

const logout = () => {
	localStorage.removeItem("token");
	userId.value = 0;
	userName.value = "";
	window.location.href = "/";
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
#account {
	width: 100%;
	height: auto;
	min-height: 100vh;
	background-color: var(--bg2);
	display: flex;
	flex-direction: row;
	align-items: start;
	justify-content: start;
}

h2 {
	margin-bottom: 20px;
	margin-left: 10px;
}

nav {
	width: 20%;
	height: auto;
	min-height: 88vh;
	padding-top: 12vh;
	background-color: var(--bg1);
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
}

ul {
	width: 90%;
	list-style: none;
	padding: 5%;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 10px;
}

li {
	width: 100%;
}

li input {
	width: 100%;
	padding: 10%;
	background-color: var(--bg2);
	border: none;
	font-size: larger;
	color: var(--text1);
	font-size: 1rem;
	cursor: pointer;
	transition: 0.3s;
}

#logout {
	background-color: red;
}

#coms {
	width: 80%;
	height: auto;
	min-height: 88vh;
	padding-top: 10vh;
	padding-bottom: 2vh;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
}
</style>
