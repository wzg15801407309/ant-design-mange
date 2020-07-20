<template>
	<div class="newscards" @click="newsdetails">
		<a-card style="width: 100%;height:100%" :bodyStyle="{ padding: 0 }">
			<div class="cardcontent">
				<div class="cardtitle">
					<span>新闻标题新闻标题</span>
					<div>2019-12-5</div>
				</div>
				<div class="carddesc">
					<span
						>在本次会员权益更新后，玩家们只要尝试
						本账号未登陆过的网易游戏旗下产品，30
						天内即可享受一次充值返利。登陆新游
						戏，还可享受会员专属见面在本次会员权益更新后，玩家们只要尝试
						本账号未登陆过的网易游戏旗下产品，30
						天内即可享受一次充值返利。登陆新游 戏，还可享受会员专属见面</span
					>
				</div>
			</div>
		</a-card>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},
	methods: {
		newsdetails() { 
			this.$router.push({ name: 'newsdetails' })
		}
	}
}
</script>
<style lang="less" scoped>
.newscards {
	width: 285px;
	height: 200px;
	.ant-card-bordered {
		border: 0;
	}
	/deep/.ant-card-body {
		cursor: pointer;
		height: 100%;
		&:hover {
			.cardtitle {
				&::before {
					content: '';
					position: absolute;
					top: -10px;
					left: -15px;
					width: 0;
					height: 0;
					border-top: 20px solid #ff8212;
					border-right: 20px solid transparent;
					opacity: 1;
				}
			}
		}
	}
	.cardcontent {
		margin: 10px 15px 0 15px;
		height: 100%;
		.cardtitle {
			position: relative;
			height: 63px;
			width: 100%;
			border-bottom: 1px solid #f0f2f7;
			font-size: 16px;
			font-weight: 400;
			color: #272a2c;
			display: flex;
			align-items: center;
			&::before {
				content: '';
				position: absolute;
				top: -10px;
				left: -15px;
				width: 0;
				height: 0;
				border-top: 20px solid #9a9da3;
				border-right: 20px solid transparent;
				opacity: 0.2;
			}
			span {
				width: 100%;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			div {
				font-size: 14px;
				font-weight: 400;
				padding: 10px;
				color: #333333;
				background: #fff;
				position: absolute;
				bottom: -20px;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		.carddesc {
			flex: 1;
			font-size: 14px;
			font-weight: 400;
			color: #999;
			display: flex;
			justify-content: center;
			span {
				margin-top: 20px;
				width: 100%;
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>
