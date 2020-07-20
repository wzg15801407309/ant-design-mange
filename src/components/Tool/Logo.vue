<template>
	<div class="logo">
		<router-link :to="{ name: 'index' }">
			<img src="@/assets/logo (2).png" alt="logo" style="object-fit: cover;" />
			<!-- <h1 v-if="showTitle">{{ title }}</h1> -->
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'Logo',
	props: {
		title: {
			type: String,
			default: 'PangSky',
			required: false
		},
		showTitle: {
			type: Boolean,
			default: true,
			required: false
		}
	}
}
</script>
