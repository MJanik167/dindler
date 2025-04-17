import ContentCard from "./ContentCard.js";

const containerWidth = 36
const containerHeight = 60
let choiceAccepted;


let sliderHover = () => {
    if (!contentActive) {
        document.addEventListener('mousemove', mouseListener)
        document.addEventListener('click', clickListener)
        contentActive = true
    }
    content.getHTML().removeEventListener('mouseover', sliderHover);
    console.log("hover")
    let width = containerWidth
    let height = containerHeight
    let animationFrame = () => {
        width -= containerWidth / 100
        height -= containerHeight / 100
        content.getHTML().style.width = `${width}vh`
        content.getHTML().style.height = `${height}vh`
        if (height >= 40) {
            requestAnimationFrame(animationFrame)
        } else {
            content.getHTML().style.width = `${24}vh`
            content.getHTML().style.height = `${40}vh`
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
    content.update(event)
}

let clickListener = (event) => {
    if (contentActive) {
        document.removeEventListener('mousemove', mouseListener)
        document.removeEventListener('click', clickListener)
        content.release()
        disposed.push(content)

        content = new ContentCard('https://example.com/content')
        container.style.width = `${containerWidth}vh`
        container.style.height = `${containerHeight}vh`
        container.appendChild(content.getHTML())
        content.getHTML().addEventListener('mouseover', sliderHover);

        contentActive = false
    }
}


let container = document.getElementById('container')
let content = new ContentCard('https://example.com/content')
container.appendChild(content.getHTML())

let sldier = document.getElementById('content')
content.getHTML().addEventListener('mouseover', sliderHover);

let contentActive = false

let disposed = []

const frame = () => {
    content.update()
    container.innerHTML = content.getHTML()
    disposed.forEach(disposedCard => {
        disposedCard.update()
    });
    console.log("animation")
    requestAnimationFrame(frame)
}
requestAnimationFrame(frame)