<template>
	<section id="pay" :class="{ active: !isMobile, inactive: isMobile }">
		<div id="base" :class="{ active: !isMobile, inactive: isMobile }">
			<div id="left">
				<h1>Payment</h1>
				<div id="info">
					<div id="cards">
						<div id="front" :class="{ active: !flip, inactive: flip }">
							<div id="top">
								<div>
									<img src="/favicon.ico" alt="" />
									<p>OrbitShot</p>
								</div>
								<img src="/pay/ic.png" alt="" />
							</div>
							<div id="mid">
								<input type="text" placeholder="0000 0000 0000 0000" v-model="cardNumber" />
							</div>
							<div id="bot">
								<input type="text" id="name" placeholder="Your Name" v-model="cardName" />
								<div id="exp">
									<input type="text" id="mon" placeholder="MM" v-model="cardExpMonth" />
									<p>/</p>
									<input type="text" id="year" placeholder="YY" v-model="cardExpYear" />
								</div>
							</div>
						</div>
						<div id="back" :class="{ active: flip, inactive: !flip }">
							<div id="backTop"></div>
							<div id="backMid">
								<input type="text" id="write" placeholder="Your Name" v-model="cardName" />
								<input type="text" placeholder="123" v-model="cardCVC" />
							</div>
							<div id="backBot">
								<p>
									This card must be signed to be valid. Unauthorized use is prohibited. If found, please return to the issuing bank.
								</p>
							</div>
						</div>
						<button class="flip" @click="toggleFlip">></button>
					</div>
				</div>
				<input type="button" value="Confirm Payment" @click="pay" />
			</div>
			<div id="right">
				<h2>Choosen Items</h2>
				<div id="items">
					<payCard v-for="item in itemData" :key="item.id" :id="item.id" :long="item.longtitude" :lat="item.latitude" />
				</div>
				<h3 id="total">Total: ${{ totalMoney }}</h3>
			</div>
		</div>
	</section>
</template>

<script setup>
//import
import payCard from "../components/cart/payCard.vue";

//config
const config = useRuntimeConfig();

//values
const isMobile = ref(false);
const URL = config.public.apiBase;
const userId = ref(0);
const itemData = ref([]);
const checkedItems = ref([]);
const cardNumber = ref("");
const cardName = ref("");
const cardExpMonth = ref("");
const cardExpYear = ref("");
const cardCVC = ref("");
const totalMoney = ref(0);
const flip = ref(false);
const autoInput = ref(false);
const isLastBlank = ref(false);
const items = useCookie("items", {
	maxAge: 5 * 60,
	sameSite: "strict",
	secure: true,
});

//function
const pay = () => {};

const toggleFlip = () => {
	flip.value = !flip.value;
};

const checkCardNum = () => {
	const lastChar = cardNumber.value.charAt(cardNumber.value.length - 1);

	if (cardNumber.value.length > 19) {
		autoInput.value = true;
		cardNumber.value = cardNumber.value.slice(0, 19);
		return;
	}

	if (isNaN(lastChar)) {
		autoInput.value = true;
		cardNumber.value = cardNumber.value.slice(0, -1);
		return;
	}

	if (cardNumber.value.length == 5 || cardNumber.value.length == 5 + 5 || cardNumber.value.length == 5 + 5 + 5) {
		if (lastChar === " ") {
			isLastBlank.value = true;
		} else {
			autoInput.value = true;
			cardNumber.value = cardNumber.value.slice(0, -1) + " " + lastChar;
		}
		return;
	}

	if ((cardNumber.value.length == 4 || cardNumber.value.length == 4 + 5 || cardNumber.value.length == 4 + 5 + 5) && isLastBlank.value) {
		autoInput.value = true;
		cardNumber.value = cardNumber.value.slice(0, -1);
		return;
	}

	if (cardNumber.value.length == 16 && cardNumber.value[4] != " " && cardNumber.value[9] != " " && cardNumber.value[14] != " ") {
		autoInput.value = true;
		cardNumber.value =
			cardNumber.value.slice(0, 4) +
			" " +
			cardNumber.value.slice(4, 8) +
			" " +
			cardNumber.value.slice(8, 12) +
			" " +
			cardNumber.value.slice(12, 16);
		return;
	}

	isLastBlank.value = false;
};

