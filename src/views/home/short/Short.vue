<!--  -->
<template>
	<div :class="['shortmain', device]">
		<div class="shortlist">
			<div class="shortlistTite">
				<TopTitle :titlewords="words" />
				<div class="more" @click="newsdetails">更多>></div>
			</div>
			<div class="shortcontent">
				<a-row type="flex" justify="start">
					<a-col :md="24" :lg="10">
						<div class="shortC">
							<p class="shorttitle">单机游戏</p>
							<div class="stand-alone-game">
								<ul>
									<li v-for="(item, i) in standalonegame" :key="i">
										<p>{{ item.title }}</p>
										<img v-if="item.type == 1" src="@/assets/h.png" alt="" />
										<img v-if="item.type == 2" src="@/assets/n.png" alt="" />
									</li>
								</ul>
							</div>
						</div>
					</a-col>
					<a-col :md="24" :lg="14">
						<div class="shortC">
							<p class="shorttitle">网络游戏</p>
							<div class="online-game">
								<ul>
									<li v-for="(item, i) in onlinegame" :key="i">
										<p>{{ item.title }}</p>
										<img v-if="item.type == 1" src="@/assets/h.png" alt="" />
										<img v-if="item.type == 2" src="@/assets/n.png" alt="" />
									</li>
								</ul>
							</div>
						</div>
					</a-col>
				</a-row>
			</div>
			<div class="shortfooter">
				<div @click="newsdetails" class="moreBtn">
					<a-button>查看更多</a-button>
				</div>
				<div class="moregame">
					<div class="listw">
						<img src="@/assets/h.png" alt="" />
						<span>热门游戏</span>
					</div>
					<div class="listw" style="margin-left: 20px;">
						<img src="@/assets/n.png" alt="" />
						<span>最新游戏</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TopTitle from '@/components/title/TopTitle'
import { mixinDevice } from '@/utils/mixin'
export default {
	components: { TopTitle },
	mixins: [mixinDevice],
	data() {
		return {
			words: '游戏分类',
			standalonegame: [
				{ title: '游戏名', type: 1 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 2 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 2 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 1 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 1 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 }
			],
			onlinegame: [
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 2 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 1 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 1 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 2 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 1 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 0 },
				{ title: '游戏名', type: 2 },
				{ title: '游戏名', type: 0 }
			]
		}
	},
	computed: {},
	watch: {},
	methods: {
		newsdetails() { 
			this.$router.push({ name: 'gamesRecommended' })
		}
	}
}
</script>
<style lang="less" scoped>
.shortmain {
	height: 100%;
	width: 1200px;
	margin: 0 auto;
	.shortlist {
		height: 100%;
		padding: 35px 0;
		.shortlistTite {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.more {
				display: none;
				font-size: 20px;
				font-weight: 400;
				color: #333;
			}
		}
		.shortcontent {
			.shortC {
				height: 100%;
				border-left: 1px solid #f5f5f5;
				padding-top: 20px;
				.shorttitle {
					margin-left: 17px;
					font-size: 20px;
					font-weight: bold;
					color: #ff8212;
				}
				.stand-alone-game {
					margin: 25px 0 0 17px;
					li {
						width: 50%;
						float: left;
						display: flex;
						align-items: center;
						height: 30px;
						font-size: 16px;
						font-weight: 400;
						color: #6a6662;
						cursor: pointer;
						&:hover {
							color: black;
						}
						img {
							width: 15px;
							height: 15px;
							margin-left: 5px;
						}
					}
				}
				.online-game {
					margin: 25px 0 0 17px;
					li {
						width: 33.3%;
						float: left;
						display: flex;
						align-items: center;
						height: 30px;
						font-size: 16px;
						font-weight: 400;
						color: #6a6662;
						cursor: pointer;
						&:hover {
							color: black;
						}
						img {
							width: 15px;
							height: 15px;
							margin-left: 5px;
						}
					}
				}
			}
		}
	}
	.shortfooter {
		text-align: center;
		.moregame {
			margin-top: 20px;
			.listw {
				display: inline;

				font-size: 12px;
				font-weight: 400;
				color: #6a6662;
				img {
					height: 14px;
					width: 14px;
					object-fit: cover;
					margin-right: 0 5px;
				}
			}
		}

		.ant-btn {
			border-radius: 0;
			width: 120px;
			height: 38px;
			background: #f0f0f0;
			border-color: #f0f0f0;
			color: #6a6662;
			&:hover {
				border-color: #f0f0f0;
			}
		}
	}
}
.mobile {
	&.shortmain {
		padding: 0 10px;
		width: 100%;
		.shortlistTite {
			.more {
				display: block;
			}
		}
		.shortfooter {
			.moreBtn {
				display: none;
			}
		}
	}
}
</style>
