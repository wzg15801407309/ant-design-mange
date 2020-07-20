<template>
	<a-modal
		:title="$t('user.modifyingHead')"
		:visible="visible"
		:maskClosable="false"
		:confirmLoading="confirmLoading"
		:width="800"
		@cancel="cancelHandel"
	>
		<a-row>
			<a-col :xs="24" :md="12" :style="{ height: '350px' }">
				<!-- 上传本地图片 -->
				<label class="btn btn-orange" for="uploads" style=""
					><a-icon type="upload" style="margin-right: 5px;" />{{
						$t('user.chooseLocalpicture')
					}}</label
				>
				<input
					type="file"
					id="uploads"
					:value="imgFile"
					style="position:absolute; clip:rect(0 0 0 0);"
					accept="image/png, image/jpeg, image/gif, image/jpg"
					@change="uploadImg($event, 1)"
				/>
				<div class="cropper">
					<vueCropper
						ref="cropper"
						:img="option.img"
						:outputSize="option.size"
						:outputType="option.outputType"
						:info="true"
						:full="option.full"
						:canMove="option.canMove"
						:canMoveBox="option.canMoveBox"
						:original="option.original"
						:autoCrop="option.autoCrop"
						:autoCropWidth="option.autoCropWidth"
						:autoCropHeight="option.autoCropHeight"
						:fixedBox="option.fixedBox"
						@realTime="realTime"
						@imgLoad="imgLoad"
					></vueCropper>
				</div>
			</a-col>
			<a-col :xs="24" :md="12" :style="{ height: '350px' }">
				<div class="show-preview">
					<div :style="previews.div" class="preview">
						<img :src="previews.url" :style="previews.img" />
					</div>
				</div>
			</a-col>
		</a-row>
		<template slot="footer">
			<a-button key="back" @click="cancelHandel">{{
				$t('common.cancel')
			}}</a-button>
			<a-button
				key="submit"
				type="primary"
				:loading="confirmLoading"
				@click="okHandel"
				>{{ $t('common.save') }}</a-button
			>
		</template>
	</a-modal>
</template>
<script>
import { VueCropper } from 'vue-cropper'
import { putFile } from '@/api/upload.js'
export default {
	components: {
		VueCropper
	},

	data() {
		return {
			visible: false,
			id: null,
			confirmLoading: false,
			previews: {},
			headImg: '',
			//剪切图片上传
			crap: false,
			option: {
				img: '',
				outputSize: 1, //剪切后的图片质量（0.1-1）
				full: false, //输出原图比例截图 props名full
				outputType: 'png',
				canMove: true,
				original: false,
				canMoveBox: true,
				autoCrop: true,
				autoCropWidth: 150,
				autoCropHeight: 150,
				fixedBox: false
			},
			fileName: '', //本机文件地址
			downImg: '#',
			imgFile: '',
			uploadImgRelaPath: '' //上传后的图片的地址（不带服务器域名）
		}
	},
	methods: {
		edit(id) {
			this.visible = true
			this.id = id
			/* 获取原始头像 */ 
		},
		close() {
			this.id = null
			this.visible = false
		},
		cancelHandel() {
			this.close()
		},
		okHandel() {
			const vm = this
			vm.confirmLoading = true
			this.finish('blob')
			vm.confirmLoading = false
			vm.close()
			vm.$message.success('上传成功')
		},
		//上传图片（点击上传按钮）
		finish(type) {
			let _this = this
			let formData = new FormData()
			// 输出
			if (type === 'blob') {
				this.$refs.cropper.getCropBlob(data => {
					let img = window.URL.createObjectURL(data) 
					this.model = true
					this.modelSrc = img
					formData.append('file', data, this.fileName)
					putFile(formData).then(res => { 
						let currimageUrl = process.env.VUE_APP_IMGUP_URL + res.file 
						this.$emit('changeImgUrl', currimageUrl)
					})
				})
			} else {
				this.$refs.cropper.getCropData(data => {
					this.model = true
					this.modelSrc = data
				})
			}
		},
		// 实时预览函数
		realTime(data) { 
			this.previews = data
		},
		//选择本地图片
		uploadImg(e, num) { 
			var _this = this
			//上传图片
			var file = e.target.files[0]
			_this.fileName = file.name
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				return false
			}
			var reader = new FileReader()
			reader.onload = e => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}
				if (num === 1) {
					_this.option.img = data
				} else if (num === 2) {
					_this.example2.img = data
				}
			}
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blob
			reader.readAsArrayBuffer(file)
		},
		imgLoad(msg) { 
		}
	}
}
</script>

<style lang="less" scoped>
.btn-orange {
	display: inline-block;
	text-align: center;
	line-height: 32px;
	border: 1px solid #ddd;
	padding: 0 15px;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		color: #ff8212;
		border-color: #ff8212;
	}
}
.cropper {
	width: 90%;
	height: 250px;
	margin-top: 40px;
}
.show-preview {
	display: flex;
	justify-content: center;
	-webkit-justify-content: center;
	height: 100%;
	align-items: center;
	.preview {
		overflow: hidden;
		border-radius: 50%;
		border: 1px solid #cccccc;
		background: #cccccc;
	}
}
</style>
