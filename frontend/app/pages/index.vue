<template>
	<div class="container">
		<section id="sectionMain" class="section1">
			<h1 :class="{ active: !isMobile, inactive: isMobile }">
				We're<TextTyping :text="['Students', 'Developers', 'Engineers', 'Future']" :time="10000" />
			</h1>
			<font-awesome-icon id="down" icon="fa-solid fa-angle-down" bounce />
		</section>
		<section class="section2" id=""></section>
	</div>
</template>

<script setup>
//import
import TextTyping from "../components/index/textTyping.vue";

//values
const isMobile = ref(false);

//functions

//run
onMounted(() => {
	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>

<style scoped>
.container {
	width: 100vw;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

section {
	height: auto;
	width: 100%;
}

.section1 {
	background-color: var(--bg1);
}

.section2 {
	background-color: var(--bg2);
}

#sectionMain {
	width: 100vw;
	height: 100vh;
	padding: 0;
	background-image: url("/index/bgc3.jpg");
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

h1 {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 20px;
}

h1.active {
	font-size: 80px;
}

h1.inactive {
	font-size: 50px;
}

#down {
	font-size: 30px;
	color: var(--tc1);
	position: absolute;
	top: 90%;
	left: 50%;
	transform: translateX(-50%);
}
</style>
