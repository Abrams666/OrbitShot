<template>
	<section>
		<h1>Sample</h1>
		<div id="container">
			<a href="#" v-for="sample in sampleData">
				<div class="imgContainer"><img :src="sample.Url" alt="" /></div>
				<div class="contentContainer">
					<p>Latitude:{{ sample.Latitude }}</p>
					<p>Longtitude:{{ sample.Longtitude }}</p>
					<p>time:{{ sample.time }}</p>
				</div>
			</a>
		</div>
	</section>
</template>

<script setup>
//import
import sampleData from "../assets/json/sampleData.json";

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
section {
	width: 94vw;
	height: auto;
	min-height: 87vh;
	padding: 3vw 3vw;
	padding-top: 10vh;
	background-color: var(--bg2);
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 20px;
}

#container {
	width: 100%;
	height: auto;
	flex-wrap: wrap;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
}

a {
	width: 45%;
	min-width: 500px;
	height: auto;
	background-color: var(--bg1);
	border-radius: 10px;
	padding: 2% 2%;
	display: flex;
	flex-direction: row;
	align-items: start;
	justify-content: space-between;
}

.imgContainer {
	width: 30%;
	aspect-ratio: 1/1;
}
.contentContainer {
	width: 65%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-between;
	gap: 10px;
}
</style>
