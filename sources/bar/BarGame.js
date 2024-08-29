import { Game } from "../game/Game.js"
import { Vector2D } from "../Vector2D.js"
import {Player} from "./Player.js"
import {Item} from "./Item.js"
import {randomInt} from "../RandomInt.js"
import {config} from "./Config.js"
import {R} from "./R.js"
import {ItemContent} from "./ItemContent/ItemContent.js"
import {Sprite} from "../game/Sprite.js"
import {Cocktail} from "./Cocktail.js"

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
    
    backgroundRect = null
    initialize() {
        super.initialize()
        this.setupCanvas()
        this.setupImages()
        this.setupControls()
    }

    setupImages() {
        const allLoaded = () => {
            this.resizeCanvas()
            this.start()
        }
        const imagesToLoad = {
            bg1: 'sources/bar/resources/bg1.jpg',
            bg2: 'sources/bar/resources/bg2.jpg',
            player: 'sources/bar/resources/player_run_right.png',
            paper: 'sources/bar/resources/paper.png',
            // glass 1
            glass1: 'sources/bar/resources/glass1_falling.png',
            glass1_liquid1_ui: 'sources/bar/resources/glass1_liquid1_ui.png',
            glass1_liquid2_ui: 'sources/bar/resources/glass1_liquid2_ui.png',
            glass1_liquid3_ui: 'sources/bar/resources/glass1_liquid3_ui.png',
            glass1_topping1_ui: 'sources/bar/resources/glass1_topping1_ui.png',
            glass1_topping2_ui: 'sources/bar/resources/glass1_topping2_ui.png',
            // glass 2
            glass2: 'sources/bar/resources/glass2_falling.png',
            glass2_liquid1_ui: 'sources/bar/resources/glass2_liquid1_ui.png',
            glass2_liquid2_ui: 'sources/bar/resources/glass2_liquid2_ui.png',
            glass2_liquid3_ui: 'sources/bar/resources/glass2_liquid3_ui.png',
            glass2_topping1_ui: 'sources/bar/resources/glass2_topping1_ui.png',
            glass2_topping2_ui: 'sources/bar/resources/glass2_topping2_ui.png',
            // glass 3
            glass3: 'sources/bar/resources/glass3_falling.png',
            glass3_liquid1_ui: 'sources/bar/resources/glass3_liquid1_ui.png',
            glass3_liquid2_ui: 'sources/bar/resources/glass3_liquid2_ui.png',
            glass3_liquid3_ui: 'sources/bar/resources/glass3_liquid3_ui.png',
            glass3_topping1_ui: 'sources/bar/resources/glass3_topping1_ui.png',
            glass3_topping2_ui: 'sources/bar/resources/glass3_topping2_ui.png',
            // liquids
            liquid1: 'sources/bar/resources/liquid1_falling.png',
            liquid2: 'sources/bar/resources/liquid2_falling.png',
            liquid3: 'sources/bar/resources/liquid3_falling.png',
            // topping
            topping1: 'sources/bar/resources/topping1_falling.png',
            topping2: 'sources/bar/resources/topping2_falling.png',
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
        this.startTime = Date.now()
        this.gameObjects = []
        this.player = new Player()
        this.gameObjects.push(this.player)
        this.setupItemContents()
        this.setupItems()
        this.setupTargetCocktail()
        this.setupPlayerCocktail()
        this.updateTargetCocktail()
    }

    setupItemContents() {
        this.glasses = [
            new ItemContent(
                "glass1",
                ItemContent.Type.glass,
                new Sprite(R.glass1, new Vector2D(256, 256)),
                new Sprite(R.glass1, new Vector2D(256, 256)),
            ),
            new ItemContent(
                "glass2",
                ItemContent.Type.glass,
                new Sprite(R.glass2, new Vector2D(256, 256)),
                new Sprite(R.glass2, new Vector2D(256, 256)),
            ),
            new ItemContent(
                "glass3",
                ItemContent.Type.glass,
                new Sprite(R.glass3, new Vector2D(256, 256)),
                new Sprite(R.glass3, new Vector2D(256, 256)),
            )
        ]
        this.liquids = [
            new ItemContent(
                "liquid1",
                ItemContent.Type.liquid,
                new Sprite(R.liquid1, new Vector2D(256, 256)),
                null
            ),
            new ItemContent(
                "liquid2",
                ItemContent.Type.liquid,
                new Sprite(R.liquid2, new Vector2D(256, 256)),
                null
            ),
            new ItemContent(
                "liquid3",
                ItemContent.Type.liquid,
                new Sprite(R.liquid3, new Vector2D(256, 256)),
                null
            )
        ]
        this.toppings = [
            new ItemContent(
                "topping1",
                ItemContent.Type.topping,
                new Sprite(R.topping1, new Vector2D(256, 256)),
                null
            ),
            new ItemContent(
                "topping2",
                ItemContent.Type.topping,
                new Sprite(R.topping2, new Vector2D(256, 256)),
                null
            )
        ]
        this.itemContentPool = [
            ...this.glasses,
            ...this.liquids,
            ...this.toppings
        ]
    }

    setupTargetCocktail() {
        this.targetCocktail = new Cocktail(new Vector2D(0, -0.02), config.itemUISizeX, true)
        this.gameObjects.push(this.targetCocktail)
    }

    setupPlayerCocktail() {
        this.playerCocktail = new Cocktail(new Vector2D(1, -0.02), config.itemUISizeX)
        this.gameObjects.push(this.playerCocktail)
    }

    updateTargetCocktail() {
        this.targetCocktail.reset()
        this.targetCocktail.glass = this.glasses[randomInt(0, this.glasses.length-1)]
        this.targetCocktail.liquid = this.liquids[randomInt(0, this.liquids.length-1)]
        this.targetCocktail.topping = this.toppings[randomInt(0, this.toppings.length-1)]
        this.targetCocktail.setupSprites()
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

        for (const obj of this.#madeCocktails) {
            obj.update(dt)
        }
    }

    #madeCocktails = []

    #isCheatActive = false
    collected(item) {

        if (this.#isCheatActive) {
            this.playerCocktail.glass = this.targetCocktail.glass
            this.playerCocktail.liquid = this.targetCocktail.liquid
            this.playerCocktail.topping = this.targetCocktail.topping
        } else {
            this.playerCocktail.addCollectedContent(item.content)
        }

        if (!this.playerCocktail.isSimilarTo(this.targetCocktail)) {
            this.playerCocktail.reset()
            // wrong item
        } else {
            // right item
        }
        if (this.playerCocktail.isComplete) {
            this.updateTargetCocktail()

            this.#addMadeCocktails(this.playerCocktail.copy())
            this.playerCocktail.reset()
        }
    }

    #addMadeCocktails(cocktail) {
        this.#madeCocktails.unshift(cocktail)
        for (const cocktailIndex in this.#madeCocktails) {
            const cocktail = this.#madeCocktails[cocktailIndex]
            cocktail.sizeX = config.itemSizeX
            cocktail.targetPos = new Vector2D(
                cocktail.sizeX * cocktailIndex - config.padding.x + cocktail.sizeX / 5,
                1 + config.padding.y - cocktail.sizeX / 5
            )
        }
        this.#madeCocktails = this.#madeCocktails.slice(0, 9)

    }

    render() {
        this.#renderBackground()
        super.render()
        for (const obj of this.#madeCocktails) {
            obj.render(this.ctx)
        }
    }

    #renderBackground() {
        const ctx = this.ctx
        if (!R.bg1 || this.backgroundRect == null) return
        ctx.drawImage(
            R.bg1,
            this.backgroundRect.x,
            this.backgroundRect.y,
            this.backgroundRect.width,
            this.backgroundRect.height
        )
        if (!this.startTime || !R.bg2) { return }
        ctx.save()
        ctx.globalAlpha = Math.abs(((Date.now() - this.startTime) % config.backgroundInterval) - config.backgroundInterval/2) / (config.backgroundInterval/2)
        ctx.drawImage(
            R.bg2,
            this.backgroundRect.x,
            this.backgroundRect.y,
            this.backgroundRect.width,
            this.backgroundRect.height
        )
        ctx.restore()
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

        if (!R.bg1) return
        this.backgroundRect = aspectFillRectToBottom(
            {x: 0, y: 0, width: R.bg1.width, height: R.bg1.height},
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
