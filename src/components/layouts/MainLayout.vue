<!--  -->
<template>
	<a-layout :class="['layout', device]">
		<div>
			<!-- <a-button type="primary" @click="showDrawer">
				Open
			</a-button> -->
			<a-drawer
				v-if="showDts"
				title="Basic Drawer"
				placement="left"
				:closable="false"
				@close="onClose"
				:visible="visible"
				@showDrawer="showDrawer"
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</a-drawer>
		</div>
		<global-header />
		<a-layout-content>
			<transition class="content">
				<router-view />
			</transition>
		</a-layout-content>
		<a-layout-footer>
			<global-footer />
		</a-layout-footer>
	</a-layout>
</template>

<script>
import GlobalFooter from '@/components/GlobalFooter'
import GlobalHeader from '@/components/GlobalHeader'
import { mixinDevice } from '@/utils/mixin'
import { mapState } from 'vuex'
export default {
	name: 'MainLayout',
	mixins: [mixinDevice],
	components: {
		GlobalFooter,
		GlobalHeader
	},
	data() {
		return {
			visible: false
		}
	},
	computed: {
		...mapState({
			device: state => state.app.device
		}),
		showDts() {
			return this.device == 'mobile'
		}
	},

	methods: {
		showDrawer(b) {
			this.visible = b 
		},
		onClose() {
			this.visible = false
		}
	}
}
</script> 