<template>
	<div id="window">
		<h3>Delete Account</h3>
		<div class="editBox">
			<p>Enter Current Password:</p>
			<input type="password" v-model="currentPwd" />
		</div>
		<div class="editBox">
			<p>Enter "I want to delete my account {{ name }}":</p>
			<input :type="inputType" v-model="newValue" />
		</div>
		<p id="err">{{ errMsg }}</p>
		<div class="buttonBox">
			<button id="submit" @click="submitEdit">Delete</button>
			<button id="cancel" @click="cancelEdit">Cancel</button>
		</div>
	</div>
</template>

<script setup>
//config
const config = useRuntimeConfig();
const emit = defineEmits(["send"]);

//values
const userId = ref(0);
const URL = config.public.apiBase;
const urlType = ref("");
const editType = ref("");
const inputType = ref("");
const currentPwd = ref("");
const checkPwd = ref("");
const showCheck = ref(false);
const newValue = ref("");
const errMsg = ref("");
const props = defineProps({
	id: Number,
	name: String,
});

//function
const verifyInput = () => {
	let isErr = false;
	errMsg.value = "";

	if (currentPwd.value == "") {
		errMsg.value += "Current password can't be empty.";
		isErr = true;
	}

	if (newValue.value == "") {
		errMsg.value += "Confirmation text can't be empty.";
		isErr = true;
	} else if (newValue.value !== `I want to delete my account ${props.name}`) {
		errMsg.value += "Confirmation text does not match.";
		isErr = true;
	}

	return isErr;
};

const submitEdit = async () => {
	if (verifyInput()) {
		return;
	}

	const res = await fetch(`${URL}api/auth/delete`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: props.id, currentPwd: currentPwd.value }),
	});

	const data = await res.json();

	if (res.status == 200) {
		localStorage.removeItem("token");
		window.location.href = "/";
	} else {
		errMsg.value = data.message;
	}
};

const cancelEdit = () => {
	emit("send", 0);
};

//run
onMounted(async () => {});
</script>

<style scoped>
#window {
	width: 40vw;
	height: auto;
	background-color: var(--bg2);
	border: 1px solid var(--dc1);
	border-top: 10px solid var(--dc1);
	padding: 2vh 2vw;
	position: fixed;
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	gap: 20px;
}

.editBox {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 10px;
}

.editBox input {
	width: 100%;
	height: 40px;
	background-color: var(--bg1);
	border-bottom: 1px solid var(--dc1);
	padding-left: 5px;
	color: var(--tc1);
}

.buttonBox {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

button {
	width: 20%;
	height: 40px;
	background-color: red;
	color: var(--tc1);
}

#cancel {
	background-color: gray;
}

#err {
	color: red;
}
</style>
