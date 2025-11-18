<template>
	<div id="window">
		<h3>Edit {{ editType }}</h3>
		<div class="editBox">
			<p>Enter Current Password:</p>
			<input type="password" v-model="currentPwd" />
		</div>
		<div class="editBox">
			<p>Enter New {{ editType }}:</p>
			<input :type="inputType" v-model="newValue" />
		</div>
		<div class="editBox" v-if="showCheck">
			<p>Check New Password:</p>
			<input type="password" v-model="checkPwd" />
		</div>
		<p id="err">{{ errMsg }}</p>
		<div class="buttonBox">
			<button id="submit" @click="submitEdit">Submit</button>
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
	editType: Number,
	id: Number,
});

//function
const verifyInput = () => {
	let isErr = false;
	errMsg.value = "";

	if (currentPwd.value == "") {
		errMsg.value += "Current password can't be empty.";
		isErr = true;
	}

	if (props.editType == 1) {
		if (newValue.value == "") {
			errMsg.value += "New name can't be empty.";
			isErr = true;
		}
	} else if (props.editType == 2) {
		if (newValue.value == "") {
			errMsg.value += "New password can't be empty.";
			isErr = true;
		} else if (newValue.value != checkPwd.value) {
			errMsg.value += "New password and check password do not match.";
			isErr = true;
		}
	}

	return isErr;
};

const submitEdit = async () => {
	if (verifyInput()) {
		return;
	}

	const res = await fetch(`${URL}api/auth/edit${urlType.value}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: props.id, currentPwd: currentPwd.value, newValue: newValue.value }),
	});

	const data = await res.json();

	if (res.status == 200) {
		localStorage.setItem("token", data.token);
		emit("send", 0);
		window.location.href = "/account";
	} else {
		errMsg.value = data.message;
	}
};

const cancelEdit = () => {
	emit("send", 0);
};

//run
onMounted(async () => {
	userId.value = props.id;

	if (props.editType == 1) {
		editType.value = "Name";
		urlType.value = "name";
		inputType.value = "text";
	} else if (props.editType == 2) {
		editType.value = "Password";
		urlType.value = "password";
		inputType.value = "password";
		showCheck.value = true;
	}
});
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
	background-color: var(--dc1);
	color: var(--tc1);
}

#cancel {
	background-color: gray;
}

#err {
	color: red;
}
</style>
