import { Game } from "../game/Game.js"
import { Vector2D } from "../Vector2D.js"
import {Player} from "./Player.js"
import {Item} from "./Item.js"
import {randomInt} from "../RandomInt.js"
import {config} from "./Config.js"
import {R} from "./R.js"
import {ItemContent} from "./ItemContent/ItemContent.js"
import {Sprite} from "../game/Sprite.js"

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
        this.setupImages()
        this.setupControls()
    }

    setupImages() {
        const img = new Image()
        img.onload = () => {
            this.backgroundImage = img
            this.resizeCanvas()
        }
        img.src = 'sources/bar/resources/background.png'

        const allLoaded = () => {
            this.start()
        }
        const imagesToLoad = {
            bg: 'sources/bar/resources/background.png',
            player: 'sources/bar/resources/player_run_right.png',
            glass1: 'sources/bar/resources/glass1.png',
            glass2: 'sources/bar/resources/glass2.png',
        }
        const keys = Object.keys(imagesToLoad)
        let loaded = 0
        for (const key of keys) {
            R[key] = new Image()
            R[key].src = imagesToLoad[key]
            R[key].onload = () => {
                loaded += 1
                if (loaded === keys.length) {
                    allLoaded()
                }
            }
        }
    }
    start() {
        super.start()
        this.gameObjects = []
        this.player = new Player()
        this.gameObjects.push(this.player)
        this.setupItemContents()
        this.setupItems()
    }

    setupItemContents() {
        this.itemContentPool = [
            new ItemContent(
                "glass1",
                ItemContent.Type.glass,
                new Sprite(R.glass1, new Vector2D(256, 256))
            ),
            new ItemContent(
                "glass2",
                ItemContent.Type.glass,
                new Sprite(R.glass2, new Vector2D(256, 256))
            )
        ]
    }

    setupItems() {
        let items = []
        for (let i = 0 ; i < config.itemsCount ; i += 1) {
            const item = new Item()
            items.push(item)
            this.gameObjects.push(item)
        }
        const spawnInterval = 1000 / config.itemsSpawnsPerSecond
        this.items = items

        setInterval(() => {
            const nextItem = items[items.findIndex((item => !item.isActive))]
            if (!nextItem) { return }
            const content = this.itemContentPool[randomInt(0, this.itemContentPool.length - 1)]
            nextItem.spawnAtLogicPos(randomInt(0, config.positinCount - 1), content)
        }, spawnInterval)
    }

    update(dt) {
        super.update(dt)
        for (const item of this.items) {
            if (item.pos.distanceTo(this.player.pos) < config.distanceToCollect && item.isActive) {
                item.isActive = false
                this.collected(item)
            }
        }
    }

    collected(item) {
        console.log("Collected")
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
