<!-- 精品推荐 -->
<template>
	<a-row :gutter="35" class="row">
		<a-col :md="24" :xs="8" :lg="8">
			<TopTitle :titlewords="words" />
			<div class="recommended"><BoutiqueList /></div>
		</a-col>
		<a-col :md="24" :xs="8" :lg="8">
			<TopTitle :titlewords="words" />
			<div class="newproducts"><BoutiqueList /></div>
		</a-col>
		<a-col :md="24" :xs="8" :lg="8">
			<TopTitle :titlewords="words" />
			<div class="weekboutique"><BoutiqueList /></div>
		</a-col>
	</a-row>
</template>
<script>
import TopTitle from '@/components/title/TopTitle'
import BoutiqueList from './BoutiqueList'

export default {
	components: { TopTitle, BoutiqueList },
	data() {
		return {
			words: '精品推荐'
		}
	},
	computed: {},
	watch: {},
	methods: {},
	created() {},
	mounted() {}
}
</script>
<style lang="less" scoped></style>
