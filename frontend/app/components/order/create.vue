<template>
	<div id="create">
		<div id="inputs">
			<h2>Creat New Order</h2>
			<div>
				<p>Latitude</p>
				<input type="text" />
			</div>
			<div>
				<p>Longitude</p>
				<input type="text" />
			</div>
			<input type="button" value="Add to Cart" />
		</div>
		<div></div>
	</div>
</template>

<script setup>
//import

//values
const isMobile = ref(false);

//function

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
#create {
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

#inputs {
	width: 30%;
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
