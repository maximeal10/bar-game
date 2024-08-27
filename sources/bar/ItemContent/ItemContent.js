export class ItemContent {
    constructor(id, type, spriteFalling, spriteUI) {
        this.id = id
        this.type = type
        this.spriteFalling = spriteFalling
        this.spriteUI = spriteUI
    }
}

ItemContent.Type = Object.freeze({
    glass: Symbol("glass"),
    liquid: Symbol("liquid"),
    topping: Symbol("topping")
})