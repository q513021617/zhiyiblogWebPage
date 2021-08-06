<template>
  <div class="page">
      <div class="set">
        <!-- 中 -->
        <div><img src="images/img01.png"></div>
        <div><img src="images/img02.png"></div>
        <div><img src="images/img03.png"></div>
        <div><img src="images/img04.png"></div>
        <div><img src="images/img05.png"></div>
        <div><img src="images/img06.png"></div>
        <div><img src="images/img07.png"></div>
        <div><img src="images/img08.png"></div>
        </div>
        <div class="set set2">
        <!-- 前 -->
        <div><img src="images/img08.png"></div>
        <div><img src="images/img09.png"></div>
        <div><img src="images/img10.png"></div>
        <div><img src="images/img01.png"></div>
        <div><img src="images/img02.png"></div>
        <div><img src="images/img03.png"></div>
        <div><img src="images/img04.png"></div>
        <div><img src="images/img05.png"></div>
        <div><img src="images/img06.png"></div>
        <div><img src="images/img07.png"></div>
        <div><img src="images/img08.png"></div>
        </div>
        <div class="set set3">
        <!-- 后 -->
        <div><img src="images/img09.png"></div>
        <div><img src="images/img10.png"></div>
        <div><img src="images/img01.png"></div>
        <div><img src="images/img02.png"></div>
        <div><img src="images/img03.png"></div>
        <div><img src="images/img04.png"></div>
        <div><img src="images/img05.png"></div>
        <div><img src="images/img06.png"></div>
        <div><img src="images/img07.png"></div>
        <div><img src="images/img08.png"></div>
        </div>
      <div class="container" id="container">
        <section style="z-index: 999;">
            <div class="form-container sign-up-container" v-if="!singInShow">
                <div class="form">
                    <h1>zhiyigo技术分享</h1>
                    <h3>用 户 注 册</h3>
                    <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-github"></i></a>
                        <a href="#" class="social"><i class="fas fa-envelope-square"></i></a>
                        <a href="#" class="social"><i class="fab fa-weixin"></i></a>
                    </div>
                    <span>选择以上方式登录或使用您的账号</span>
                    <input type="text" id="registerusername" v-model="username" placeholder="用户名" />
                    <input type="email" id="registeremail" v-model="email"  placeholder="邮箱" />
                    <input type="password" id="registerpassword" v-model="password" placeholder="密码" />

                    <button @click="signUpFunc()">注册</button>
                    <div id="registererro" style="color: #ff416c;"></div>
                </div>
            </div>
            <div class="form-container sign-in-container" v-if="singInShow">
                <div class="form">
                    <h1>zhiyigo技术分享</h1>
                    <h3>用 户 登 录</h3>
                    <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-github"></i></a>
                        <a href="#" class="social"><i class="fas fa-envelope-square"></i></a>
                        <a href="#" class="social"><i class="fab fa-weixin"></i></a>
                    </div>
                    <span>选择以上方式登录或使用您的账号</span>
                    <input type="text" id="loginEmail" v-model="email" placeholder="用户名" />
                    <input type="password" id="loginPassword" v-model="password" placeholder="密码" />
                    <a href="#">忘记密码？</a>
                    <div class="no-account"  @click="singInShow=false">没有账号？</div>
                    <button @click="signIn()">登录</button>
                    <div id="erro" style="color: #ff416c;"></div>
                </div>

            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>已有账号？</h1>
                        <p>请使用您的账号进行登录</p>
                        <button class="ghost" id="signIn">登录</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>没有账号？</h1>
                        <p>立即注册加入我们，和我们一起开始旅程吧。</p>
                        <button class="ghost" id="signUp">注册</button>
                    </div>
                </div>
            </div>
    
        
        
    </section>
    </div>


    <div id="foot" class="container-fluid" style="position: absolute;bottom: 1px;">

        <div id="container">
            <p class="leftfloat">Copyright 2018-2020 Zhiyigo.cn culture All Rights Reserved<a
                    href="http://beian.miit.gov.cn">蜀ICP备20002097号</a></p>
            <div class="rightfloat">

                <a href="#">首页 </a> |<a href="#">关于我</a> | <a href="#">文章列表</a>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import httpmethods from '@/http/index'
