<template>
  <div class="RunPage">
    <b-nav class="navbar navbar-expand" ref="navbar">
      <ul class="navbar-nav mr-auto">
        <li class="navitem">
          <router-link to="/" class="nav-link"> &lsaquo; Back </router-link>
        </li>
      </ul>
      <Button
        outline
        color="primary"
        @click="handlePauseResume"
        :disabled="!running"
      >
        {{ paused ? "Resume" : "Pause" }}
      </Button>
    </b-nav>
    {{texterror}}
     <button  @click="fullscreen()">全屏</button>
    <span v-if="error">{{ error }}</span>
    
    <div v-else class="screen-container" ref="screenContainer">
      <b-progress
        v-if="loading"
        :value="loadedPercent"
        :style="{
          position: 'absolute',
          width: '70%',
          left: '15%',
          top: '48%',
        }"
      />

      <div class="center-flex" id="gameMain">
        <div id="joy-con">
          <div class="center">
            <button @touchstart="pressKey('up','down')"  @touchend="pressKey('up','up')" class="up">up</button>
          </div>
          
          
          <div class="between">
            <button @touchstart="pressKey('left','down')"   @touchend="pressKey('left','up')" class="left">left</button>
            <button @touchstart="pressKey('right','down')"  @touchend="pressKey('right','up')" class="right">right</button>      
          </div>
           <div class="center">         
            <button @touchstart="pressKey('down','down')"  @touchend="pressKey('down','up')" class="down">down</button>
          </div>
        </div>
         <div class="start-btn-graoup">
          <button @touchstart="pressKey('start','down')"  @touchend="pressKey('start','up')" >start</button>
         <button @touchstart="pressKey('select','down')"  @touchend="pressKey('select','up')">select</button>
 
        </div>
        <div class="click-btn-graoup">
           <button @touchstart="pressKey('A','down')"  @touchend="pressKey('A','up')" >A</button>
            <button @touchstart="pressKey('B','down')"  @touchend="pressKey('B','up')" >B</button>
            <button @touchstart="pressKey('B','down')"  @touchend="pressKey('B','up')" >B</button>
        </div>
        <b-container>
          <b-row>
            <b-col
              ><Screen
                ref="screen"
                @GenerateFrame="
                  {
                    () => nes.frame();
                  }
                "
            /></b-col>
          </b-row>
          <b-row>
            <b-col><b-table striped hover :items="items"></b-table></b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>
