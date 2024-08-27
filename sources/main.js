import { BarGame } from "./bar/BarGame.js"

window.addEventListener('load', () => {
    console.log("window load")
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    const game = new BarGame(canvas, ctx)
//    game.start() // starts automatically when images loaded
})
