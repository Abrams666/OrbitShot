<template>
	<div id="card">
		<div id="pos">
			<p>Longtitude:{{ props.long }}</p>
			<p>Latitude:{{ props.lat }}</p>
		</div>
		<div id="empity"></div>
		<div id="price">
			<p>$300</p>
		</div>
	</div>
</template>

<script setup>
//config
const config = useRuntimeConfig();
const emit = defineEmits(["send"]);

//values
const URL = config.public.apiBase;
const isMobile = ref(false);
const props = defineProps({
	id: Number,
	long: String,
	lat: String,
});
const checked = ref(false);

//function

//run
watch(checked, () => {
	emit("send", checked.value ? 1 : 0, props.id);
});

onMounted(() => {
	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>

<style scoped>
#card {
	width: 96%;
	height: 40px;
	background-color: var(--bg2);
	padding: 2%;
	border-radius: 5px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#pos {
	width: 40%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
	gap: 10px;
}

#pos p {
	width: 50%;
	font-size: medium;
}

#empity {
	width: 50%;
}

#price {
	width: 10%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
}

#price p {
	font-size: medium;
}
</style>
