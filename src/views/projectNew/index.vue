<template>
  <a-card class="projectNew" :bordered="false">
    <h2 class="title" solt="title">{{ $t('project.newproject') }}</h2>
    <a-divider />
    <a-steps class="steps" :current="currentTab">
      <a-step :title="$t('project.projecttype')" />
      <a-step :title="$t('project.projectmsg')" />
      <a-step :title="$t('project.complete')" />
    </a-steps>
    <div class="content">
      <step1 v-if="currentTab == 0" @nextStep="nextStep" />
      <step2
        v-if="currentTab == 1"
        @nextStep="nextStep"
        @prevStep="prevStep"
        :type="type"
      />
      <step3 v-if="currentTab == 2" @prevStep="prevStep" @finish="finish" />
    </div>
  </a-card>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2,
    Step3
  },
  data() {
    return {
      currentTab: 0,
      type: Number,
      form: null
    }
  },
  computed: {},
  methods: {
    // handler
    nextStep(e) {
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
      this.type = e.type
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish() {
      this.currentTab = 0
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.projectNew {
  .title {
    font-weight: bold;
  }
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
}
</style>
