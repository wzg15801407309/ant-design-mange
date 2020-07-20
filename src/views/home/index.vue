<!-- 主页显示 -->
<template>
	<div class="main">
		<Banner />
		<div :class="['container', device]">
			<!-- news -->
			<!-- <div class="news" v-if="showDts"><news /></div> -->
			<!-- reservations -->
			<div class="reservations">
				<reservation-line />
			</div>
			<!-- gift package -->
			<div class="gift-package">
				<gift-package />
			</div>
			<!-- boutique -->
			<!-- <div class="boutique" style="margin-bottom: 45px;">
				<Boutique />
			</div> -->
		</div>
		<!-- sort -->
		<!-- <div class="short">
			<Short />
		</div> -->
	</div>
</template>
<script>
import GiftPackage from './card/GiftPackage.vue'
import ReservationLine from './reservation/ReservationLine.vue'
// import News from './news/News.vue'
// import Boutique from './boutique/Boutique.vue'
// import Short from './short/Short'
import { mixinDevice } from '@/utils/mixin'

import { getProjectList } from '@/api/project'
import { mapGetters, mapActions, mapState } from 'vuex'
import Banner from '@/components/banner'
export default {
	components: { ReservationLine, Banner, GiftPackage,  },
	name: 'Home',
	mixins: [mixinDevice],
	data() {
		return {
			loading: false,
			orderlist: [],
			forumlist: [],
			otherlist: []
		}
	},
	computed: {
		...mapGetters(['islogin']),
		...mapState({
			device: state => state.app.device
		}),
		showDts() {
			return this.device == 'desktop'
		}
	},
	methods: {
		...mapActions(['ToggleType']),
		showModal(type) {
			this.ToggleType(type)
			this.$router.push({ name: 'Projecttype', params: { type: type } })
		},
		//拿到所有得公开的项目 （1是论坛 0是预约 2是其他 0是不公开 1是公开）
		getPublicProject() {
			let temp = 'state/1'
			getProjectList(temp).then(res => { 
				res.body.forEach(item => {
					switch (item.type) {
						case 0: //预约
							this.orderlist.push(item)
							break
						case 1: //论坛
							this.forumlist.push(item)
							break
						case 2:
							this.otherlist.push(item)
							break
						default:
							break
					}
				})
			})
		}
	},
	mounted() {
		this.getPublicProject()
	}
}
</script>
<style lang="less" scoped>
.main {
	width: 100%;
	.container {
		overflow: hide;
		width: 1200px;
		margin: 0 auto;
	}
	.short {
		width: 100%;
		background: #fff;
	}
	.news {
		margin-top: -135px;
	}
}
.mobile {
	.main {
		.container {
			width: 100%;
			.boutique {
				overflow-x: scroll;
				width: calc(100vw-10px);
				margin-left: 10px;
				.row {
					width: 300vw;
					margin-right: 0;
				}
			}
		}
	}
}
</style>
