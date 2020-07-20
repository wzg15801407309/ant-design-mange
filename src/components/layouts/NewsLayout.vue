<!-- 新闻板块 -->
<template>
	<div class="news">
		<div class="news-banner">
			<img src="@/assets/bg.jpg" alt="" />
			<div class="newscenter">
				<div class="title"><span>新闻中心</span></div>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {}
	},
	computed: {},
	watch: {},
	// 方法集合
	methods: {},
	created() {},
	mounted() {}
}
</script>
<style lang="less" scoped>
.news {
	.news-banner {
		position: relative;
		height: 130px;
		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
		.newscenter {
			width: 1200px;
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);

			.title {
				font-size: 30px;
				line-height: 30px;
				font-weight: 400;
				padding-left: 16px;
				color: #fff;
				border-left: 4px solid #ff8212;
			}
		}
	}
}
</style>
