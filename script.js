import ContentCard from "./ContentCard.js";

const containerWidth = 60
const containerHeight = 60
let choiceAccepted;


let sliderHover = () => {
    if (!contentActive) {
        document.addEventListener('mousemove', mouseListener)
        document.addEventListener('click', clickListener)
        contentActive = true
    }
    slider.removeEventListener('mouseover', sliderHover);
    console.log("hover")
    let width = containerWidth
    let height = containerHeight
    let animationFrame = () => {
        width -= 0.5
        height -= 0.5
        container.style.width = `${width}vh`
        container.style.height = `${height}vh`
        if (width >= 40) {
            requestAnimationFrame(animationFrame)
        } else {
            container.style.width = `${40}vh`
            container.style.height = `${40}vh`

        }
    }
    requestAnimationFrame(animationFrame)

    if (!contentActive) {
        document.addEventListener('mousemove', mouseListener)
        document.addEventListener('click', clickListener)
        contentActive = true
    }
}

let mouseListener = (event) => {
    let cursorPosition = (window.innerWidth / 2 - event.clientX) / (window.innerWidth)
    let offset = 20 + cursorPosition * 40
    if (cursorPosition > 0) {
        choiceAccepted = true
    } else {
        choiceAccepted = false
    }
    console.log(choiceAccepted)
    let angle = cursorPosition * 15
    slider.style.marginLeft = `${offset}%`
    slider.style.rotate = `${angle}deg`
}

let clickListener = (event) => {
    if (contentActive) {
        document.removeEventListener('mousemove', mouseListener)
        document.removeEventListener('click', clickListener)
        slider.addEventListener('mouseover', sliderHover);
        content.release()
        contentActive = false
    }
}


let container = document.getElementById('container')
let content = new ContentCard('https://example.com/content')
container.innerHTML = content.getHTML()
let slider = document.getElementById('content')
console.log(slider)
slider.addEventListener('mouseover', sliderHover);
let contentActive = false
console.log(window.innerWidth)