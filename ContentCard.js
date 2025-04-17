import ContentDisposed from "./ContentDisposed.js";

export default class ContentCard {
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
    }

    async fetchContent() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.text();
        } catch (error) {
            console.error('Error fetching content:', error);
            return null;
        }
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
