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

    release() {
        new ContentDisposed(this.container)
        this.container.remove()
    }

    getHTML() {
        return this.container.outerHTML
    }
}
