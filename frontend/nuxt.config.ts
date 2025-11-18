// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	css: ["~/assets/css/css.css"],
	app: {
		head: {
			title: "OrbitShot",
			meta: [
				{ name: "description", content: "高解析太空影像訂製服務" },
				{ name: "google-site-verification", content: "flD5G-N7i0uH2i41RYc5xMR77g_zwaD8kPdFdjCZ_1Q" },
			],
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
