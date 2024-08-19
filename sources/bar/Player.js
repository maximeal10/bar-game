import {GameObject} from "../game/GameObject.js"
import {Vector2D} from "../Vector2D.js"
import {fromRelativeVector, fromRelativeX} from "../ScreenAdapter.js";

const logicPosCount = 5
const horizontalPadding = 0.1

export class Player extends GameObject {
    #logicPos
    #targetPos
    #pos
    #sizeX
    #spriteSize
    #spriteSizeRatio
    constructor() {
        super();
        this.#logicPos = 0
        this.#targetPos = 0
        this.#pos = 0
        this.#sizeX = 0.1
        this.#spriteSize = new Vector2D(50, 100)
        this.#spriteSizeRatio = this.#spriteSize.y / this.#spriteSize.x
    }
    
    moveRight() {
        this.#logicMove(1)
    }
    
    moveLeft() {
        this.#logicMove(-1)
    }
    #logicMove(direction) {
        this.#logicPos = Math.min(Math.max(this.#logicPos + direction, 0), logicPosCount - 1)
        this.#targetPos = this.#logicPos * (1 / (logicPosCount - 1))
    }
    
    update(dt) {
        super.update(dt)
        let diff = this.#targetPos - this.#pos
        this.#pos += diff * (dt/100)
        
    }

    render(ctx) {
        super.render(ctx)
        
        const pos = fromRelativeVector(
            ctx,
            new Vector2D(this.#pos, 1),
            new Vector2D(0.1, 0.05)
        )
        const sizeX = fromRelativeX(ctx, this.#sizeX)
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
