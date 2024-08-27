import {GameObject} from "../game/GameObject.js"
import {Vector2D} from "../Vector2D.js"
import {fromRelativeVector, fromRelativeX} from "../ScreenAdapter.js"
import {config} from "./Config.js"
import {Sprite} from "../game/Sprite.js"
import {R} from "./R.js"

export class Player extends GameObject {
    #logicPos = 0
    #targetPos = 0
    #spriteSize = new Vector2D(100, 100)
    #spriteSizeRatio = this.#spriteSize.y / this.#spriteSize.x
    pos = new Vector2D(0, 1)
    sprite = new Sprite(R.player, new Vector2D(256, 256), 19)

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
        this.sprite.update(dt)
        let diff = this.#targetPos - this.pos.x
        const move = diff * (dt/100)
        this.pos.x += move

        if (Math.abs(diff) > 0.001) {
            this.sprite.isFlipped = diff < 0
            if (!this.sprite.isAnimationStarted) {
                this.sprite.startAnimation()
            }
        } else {
            this.sprite.stopAnimation()
        }
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
        this.sprite.render(
            ctx,
            pos.x - size.x / 2,
            pos.y - size.y,
            size.x,
            size.y
        )
    }
}
