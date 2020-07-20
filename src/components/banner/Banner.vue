<!-- banner -->
<template>
	<div :class="['banner', device]">
		<div class="banner-bg">
			<a-carousel ref="bannerUP" autoplay>
				<div
					v-for="(item, index) in previewimgs"
					:key="index"
					class="imgDiv"
					style="position: relative;"
				>
					<img :src="item.img" />
					<div class="banner-center">
						<div class="center-words">
							<!-- <p class="bh1">{{ item.descUP }}</p> -->
							<p class="bh2">{{ item.descCenter }}</p>
							<p class="bh3">{{ item.descDown }}</p>
						</div>
						<a-button class="buttontype" @click="buttonClick(item.link)">{{
							$t('button.goOfficialWeb')
						}}</a-button>
					</div>
				</div>
			</a-carousel>
		</div>
	</div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { mapState } from 'vuex'
import Carousel from './Carousel'
export default {
	mixins: [mixinDevice],
	data() {
		// 这里存放数据
		return {
			previewimgs: [
				
				{
					img: require('@/assets/banner/banner2.jpg'),
					descUP: '나인: 9개의 비전절기',
					descCenter: '2020년 3월',
					descDown: 'COMING SOON',
					link:'https://lineage2m.plaync.com/'
				},
				{
					img: require('@/assets/banner/banner3.jpg'),
					descUP: '나인: 9개의 비전절기',
					descCenter: '하이엘프',
					descDown: '- 요정의 역습-',
					link:'https://lineagem.plaync.com/event/p2020/200129_update/index'
				},
				{
					img: require('@/assets/banner/banner4.jpg'),
					descUP: '나인: 9개의 비전절기',
					descCenter: '자유로운 전장',
					descDown: '상상을 초월한 대규모 전투',
					link:'https://v4.nexon.com/'
				},
				{
					img: require('@/assets/banner/banner5.jpg'),
					descUP: '나인: 9개의 비전절기',
					descCenter: 'RPG의 본색',
					descDown: '한손으로 즐기라',
					link:'https://www.afkarena.com/'
				},
				{
					img: require('@/assets/banner/banner6.jpg'),
					descUP: '나인: 9개의 비전절기',
					descCenter: '치칙.. 박사님...',
					descDown: '저의 목... 소리가 들리시나요? 치지직...',
					link:'https://arknights.kr/?utm_source=NAVER&utm_medium=cpm&utm_campaign=NaverBrandSearchAD_PC&utm_term=PC'
				},
				{
					img: require('@/assets/banner/banner.jpg'),
					descUP: '고수',
					descCenter: '웹툰의 고수들을 모바일 게임에서!',
					descDown: '그 때의 전율, 이제는 게임에서',
					link:'http://gosu.gamenanum.com?utm_source=gamenanum'
				},
				{
					img: require('@/assets/banner/banner1.jpg'),
					descUP: '나인: 9개의 비전절기',
					descCenter: '9가지 직업 자유 전환',
					descDown: '옛 정취를 느낄 수 있는 3D 그래픽',
					link:'https://play.google.com/store/apps/details?id=com.joymeka.syg.google&hl=ko&utm_source=gamenanum'
				},
				

			]
		}
	},
	
	// 监听属性 类似于data概念
	computed: {
		...mapState({
			device: state => state.app.device
		}),
		showDts() {
			return this.device == 'mobile'
		}
	},
	methods: {
		buttonClick(link) {
			window.open(link+'')
		},
		followChange(e) {
			this.$refs.bannerUP.goTo(e)
		}
	}
}
</script>
<style lang="less" scoped>
.banner {
	width: 100%;
	padding: 0;
	margin: 0;
	.imgDiv::before {
		content: '';
		background: rgba(0, 0, 0, 0.1);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.banner-bg {
		position: relative;
		.ant-carousel {
			img {
				object-fit: cover;
				width: 100%;
			}
			position: relative;
			/deep/.slick-track {
				line-height: 0;
			}
			/deep/ .slick-dots {
				width: 1200px;
				left: 50%;
				transform: translateX(-50%);
				height: auto;
				display:flex !important;
				    justify-content: flex-end;
				.slick-active {
					button {
						width: 24px;
						height: 24px;
						border-radius: 50%;
						border: 4px solid #ff8212;
					}
				}
				bottom: 140px;
				li {
					margin: 0 7px;
				}
			}
			.banner-center {
				position: absolute;
				top: 57%;
				left: 0;
				width: 100%;
				transform: translateY(-60%);
				display: flex;
				flex-direction: column;
				align-items: center;
				.center-words {
					text-align: center;
					p {
						font-size: 20px;
						margin: 0;
						line-height: 1;
						color: #fff;
						-webkit-font-smoothing: antialiased;
						text-shadow: 0 5px 4px rgba(0, 0, 0, 1);
					}
					p.bh1 {
						font-size: 2vw;
						font-weight: bold;
						color: #ff8212;
					}
					p.bh2 {
						font-size: 4vw;
						font-weight: bold;
						line-height: 1.6;
						margin-bottom: 10px;
						color: #ffffff;
						margin-bottom: 10px;
						text-shadow: 0 8px 12px rgba(0, 0, 0, 1);
					}
				}
				.buttontype {
					color: #ffffff;
					height: 40px;
					width: 250px;
					font-size: 20px;
					background: transparent;
					border-radius: 30px;
					font-weight: 500;
					box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
					margin-top: 70px;
					&.ant-btn {
						border: 2px solid #fff;
					}
					&:hover {
						background: #ff8212;
						border: 2px solid transparent;
					}
				}
			}
		}
		/deep/.ant-carousel .slick-dots li button {
			width: 24px;
			height: 24px;
			border-radius: 50%;
			opacity: 1;
		}
	}
}
.mobile {
	.banner-bg {
		position: relative;
		.ant-carousel {
			img {
				object-fit: cover;
				width: 100%;
			}
			/deep/ .slick-dots {
				width: 100%;
				bottom: -4px;
				.slick-active {
					button {
						width: 12px;
						height: 12px;
						border-radius: 50%;
						border: 2px solid #ff8212;
					}
				}
				li {
					float: none;
					margin: 0 5px;
				}
			}
			/deep/.slick-track {
				line-height: 0;
			}
			.banner-center {
				.center-words {
					text-align: center;
					p {
						font-size: 12px;
						line-height: 1.4px;
						margin: 0;
					}
					p.bh1 {
						font-size: 1.2vw;
						font-weight: bold;
						line-height: 1.2;
						color: #ff8212;
					}
					p.bh2 {
						font-size: 3vw;
						font-weight: bold;
						color: #ffffff;
						margin-bottom: 10px;
					}
				}
				.buttontype {
					color: #ffffff;
					height: 30px;
					width: 220px;
					font-size: 16px;
					line-height: 30px;
					background: transparent;
					border-radius: 30px;
					font-weight: 400;
					margin-top: 10px;
					&:hover {
						background: #ff8212;
					}
				}
			}
		}
		/deep/.ant-carousel .slick-dots li button {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			opacity: 1;
		}
	}
}
</style>
