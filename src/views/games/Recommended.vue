<!--  -->
<template>
	<div class="recommended">
		<a-list :grid="{ gutter: 20, column: 2 }" :dataSource="data">
			<a-list-item slot="renderItem" slot-scope="item, index" :key="index">
				<GameCard />
			</a-list-item>
		</a-list>
	</div>
</template>
<script>
import GameCard from './moudle/GameCard'
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
export default {
	components: { GameCard },
	data() {
		return { data }
	},
	computed: {},
	watch: {},
	methods: {},
	created() {},
	mounted() {}
}
</script>
<style lang="less" scoped></style>
