import {GameObject} from "../game/GameObject.js"
import {Vector2D} from "../Vector2D.js"
import {fromRelativeVector, fromRelativeX} from "../ScreenAdapter.js";
import {config} from "./Config.js";

export class Player extends GameObject {
    #logicPos = 0
    #targetPos = 0
    #spriteSize = new Vector2D(50, 100)
    #spriteSizeRatio = this.#spriteSize.y / this.#spriteSize.x
    pos = new Vector2D(0, 1)
    
    moveRight() {
        this.#logicMove(1)
    }
    
    moveLeft() {
        this.#logicMove(-1)
    }
    #logicMove(direction) {
        this.#logicPos = Math.min(Math.max(this.#logicPos + direction, 0), config.positinCount - 1)
        this.#targetPos = this.#logicPos * (1 / (config.positinCount - 1))
    }
    
    update(dt) {
        super.update(dt)
        let diff = this.#targetPos - this.pos.x
        this.pos.x += diff * (dt/100)
        
    }

    render(ctx) {
        super.render(ctx)
        
        const pos = fromRelativeVector(
            ctx,
            this.pos,
            config.padding
        )
        const sizeX = fromRelativeX(ctx, config.playerSizeX)
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
