export class ItemContent {
    constructor(id, type, sprite) {
        this.id = id
        this.type = type
        this.sprite = sprite
    }
}

ItemContent.Type = Object.freeze({
    glass: Symbol("glass"),
    liquid: Symbol("liquid"),
    topping: Symbol("topping")
})