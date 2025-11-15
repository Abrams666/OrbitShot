<template>
	<div ref="container" class="w-full h-full"></div>
</template>

<script setup>
//import
import { onMounted, ref } from "vue";

//config
const THREE = await import("three");
const container = ref(null);

//value
const initX = 0.9;
const initY = 4.8;
const tartgetX = ref(initX);
const tartgetY = ref(initY);
const props = defineProps({
	x: Number,
	y: Number,
});

//run
onMounted(() => {
	tartgetX.value = props.x + initX;
	tartgetY.value = props.y + initY;

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

		if (tartgetY - sphere.rotation.y > 0) {
			sphere.rotation.y += 0.01;
		} else if (tartgetY - sphere.rotation.y < 0) {
			sphere.rotation.y -= 0.01;
		}

		if (tartgetX - sphere.rotation.x > 0) {
			sphere.rotation.x += 0.01;
		} else if (tartgetX - sphere.rotation.x < 0) {
			sphere.rotation.x -= 0.01;
		}

		renderer.render(scene, camera);
	};

	animate();
});
</script>

<style>
/* 讓元件撐滿畫面 */
div {
	width: 100%;
	height: 100%;
}
</style>
