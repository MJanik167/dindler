import ContentDisposed from "./ContentDisposed.js";

export default class ContentCard {
    container
    constructor(url) {
        this.container = document.createElement('div')
        this.container.id = "content"
        this.container.innerHTML = `
                <div id="selectBar">
                    <div id="no" class="choiceButton"> no </div>
                    <div id="report"> x </div>
                    <div id="yes" class="choiceButton"> yes </div>
                </div>
                `
        this.setConent(url)
    }

    async setConent(url) {
        this.container.classList.add('loading')
        this.container.style.backgroundImage = await this.fetchContent(url);
        this.container.classList.remove('loading')
    }

    fetchContent(url) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();

            request.open('GET', url);

            request.setRequestHeader('Accept', 'application/json');

            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    return resolve(`url(${JSON.parse(this.responseText).url})`)
                }
            };

            request.send();
        })

    }

    update(event) {
        let cursorPosition = (window.innerWidth / 2 - event.clientX) / (window.innerWidth)
        let offset = cursorPosition * 100
        // if (cursorPosition > 0) {
        //     choiceAccepted = true
        // } else {
        //     choiceAccepted = false
        // }
        let angle = cursorPosition * 15
        this.container.style.marginLeft = `${offset}%`
        this.container.style.rotate = `${angle}deg`
    }

    release(cursorPosition) {
        console.log(cursorPosition);

        if (cursorPosition > 0) {
            return new ContentDisposed(this.container, 1)
        }
        else {
            return new ContentDisposed(this.container, -1)
        }
    }

    getHTML() {
        return this.container
    }
}
