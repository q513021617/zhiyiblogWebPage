import { Controller } from 'jsnes'

// Mapping keyboard code to [controller, button]
const KEYS = {
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

export default class KeyboardController {
  constructor (options) {
    
    this.onButtonDown = options.onButtonDown
    this.onButtonUp = options.onButtonUp
  }

  handleKeyDown = e => {
    var key = KEYS[e.keyCode]
    console.log(e.keyCode)
    // debugger
    if (key) {
      this.onButtonDown(key[0], key[1])
      if (e.preventDefault) {
        e.preventDefault()
      }
    }
  };

  handleKeyUp = e => {
    var key = KEYS[e.keyCode]
    if (key) {
      this.onButtonUp(key[0], key[1])
      if (e.preventDefault) {
        e.preventDefault()
      }
    }
  };

  handleKeyPress = e => {
    e.preventDefault()
  };
}
