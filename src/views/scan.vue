<template>
  <main class="reader">
    <h1> zhiyigo授权 </h1>
    <hr />
    <img src="../assets/logo.png" alt="" srcset="">
    <button class="sweep" @click="media()">扫一扫</button>
    <button class="sweep imageList">
      <input type="file" @change="upload($event)" />从相册选择
    </button>

    <b-modal id="bv-modal-example"  centered hide-footer size='lg'>
      <template v-slot:modal-title>
        zhiyigo授权
      </template>
    <div class="authLogo">
      <img src="../assets/logo.png" width="100px" height="100px" alt="" srcset="">
    </div>
    <b-button class="mt-3" block variant="outline-primary" @click="authLogin()">确认授权</b-button>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">取消授权</b-button>
  </b-modal>

    <textarea
      class="result"
      cols="76"
      rows="6"
      v-model="result"
      placeholder="二维码识别结果！"
    ></textarea>

    <canvas class="canvas" ref="canvas"></canvas>
  </main>
</template>

<script>

import jsQR from "jsqr";
import Jimp from "jimp";

import {loginBytoken} from '@/api/user'
export default {
  name: "Reader",
  data() {
    return {
      timer: null,
      result: "",
      authUrl:'',
      imgurl:
        "https://raw.githubusercontent.com/MuGuiLin/QRCode/master/VueQRCode/src/assets/github.com.png",
      imgurl2:
        "https://raw.githubusercontent.com/MuGuiLin/QRCode/master/VueQRCode/src/assets/github.com.png",
      isAnimation: true,
      audio: Object,
      video: Object,
      cvsele: Object,
      canvas: Object,
    };
  },

  mounted() {
    this.audio = new Audio("../assets/tone.mp3");
    this.video = document.createElement("video");
    this.cvsele = this.$refs.canvas;
    this.canvas = this.cvsele.getContext("2d");
    // this.$bvModal.show('bv-modal-example');
  },

  methods: {
    draw(begin, end) {
      this.canvas.beginPath();
      this.canvas.moveTo(begin.x, begin.y);
      this.canvas.lineTo(end.x, end.y);
      this.canvas.lineWidth = 3;
      this.canvas.strokeStyle = "red";
      this.canvas.stroke();
    },
    async authLogin(){
        let token=localStorage.getItem("token")
        let url=this.authUrl
        let {data}=await loginBytoken(url,token);
        this.$bvModal.hide('bv-modal-example');
    },
    async scanLogin(url){
        this.authUrl=url;
        this.$bvModal.show('bv-modal-example');
    },
    sweep() {
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        const { videoWidth, videoHeight } = this.video;
        this.cvsele.width = videoWidth;
        this.cvsele.height = videoHeight;
        this.canvas.drawImage(this.video, 0, 0, videoWidth, videoHeight);
        try {
          const img = this.canvas.getImageData(0, 0, videoWidth, videoHeight);
          this.imgurl = img;
          const obj = jsQR(img.data, img.width, img.height, {
            inversionAttempts: "dontInvert",
          });
          if (obj) {
            const loc = obj.location;
            this.draw(loc.topLeftCorner, loc.topRightCorner);
            this.draw(loc.topRightCorner, loc.bottomRightCorner);
            this.draw(loc.bottomRightCorner, loc.bottomLeftCorner);
            this.draw(loc.bottomLeftCorner, loc.topLeftCorner);
            if (this.result != obj.data) {
              this.audio.play();
              this.result = obj.data;
              this.isAnimation = false;
              cancelAnimationFrame(this.timer);
              console.info("识别结果：", obj.data);
              
              setTimeout(() => {
                this.cvsele.style.display = "none";
              }, 1000);
            }
            this.scanLogin(this.result);
          } else {
            console.error("识别失败，请检查二维码是否正确！");
          }
        } catch (err) {
          console.error("识别失败，请检查二维码是否正确！", err);
        }
      }
      if (this.isAnimation) {
        this.timer = requestAnimationFrame(() => {
          this.sweep();
        });
      }
    },

    media() {
      this.isAnimation = true;
      this.cvsele.style.display = "block";
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      if (navigator.mediaDevices) {
        navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: "environment" },
          })
          .then((stream) => {
            this.video.srcObject = stream;
            this.video.setAttribute("playsinline", true);
            this.video.setAttribute("webkit-playsinline", true);
            this.video.addEventListener("loadedmetadata", () => {
              this.video.play();
              this.sweep();
            });
          })
          .catch((error) => {
              let erroinfo=error.name + "：" + error.message + "，" + error.constraint;
            console.error(
              erroinfo
            );
            alert(erroinfo)
          });
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: { facingMode: "environment" },
          },
          (stream) => {
            this.video.srcObject = stream;
            this.video.setAttribute("playsinline", true);
            this.video.setAttribute("webkit-playsinline", true);
            this.video.addEventListener("loadedmetadata", () => {
              this.video.play();
              this.sweep();
            });
          },
          (error) => {
              let erroinfo=error.name + "：" + error.message + "，" + error.constraint;
            console.error(
              erroinfo
            );
            alert(erroinfo)
          }
        );
      } else {
        if (
          navigator.userAgent.toLowerCase().match(/chrome/) &&
          location.origin.indexOf("https://") < 0
        ) {
          console.error(
            "获取浏览器录音功能，因安全性问题，需要在localhost 或 127.0.0.1 或 https 下才能获取权限！"
          );
          alert("获取浏览器录音功能，因安全性问题，需要在localhost 或 127.0.0.1 或 https 下才能获取权限！");
        } else {
          alert("对不起：未识别到扫描设备!");
        }
      }
    },

    upload(e) {
      const file = e.target.files[0];
      const createObjectURL =
        window.createObjectURL ||
        window.URL.createObjectURL ||
        window.webkitURL.createObjectUR;
      this.result = "";
      this.imgurl = createObjectURL(file);

      const fReader = new FileReader();
      fReader.readAsDataURL(file); // Base64 8Bit字节码
      fReader.onload = (e) => {
        

        e.target.result && Jimp.read(e.target.result).then(async (res) => {
            const { data, width, height } = res.bitmap;
            try {
              const resolve = await jsQR(data, width, height);

              this.result = resolve.data;
                this.scanLogin(this.result)
              console.info("识别结果：", resolve.data);

            } catch (err) {
              this.result = "识别失败，请检查二维码是否正确！";
              console.error("识别失败，请检查二维码是否正确！", err);
              alert("识别失败，请检查二维码是否正确！", err)
            } finally {
              console.info("读取到的文件："+ res);
               alert("读取到的文件："+res)
            }
          })
          .catch((err) => {
            console.error("文件读取错误：", err);
          });
      };
    },
  },
};
</script>

<style lang="less">
.reader {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sweep {
    position: relative;
    margin: 20px;
    padding: 12px;
    width: 300px;
    font-size: 18px;
    cursor: pointer;
    color: white;
    background: #42b983;
    border: 1px solid #42b983;
    overflow: hidden;
    input {
      position: absolute;
      font-size: 100px;
      opacity: 0;
    }
  }

  .imgurl {
    margin: 20px;
    text-align: center;
    img {
      margin: 20px;
      padding: 10px;
      border: 1px solid gray;
      border-radius: 8px;
      width: 280px;
      height: 260px;
    }
  }
 
  .imageList{
     display: none;
  }
  .result {
    display: none;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 8px;
    font-size: 16px;
  }
  .canvas {
    display: none;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}

.modal-body {
  .authLogo{
    display: flex;
    justify-content: center;
  }
}
</style>