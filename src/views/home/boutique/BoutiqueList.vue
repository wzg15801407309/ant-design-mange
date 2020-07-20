<!-- 推荐列表 -->
<template>
	<div :class="['boutiquelist', device]">
		<a-list :dataSource="data">
			<a-list-item
				slot="renderItem"
				slot-scope="item, index"
				:key="index"
				v-if="index < (showDts ? 7 : 5)"
			>
				<div class="listitemC" v-if="index == 0">
					<img class="bgimg" src="@/assets/img2.png" alt="" />
					<div class="listitemC-C">
						<img src="@/assets/trophy.png" alt="tag" />
						<div class="title">{{ item.title }}</div>
					</div>
				</div>
				<div class="listitem" v-else>
					<div class="listindex">{{ index + 1 }}</div>
					<div class="list-icon">icon</div>
					<div class="listcontent">
						<p class="p1">{{ item.title }}</p>
						<p class="p2">{{ item.description }}</p>
					</div>
				</div>
			</a-list-item>
		</a-list>
	</div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { mapState } from 'vuex'
export default {
	mixins: [mixinDevice],
	components: {},
	data() {
		return {
			data: [
				{
					title: '游戏名游戏名',
					description: ''
				},
				{
					title: '游戏名游戏名',
					description:
						'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription'
				},
				{
					title: '游戏名游戏名',
					description: '副游戏名游戏名3'
				},
				{
					title: '游戏名游戏名',
					description: '副游戏名游戏名4'
				},
				{
					title: '游戏名游戏名',
					description: '副游戏名游戏名5'
				},
				{
					title: '游戏名游戏名',
					description: '副游戏名游戏名6'
				},
				{
					title: '游戏名游戏名',
					description: '副游戏名游戏名7'
				},
				{
					title: '游戏名游戏名',
					description: '副游戏名游戏名8'
				},
				{
					title: '游戏名游戏名',
					description: '副游戏名游戏名9'
				}
			]
		}
	},
	computed: {
		...mapState({
			device: state => state.app.device
		}),
		showDts() {
			return this.device == 'desktop'
		}
	},
	watch: {},
	methods: {},
	created() {}
}
</script>
<style lang="less" scoped>
.boutiquelist {
	margin-top: 35px;
	background: #fff;
	.ant-list-item {
		padding: 0;
	}
	.listitemC {
		position: relative;
		.bgimg {
			width: 100%;
		}
		.listitemC-C {
			color: #fff;
			position: absolute;
			/* top: 0; */
			bottom: 13px;
			left: 17px;
			display: flex;
			align-items: center;
			.title {
				font-size: 20px;
				font-weight: bold;
				margin-left: 18px;
			}
		}
	}
	.listitem {
		height: 100px;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 17px;
		.listindex {
			font-size: 24px;
			font-weight: 400;
			color: #ff8212;
		}
		.list-icon {
			width: 70px;
			height: 70px;
			background: #b4b4b4;
			margin-left: 23px;
		}
		.listcontent {
			margin-left: 28px;

			:first-child {
				font-size: 20px;
				font-weight: 400;
				color: #272a2c;
			}
			:last-child {
				width: 170px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 14px;
				font-weight: 400;
				color: #999;
			}
		}
	}
}
.moblie {
}
</style>
