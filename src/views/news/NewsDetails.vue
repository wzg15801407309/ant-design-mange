<!--  -->
<template>
	<div class="newsdetails">
		<a-card style="width: 100%;height:100%" :bodyStyle="{ padding: 0 }">
			<div class="cardcontent">
				<div class="cardtitle">
					<span>八强无弱旅，胜败岂能料——OPL季后赛首轮战报</span>
				</div>
				<div class="date">
					<a-icon type="clock-circle" style="margin-right: 28px" />2019-12-4
				</div>
				<div class="content"></div>
			</div>
		</a-card>
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
	methods: {}
}
</script>
<style lang="less" scoped>
.newsdetails {
	width: 1200px;
	margin: 20px auto;
	.cardcontent {
		margin: 10px 30px 0 30px;
		.cardtitle {
			font-size: 34px;
			font-weight: bold;
			color: #272a2c;
			padding: 30px 0;
		}
		.date {
			font-size: 16px;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			padding: 12px 0;
			border-bottom: 1px solid #dddddd;
			border-top: 1px solid #dddddd;
		}
		.content {
			min-height: 600px;
		}
	}
}
</style>
