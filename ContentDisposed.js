export default class ContentDisposed {
    content;

    constructor(original) {
        this.content = original
        document.getElementById('main').appendChild(this.content)
        this.content.removeAttribute('id')
        this.content.classList.add('contentDisposed')
        this.content.innerHTML = `
                `
    }
}


function getAbsolutePosition(element) {
    const rect = element.getBoundingClientRect();
    console.log(element.getBoundingClientRect());
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
        top: scrollTop,
        left: scrollLeft
    };
}
