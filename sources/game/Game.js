export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.gameObjects = []
        this.isRunning = false
        this.initialize()
    }
    
    initialize() {
        
    }
    
    start() {
        this.isRunning = true
        this.mainLoop()
    }
    
    stop () {
        this.isRunning = false
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (const obj of this.gameObjects) {
            obj.render(this.ctx)
        }
    }
    
    update(dt) {
        for (const obj of this.gameObjects) {
            obj.update(dt)
        }
    }
    
    mainLoop() {
        let lastRenderTime = Date.now()
        window.requestAnimationFrame(() => {
            this.render()
            const renderTime = Date.now()
            const dt = renderTime - lastRenderTime
            this.update(dt)
            if (!this.isRunning) { return }
            this.mainLoop()
        })
    }
}
