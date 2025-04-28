import ContentCard from "./ContentCard.js";

const containerWidth = 36
const containerHeight = 60
let choiceAccepted;
let navbar = document.getElementById('navbar')


let sliderHover = () => {
    if (!contentActive) {
        document.addEventListener('mousemove', mouseListener)
        document.addEventListener('click', clickListener)
        contentActive = true
    }
    content.getHTML().removeEventListener('mouseover', sliderHover);
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
    if (event.clientX < window.innerWidth * 0.1) {
        navbar.classList.add('slideIn')
        navbar.classList.remove('slideOut')
    } else {
        navbar.classList.remove('slideIn')
        navbar.classList.add('slideOut')
    }
}

async function clickListener(event) {
    if (contentActive) {
        document.removeEventListener('mousemove', mouseListener)
        document.removeEventListener('click', clickListener)
        let disposedCard = content.release(event.clientX - window.innerWidth / 2)
        disposed.push(disposedCard)
        console.log(disposed)

        content = new ContentCard()
        container.style.width = `${containerWidth}vh`
        container.style.height = `${containerHeight}vh`
        await content.setConent('https://meme-api.com/gimme')
        container.appendChild(content.getHTML())
        content.getHTML().addEventListener('mouseover', sliderHover);
        contentActive = false
    }
}


let contentActive = false

let disposed = []
let container = document.getElementById('container')
let content = new ContentCard()
await content.setConent('https://meme-api.com/gimme')
container.appendChild(content.getHTML());

content.getHTML().addEventListener('mouseover', sliderHover);
console.log("aaaa")

const frame = () => {
    disposed.forEach(disposedCard => {
        disposedCard.update()
    });
    requestAnimationFrame(frame)

}

requestAnimationFrame(frame)


