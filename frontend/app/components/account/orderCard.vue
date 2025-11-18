<template>
	<div id="card">
		<button v-if="showBtn" @click="viewOrder">View Order</button>
		<p v-if="showP">Processing</p>
		<div id="pos">
			<p>Longtitude:{{ props.long }}</p>
			<p>Latitude:{{ props.lat }}</p>
		</div>
		<div id="empity"></div>
	</div>
</template>

<script setup>
//value
const showBtn = ref(false);
const showP = ref(false);
const props = defineProps({
	id: Number,
	long: String,
	lat: String,
	status: Number,
});

//function
const viewOrder = () => {
	window.location.href = `/myorder/${props.id}`;
};

//run
onMounted(() => {
	if (props.status == 2) {
		showBtn.value = false;
		showP.value = true;
	} else if (props.status == 3) {
		showBtn.value = true;
		showP.value = false;
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

button {
	width: 5%;
	background-color: transparent;
	color: green;
	border: none;
	cursor: pointer;
}

p {
	color: yellow;
}

#pos {
	width: 20%;
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
	width: 75%;
}
</style>
