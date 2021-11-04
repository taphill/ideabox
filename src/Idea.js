class Idea {
  constructor(title, body) {
    this.id = this.#generateUniqueID()
    this.title = title
    this.body = body
    this.star = false
    this.comments = []
  }

  #generateUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)  
  }
}