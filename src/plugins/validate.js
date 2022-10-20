// 表单验证插件的配置
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 引入中文 message
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

// 配置提示信息
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    // 修改内置规则的 message，让确认密码和密码相同
    is: (field) => `${field}必须与密码相同`
  },
  // 给校验的 field 属性名映射中文名称
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    confirmPassword: '确认密码',
    checked: '协议'
  }
})

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('checked', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})