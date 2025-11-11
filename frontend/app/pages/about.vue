<template>
	<div class="container">
		<section class="section2" id="aboutUs">
			<div id="aboutTitle">About US</div>
			<div id="aboutContent">
				<deverCard v-for="dever in deverData" :key="dever.name" :deverData="dever" />
			</div>
		</section>
	</div>
</template>

<script setup>
//import
import deverCard from "../components/about/deverCard.vue";
import deverData from "../assets/json/deverData.json";

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
	min-height: 100vh;
	background-color: var(--bg2);
	display: flex;
	flex-direction: column;
	justify-content: start;
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

#aboutUs {
	width: 90%;
	height: auto;
	padding: 5%;
	padding-top: 13vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2%;
}

#aboutTitle {
	width: 100%;
	height: auto;
	font-size: 2rem;
	font-weight: bold;
	color: var(--tc1);
	margin-bottom: 5%;
}

#aboutContent {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 40px;
}
</style>
