import {GameObject} from "../game/GameObject.js"
import {ItemContent} from "./ItemContent/ItemContent.js"
import {config} from "./Config.js";
import {fromRelativeVector, fromRelativeX} from "../ScreenAdapter.js";
import {Vector2D} from "../Vector2D.js"
import {Sprite} from "../game/Sprite.js"
import {R} from "./R.js"

export class Cocktail extends  GameObject {
    glass = null
    liquid = null
    topping = null

    #liquidSprite
    #toppingSprite
    #paperSprite = new Sprite(R.paper, new Vector2D(256, 256))
    constructor(pos, sizeX, withPaper, glass, liquid, topping) {
        super();
        this.sizeX = sizeX
        this.pos = pos
        this.withPaper = withPaper || false
        this.glass = glass || null
        this.liquid = liquid || null
        this.topping = topping || null
    }
    
    addCollectedContent(itemContent) {
        if (!this.#canAddContent(itemContent)) {
            this.reset()
            return
        }
        switch (itemContent.type) {
            case ItemContent.Type.glass:
                this.glass = itemContent
                break
            case ItemContent.Type.liquid:
                this.liquid = itemContent
                break
            case ItemContent.Type.topping:
                this.topping = itemContent
                break
        }
        this.setupSprites()
    }
    
    #canAddContent(itemContent) {
        switch (itemContent.type) {
            case ItemContent.Type.glass:
                return this.glass == null 
            case ItemContent.Type.liquid:
                return this.glass != null && this.liquid == null
            case ItemContent.Type.topping:
                return this.glass != null && this.liquid != null && this.topping == null
        }
    }
    
    reset() {
        this.glass = null
        this.liquid = null
        this.topping = null
        this.setupSprites()
    }
    
    isSimilarTo(targetCocktail) {
        if (this.glass) {
            if (this.glass !== targetCocktail.glass) {
                return false
            }
        }
        
        if (this.liquid) {
            if (this.liquid !== targetCocktail.liquid) {
                return false
            }
        }
        
        if (this.topping) {
            if (this.topping !== targetCocktail.topping) {
                return false
            }
        }
        
        return this.glass != null
    }
    
    get isComplete() {
        return !!this.glass && !!this.liquid && !!this.topping
    }

    setupSprites() {
        if (this.liquid) {
            this.#liquidSprite = new Sprite(R[`${this.glass.id}_${this.liquid.id}_ui`], new Vector2D(256, 256))
        } else {
            this.#liquidSprite = null
        }

        if (this.topping) {
            this.#toppingSprite = new Sprite(R[`${this.glass.id}_${this.topping.id}_ui`], new Vector2D(256, 256))
        } else {
            this.#toppingSprite = null
        }
    }

    render(ctx) {
        super.render(ctx)
        
        const pos = fromRelativeVector(
            ctx,
            this.pos,
            config.padding
        )
        const sizeX = fromRelativeX(ctx, this.sizeX)
        const size = new Vector2D(
            sizeX,
            sizeX
        )

        if (this.withPaper) {
            this.#paperSprite.render(
                ctx,
                pos.x - size.x / 2,
                pos.y - size.y / 2,
                size.x,
                size.y
            )
        }

        if (this.#toppingSprite) {
            this.#toppingSprite.render(
                ctx,
                pos.x - size.x / 2,
                pos.y - size.y / 2,
                size.x,
                size.y
            )
        }

        if (this.glass) {
            this.glass.spriteUI.render(
                ctx,
                pos.x - size.x / 2,
                pos.y - size.y / 2,
                size.x,
                size.y
            )
        }

        if (this.#liquidSprite) {
            this.#liquidSprite.render(
                ctx,
                pos.x - size.x / 2,
                pos.y - size.y / 2,
                size.x,
                size.y
            )
        }

    }
}
