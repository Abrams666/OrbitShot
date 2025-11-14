<template>
	<div id="create">
		<div id="items"></div>
	</div>
</template>

<script setup>
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
