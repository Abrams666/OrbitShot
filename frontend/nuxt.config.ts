// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	css: ["~/assets/css/css.css"],
	app: {
		head: {
			title: "OrbitShot",
			meta: [{ name: "description", content: "高解析太空影像訂製服務" }],
		},
	},
	runtimeConfig: {
		apiSecret: "",
		apiBase: "",

		public: {
			apiBase: "",
		},
	},
});
