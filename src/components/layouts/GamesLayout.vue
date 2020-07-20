<!-- 新闻板块 -->
<template>
	<div class="games">
		<div class="games-banner">
			<img src="@/assets/bg.jpg" alt="" />
			<div class="gamescenter">
				<div class="title"><span>全部游戏</span></div>
			</div>
		</div>
		<div class="content">
			<div style="width: 100%">
				<a-radio-group v-model="tabPosition" style="margin-bottom:30px">
					<a-radio-button value="1">精品推荐</a-radio-button>
					<a-radio-button value="2">新品推荐</a-radio-button>
					<a-radio-button value="3">本周精品</a-radio-button>
					<a-radio-button value="4">单机游戏</a-radio-button>
					<a-radio-button value="5">网络游戏</a-radio-button>
				</a-radio-group>
				<a-tabs :activeKey="tabPosition">
					<a-tab-pane tab="Tab 1" key="1"> <router-view /></a-tab-pane>
					<a-tab-pane tab="Tab 2" key="2"> <router-view /></a-tab-pane>
					<a-tab-pane tab="Tab 3" key="3"> <router-view /></a-tab-pane>
					<a-tab-pane tab="Tab 4" key="4"> <router-view /></a-tab-pane>
					<a-tab-pane tab="Tab 5" key="5"> <router-view /></a-tab-pane>
				</a-tabs>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			tabPosition: '1'
		}
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
.games {
	.games-banner {
		position: relative;
		height: 130px;
		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
		.gamescenter {
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
	.content {
		width: 1200px;
		margin: 30px auto;
		/deep/.ant-tabs-bar {
			display: none;
		}
		.ant-radio-button-wrapper {
			text-align: center;
			height: 50px;
			width: 120px;
			border: 1px solid #b3b3b3;
			border-radius: 4px;
			padding: 0;
			line-height: 50px;
			font-size: 18px;
			color: #272a2c;
			margin-right: 25px;
		}
		.ant-radio-button-wrapper-checked {
			border: 0;
			background: #ff8212;
			color: #fff;
		}
	}
}
</style>
