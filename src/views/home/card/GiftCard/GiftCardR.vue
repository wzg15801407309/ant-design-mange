<template>
	<div :class="['giftRight', device]">
		<div class="down-up">
			<img :src="item.imgUrl" alt="123" />
		</div>
		<div class="down-down">
			<div class="down-r-up">{{ item.name }}</div>
			<div class="down-r-down">
				<div style="white-space: nowrap;user-select: none;">
					{{ $t('home.couponNumber') }}:
				</div>
				<input readonly="readonly" :value="item.giftcode" id="gift" />
			</div>
		</div>
		<div class="mack-button" @click="copyGift">{{ $t('home.copy') }}</div>
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
	methods: {
		copyGift(e) {
			let textinput =
				e.currentTarget.previousElementSibling.childNodes[1].childNodes[1]
			this.copyUrl2(e, textinput)
		},
		copyUrl2(e, ele) {
			ele.select() // 选择对象
			ele.setSelectionRange(0, 9999)
			document.execCommand('Copy') // 执行浏览器复制命令
			//  const dom = e.target;
			//弹出提示框
			this.$message.success(this.$t('home.copysuccess'), 1) 
		}
	}
}
</script>
<style lang="less" scoped>
.giftRight {
	position: relative;
	width: 190px;
	display: flex;
	flex-direction: column;
	background: #fff;

	cursor: pointer;
	&::before {
		content: '';
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		transition: opacity 0.25s linear;
	}
	.down-up {
		width: 100%;
		height: 190px;
		img {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
	}
	.down-down {
		padding: 15px 0;
		flex: 1;
		margin: 0 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.down-r-up {
			color: #525456;
			font-size: 18px;
			font-weight: 400;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.down-r-down {
			display: flex;
			font-size: 14px;
			color: #999999;
		}
	}
	&:hover {
		&::before {
			opacity: 0.5;
		}
		.mack-button {
			display: block;
		}
	}
	input {
		background: none;
		outline: none;
		border: none;
		width: 100%;
		color: #ccc;
		font-size: 14px;
	}
	.mack-button {
		text-align: center;
		display: none;
		width: 125px;
		padding: 12px 0;
		position: absolute;
		top: 50%;
		left: 50%;
		border: 1px solid #fff;
		border-radius: 4px;
		transform: translate(-50%, -50%);
		color: #fff;
		font-size: 14px;
	}
}
.mobile {
	&.giftRight {
		width: 150px;
		.down-up {
			height: 150px;
		}
	}
}
</style>