const checkCardMonth = () => {
	if (isNaN(cardExpMonth.value)) {
		cardExpMonth.value = cardExpMonth.value.slice(0, -1);
	}

	if (cardExpMonth.value.length > 2) {
		cardExpMonth.value = cardExpMonth.value.slice(1, 3);
	}

	if (cardExpMonth.value.length == 0) {
		cardExpMonth.value = "00";
	}

	if (cardExpMonth.value.length == 1) {
		cardExpMonth.value = "0" + cardExpMonth.value;
	}
};

const checkCardYear = () => {
	if (isNaN(cardExpYear.value)) {
		cardExpYear.value = cardExpYear.value.slice(0, -1);
	}

	if (cardExpYear.value.length > 2) {
		cardExpYear.value = cardExpYear.value.slice(1, 3);
	}

	if (cardExpYear.value.length == 0) {
		cardExpYear.value = "00";
	}

	if (cardExpYear.value.length == 1) {
		cardExpYear.value = "0" + cardExpYear.value;
	}
};

const checkCardCVC = () => {
	if (isNaN(cardCVC.value)) {
		cardCVC.value = cardCVC.value.slice(0, -1);
	}

	if (cardCVC.value.length > 3) {
		cardCVC.value = cardCVC.value.slice(1, 4);
	}

	if (cardCVC.value.length == 0) {
		cardCVC.value = "000";
	}

	if (cardCVC.value.length == 1) {
		cardCVC.value = "00" + cardCVC.value;
	}

	if (cardCVC.value.length == 2) {
		cardCVC.value = "0" + cardCVC.value;
	}
};

//run
onMounted(async () => {
	//items
	checkedItems.value = useCookie("items")._value;
	console.log(checkedItems.value);

	//token
	const token = localStorage.getItem("token");

	//verify
	if (token != null) {
		const res = await fetch(`${URL}api/auth/verify`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (res.status == 200) {
			for (let i = 0; i < checkedItems.value.length; i++) {
				const res2 = await fetch(`${URL}api/order/getPayItem`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ id: checkedItems.value[i] }),
				});

				if (res2.status == 200) {
					const data2 = await res2.json();
					itemData.value.push(data2.data);
				} else {
					window.location.href = "/order";
				}
			}

			totalMoney.value = itemData.value.length * 300;
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

watch(cardNumber, () => {
	if (!autoInput.value) {
		checkCardNum();
	}
	autoInput.value = false;
});

watch(cardExpMonth, () => {
	checkCardMonth();
});

watch(cardExpYear, () => {
	checkCardYear();
});

watch(cardCVC, () => {
	checkCardCVC();
});
</script>

<style scoped>
#pay {
	width: 100%;
	height: auto;
	min-height: 88vh;
	padding-top: 10vh;
	padding-bottom: 2vh;
	background-image: url("/index/bgc3.jpg");
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

#base {
	width: 92%;
	height: auto;
	padding: 2%;
	background-color: var(--bg2);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#left {
	width: 35%;
	height: 100%;
	padding: 2%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	border-right: 1px solid var(--tc1);
}

#left h1 {
	width: 100%;
}

#left input[type="button"] {
	width: 60%;
	height: 40px;
	background-color: var(--dc1);
	color: var(--tc1);
	font-size: large;
	border: none;
	border-radius: 999px;
	cursor: pointer;
	transition: transform 0.3s;
}

#left input[type="button"]:hover {
	transform: scale(1.05);
	transition: transform 0.3s;
}

#right {
	width: 60%;
	height: 100%;
	padding: 2%;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 20px;
}

#items {
	width: 100%;
	height: auto;
	min-height: 200px;
	background-color: var(--bg1);
	border-radius: 10px;
	padding: 2%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 10px;
}

