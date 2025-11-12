<template>
	<div class="container">
		<div class="card">
			<div class="title">
				<h1>Login</h1>
			</div>
			<div class="input">
				<div class="id">
					<p>Account</p>
					<font-awesome-icon class="icon" icon="fa-solid fa-user" />
					<input type="text" v-model="id" />
				</div>
				<div class="pwd">
					<p>Password</p>
					<font-awesome-icon class="icon" icon="fa-solid fa-key" />
					<input type="password" v-model="pwd" />
				</div>
			</div>
			<div class="remember">
				<div>
					<input type="checkbox" />
					<p>Remember me</p>
				</div>
				<a href="/forget">Forget password?</a>
			</div>
			<div class="btn">
				<input type="button" value="Submit" @click="login" />
				<p class="error">{{ errorMsg }}</p>
			</div>
			<div class="register">
				Don't have an account?
				<a href="/register">Register</a>
			</div>
		</div>
	</div>
</template>

<script setup>
//import

//values
const isMobile = ref(false);
const id = ref("");
const pwd = ref("");
const errorMsg = ref("");

//functions

const login = async () => {
	errorMsg.value = "";
	let isErr = 0;

	if (id.value == "") {
		errorMsg.value += "Account can't be blank,";
		isErr = 1;
	}
	if (pwd.value == "") {
		errorMsg.value += "Password can't be blank,";
		isErr = 1;
	}

	if (isErr == 0) {
		// const res = await fetch("http://localhost:5000/api/auth/login", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify({ id: id.value, pwd: pwd.value }),
		// });
		// const data = await res.json();
		// errorMsg.value = data.message;
		// if (res.ok) {
		// 	localStorage.setItem("token", data.token);
		// 	navigateTo("/");
		// }
	}
};

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
.container {
	width: 100vw;
	height: 100vh;
	background-image: url("/index/bgc3.jpg");
	background-size: cover;
	background-position: center;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card {
	height: auto;
	width: 300px;
	backdrop-filter: blur(20px);
	border-radius: 20px;
	padding: 50px;
	border: 1px rgba(255, 255, 255, 0.3) solid;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
}

.title {
	margin-bottom: 10px;
}

.input {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	gap: 10px;
}

.id,
.pwd {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	gap: 5px;
}
.id input,
.pwd input {
	width: 100%;
	height: 35px;
	color: var(--tc1);
	padding-left: 15px;
	padding-right: 0px;
	font-size: medium;
	background-color: transparent;
	border: 1px rgba(255, 255, 255, 0.4) solid;
	border-radius: 999px;
}

.id input:focus,
.pwd input:focus {
	outline: none;
}

.remember {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.remember div {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 5px;
}

.btn {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 5px;
	margin-bottom: -10px;
}

.btn input {
	width: 100%;
	height: 40px;
	background-color: var(--dc1);
	border-radius: 999px;
	transition: transform 0.3s;
}

.btn input:hover {
	transform: scale(1.05);
	transition: transform 0.3s;
}

.icon {
	height: 15px;
	margin-top: -15px;
	position: relative;
	left: 290px;
	top: 30px;
}

.error {
	color: red;
	text-align: center;
}
</style>
