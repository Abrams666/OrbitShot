<template>
	<div id="card">
		<input type="checkbox" />
		<div id="pos">
			<p>Longtitude:{{ props.long }}</p>
			<p>Latitude:{{ props.lat }}</p>
		</div>
		<div id="price">
			<p>$300</p>
		</div>
	</div>
</template>

<script setup>
//values
const isMobile = ref(false);
const props = defineProps({
	id: Number,
	long: String,
	lat: String,
});

//function

//run
onMounted(() => {
	console.log(id);

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
	background-color: var(--bg1);
	padding: 2%;
	border-radius: 5px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#card input {
	width: 10%;
}

#pos {
	width: 80%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
	gap: 10px;
}

#pos p {
	font-size: medium;
}

#price {
	width: 5%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
}

#price p {
	font-size: medium;
}
</style>
