import {Vector2D} from "../Vector2D.js"

export class Sprite {
    
    #timeStart
    isAnimationStarted = false
    currentFrame = 0
    framesPerRow
    isFlipped = false
    #timePerFrame
    
    constructor(image, frameSize, frameCount, framesPerSecond) {
        this.image = image
        this.frameSize = frameSize
        this.frameCount = frameCount
        this.framesPerRow = image.width / frameSize.x
        this.framesPerSecond = framesPerSecond || 20
        this.#timePerFrame = 1000 / this.framesPerSecond
    }
    update(dt) {
        if (!this.isAnimationStarted) {
            this.currentFrame = this.frameCount - 1
            return
        }
        this.currentFrame = parseInt((Date.now() - this.#timeStart) / this.#timePerFrame) % this.frameCount
    }
    
    startAnimation() {
        this.#timeStart = Date.now()
        this.isAnimationStarted = true
    }
    
    stopAnimation () {
        this.isAnimationStarted = false
    }
    
    render(ctx, x, y, width, height) {
        const frameX = (this.currentFrame % this.framesPerRow) * this.frameSize.x
        const frameY = parseInt(this.currentFrame / this.framesPerRow) * this.frameSize.y
        console.log(frameX, frameY)
        
        ctx.save()
        ctx.scale(this.isFlipped ? -1 : 1, 1)
        ctx.drawImage(
            this.image,
            frameX,
            frameY,
            this.frameSize.x,
            this.frameSize.y,
            this.isFlipped ? -x - width: x,   
            y,
            width,
            height
        )
        
        ctx.restore()
    }
}