import { NES } from "jsnes";
import Raven from "raven-js";
import { Controller } from 'jsnes'
import config from "@/assets/script/config";
import { queryGameDetail, queryGameList, saveGame, delGame } from "@/api/game";
import KeyboardController from "@/assets/script/KeyboardController";
import Screen from "./Screen";
import Speakers from "@/assets/script/Speakers";
import ControlsModal from "@/components/game/ControlsModal";
import FrameTimer from "@/assets/script/FrameTimer";
import "@/assets/css/RunPage.css";
var _this;
var nes;
export default {
  components: {
    Screen,
    ControlsModal,
  },
  data() {
    return {

      onButtonDown:{},
      onButtonUp:{},
      items: [
        {
          button: "Player 1",
          Left: "a",
          Right: "d",
          Up: "w",
          Down: "s",
          A: "j",
          B: "k",
          Start: "Enter",
          Select: "Ctrl",
        },
        {
          button: "Player 2",
          Left: "Num-4",
          Right: "Num-6",
          Up: "Num-8",
          Down: "Num-2",
          A: "Num-7",
          B: "Num-9",
          Start: "Num-1",
          Select: "Num-1",
        },
      ],
      
      currentkeynum:0,
      num:1,
      speakers: null,
      running: false,
      frameTimer: null,
      loading: false,
      paused: false,
      error: null,
      texterror:null,
      clickCount:0,
      loadedPercent: 0,
      keyboardController: null,
      currentRequest: null,
      fpsInterval: null,
      singleGame: {},
      isRun:false,
      typeFlag:false
    };
  },
  created() {},
  mounted() {
    _this = this;
    // this.initNipplejs();
    this.speakers = new Speakers({
      onBufferUnderrun: (actualSize, desiredSize) => {
        if (!_this.running || _this.paused) {
          return;
        }

        nes.frame();

        if (_this.speakers.buffer.size() < desiredSize) {
          console.log("Still buffer underrun, running a second frame");
          nes.frame();
        }
      },
    });
    nes = new NES({
      onFrame: _this.$refs.screen.setBuffer,
      onStatusUpdate: console.log,
      onAudioSample: _this.speakers.writeSample,
    });

    // For debugging
    window.nes = nes;

    this.frameTimer = new FrameTimer({
      onGenerateFrame: Raven.wrap(nes.frame),
      onWriteFrame: Raven.wrap(this.$refs.screen.writeBuffer),
    });

    this.keyboardController = new KeyboardController({
      onButtonDown: nes.buttonDown,
      onButtonUp: nes.buttonUp,
    });
    this.onButtonDown=nes.buttonDown
    this.onButtonUp=nes.buttonUp

    document.addEventListener("keydown", this.keyboardController.handleKeyDown);
    document.addEventListener("keyup", this.keyboardController.handleKeyUp);
    document.addEventListener(
      "keypress",
      this.keyboardController.handleKeyPress
    );

    window.addEventListener("resize", this.layout);
    console.log("typeof layout" + typeof _this.layout);
    _this.layout();

    this.load();
  },
  beforeDestroy() {
    if (this.currentRequest) {
      this.currentRequest.abort();
    }
    this.stop();
    document.removeEventListener(
      "keydown",
      this.keyboardController.handleKeyDown
    );
    document.removeEventListener("keyup", this.keyboardController.handleKeyUp);
    document.removeEventListener(
      "keypress",
      this.keyboardController.handleKeyPress
    );
    window.removeEventListener("resize", this.layout);

    window.nes = undefined;
  },
  methods: {
    fullscreen(){

        let num=this.num;
        
        num = num || 1;
        num = num * 1;
        // var docElm = document.documentElement;
        var docElm = document.getElementById("gameMain");
        switch (num) {
            case 1:
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
                break;
            case 2:
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                break;
        }

        return new Promise(function (res, rej) {
            res("返回值");
        });
    },
    clearKeyEnter(arr,keymap){
        arr.forEach(element => {
          this.pressKey(keymap[element],"up")
        });
    },
    pressbtn(btn){
      
      if(!this.typeFlag){
          this.typeFlag=true;
          let keymap={A:74,B:75,BB:76,start:13,select:17,up:87,down:83,left:65,right:68}
          let keynum=keymap[btn];
          if(keynum!==this.currentkeynum){
            this.pressKey(this.currentkeynum,"up")
              this.typeFlag=false;
              setTimeout(()=>{
                  this.pressKey(keynum,"down")
              },10)
          }
          console.log(keynum) // debugger
          this.pressKey(keynum,"down")
     
          setTimeout(()=>{
          this.pressKey(keynum,"up")
          this.typeFlag=false;
        },1000)

      }

      
    },
    clickbtn(btn){
      
      if(this.clickCount>0&&this.currentkeynum==keynum){
          this.isRun=true;
          this.clickCount=0;
      }
      let keymap={A:74,B:75,BB:76,start:13,select:17,up:87,down:83,left:65,right:68}
      let arr=['A','B','BB','start','select']
      // this.clearKeyEnter(arr,keymap);
      let keynum=keymap[btn];
      console.log(keynum)
      // debugger
      this.pressKey(keynum,"down")


       setTimeout(()=>{
          this.pressKey(keynum,"up")
        },20)

      this.clickCount=this.clickCount+1
       this.currentkeynum=keynum
    },
    
    pressKey: function (code, keyEvent) {

      let constKEYS ={
  74: [1, Controller.BUTTON_A], // j
  75: [1, Controller.BUTTON_B], // k (Central European keyboard)
  76: [1, Controller.BUTTON_B], // l
  17: [1, Controller.BUTTON_SELECT], // Right Ctrl
  13: [1, Controller.BUTTON_START], // Enter
  87: [1, Controller.BUTTON_UP], // Up w 
  83: [1, Controller.BUTTON_DOWN], // Down s
  65: [1, Controller.BUTTON_LEFT], // Left a
  68: [1, Controller.BUTTON_RIGHT], // Right d
  103: [2, Controller.BUTTON_A], // Num-7
  105: [2, Controller.BUTTON_B], // Num-9
  99: [2, Controller.BUTTON_SELECT], // Num-3
  97: [2, Controller.BUTTON_START], // Num-1
  104: [2, Controller.BUTTON_UP], // Num-8
  98: [2, Controller.BUTTON_DOWN], // Num-2
  100: [2, Controller.BUTTON_LEFT], // Num-4
  102: [2, Controller.BUTTON_RIGHT] // Num-6
}
      
     let keymap={A:74,B:75,BB:76,start:13,select:17,up:87,down:83,left:65,right:68}

     let keyCode = Number(keymap[code]);
     debugger
      keyCode = constKEYS[keyCode]
      debugger
      // console.log(evt)
      if (keyEvent === "down") {
       this.texterror="down"
        this.onButtonDown(keyCode[0],keyCode[1])
      }

      if (keyEvent === "up") {
        this.texterror="up"
          this.onButtonUp(keyCode[0],keyCode[1])
      }

      if (keyEvent === "press") {
         
      }
      
    },
    initNipplejs() {
      let self = this;
      let joyCon = document.querySelector("#joy-con");
      // eslint-disable-next-line no-debugger
      let options = {
        mode: "static", // 'dynamic', 'static' or 'semi'
        size: 150,
        position: {
          left: "20%",
          top: "50%",
        }, //在容器内垂直居中显示
        zone: joyCon, //如果不提提供zone容器元素，那么默认动态生成的元素是注入在body中的。
      };
      var manager = require("nipplejs").create(options);

      //滑动摇杆的事件
      manager.on("move", function (evt, data) {
        let direction = data.direction.angle;
        console.log(direction);
        // debugger
        if (direction) {
          console.log(direction);
          switch (direction) {
            case "up":
              self.pressbtn("up");
              break;
            case "down":
              self.pressbtn("down");
              break;
            case "left":
              self.pressbtn("left");
              break;
            case "right":
              self.pressbtn("right");
              break;
       
            default:
              break;
          }
        }
      });

      //停止滑动摇杆的事件
      manager.on("start end", function (evt, data) {
        self.pressKey(87, "up");
        self.pressKey(83, "up");
        self.pressKey(68, "up");
        self.pressKey(65, "up");
      });
    },
    loadBinary(path, callback, handleProgress) {
      var req = new XMLHttpRequest();
      req.open("GET", path);
      req.overrideMimeType("text/plain; charset=x-user-defined");
      req.onload = function () {
        if (this.status === 200) {
          callback(null, this.responseText);
        } else if (this.status === 0) {
          // Aborted, so ignore error
        } else {
          callback(new Error(req.statusText));
        }
      };
      req.onerror = function () {
        callback(new Error(req.statusText));
      };
      req.onprogress = handleProgress;
      req.send();
      return req;
    },
    async load() {
      if (this.$route.params.rom) {
        const romName = this.$route.params.rom;

        let { data } = await queryGameDetail(romName);
        // debugger
        this.singleGame = data.data;

        const path = this.singleGame.romUrl;
        // debugger;
        if (!path) {
          this.error = `No such ROM: ${romName}`;
          return;
        }
        this.currentRequest = this.loadBinary(
          path,
          (err, data) => {
            if (err) {
              window.alert(`Error loading ROM: ${err.toString()}`);
            } else {
              _this.handleLoaded(data);
            }
          },
          _this.handleProgress
        );
      } else {
        window.alert("No ROM provided");
      }

    },

    handleProgress(e) {
      if (e.lengthComputable) {
        this.loadedPercent = (e.loaded / e.total) * 100;
      }
    },

    handleLoaded(data) {
      console.log("handleLoaded");
      this.uiEnabled = true;
      this.running = true;
      this.loading = false;

      nes.loadROM(data);
      this.start();
    },
    start() {
      this.frameTimer.start();
      this.speakers.start();
      this.fpsInterval = setInterval(() => {
        console.log(`FPS: ${nes.getFPS()}`);
      }, 1000);
    },
    stop() {
      this.frameTimer.stop();
      this.speakers.stop();
      clearInterval(this.fpsInterval);
    },
    handlePauseResume() {
      if (this.paused) {
        this.paused = false;
        this.start();
      } else {
        this.paused = true;
        this.stop();
      }
    },

    layout() {
      let navbarHeight = parseFloat(
        window.getComputedStyle(this.$refs.navbar).height
      );
      this.$refs.screenContainer.style.height = `${window.innerHeight - navbarHeight}px`;
      this.$refs.screen.fitInParent();
    },
    toggleControlsModal() {
      this.controlsModal = !this.controlsModal;
    },
  },
};
</script>
<style lang="css" scoped>
*{ 
 -webkit-touch-callout:none; /*系统默认菜单被禁用*/
 -webkit-user-select:none; /*webkit浏览器*/
 -khtml-user-select:none; /*早期浏览器*/
 -moz-user-select:none;/*火狐*/
 -ms-user-select:none; /*IE10*/
 user-select:none; 
}
.center-flex {
  display: flex;
  width: 80%;
  min-height: 300px;
  align-items: center;
}
.tablestyle {
  width: 50%;
}
.card-columns {
  column-count: 1 !important;
}
.center-flex canvas {
  width: 100%;
  max-height: 700px;
}

