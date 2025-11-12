<template></template>

<script setup>
//import

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

<style scoped></style>
