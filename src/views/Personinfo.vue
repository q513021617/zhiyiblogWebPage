<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="电子邮箱:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="请输入电子邮箱......."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="用户名:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.username"
          placeholder="请输入用户名......."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="密码:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="请输入密码......."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="手机号码:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.phone"
          placeholder="请输入手机号码......."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="性别:" >
      <b-form-radio v-model="form.sex"  name="some-radios" value="1">男</b-form-radio>
      <b-form-radio v-model="form.sex"  name="some-radios" value="2">女</b-form-radio>
    </b-form-group>
      <b-button type="submit" block variant="primary">保存</b-button>
    </b-form>
  </div>
</template>

<script>
import { saveUser,getUser } from "@/api/user";
import { makeToast} from "@/tools/msg";
export default {
  data() {
    return {
      form: {},
      show: true,
    };
  },
  created() {
    let userStr=localStorage.getItem("userData");
    this.form=JSON.parse(userStr)
  },
  methods: {
    async onSubmit() {
        await saveUser(this.form);
        makeToast(this,'success','保存用户信息');
        this.getUserInfo();
    },
   async getUserInfo() {
      let userid=this.form.id;
      // debugger
      let {data} =await getUser(userid);
      this.form=data
      localStorage.setItem("userData",JSON.stringify(data))
    },
  },
};
</script>

<style>
</style>