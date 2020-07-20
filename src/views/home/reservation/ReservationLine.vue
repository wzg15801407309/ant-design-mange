<template>
	<div :class="['reservation']">
		<div class="title">
			<p>{{ $t('home.onlineToday') }}</p>
		</div>
		<div :class="['content']">
			<a-carousel
				arrows
				:dots="false"
				:slidesToShow="showDts"
				:infinite="false"
				variableWidth
				:draggable="true"
				ref="car"
			>
				<div
					slot="prevArrow"
					class="custom-slick-arrow"
					style="left: -45px;zIndex: 9999"
				>
					<img src="@/assets/左.png" alt="" />
					<!-- <a-icon type="left-circle" @click="prev" /> -->
				</div>
				<div
					slot="nextArrow"
					class="custom-slick-arrow"
					style="right: -35px;zIndex: 9999"
				>
					<img src="@/assets/右.png" alt="" />
				</div>
				<div
					style="width: 204px;"
					:class="['divimg']"
					v-for="(item, key) in reservationData"
					:key="key"
				>
					<ReservationCard :item="item" />
				</div>
			</a-carousel>
		</div>
	</div>
</template>
<script>
import ReservationCard from './ReservationCard'
import { mixinDevice } from '@/utils/mixin'
import { mapState } from 'vuex'
export default {
	mixins: [mixinDevice],
	components: {
		ReservationCard
	},
	data() {
		return {
			slidesShowNum: 5,
			reservationData: [
				{
					isOnline: true,
					date: '2019-12-7',
					title: '리니지M',
					type: 3,
					showtext:4,
					tag: 3,
					description: '요정의 재탄생. 요정 클래스 능력치 전반 상향 및 속성별 스킬 개선.' /*12月第一个周六大狂欢*/,
					link:
						'https://lineagem.plaync.com/event/p2020/200129_update/index',
					src: 'https://cdn.gamenanum.co.kr/group1/M00/00/09/eX0-xF5U-42AXwPaAABJRuCNGW0483.jpg'
				},
				{
					isOnline: false,
					date: '2019-12-10',
					title: '리니지2M',
					type: 3,
					showtext:4,
					tag: 3,
					description:
						'곧 미스터리의 정체가 공개됩니다!',
					link:
						'https://lineage2m.plaync.com/',
					src: 'https://cdn.gamenanum.co.kr/group1/M00/00/09/eX0-xF5U-5mAbOtVAABI5zFVn4Y343.jpg'
				},
				{
					isOnline: false,
					date: '2019-12-13',
					title: 'v4',
					type: 3,
					showtext:4,
					tag: 4,
					description:
						'대규모 업데이틀 통한 신규 클래스 및 신규 서버 출시!',
					link:
						'https://v4.nexon.com/',
					src: 'https://cdn.gamenanum.co.kr/group1/M00/00/09/eX0-xF5U-2eAI8ATAAA5yJ4g5Po928.jpg'
				},
				{
					isOnline: false,
					date: '2019-12-18',
					title: 'AFK 아레나',
					type: 3,
					showtext:4,
					tag: 3,
					description:
						'간편하고 진화된 방치형 RPG. 참신한 일러스트와 독창적인 세계관으로 게임의 재미를 가져다드리겠습니다',
					link:'https://www.afkarena.com/',
					src: 'https://cdn.gamenanum.co.kr/group1/M00/00/09/eX0-xF5U-3eASCnHAABSRflaCWA693.jpg'
				},
				{
					isOnline: false,
					date: '2019-12-24',
					title: '명일방주',
					type: 3,
					showtext:3,
					tag: 0,
					description:
						'치밀하고 효율적인 전략과 덱 구성이 힘드시죠? 저희가 정성을 다해 준비한 일러스트를 감상하시면서 피로를 푸세요~',
					link:
						'https://arknights.kr/?utm_source=NAVER&utm_medium=cpm&utm_campaign=NaverBrandSearchAD_PC&utm_term=PC',
					src: 'https://cdn.gamenanum.co.kr/group1/M00/00/09/eX0-xF5U-4OALebAAABJYfzmGnE221.jpg'
				},
				{
					isOnline: false,
					date:'2019-12-23',
					title: '고수 with NAVER WEBTOON',
					type: 0 /*0：前往下载，1：前往预约，2：前往论坛，3：前往官网*/,
					showtext:3,/** 时间下面的文字显示 */
					tag: 0 /*0：上线，1：预约，2：论坛，3：官网，4：活动*/,
					description:
						'대한민국 무협의 전설, 긴 잠에서 깨어나 모바일게임으로 부활!',
					link:
						'https://play.google.com/store/apps/details?id=com.pang.gs.google&utm_source=gamenanum',
					src: 'https://cdn.gamenanum.co.kr/assets/gamenanum/高手.jpg'
				},
				{
					isOnline: false,
					date: '2019-12-3',
					title: '나인: 아홉개의 비전절기',
					type: 0,
					showtext:3,
					tag: 0,
					description:
						'깨달음을 얻은 삼장법사와 두 제자, 그리고 저마다의 삶을 살던',
					link:
						'https://play.google.com/store/apps/details?utm_source=gamenanum&id=com.joymeka.syg.google',
					src: 'https://cdn.gamenanum.co.kr/assets/gamenanum/逍遥诀.jpg'
				},
			]
		}
	},
	computed: {
		...mapState({
			device: state => state.app.device
		}),
		showDts() {
			if (this.device == 'mobile') {
				return 0
			} else {
				return 5
			}
		}
	}
}
</script>
<style lang="less" scoped>
.reservation {
	margin-top: 70px;
	.title {
		border-left: 4px solid #ff8212;
		p {
			margin-left: 16px;
			font-size: 20px;
			font-weight: 600;
		}
	}
	.content {
		margin-top: 30px;
	}
	.mobile {
		.reservation {
			margin-top: 30px;
		}
	}
}
.mobile {
	.reservation {
		margin: 30px 0px 0 10px;
		.custom-slick-arrow {
			display: none !important;
		}
	}
}
</style>
