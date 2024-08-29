import {Vector2D} from "../Vector2D.js"
class Config {
    backgroundInterval = 20000
    padding = new Vector2D(0.2, 0.12)
    playerSizeX = 0.30
    itemSizeX = 0.2
    itemUISizeX = 0.25
    positinCount = 4
    defaultItemLifeTime = 1800
    itemsCount = 10
    defaultItemsSpawnsPerSecond = 1.2
    distanceToCollect = 0.2
    panicTime = 5000
    isPanicActive = false
    get itemLifeTime() {
        return this.isPanicActive ? this.defaultItemLifeTime / 1.5 : this.defaultItemLifeTime
    }
    get itemsSpawnsPerSecond() {
        return this.isPanicActive ? this.defaultItemsSpawnsPerSecond * 1.8 : this.defaultItemsSpawnsPerSecond
    }
}
export const config = new Config()