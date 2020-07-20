<template>
	<div class="newsList">
		<a-list :dataSource="data">
			<a-list-item slot="renderItem" slot-scope="item, index" :key="index">
				<div class="listitemC" v-if="index == bannnerindex">
					<div class="listitemC-C">
						<div class="tag-icon">
							<img src="@/assets/orderTag (2).png" alt="tag" />
							<p class="tag-w">{{ $t('home.online') }}</p>
						</div>
						<div class="title">{{ item.title }}</div>
					</div>
					<div class="subtitle">{{ item.subtitle }}</div>
				</div>
				<div class="listitem" v-else>{{ item.title }}</div>
			</a-list-item>
		</a-list>
	</div>
</template>
<script>
export default {
	props: ['bannnerindex'],
	data() {
		return {
			data: [
				{
					title: '标题',
					subtitle: '副标题1'
				},
				{
					title: '标题',
					subtitle: '副标题2'
				},
				{
					title: '标题',
					subtitle: '副标题3'
				},
				{
					title: '标题',
					subtitle: '副标题4'
				},
				{
					title: '标题',
					subtitle: '副标题5'
				},
				{
					title: '标题',
					subtitle: '副标题6'
				},
				{
					title: '标题',
					subtitle: '副标题7'
				}
			]
		}
	}
}
</script>
<style lang="less" scoped>
.newsList {
	background: #232021;
	.ant-list-split {
		.ant-list-item {
			border: 0;
			padding: 0;
			border: 1px darken gray;
			color: #fff;
			.listitem {
				margin-left: 24px;
				width: 100%;
				height: 54px;
				line-height: 54px;
			}
			.listitemC {
				width: 100%;
				height: 66px;
				background: #2a3740;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.listitemC-C {
					margin-left: 24px;
					display: flex;
					align-items: center;
					.tag-icon {
						position: relative;
						p {
							font-size: 14px;
							color: #fff;
							font-size: 400;
							position: absolute;
							top: 0;
							left: 12px;
						}
					}
					.title {
						font-size: 20px;
						color: #ff8212;
						margin-left: 8px;
					}
				}
				.subtitle {
					font-size: 14px;
					margin: 3px 0 0 24px;
					color: #a6a9ac;
				}
			}
		}
	}
}
</style>