#info {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 20px;
}

#cards {
	width: 100%;
	aspect-ratio: 8560 / 4800;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
	gap: 10px;
	perspective: 1000px;
}

#front {
	width: 70%;
	aspect-ratio: 8560 / 4800;
	padding: 5%;
	background-color: black;
	border-radius: 15px;
	position: absolute;
	top: 0;
	left: 50%;
	margin-left: -40%;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-between;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}

#back {
	width: 70%;
	aspect-ratio: 8560 / 4800;
	padding: 5%;
	background-color: var(--dc1);
	border-radius: 15px;
	position: absolute;
	top: 0;
	left: 50%;
	margin-left: -40%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}

#top {
	width: 100%;
	height: 25%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#backTop {
	width: 114%;
	height: 25%;
	background-color: black;
}

#top div {
	width: auto;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
	gap: 10px;
}

input[type="text"] {
	font-family: "number", sans-serif;
}

#top div img {
	width: auto;
	height: 100%;
}

#top img {
	width: auto;
	height: 100%;
}

#mid {
	width: 100%;
	height: 15%;
}

#backMid {
	width: 100%;
	height: 15%;
	background-color: white;
	padding: 3px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#write {
	font-family: "Handlee-Regular", sans-serif;
}

#backMid input {
	width: 20%;
	height: 100%;
	background-color: transparent;
	border: none;
	border-left: 2px solid black;
	color: black;
	font-size: large;
	text-align: end;
	font-family: sans-serif;
}

#backMid input:first-child {
	width: 80%;
	height: 100%;
	background-color: transparent;
	border: 0;
	color: black;
	font-size: large;
	text-align: start;
	font-family: "Handlee-Regular", sans-serif;
}

#mid input {
	width: 85%;
	height: 100%;
	background-color: transparent;
	border-bottom: 0px solid var(--tc1);
	color: var(--tc1);
	font-size: x-large;
}

#bot {
	width: 100%;
	height: 15%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#backBot {
	height: auto;
	background-color: transparent;
	border: none;
	color: var(--tc1);
	font-size: small;
}

#name {
	width: 30%;
	height: 100%;
	background-color: transparent;
	border-bottom: 0px solid var(--tc1);
	color: var(--tc1);
	font-size: medium;
}

#exp {
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
}

#mon,
#year {
	width: 20%;
	height: 100%;
	background-color: transparent;
	border-bottom: 0px solid var(--tc1);
	color: var(--tc1);
	font-size: medium;
	text-align: center;
}

#total {
	width: 100%;
	text-align: end;
	font-size: large;
	font-weight: bold;
}

.flip {
	background-color: transparent;
	color: var(--tc1);
	border: none;
	cursor: pointer;
	font-size: x-large;
}

#front.active,
#back.active {
	animation: flip1 0.25s linear forwards;
}

#front.inactive,
#back.inactive {
	animation: flip2 0.25s linear forwards;
}

@keyframes flip1 {
	0% {
		display: none;
		transform: rotate3d(0, 1, 0, -90deg);
	}
	50% {
		display: flex;
		transform: rotate3d(0, 1, 0, -90deg);
	}
	100% {
		display: flex;
		transform: rotate3d(0, 1, 0, 0deg);
	}
}

@keyframes flip2 {
	0% {
		display: flex;
		transform: rotate3d(0, 1, 0, 0deg);
	}
	50% {
		display: flex;
		transform: rotate3d(0, 1, 0, 90deg);
	}
	100% {
		display: none;
		transform: rotate3d(0, 1, 0, 90deg);
	}
}

#base.inactive {
	flex-direction: column;
}

#base.inactive #left {
	width: 95%;
	border: 0;
	align-items: center;
	justify-content: center;
}

#base.inactive #right {
	width: 85%;
}

#base.inactive #mid input {
	font-size: larger;
}

#pay.inactive {
	align-items: start;
}
</style>