.front {
  background-color: #fff;
  user-select: none;
}

.back {
  background-image: url("../../assets/j.png");
  background-size: cover;
  user-select: none;
}
.click-btn-graoup{
  width: 200px;
  height: 30px;
  position: fixed;
  left: 68%;
  bottom: 26%;
  display: flex;
  justify-content: space-between;
  z-index: 999;
}
.click-btn-graoup button{
  width: 50px;
  height: 30px;
  background-color: rgba(28, 15, 218, 0.8);
  color: #fff;
}
@media screen and (min-width: 1000px){
    #joy-con{
      display: none !important;
    }
   .start-btn-graoup{
      display: none !important;
    }
  .click-btn-graoup{
    display: none !important;
  }
}
#joy-con{
  position: fixed;
  left: 10%;
  top: 50%;
  z-index: 999;
  height: 100px;
  width: 170px;
}
#joy-con button{
  width: 60px;
  height: 60px;
  background-color: rgba(28, 15, 218, 0.8);
  color: #fff;
}

#joy-con .between{
    display: flex;
    justify-content: space-between;
}

#joy-con .center{
    display: flex;
    justify-content: center;
}
#joy-con .left {

}

.start-btn-graoup{
  width: 160px;
  height: 30px;
  position: fixed;
  left: 39%;
  bottom:10%;
  display: flex;
  justify-content: space-between;
  z-index: 999;
}
.start-btn-graoup button{
  width: 50px;
  height: 30px;
  background-color: rgba(28, 15, 218, 0.8);
  color: #fff;
}
</style>