<template>
  <div class="loginContainer">
    <div class="loginContent" ref="loginContent">
      <div class="loginBox" >
        <sx-dynamic-inline-form
          ref="loginForm"
          v-model="loginData"
          wrap
          size="large"
          :structure="loginStructure"
        />
        <el-button class="submit" type="primary" plain @click="submit">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../api/login'
import sxDynamicInlineForm from '../components/websiteList/dynamicInlineForm'

import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    sxDynamicInlineForm
  },
  computed: {
    ...mapState([
      'info'
    ])
  },
  data() {
    return {
      loginStructure: {
        data: [
          {
            type: 'input',
            model: 'name',
            label: '账号',
            placeholder: '请输入账号',
            rules: [
              { required: true, message: '账号不能为空', trigger: 'change' }
            ],
          },
          {
            type: 'password',
            model: 'password',
            label: '密码',
            placeholder: '请输入密码',
            rules: [
              { required: true, message: '密码不能为空', trigger: 'change' }
            ]
          }
        ]
      },
      loginData: {}
    }
  },
  created() {},
  methods: {
    ...mapMutations([
      'setInfo'
    ]),
    firstShow () {
      let deg = `${360 * Math.random().toFixed(2)}deg`
      let colorGroup = []
      for (let i = 0; i < (Math.random() * 30).toFixed(0); i++) {
        colorGroup.push(`rgb(${Math.random().toFixed(2) * 255}, ${Math.random().toFixed(2) * 255}, ${Math.random().toFixed(2) * 255})`)
      }
      this.$refs.loginContent.style.background = `linear-gradient(${deg}, ${colorGroup})`
    },
    async submit () {
      this.$refs.loginForm.onSubmit()
      let l = await login(this.loginData)
      if (!l) return
      this.setInfo({ token: l.data.token })
      this.$router.replace({name: 'websiteList'})
    }
  },
  mounted() {
   this.firstShow() 
  }
}
</script>

<style lang="scss" scoped>
.loginContainer {
  min-width: 500px;
  width: 100%;
  height: 100%;
  .loginContent {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // isolation: isolate;
    .loginBox {
      border-radius: 6px;
      background: white;
      padding: 36px;
      width: 466px;
      height: 255px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .submit {
        width: 100%;
      }
    }

    /deep/ .el-form-item__label {
      // color: white;
      // mix-blend-mode: difference;
      // &::before {
      //   mix-blend-mode: difference;
      // }
      width: auto;
      min-width: auto;
    }
    // /deep/ .el-input__inner {
    //   background: transparent;
    //   mix-blend-mode: difference;
    // }
    // /deep/ .el-button {
    //   mix-blend-mode: difference;
    //   background: transparent;
    //   color: white;
    // }
  }
}
</style>


