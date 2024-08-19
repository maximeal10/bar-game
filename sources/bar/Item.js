import {GameObject} from "../game/GameObject.js"
import {Vector2D} from "../Vector2D.js";
import {config} from "./Config.js";
import {fromRelativeVector, fromRelativeX} from "../ScreenAdapter.js"

export class Item extends GameObject {
    #isActive = false
    #posY = 0
    #spriteSize = new Vector2D(25, 25)
    #spriteSizeRatio = this.#spriteSize.y / this.#spriteSize.x
    pos = new Vector2D(0, 0)
    
    spawnAtLogicPos(pos) {
        this.pos.x  = pos * (1 / (config.positinCount - 1))
        this.pos.y = 0
        this.#isActive = true
    }
    
    update(dt) {
        super.update(dt)
        if (!this.#isActive) return
        this.pos.y += dt / config.itemLifeTime
    }
    
    render(ctx) {
        super.render(ctx)
        if (!this.#isActive) return
        
        const pos = fromRelativeVector(
            ctx,
            this.pos,
            config.padding
        )
        const sizeX = fromRelativeX(ctx, config.itemSizeX)
        const size = new Vector2D(
            sizeX,
            sizeX * this.#spriteSizeRatio
        )

        ctx.beginPath()
        ctx.rect(
            pos.x - size.x / 2,
            pos.y - size.y,
            size.x,
            size.y
        )
        ctx.closePath()
        ctx.fillStyle = "red"
        ctx.fill()
    }
}
