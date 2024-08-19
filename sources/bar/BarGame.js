import { Game } from "../game/Game.js"
import { Vector2D } from "../Vector2D.js"
import {Player} from "./Player.js"
import {Item} from "./Item.js"
import {randomInt} from "../RandomInt.js"
import {config} from "./Config.js"

export class BarGame extends Game {
    
    initialize() {
        super.initialize()
        this.setupCanvas()
        this.player = new Player()
        this.item = new Item()
        this.gameObjects.push(this.player)
        this.gameObjects.push(this.item)
        this.setupControls()
    }

    start() {
        super.start()
        setInterval(() => {
            this.item.spawnAtLogicPos(randomInt(0, config.positinCount - 1))
        }, config.itemLifeTime)
    }
    
    render() {
        super.render()
    }

    setupCanvas() {
        window.addEventListener('resize', (this.resizeCanvas), false);
        // Draw canvas border for the first time.
        this.resizeCanvas()
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
