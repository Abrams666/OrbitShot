<template>
	<section id="pay">
		<div id="base">
			<div id="left">
				<h1>Payment</h1>
				<div id="info">
					<div id="cards">
						<div id="front">
							<div id="top">
								<div>
									<img src="/favicon.ico" alt="" />
									<p>OrbitShot</p>
								</div>
								<img src="/pay/ic.png" alt="" />
							</div>
							<div id="mid">
								<input type="text" v-model="cardNumber" />
							</div>
							<div id="bot">
								<input type="text" id="name" v-model="cardName" />
								<div id="exp">
									<input type="text" id="mon" v-model="cardExpMonth" />
									<p>/</p>
									<input type="text" id="year" v-model="cardExpYear" />
								</div>
							</div>
						</div>
						<div id="back" disabled></div>
					</div>
					<div id="name"></div>
				</div>
				<input type="button" value="Confirm Payment" @click="pay" />
			</div>
			<div id="right">
				<h2>Choosen Items</h2>
				<div id="items">
					<cartCard v-for="item in itemData" :key="item.id" :id="item.id" :long="item.longtitude" :lat="item.latitude" />
				</div>
				<h3>Total:</h3>
			</div>
		</div>
	</section>
</template>

<script setup>
//import
import cartCard from "../components/cart/cartCard.vue";

//config
const config = useRuntimeConfig();

//values
const isMobile = ref(false);
const URL = config.public.apiBase;
const userId = ref(0);
const itemData = ref([]);
const checkedItems = ref([]);
const cardNumber = ref("0000 0000 0000 0000");
const cardName = ref("ABC DEF");
const cardExpMonth = ref("00");
const cardExpYear = ref("00");
const cardCVC = ref("000");
const items = useCookie("items", {
	maxAge: 5 * 60,
	sameSite: "strict",
	secure: true,
});

//function
const pay = () => {};

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
			console.log(itemData.value);
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
#pay {
	width: 100%;
	height: auto;
	min-height: 88vh;
	padding-top: 10vh;
	padding-bottom: 2vh;
	background-image: url("/index/bgc3.jpg");
	display: flex;
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
	height: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

#front {
	width: 70%;
	aspect-ratio: 8560 / 4800;
	padding: 5%;
	background-color: black;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-between;
}

#top {
	width: 100%;
	height: 25%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
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

#mid input {
	width: fit-content;
	height: 100%;
	background-color: transparent;
	border-bottom: 1px solid var(--tc1);
	color: var(--tc1);
	font-size: large;
}

#bot {
	width: 100%;
	height: 15%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#name {
	width: 30%;
	height: 100%;
	background-color: transparent;
	border-bottom: 1px solid var(--tc1);
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
	border-bottom: 1px solid var(--tc1);
	color: var(--tc1);
	font-size: medium;
	text-align: center;
}
</style>
