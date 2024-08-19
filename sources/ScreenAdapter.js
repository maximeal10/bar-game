import {Vector2D} from "./Vector2D.js"

export const fromRelativeX = (ctx, x, paddingX) => {
    paddingX = paddingX || 0
    const padding = ctx.canvas.clientWidth * paddingX
    const availableSpace = ctx.canvas.clientWidth - padding * 2
    return padding + availableSpace * x
}

export const fromRelativeY = (ctx, y, paddingY) => {
    paddingY = paddingY || 0
    const padding = ctx.canvas.clientHeight * paddingY
    const availableSpace = ctx.canvas.clientHeight - padding * 2
    return padding + availableSpace * y
}

export const fromRelativeVector = (ctx, vector, padding) => {
    padding = padding || new Vector2D(0, 0)
    return new Vector2D(
        fromRelativeX(ctx, vector.x, padding.x),
        fromRelativeY(ctx, vector.y, padding.y)
    )
}

