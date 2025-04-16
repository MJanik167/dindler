const containerWidth = 60
const containerHeight = 60
let choiceAccepted;


sliderHover = () => {
    if (!contentActive) {
        document.addEventListener('mousemove', mouseListener)
        document.addEventListener('click', clickListener)
        contentActive = true
    }
    slider.removeEventListener('mouseover', sliderHover);
    console.log("hover")
    width = slider.style.width
    width = containerWidth
    height = containerHeight
    animationFrame = () => {
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

mouseListener = (event) => {
    cursorPosition = (window.innerWidth / 2 - event.clientX) / (window.innerWidth)
    offset = 20 + cursorPosition * 40
    if (cursorPosition > 0) {
        choiceAccepted = true
    } else {
        choiceAccepted = false
    }
    console.log(choiceAccepted)
    angle = cursorPosition * 15
    slider.style.marginLeft = `${offset}%`
    slider.style.rotate = `${angle}deg`
}

clickListener = (event) => {
    if (contentActive) {
        document.removeEventListener('mousemove', mouseListener)
        document.removeEventListener('click', clickListener)
        slider.addEventListener('mouseover', sliderHover);
        contentActive = false
    }
}

cursorPosition = 0
container = document.getElementById('container')
slider = document.getElementById('content')
slider.addEventListener('mouseover', sliderHover);
let contentActive = false
console.log(window.innerWidth)