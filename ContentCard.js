import ContentDisposed from "./ContentDisposed.js";

export default class ContentCard {
    container
    constructor(url) {
        this.url = url;
        this.container = document.createElement('div')
        this.container.id = "content"
        this.container.innerHTML = `
                <div id="selectBar">
                    <div id="no" class="choiceButton"> no </div>
                    <div id="report"> x </div>
                    <div id="yes" class="choiceButton"> yes </div>
                </div>
                `
        console.log(this.container.getBoundingClientRect())
        this.fetchContent(this.container)
    }

    async fetchContent(container) {
        var request = new XMLHttpRequest();

        request.open('GET', 'https://meme-api.com/gimme');

        request.setRequestHeader('Accept', 'application/json');

        request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            console.log()
            container.style.backgroundImage = `url(${JSON.parse(this.responseText).url})`;
        }
    };

        request.send();
    }

    update(event) {
        let cursorPosition = (window.innerWidth / 2 - event.clientX) / (window.innerWidth)
        let offset = 20 + cursorPosition * 100
        // if (cursorPosition > 0) {
        //     choiceAccepted = true
        // } else {
        //     choiceAccepted = false
        // }
        let angle = cursorPosition * 15
        this.container.style.marginLeft = `${offset}%`
        this.container.style.rotate = `${angle}deg`
    }

    release() {
        new ContentDisposed(this.container)
    }

    getHTML() {
        return this.container
    }
}
