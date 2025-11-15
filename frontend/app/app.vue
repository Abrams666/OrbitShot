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
const isMobile = ref(false);

//mount
onMounted(() => {
	//window size
	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>
