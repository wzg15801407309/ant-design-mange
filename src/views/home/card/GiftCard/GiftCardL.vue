<template>
	<div :class="['down-left', device]">
		<div class="left-L">
			<img :src="item.imgUrl" :alt="item.nickname" />
		</div>
		<div class="left-r">
			<div class="left-r-up">
				<p>{{ item.name }}</p>
			</div>
			<div class="down-right">
				<a :href="item.link+'?utm_source=gamenanum'" target="_blank"
					>{{ $t('home.booking')
					}}<a-icon style="font-size:10px;margin-left:3px" type="arrow-right"
				/></a>
			</div>
		</div>
	</div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
export default {
	// import引入的组件需要注入到对象中才能使用
	props: ['item'],
	mixins: [mixinDevice],
	components: {},
	data() {
		// 这里存放数据
		return {}
	},
	computed: {},
	watch: {},
	methods: {}
}
</script>
<style lang="less" scoped>
.down-left {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	background: #fff;
	border: 1px solid #eee;
	.left-L {
		width: 110px;
		height: 110px;
		margin: 15px;
		img {
			width: 100%;
			height: 100%;
		}
	}

	.left-r {
		display: flex;
		flex-direction: column;
		.left-r-down {
			font-size: 12px;
			color: #ccc;
			display: flex;
		}
		.left-r-up {
			p {
				width: 110px;
				font-size: 18px;
				font-weight: 400px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.down-right {
			// padding: 3px 8px;
			font-size: 14px;
			white-space: nowrap;
			cursor: pointer;
			a {
				color: #999999;
			}
		}
	}
	&:hover,
	:focus {
		background: #f0f2f7;
		.down-right {
			a {
				color: #f9b133;
			}
		}
	}
}
.mobile {
	.left-L {
		width: 64px;
		height: 64px;
		margin: 8px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.left-r {
		.left-r-up {
			p {
				width: 85px;
			}
		}
	}
}
</style>
