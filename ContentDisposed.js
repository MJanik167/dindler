export default class ContentDisposed {
    constructor(original) {
        this.content = original.cloneNode(true);
        this.content.innerHTML = ``;
        this.content.removeAttribute("id")
        this.content.className = "contentDisposed"
        document.body.appendChild(this.content);

    }
}