<template>
	<div id="card">
		<input type="checkbox" v-model="checked" />
		<div id="pos">
			<p>Longtitude:{{ props.long }}</p>
			<p>Latitude:{{ props.lat }}</p>
		</div>
		<div id="empity"></div>
		<div id="price">
			<p>$300</p>
		</div>
		<div id="delete">
			<button @click="deleteItem(props.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
		</div>
	</div>
</template>

<script setup>
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

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
const deleteItem = async (id) => {
	const res = await fetch(`${URL}api/order/delete`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: id }),
	});

	if (res.status == 200) {
		const data = await res.json();
		window.location.href = "/cart";
	} else {
		const data = await res.json();
		//console.log(data);
	}
};

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

#checkbox {
	width: 5%;
	height: auto;
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
	width: 60%;
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

#delete {
	width: 5%;
	height: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
}

button {
	background-color: transparent;
	color: red;
	border: none;
	cursor: pointer;
}
</style>
