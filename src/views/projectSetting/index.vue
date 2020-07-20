<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form @submit="handleSubmit" :form="form">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span slot="label">
              <a-tooltip slot="suffix" :title="$t('project.Itemtypeprompt')">
                <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
              </a-tooltip>
              {{ $t('project.projectType') }}
            </span>
            <div>
              {{
                this.info.type == 0
                  ? $t('project.order')
                  : this.info.type == 1
                  ? $t('project.forum')
                  : this.info.type == 1
                  ? $t('project.other')
                  : null
              }}
            </div>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span slot="label">
              <a-tooltip slot="suffix" :title="$t('project.Itemnameprompt')">
                <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
              </a-tooltip>
              {{ $t('project.projectName') }}
            </span>
            <a-input v-decorator="['title', { initialValue: info.title }]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span slot="label">
              <a-tooltip slot="suffix" :title="$t('project.Itemcodeprompt')">
                <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
              </a-tooltip>
              {{
                info.type == 2 ? $t('project.projectlink') : $t('project.code')
              }}
            </span>
            <a-input
              v-if="info.type == 2"
              v-decorator="['link', { initialValue: info.link }]"
            />
            <a-input
              v-else
              v-decorator="['code', { initialValue: info.code }]"
              :addonBefore="urllink"
              class="smallinput"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span slot="label">
              <a-tooltip slot="suffix" :title="$t('project.Itemlogoprompt')">
                <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
              </a-tooltip>
              {{ $t('project.projectLog') }}
            </span>
            <AvatarModal :imageUrl="info.logo" @changeImgUrl="changeImgUrl" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span slot="label">
              <a-tooltip
                slot="suffix"
                :title="$t('project.Itemintroductionprompt')"
              >
                <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
              </a-tooltip>
              {{ $t('project.projectPresentation') }}
            </span>
            <a-textarea
              rows="4"
              description="desc"
              v-decorator="['description', { initialValue: info.description }]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span slot="label">
              <a-tooltip slot="suffix" :title="$t('project.Itempublicprompt')">
                <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
              </a-tooltip>
              {{ $t('project.projectpublic') }}
            </span>
            <a-radio-group
              v-decorator="['public', { initialValue: info.public }]"
            >
              <a-radio :value="0">{{ $t('project.private') }}</a-radio>
              <a-radio :value="1">{{ $t('project.public') }}</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 }, offset: 7 }"
            
          >
            <a-button
              htmlType="submit"
              style="width:100% "
              type="primary"
              class="green-btn"
              >{{ $t('common.save') }}</a-button
            >
            <div class="ccbutton" @click="handleClick($route.query.type)">
              {{ $t('project.settingcenter') }}
            </div>
          </a-form-item> 
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { getProjectInfo, changProjectInfo } from '@/api/project.js'
import { log } from 'util'
export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 1 } },
      info: {},
      form: this.$form.createForm(this),
      typeshow: '',
      isshowCode: true,
      urllink: 'https://'
    }
  },
  methods: {
    getinfo() {
      if (!this.$route.params.name) {
        return false
      }
      getProjectInfo(this.$route.params.name).then(res => {
        if (res.state) {
          this.info = res.body
          this.urllink = this.$utils.getLinkUrl(this.info.type)
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.logo = this.info.logo
          changProjectInfo(values, this.$route.params.name).then(res => {
            if (res.state) {
              this.$message.success(this.$t('common.success'))
              this.$router.push({
                name: 'apps',
                params: { id: this.$store.getters.userInfo.id }
              })
            } else {
              this.$message.error(res.body)
            }
          })
        }
      })
    },
    changeImgUrl(imageUrl) {
      this.info.logo = imageUrl
    },
    LinkTO() {
      const url = this.$utils.getBackstageUrl(
        this.info.type,
        this.$route.params.name
      )
      window.open(url)
    },
    handleClick(type) {
      console.log('seesee',this.$utils.getBackstageUrl(
        Number(type),
        this.$route.params.name
      ))
      window.location.href = this.$utils.getBackstageUrl(
        Number(type),
        this.$route.params.name
      )
    }
  },
  created() {
    this.getinfo()
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}
.ant-btn-primary {
  &.green-btn {
    background: teal;
    border: teal;
    width: 15%;
  }
}
/deep/.ant-input-group-addon {
  background: transparent;
  border: 0;
  padding: 1px;
}
.smallinput {
  /deep/.ant-input-group {
    .ant-input {
      height: 28px;
    }
  }
}
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
} 
 
.ccbutton { 
  margin-top: 60px;
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;   
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #bbb;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.ccbutton:hover {background-color: #FF8212}

.ccbutton:active {
  background-color: #FF8212;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
