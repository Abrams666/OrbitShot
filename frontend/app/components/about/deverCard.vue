<template>
	<div class="deverCard" :class="{ active: !isMobile, inactive: isMobile }">
		<div class="deverImg">
            <img :src="deverData.imgUrl" alt=""></img>
        </div>
		<div class="deverInfo">
            <h2>{{ deverData.name }}</h2>
            <p><font-awesome-icon icon="fa-solid fa-school" /> {{ deverData.academic }}</p>
            <p><font-awesome-icon icon="fa-solid fa-briefcase" /> {{ deverData.role }}</p>
            <a :href="`https://instagram.com/${deverData.igId}`"><font-awesome-icon icon="fa-brands fa-instagram" /> {{ deverData.igId }}</a>
        </div>
	</div>
</template>

<script setup>
//values
const isMobile = ref(false);
const props = defineProps({
    deverData: Object,
});

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
.deverCard {
    min-width: 300px;
    height: 180px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;
    background-color: var(--bg1);
    border-radius: 10px;
}
.deverCard.active {
    width: 500px;
}
.deverCard.inactive {
    width: 90%;
}

.deverImg {
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.deverImg img {
    width: 100%;
    height: auto;
    border-radius: 9999px;
}

.deverInfo {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    gap: 10px;
}
</style>
