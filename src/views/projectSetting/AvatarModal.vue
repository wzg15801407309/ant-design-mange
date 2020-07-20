<!--  -->
<template>
  <a-upload
    class="avatar-uploader"
    name="logo"
    :showUploadList="false"
    listType="picture-card"
    :beforeUpload="beforeUpload"
    :customRequest="customRequest"
  >
    <img class="uploadimg" v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script>
import { putFile } from '@/api/upload.js'
export default {
  props: ['imageUrl'],
  components: {},
  data() {
    return {
      loading: false,
      currimageUrl: this.imageUrl
    }
  },
  methods: {
    // 文件上传前判断文件的类型和大小
    beforeUpload(file) {
      let isImg = false
      const isLtSize = file.size / 1024 / 1024 <= 10
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg'
      ) {
        isImg = true
      }

      if (!isImg) {
        this.$message.error(this.$t('common.uploadimgtypeerror'))
      } else {
        if (!isLtSize) {
          this.$message.error(this.$t('common.uploadimgsizeerror'))
        }
      }
      return isImg && isLtSize
    },
    customRequest(data) {
      let formData = new FormData()
      formData.append('file', data.file)
      putFile(formData).then(res => {
        this.currimageUrl = process.env.VUE_APP_IMGUP_URL + res.file
        this.$emit('changeImgUrl', this.currimageUrl)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader {
  .uploadimg { 
  }
  .upload-text {
    margin-top: 8px;
    color: #666;
  }
  i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload {
    width: 128px;
    height: 128px;
  }
}
</style>
