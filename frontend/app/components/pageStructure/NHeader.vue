<template>
	<header>
		<a class="logo" href="/">
			<img src="/pageStructure/logo.webp" alt="Logo" />
			<h1>OrbitShot</h1>
		</a>
		<nav v-if="showNav" :class="{ active: !isMobile, inactive: isMobile }">
			<ul :class="{ active: !isMobile, inactive: isMobile }">
				<li><font-awesome-icon icon="fa-solid fa-house" /><a href="/">Home</a></li>
				<li><font-awesome-icon icon="fa-solid fa-circle-info" /><a href="/about">About</a></li>
				<li><font-awesome-icon icon="fa-solid fa-image" /><a href="/sample">Sample</a></li>
				<li><font-awesome-icon icon="fa-solid fa-cart-shopping" /><a href="/order">Order</a></li>
				<li><font-awesome-icon icon="fa-solid fa-user" /><a href="/account">Account</a></li>
			</ul>
		</nav>
		<font-awesome-icon id="navSwitch" v-if="isMobile" icon="fa-solid fa-bars" @click="switchNav" />
	</header>
</template>

<script setup>
//values
const isMobile = ref(false);
const showNav = ref(true);

//functions
const switchNav = () => {
	showNav.value = !showNav.value;
};

//run
onMounted(() => {
	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
		showNav.value = false;
	} else {
		isMobile.value = false;
	}
});
</script>

<style scoped>
header {
	width: 100vw;
	height: 8vh;
	background-color: var(--bg1);
	color: var(--tc1);
	opacity: 0.8;
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
}

.logo {
	width: 10%;
	height: 60%;
	margin-left: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: left;
	gap: 5px;
}

.logo img {
	width: auto;
	height: 100%;
	border-radius: 99999px;
}

h1 {
	font-size: 150%;
	color: var(--tc1);
}

nav.active {
	width: 70%;
	height: 60%;
	margin-right: 10px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

nav.inactive {
	width: 100vw;
	height: auto;
	padding-bottom: 10px;
	background-color: var(--bg2);
	position: fixed;
	top: 8vh;
	left: 0;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
}

nav ul.active {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: right;
	align-items: center;
	gap: 10px;
}

nav ul.inactive {
	width: 95%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
}

ul li {
	width: auto;
	height: 100%;
	padding: 3px;
	border-radius: 5px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

#navSwitch {
	width: auto;
	height: 60%;
	margin-right: 10px;
	cursor: pointer;
	color: var(--tc1);
}
</style>
