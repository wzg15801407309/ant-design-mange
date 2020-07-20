<!-- 分类标题 -->
<template>
	<div class="title">
		<p>{{ titlewords }}</p>
	</div>
</template>

<script>
export default {
	props: ['titlewords'],
	components: {},
	data() {
		return {}
	},
	computed: {},
	watch: {},
	// 方法集合
	methods: {}
}
</script>
<style lang="less" scoped>
.title {
	border-left: 4px solid #ff8212;
	font-size: 24px;
	line-height: 24px;
	padding-left: 16px;
	font-weight: 600;
}
</style>
