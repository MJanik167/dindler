const rangeX = [0, 45]
const rangeY = [-8, 8]


export default class ContentDisposed {
    content;
    widht;
    height;
    bottom;
    rotation;
    position;
    destination;
    offsetX;
    offsetY;

    constructor(original, sign) {
        this.content = original

        this.offsetX = (Math.random() * (rangeX[1] - rangeX[0]) - rangeX[1]) * sign;
        this.offsetY = (Math.random() * (rangeY[1] - rangeY[0]) - rangeY[1]);
        let left = parseInt(this.content.style.marginLeft.slice(0, -1)) || 0
        this.position = left
        this.destination = left + this.offsetX
        this.sign = sign
        console.log(left)
        console.log(this.offsetX);

        this.height = parseInt(this.content.style.height.slice(0, -2))
        this.rotation = parseInt(this.content.style.rotate.slice(0, -3))
        this.bottom = this.height
        this.widht = this.height * 0.6
        document.getElementById('main').appendChild(this.content)
        this.content.removeAttribute('id')
        this.content.classList.add('contentDisposed')
        this.content.innerHTML = `
                `
    }

    update() {

        if (this.height > 12) {
            this.height -= this.height / 100
            this.widht -= this.widht / 100
        }
        if (this.bottom > 12 + this.offsetY) {
            this.bottom -= this.bottom / 100
        }

        if (this.rotation != 0) {
            this.rotation -= this.rotation / 30
        }

        if (this.position < this.destination) {
            this.position += 1
            if (this.destination - this.position < 1) {
                this.position = this.destination
            }

        } else if (this.position > this.destination) {
            this.position -= 1
            if (this.destination - this.position < 1) {
                this.position = this.destination
            }
        }


        if (this.rotation < 0.5 && this.rotation > -0.5) { this.rotation = 0 }

        this.content.style.marginLeft = `${this.position}%`
        this.content.style.rotate = `${this.rotation}deg`
        this.content.style.bottom = `${this.bottom}vh`
        this.content.style.width = `${this.widht}vh`
        this.content.style.height = `${this.height}vh`
    }

}



