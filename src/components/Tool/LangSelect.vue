<template>
	<a-dropdown placement="topLeft">
		<div class="action global-lang" style="cursor:pointer">
			<a-icon type="global" style="font-size: 15px" />
			<p style="display: inline-block;margin-left:15px;font-size: 15px;">
				{{
					$store.getters.language == 'zh'
						? '简体中文'
						: $store.getters.language == 'en'
						? 'English'
						: '한국어'
				}}
				<a-icon type="down" style="font-size: 16px;margin-left:16px" />
			</p>
		</div>

		<a-menu slot="overlay" style="width: 168px;" @click="SwitchLang">
			<a-menu-item v-for="item in dataList" :key="item.key">
				<a rel="noopener noreferrer" style="display: flex; align-items: center">
					<svg class="icon" aria-hidden="true">
						<use :xlink:href="item.icon"></use>
					</svg>
					{{ item.name }}
				</a>
			</a-menu-item>
		</a-menu>
	</a-dropdown>
</template>
<script>
import icon from '@/assets/icon/iconfont.js'
export default {
	name: 'LangSelect',
	data() {
		return {
			dataList: [
				{
					name: '한국어',
					icon: '#icon-kor',
					key: 'ko'
				},
				{
					name: '中文(简体)',
					icon: '#icon-zhongguo-',
					key: 'zh'
				},
				{
					name: 'English',
					icon: '#icon-yingguo-',
					key: 'en'
				}
			]
		}
	},
	computed: {
		selectLang() {
			return this.dataList.find(el => {
				return el.key == this.$store.getters.language
			})
		}
	},
	methods: {
		SwitchLang(row) {
			if (row.key != this.$store.getters.language) { 
				// this.$i18n.locale = row.key
				this.$store.dispatch('ChangeLanguage', row.key)
				window.location.reload()
			}
		}
	}
}
</script>
<style lang="less" scoped>
.action {
	padding: 10px 20px;
	border: 1px solid #ebebeb;
	border-radius: 3px;
	font-weight: 700;
}
.icon {
	width: 32px;
	height: 32px;
	fill: currentColor;
	margin: 5px;
}
.ant-dropdown-menu {
	border: 1px solid #ebebeb;
	box-shadow: none;
}
</style>
