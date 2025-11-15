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

//config
const THREE = await import("three");
const container = ref(null);

//values
const isMobile = ref(false);
const userId = ref(0);
const userName = ref("");
const URL = "http://localhost:5000/";
const laterr = ref("");
const longerr = ref("");
const lat = ref("");
const long = ref("");
const x = ref(0);
const y = ref(0);
const initX = 0.9;
const initY = 4.8;
const tartgetX = ref(initX);
const tartgetY = ref(initY);

//functions
const submit = () => {};

//run
onMounted(async () => {
	// x.value = lat.value;
	// y.value = long.value;

	// tartgetX.value = x + initX;
	// tartgetY.value = y + initY;

	const width = container.value.clientWidth;
	const height = container.value.clientHeight;

	//scene
	const scene = new THREE.Scene();

	//camera
	const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.position.z = 2;

	//render
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	container.value.appendChild(renderer.domElement);

	//texture
	const textureLoader = new THREE.TextureLoader();
	const earthTexture = textureLoader.load("/order/map.jpg");

	//earth
	const geometry = new THREE.SphereGeometry(1, 32, 32);
	const material = new THREE.MeshStandardMaterial({
		map: earthTexture,
	});
	const sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);

	//light
	const light1 = new THREE.DirectionalLight(0xffffff, 1);
	const light2 = new THREE.DirectionalLight(0xffffff, 1);
	//light1.position.set(-5, -5, 5);
	light2.position.set(5, 5, 5);
	//scene.add(light1);
	scene.add(light2);

	//move
	const animate = () => {
		requestAnimationFrame(animate);
		sphere.rotation.y += 0.005;
		sphere.rotation.x = 0;

		// if (tartgetY - sphere.rotation.y > 0) {
		// 	sphere.rotation.y += 0.01;
		// } else if (tartgetY - sphere.rotation.y < 0) {
		// 	sphere.rotation.y -= 0.01;
		// }

		// if (tartgetX - sphere.rotation.x > 0) {
		// 	sphere.rotation.x += 0.01;
		// } else if (tartgetX - sphere.rotation.x < 0) {
		// 	sphere.rotation.x -= 0.01;
		// }

		renderer.render(scene, camera);
	};

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
