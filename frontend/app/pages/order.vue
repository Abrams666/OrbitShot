<template>
	<section id="create">
		<div id="glass">
			<div id="inputs">
				<h2>Creat New Order</h2>
				<div>
					<div class="in">
						<p>Latitude</p>
						<p class="err">{{ laterr }}</p>
					</div>
					<input type="text" v-bind="lat" />
				</div>
				<div>
					<div class="in">
						<p>Longitude</p>
						<p class="err">{{ longerr }}</p>
					</div>
					<input type="text" v-bind="long" />
				</div>
				<input id="submit" type="button" value="Add to Cart" @click="submit" />
			</div>
			<div id="animate"></div>
		</div>
	</section>
</template>

<script setup>
//values
const isMobile = ref(false);
const userId = ref(0);
const userName = ref("");
const URL = "http://localhost:5000/";
const laterr = ref("");
const longerr = ref("");
const lat = ref("");
const long = ref("");

//functions
const submit = () => {};

//run
onMounted(async () => {
	//token
	const token = localStorage.getItem("token");
	console.log("hello");

	//verify
	if (token != null) {
		const res = await fetch(`${URL}api/auth/verify`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (res.status == 200) {
			const data = await res.json();
			userId.value = data.decodedToken.id;
			userName.value = data.decodedToken.name;
		} else {
			localStorage.removeItem("token");
			userId.value = 0;
			window.location.href = "/login";
		}
	} else {
		userId.value = 0;
		window.location.href = "/login";
	}

	//window size
	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>

<style scoped>
input:focus {
	outline: none;
}

#create {
	width: 100vw;
	height: 100vh;
	background-image: url("/index/bgc3.jpg");
	display: flex;
	align-items: center;
	justify-content: center;
}

#glass {
	width: 100%;
	height: 85vh;
	padding: 5vh;
	padding-top: 10vh;
	backdrop-filter: blur(10px);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#inputs {
	width: 30%;
	height: auto;
	padding: 2%;
	backdrop-filter: blur(20px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
}

#inputs div {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 5px;
}

#inputs div input {
	width: 95%;
	height: 40px;
	padding-left: 5%;
	border-radius: 999px;
	background-color: transparent;
	border: 1px solid rgba(255, 255, 255, 0.4);
}

#submit {
	width: 100%;
	height: 40px;
	background-color: var(--dc1);
	border-radius: 999px;
	transition: transform 0.5s;
}

#submit:hover {
	transform: scale(1.05);
	transition: transform 0.5s;
}

#animate {
	width: 60%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--dc1);
}

.err {
	color: red;
}

.in {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
	flex-wrap: nowrap;
}
</style>
