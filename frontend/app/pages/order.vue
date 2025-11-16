<template>
	<section id="create">
		<div id="glass">
			<div id="inputs">
				<h1>Create New Order</h1>
				<div>
					<div class="in">
						<p>Latitude</p>
						<p class="err">{{ laterr }}</p>
					</div>
					<input type="text" v-model="lat" />
				</div>
				<div>
					<div class="in">
						<p>Longitude</p>
						<p class="err">{{ longerr }}</p>
					</div>
					<input type="text" v-model="long" />
				</div>
				<input class="submit" type="button" value="Move to Position" @click="rotateTo" />
				<input class="submit" type="button" value="Add to Cart" @click="submit" />
			</div>
			<div id="animate">
				<div ref="container" class="earth"></div>
				<!-- <img id="earth" src="/order/map.jpg"></img> -->
			</div>
		</div>
	</section>
</template>

<script setup>
//import
import gsap from "gsap";
import dotenv from "dotenv";

//config
const THREE = await import("three");
const container = ref(null);
dotenv.config();

//values
const isMobile = ref(false);
const userId = ref(0);
const userName = ref("");
const URL = process.env.URL;
const laterr = ref("");
const longerr = ref("");
const lat = ref("");
const long = ref("");
let earth, camera, renderer, scene;

//functions
function latLngToVector3(lat, lng, radius = 1) {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lng + 180) * (Math.PI / 180);

	return new THREE.Vector3(-radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.cos(theta));
}

const submit = async () => {
	laterr.value = "";
	longerr.value = "";
	let isErr = 0;

	if (lat.value == "") {
		laterr.value += "Latitude can't be empty.";
		isErr = 1;
	} else {
		console.log(parseFloat(lat.value));
		if (!parseFloat(lat.value)) {
			laterr.value += "Latitude should be a number.";
			isErr = 1;
		} else if (parseFloat(lat.value) > 90 || parseFloat(lat.value) < -90) {
			laterr.value += "Latitude should between 90 to -90.";
			isErr = 1;
		}
	}

	if (long.value == "") {
		longerr.value += "Longtitude can't be empty.";
		isErr = 1;
	} else {
		if (parseFloat(long.value) == NaN) {
			longerr.value += "Longtitude should be a number.";
			isErr = 1;
		} else if (parseFloat(long.value) > 180 || parseFloat(long.value) < -180) {
			longerr.value += "Longtitude should between 180 to -180.";
			isErr = 1;
		}
	}

	if (isErr == 0) {
		rotateTo();

		const res = await fetch(`${URL}api/order/create`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ownerId: userId.value, long: long.value, lat: lat.value, status: 1 }),
		});

		if (res.status == 201) {
			alert("This new order has been added to your cart:)");
		} else {
			laterr.value("Server error.");
		}
	}
};

function initThree() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
	camera.position.z = 2;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(container.value.clientWidth, container.value.clientHeight);
	container.value.appendChild(renderer.domElement);

	// 球體（地球）
	const geometry = new THREE.SphereGeometry(1, 64, 64);
	const texture = new THREE.TextureLoader().load("/order/map.jpg");
	const material = new THREE.MeshStandardMaterial({ map: texture });

	earth = new THREE.Mesh(geometry, material);
	scene.add(earth);

	// 燈光
	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5, 5, 5);
	scene.add(light);
}

const animate = () => {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

function rotateTo() {
	const target = latLngToVector3(lat.value, long.value, 1);

	const quaternion = new THREE.Quaternion();
	quaternion.setFromUnitVectors(target.clone().normalize(), new THREE.Vector3(0, 0, 1));

	gsap.to(earth.quaternion, {
		x: quaternion.x,
		y: quaternion.y,
		z: quaternion.z,
		w: quaternion.w,
		duration: 1.5,
		ease: "power2.out",
	});
}

//run
onMounted(async () => {
	initThree();
	animate();

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
	background-color: black;
	/* background-image: url("/index/bgc3.jpg"); */
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
	gap: 20px;
	justify-content: center;
}

#inputs {
	width: 25%;
	height: auto;
	padding: 4%;
	backdrop-filter: blur(20px);
	border: solid 1px rgba(255, 255, 255, 0.4);
	border-radius: 10px;
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

.submit {
	width: 100%;
	height: 40px;
	background-color: var(--dc1);
	border-radius: 999px;
	transition: transform 0.5s;
}

.submit:hover {
	transform: scale(1.05);
	transition: transform 0.5s;
}

#animate {
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
}

.earth {
	width: 100%;
	height: 100%;
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
