<template>
	<div class="gamecard">
		<a-card style="height:100%;" :bodyStyle="{ padding: 0 }" :bordered="false">
			<div class="content">
				<div class="cardicon">
					<img src="@/assets/img.png" alt="img" />
				</div>
				<div class="cardleft">
					<div class="up">游戏名游戏名</div>
					<div class="desc">
						sahfadjkfahsduifhaewfuiaweryhjsdkfasdfnasdfjbhsajkfhbasjkdfhbjkasfhnkjsfhnsfhjfjksdf
					</div>
					<div class="down-button">
						<a-button>动作冒险</a-button>
						<a-button>多人联机</a-button>
						<a-button>Q版画面</a-button>
					</div>
				</div>
			</div>
		</a-card>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	}
}
</script>
<style lang="less" scoped>
.gamecard {
	height: 100px;
	/deep/.ant-card-body {
		height: 100%;
		.content {
			height: 100%;

			display: flex;
			align-items: center;
			.cardicon {
				height: 100%;
				img {
					width: 100px;
					height: 100%;
					object-fit: cover;
				}
			}
			.cardleft {
				margin-left: 25px;
				.up {
					font-size: 21px;
					font-weight: 400;
					color: #272a2c;
				}
				.desc {
					width: 300px;
					font-size: 14px;
					font-weight: 400;
					color: #999999;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.down-button {
					.ant-btn {
						border-radius: 0;
						height: 18px;
						padding: 0;
						width: 60px;
						margin-right: 5px;
						text-align: center;
						font-size: 12px;
						color: #e0e0e0;
						border-color: #e0e0e0;
					}
				}
			}
		}
	}
}
</style>
