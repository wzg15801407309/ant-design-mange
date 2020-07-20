<!-- News Center -->
<template>
	<div class="newscenter">
		<a-list :grid="{ gutter: 20, sm: 1, md: 3, lg: 4 }" :dataSource="data">
			<a-list-item slot="renderItem" slot-scope="item, index" :key="index">
				<NewsCards />
			</a-list-item>
			<div class="pagination">
				<a-pagination
					:total="total"
					:itemRender="itemRender"
					:pageSize="pageSize"
				/>
				<span>共有{{ total / pageSize }}页</span>
			</div>
		</a-list>
	</div>
</template>

<script>
const data = [
	{
		title: 'Title 1'
	},
	{
		title: 'Title 2'
	},
	{
		title: 'Title 3'
	},
	{
		title: 'Title 4'
	},
	{
		title: 'Title 4'
	},
	{
		title: 'Title 4'
	},
	{
		title: 'Title 4'
	},
	{
		title: 'Title 4'
	},
	{
		title: 'Title 4'
	},
	{
		title: 'Title 4'
	},
	{
		title: 'Title 4'
	},
	{
		title: 'Title 4'
	}
]
import NewsCards from './module/NewsCards'
export default {
	components: { NewsCards },
	data() {
		return {
			data,
			current: 1,
			pageSize: 12,
			total: data.length
		}
	},
	computed: {},
	watch: {},
	methods: {
		itemRender(current, type, originalElement) {
			if (type === 'prev') {
				return <a style="margin-right:16px">上一页</a>
			} else if (type === 'next') {
				return <a style="margin-left:16px">末页</a>
			}
			return originalElement
		}
	},
	created() {}
}
</script>
<style lang="less" scoped>
.newscenter {
	width: 1200px;
	margin: 40px auto;
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		font-weight: 400;
		color: #626262;
		span {
			// font-size: 15px;
			// font-weight: 400;
			// color: #626262;
			line-height: 36px;
			margin-left: 25px;
		}
		/deep/.ant-pagination-item {
			background: transparent;
			border: 0;
			border-radius: 0;
			width: 26px;
			height: 26px;
			margin: 0;
		}
		/deep/.ant-pagination-item-active {
			background: #ff8212;
			a {
				color: #fff;
				margin: 0;
			}
		}
	}
}
</style>
