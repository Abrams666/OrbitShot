<template>
	<footer>
		<div class="footer-content" :class="{ active: !isMobile, inactive: isMobile }">
			<div class="content-section">
				<p class="section-title" :class="{ active: !isMobile, inactive: isMobile }">Quick Links:</p>
				<ul>
					<li><font-awesome-icon icon="fa-solid fa-house" /><a href="/" :class="{ active: !isMobile, inactive: isMobile }">Home</a></li>
					<li>
						<font-awesome-icon icon="fa-solid fa-circle-info" /><a href="/about" :class="{ active: !isMobile, inactive: isMobile }"
							>About</a
						>
					</li>
					<li>
						<font-awesome-icon icon="fa-solid fa-image" /><a href="/sample" :class="{ active: !isMobile, inactive: isMobile }">Sample</a>
					</li>
					<li>
						<font-awesome-icon icon="fa-solid fa-cart-shopping" /><a href="/order" :class="{ active: !isMobile, inactive: isMobile }"
							>Order</a
						>
					</li>
					<li>
						<font-awesome-icon icon="fa-solid fa-user" /><a href="/account" :class="{ active: !isMobile, inactive: isMobile }">Account</a>
					</li>
				</ul>
			</div>
			<div class="content-section">
				<p class="section-title" :class="{ active: !isMobile, inactive: isMobile }">Contact:</p>
				<ul>
					<li>
						<font-awesome-icon icon="fa-solid fa-envelope" />
						<p :class="{ active: !isMobile, inactive: isMobile }">Email: admin@嗨.台灣</p>
					</li>
					<li>
						<font-awesome-icon icon="fa-brands fa-facebook" />
						<a href="#" :class="{ active: !isMobile, inactive: isMobile }">Facebook</a>
					</li>
					<li>
						<font-awesome-icon icon="fa-brands fa-instagram" />
						<a href="#" :class="{ active: !isMobile, inactive: isMobile }">Instagram</a>
					</li>
				</ul>
			</div>
			<div class="content-section">
				<p class="section-title" :class="{ active: !isMobile, inactive: isMobile }">Source:</p>
				<ul>
					<li>
						<font-awesome-icon icon="fa-brands fa-github" /><a
							href="https://github.com/Abrams666/OrbitShot"
							:class="{ active: !isMobile, inactive: isMobile }"
							>Github</a
						>
					</li>
				</ul>
			</div>
		</div>
		<div class="copyright">
			<p>Copyright © 2025 OrbitShot. All rights reserved.</p>
		</div>
	</footer>
</template>

<script setup>
//values
const isMobile = ref(false);

//functions

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
footer {
	width: 94vw;
	height: auto;
	padding: 3%;
	padding-top: 30px;
	padding-bottom: 10px;
	background-color: black;
	color: var(--tc1);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.footer-content {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: start;
}

.footer-content.active {
	width: 60%;
}

.footer-content.inactive {
	width: 90%;
}

.content-section {
	width: auto;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	gap: 5px;
}

.section-title.active {
	font-size: larger;
}

.section-title.inactive {
	font-size: smaller;
}

.copyright {
	width: 100%;
	text-align: center;
	margin-top: 10px;
	border-top: 1px solid var(--tc1);
}

.copyright p {
	width: 100%;
	height: auto;
}

ul {
	width: auto;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	gap: 2px;
}

ul li {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	gap: 5px;
}

li p.inactive,
li a.inactive {
	font-size: xx-small;
}
</style>
