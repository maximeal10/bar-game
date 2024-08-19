import { Game } from "../game/Game.js"
import { Vector2D } from "../Vector2D.js"
import {Player} from "./Player.js"
import {Item} from "./Item.js"
import {randomInt} from "../RandomInt.js"
import {config} from "./Config.js"


const aspectFillRectToBottom = (rect1, rect2) => {
    const aspectRatio = rect1.width / rect1.height;

    // Determine the scaling factor to cover rect2 completely
    const scaleFactor = Math.max(rect2.width / rect1.width, rect2.height / rect1.height);

    // Calculate the new dimensions of rect1
    const newWidth = rect1.width * scaleFactor;
    const newHeight = rect1.height * scaleFactor;

    // Align rect1 to the bottom of rect2
    const x = (rect2.width - newWidth) / 2 + rect2.x;
    const y = rect2.y + rect2.height - newHeight;

    // Return the new position and size for rect1
    return {
        x,
        y,
        width: newWidth,
        height: newHeight
    };
}

export class BarGame extends Game {
    
    backgroundImage = null
    backgroundRect = null
    initialize() {
        super.initialize()
        this.setupCanvas()
        this.setupImage()
        this.player = new Player()
        this.item = new Item()
        this.gameObjects.push(this.player)
        this.gameObjects.push(this.item)
        this.setupControls()
    }

    setupImage() {
        const img = new Image()
        img.onload = () => {
            this.backgroundImage = img
            this.resizeCanvas()
        }
        img.src = 'sources/bar/resources/background.png';
    }
    start() {
        super.start()
        setInterval(() => {
            this.item.spawnAtLogicPos(randomInt(0, config.positinCount - 1))
        }, config.itemLifeTime)
    }
    
    render() {
        this.#renderBackground()
        super.render()
    }

    #renderBackground() {
        const ctx = this.ctx
        if (this.backgroundImage == null || this.backgroundRect == null) return
        ctx.drawImage(
            this.backgroundImage,
            this.backgroundRect.x,
            this.backgroundRect.y,
            this.backgroundRect.width,
            this.backgroundRect.height
        )
    }

    setupCanvas() {
        window.addEventListener('resize', () => {
            this.resizeCanvas()
        }, false);
        // Draw canvas border for the first time.
        this.resizeCanvas()
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        if (this.backgroundImage == null) return
        this.backgroundRect = aspectFillRectToBottom(
            {x: 0, y: 0, width: this.backgroundImage.width, height: this.backgroundImage.height},
            {x: 0, y: 0, width: this.canvas.width, height: this.canvas.height}
        )
    }
    setupControls() {
        
        
        this.canvas.addEventListener('mousedown', (e) => {
            
            if (e.clientX > this.canvas.clientWidth / 2) {
                this.player.moveRight()    
            } else {
                this.player.moveLeft()
            }
            
        })
        
        this.canvas.addEventListener('mouseup', (e) => {
            
        })
        this.canvas.addEventListener('mousemove', (e) => {
            
        })
    }
}
