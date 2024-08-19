export class Vector2D {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }
    
    add(value) {
        if (value instanceof Vector2D) {
            this.x += value.x
            this.y += value.y
        } else {
            this.x += value
            this.y += value
        }
    }

    subtract(value) {
        if (value instanceof Vector2D) {
            this.x -= value.x
            this.y -= value.y
        } else {
            this.x -= value
            this.y -= value
        }
    }

    multiply(value) {
        if (value instanceof Vector2D) {
            this.x *= value.x
            this.y *= value.y
        } else {
            this.x *= value
            this.y *= value
        }
    }

    divide(value) {
        if (value instanceof Vector2D) {
            this.x /= value.x
            this.y /= value.y
        } else {
            this.x /= value
            this.y /= value
        }
    }
    
    adding(value) {
        if (value instanceof Vector2D) {
            return new Vector2D(
                this.x + value.x,
                this.y + value.y
            )
        } else {
            return new Vector2D(
                this.x + value,
                this.y + value
            )
        }
    }

    subtracting(value) {
        if (value instanceof Vector2D) {
            return new Vector2D(
                this.x - value.x,
                this.y - value.y
            )
        } else {
            return new Vector2D(
                this.x - value,
                this.y - value
            )
        }
    }

    multiplying(value) {
        if (value instanceof Vector2D) {
            return new Vector2D(
                this.x * value.x,
                this.y * value.y
            )
        } else {
            return new Vector2D(
                this.x * value,
                this.y * value
            )
        }
    }

    dividing(value) {
        if (value instanceof Vector2D) {
            return new Vector2D(
                this.x / value.x,
                this.y / value.y
            )
        } else {
            return new Vector2D(
                this.x / value,
                this.y / value
            )
        }
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    normalize() {
        const mag = this.magnitude()
        if (mag === 0) return new Vector2D(0, 0)
        return new Vector2D(this.x / mag, this.y / mag)
    }

    dot(value) {
        return this.x * value.x + this.y * value.y
    }

    distanceTo(value) {
        return Math.sqrt(
            (this.x - value.x) ** 2 +
            (this.y - value.y) ** 2
        )
    }

    angle() {
        return Math.atan2(this.y, this.x)
    }
    
    angleTo(value) {
        return Math.atan2(value.y - this.y, value.x - this.x)
    }

    rotate(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return new Vector2D(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        )
    }
}

MouseEvent.prototype.offsetVector2D = function() {
    return new Vector2D(this.offsetX, this.offsetY)
}