import {login} from '@/api/user'
import  {
    setCookie,
    getCookie,
    delCookie,
    Cookies
} from '@/tools/cooks'
export default {
    data(){
        return{
            username:'',
            password:'',
            email:'',
            singInShow:true
        }
    },
    mounted(){
        
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
        signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));
    },
    methods:{
        signUpFunc:async function () {


            // let {data}=await httpmethods.axios.get('/blogapi/isExtisUser', {email:this.email,password:this.password,username:this.username})
            //  debugger
            //  data = data.data;
            //     console.log(data);
            //     if (data) {
            //         $('#registererro').html("邮箱已注册!请重新注册邮箱");
            //         return;
            //     }
            httpmethods.axios.post('/blogapi/register', {email:this.email,password:this.password,username:this.username}).then( (data)=>{
                data = data.data;

                if (data != undefined && data != "") {
                    localStorage.setItem("userData", JSON.stringify(data));
                    setCookie("userdata", data.id);
                    location.href = "/";
                    return;
                }
            });
        },

        signIn:async function () {
            
            console.log("登录:" + " " + this.password + " " + this.email);
            console.log("基础路径:" + " " + httpbaseUrl);
            // debugger
            let {data}=await login(this.email,this.password);
             console.log(data);
            // debugger            
            console.log(data);

            if (data.status===200) {
                setCookie("userdata", data.data.id);
                localStorage.setItem("userData", JSON.stringify(data.data));
                window.localStorage.setItem('token',data.data.token)
                localStorage.setItem("userid", data.data.id);
                location.href = "/";
                return;
            }

            if (data.status!==200) {

                $('#erro').html("用户名或者密码错误");
                return;
            }
        }
    }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page{
  font-family: Arial, Helvetica, sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh !important;
  overflow: hidden !important;
}

section {
  position: relative;
  /*相对定位*/
  width: 100%;
  height: 100%;
  background: radial-gradient(#355, #002);
  /*径向渐变*/
}

.set {
  position: absolute;
  /*绝对定位*/
  width: 100%;
  height: 100%;
  top: 0;
  /*距上部*/
  left: 0;
  /*距左部*/
}

img {
  width: 100px;
  user-select: none;
  /*不可选取*/
}

.set div {
  position: absolute;
  display: block;
  /*块元素*/
}

.set div:nth-child(1) {
  /*第一个子元素*/
  left: 20%;
  animation: animate 15s linear infinite;
  /*动画：name time 线性执行 重复*/
  animation-delay: -7s;
  /*等待时间*/
}

.set div:nth-child(2) {
  left: 50%;
  animation: animate 15s linear infinite;
  animation-delay: -5s;
}

.set div:nth-child(3) {
  left: 70%;
  animation: animate 20s linear infinite;
}

.set div:nth-child(4) {
  left: 0%;
  animation: animate 15s linear infinite;
  animation-delay: -5s;
}

.set div:nth-child(5) {
  left: 85%;
  animation: animate 18s linear infinite;
  animation-delay: -10s;
}

.set div:nth-child(6) {
  left: 0%;
  animation: animate 12s linear infinite;
}

.set div:nth-child(7) {
  left: 15%;
  animation: animate 14s linear infinite;
}

.set div:nth-child(8) {
  left: 60%;
  animation: animate 15s linear infinite;
}

@keyframes animate {
  /*动画*/
  0% {
    top: -10%;
    opacity: 0;
    /*透明度*/
    transform: translateX(20px) rotate(0deg);
    /*动作 X轴移动 旋转*/
  }

  10% {
    opacity: 1;
  }

  20% {
    transform: translateX(-20px) rotate(45deg);
  }

  40% {
    transform: translateX(-20px) rotate(90deg);
  }

  60% {
    transform: translateX(20px) rotate(130deg);
  }

  80% {
    transform: translateX(-20px) rotate(180deg);
  }

  100% {
    top: 110%;
    transform: translateX(-20px) rotate(225deg);
  }
}

.set2 {
  transform: scale(2) rotateY(180deg);
  filter: blur(2px);
  /*模糊*/
  z-index: 3;
}

.set3 {
  transform: scale(0.8) rotateX(180deg);
  filter: blur(4px);
  z-index: 2;
}

h2 {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  /*居中*/
  margin: 0;
  color: #fff;
  /*字体颜色*/
  padding: 0;
  font-size: 8em;
  /*字体大小*/
  font-family: sans-serif;
  /*字体*/
  z-index: 1;
  /*Z轴顺序*/
  user-select: none;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

/* container */
.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container .form {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.social-container {
  margin: 10px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 5px 0;
  width: 100%;
}

button {
  border-radius: 20px;
  border: 1px solid #19026d;
  /* 0ec4a2  ff4b2b*/
  background: #19026d;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-out;
}

/* sign in */
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
 .no-account{
    display: none;
  }
@media screen and (max-width:675px){
  .sign-in-container {  
    width: 100%;    
  }
  .sign-up-container{
    display: block;
    width: 100% !important;
  }
  .overlay-container{
    display: none;
  }
  .no-account{
    display: block;
  }
}
/* sign up */
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

/* overlay-container */
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #ff416c;
  /* #ff4b2b, #ff416c */
  background: linear-gradient(to right, #19026d, #0ec4a2) no-repeat 0 0 / cover;
  color: #fff;
  height: 100%;
  width: 200%;
  position: relative;
  left: -100%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  padding: 0 40px;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.overlay-left {
  transform: translateX(-20%);
}

/* animation */
/* move sign in to the right */
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

/* move overlay to left */
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

/* bring sign up over sign in */
.container.right-panel-active .sign-up-container {
  opacity: 1;
  z-index: 5;
  transform: translateX(100%);
}

/* move overlay back to right */
.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

@media screen and (max-width: 600px) {
  #foot {
    display: none;
  }
}
</style>