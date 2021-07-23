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

      <div class="center-flex">
        <div id="joy-con"></div>
        <div class="click-btn-graoup">
          <div id="A-btn" @click="clickbtn('A')">A</div>
          <div id="B-btn" @click="clickbtn('B')">B</div>
          <div id="BB-btn" @click="clickbtn('BB')">B</div>
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
      speakers: null,
      running: false,
      frameTimer: null,
      loading: null,
      paused: false,
      error: null,
      loadedPercent: 0,
      keyboardController: null,
      currentRequest: null,
      fpsInterval: null,
      singleGame: {},
    };
  },
  created() {},
  mounted() {
    _this = this;
    this.initNipplejs();
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
    clickbtn(btn){
      let arr={A:74,B:75,BB:76}
      this.pressKey(arr[btn])
    },
    pressKey: function (code, keyEvent) {
      let body = document.getElementsByTagName("body")[0];
      // debugger
      var evt = document.createEvent("UIEvents");
      evt.keyCode = code;
      if (keyEvent === "down") {
        evt.initEvent("keydown", true, true);
      }
      if (keyEvent === "up") {
        evt.initEvent("keyup", true, true);
      }
      body.dispatchEvent(evt);
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
          top: "20%",
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
              self.pressKey(87, "down");

              break;
            case "down":
              self.pressKey(83, "down");
              break;
            case "right":
              self.pressKey(68, "down");
              break;
            case "left":
              self.pressKey(65, "down");
              break;
            default:
              break;
          }
        }
      });

      //停止滑动摇杆的事件
      manager.on("end", function (evt, data) {
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
      // else if (this.props.location.state && this.props.location.state.file) {
      //   let reader = new FileReader()
      //   reader.readAsBinaryString(this.props.location.state.file)
      //   reader.onload = e => {
      //     this.currentRequest = null
      //     this.handleLoaded(e.target.result)
      //   }
      // }
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
      this.$refs.screenContainer.style.height = `${
        window.innerHeight - navbarHeight
      }px`;
      this.$refs.screen.fitInParent();
    },

    toggleControlsModal() {
      this.controlsModal = !this.controlsModal;
    },
  },
};
</script>
<style lang="css" scoped>
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
  width: 160px;
  position: fixed;
  right: 30%;
  top:10%;
  display: flex;
  justify-content: space-between;
}
.click-btn-graoup div{
  width: 10px;
  height: 10px;
  background-color: rgba(black, black, black, 0.2);
  color: #fff;
}
</style>