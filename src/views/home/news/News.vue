<!-- 新闻组件 -->
<template>
	<div class="news">
		<a-row style="height:100%">
			<a-col :md="24" :lg="14">
				<div class="news-banner" style="height:390px;">
					<a-col :span="6"
						><carousel-left :bannnerindex="currentBannerIndex"
					/></a-col>
					<a-col :span="18"
						><carouse-right @handleChange="followChange"
					/></a-col>
				</div>
			</a-col>
			<a-col :md="24" :lg="10">
				<div class="news-article">
					<a-list :dataSource="data">
						<a-list-item
							slot="renderItem"
							slot-scope="item, index"
							:key="index"
						>
							<div class="article">
								<p class="articleT">{{ item.title }}</p>
								<p>{{ item.date }}</p>
							</div>
						</a-list-item>
						<div slot="header">
							这是一个新闻的标题可以很长很长换行
							很长很长很长很长很长很超出省略这是一个新闻的标题可以很长很长换行
							很长很长很长很长很长很超出省略这是一个新闻的标题可以很长很长换行
							很长很长很长很长很长很超出省略
						</div>
					</a-list>
					<div class="morenews" @click="newscenter">
						<a-icon type="plus" />
					</div>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import CarouseRight from './CarouseRight.vue'
import CarouselLeft from './CarouselLeft.vue'
export default {
	components: { CarouseRight, CarouselLeft },
	data() {
		return {
			currentBannerIndex: 1,
			data: [
				{
					title:
						'Racing car sprays burning fuel into crowd.Japanese princess to wed commoner.Japanese princess to wed commoner.',
					date: '12-3'
				},
				{
					title: 'Australian walks 100km after outback crash.',
					date: '12-3'
				},
				{
					title:
						'我很美我很美我很美我很美我很美我很美我很美我很美我很美我很美我很美我很美我很美我很美我很美我很美',
					date: '12-3'
				},
				{
					title: 'Man charged over missing wedding girl.',
					date: '12-3'
				},
				{
					title: 'Los Angeles battles huge wildfires.',
					date: '12-3'
				},
				{
					title: 'Man charged over missing wedding girl.',
					date: '12-3'
				},
				{
					title: 'Japanese princess to wed commoner.',
					date: '12-3'
				}
			]
		}
	},
	computed: {},
	watch: {},
	methods: {
		followChange(e) {
			this.currentBannerIndex = e 
		},
		newscenter() { 
			this.$router.push({ name: 'newscenter' })
		}
	},
	created() {},
	mounted() {}
}
</script>
<style lang="less" scoped>
.news {
	height: 390px;
	.news-article {
		height: 100%;
		padding: 0 25px 10px 40px;
		background: #232021;
		.ant-list-split {
			.ant-list-item {
				border: 0;
				height: 38px;
				padding: 0;
				cursor: pointer;
			}
			/deep/.ant-list-header {
				padding: 20px 0px;
				height: 114px;
				color: #ff8212;
				font-size: 24px;
				border-bottom: 1px solid #b2b2b2;
				font-weight: bold;
				div {
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.article {
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-weight: 400;
				color: #e6e6e6;
				font-size: 14px;
				&:hover {
					color: #fff;
				}
				.articleT {
					width: 360px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		.morenews {
			width: 0;
			height: 0;
			border-top: 48px solid #ff8212;
			border-left: 48px solid transparent;
			position: absolute;
			top: 0;
			right: 0;
			color: #fff;
			font-size: 26px;
			font-weight: bold;
			i {
				position: absolute;
				top: -46px;
				left: -27px;
			}
		}
	}
	.news-banner {
	}
}
</style>
