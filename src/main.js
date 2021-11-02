// Variables
let ideas = JSON.parse(localStorage.getItem('ideas')) || []
let titleHasInput = false 
let bodyHasInput = false 

// DOM elements
const showStarredButton = document.querySelector('.filter-ideas button')
const form = document.querySelector('form')
const title = document.querySelector('input#title')
const body = document.querySelector('textarea#body')
const saveButton = document.querySelector('.save-idea-button')
const cardContainer = document.querySelector('.card-container')

// Event listeners
document.addEventListener('DOMContentLoaded', displayIdeas);
showStarredButton.addEventListener('click', displayStarredIdeas)
saveButton.addEventListener('click', saveIdea)
title.addEventListener('input', changeButtonStatus)
body.addEventListener('input', changeButtonStatus)

cardContainer.addEventListener('click', event => {
  if (event.target.className === 'delete-idea') {
    deleteIdea(event)
  } else if (event.target.className === 'star-idea') {
    toggleStar(event)
  }
})

// Handlers
function saveIdea() {
  const idea = new Idea(title.value, body.value)

  ideas.push(idea)
  updateLocalStorage()
  displayIdeas()
  form.reset()
}

function changeButtonStatus() {
  setTitleHasInput()
  setBodyHasInput()

  if (titleHasInput && bodyHasInput) {
    saveButton.disabled = false
  } else {
    saveButton.disabled = true
  }
}

function deleteIdea(event) {
  const id = event.path[2].id
  const index = ideas.findIndex(idea => idea.id === id)

  ideas.splice(index, 1)
  updateLocalStorage()
  displayIdeas()
}

function toggleStar(event) {
  const id = event.path[2].id
  const idea = ideas.find(idea => idea.id === id)

  idea.star = !idea.star
  updateLocalStorage()
  changeStarImage(idea, event.target)
}

function displayIdeas() {
  cardContainer.innerHTML = ''

  ideas.forEach(idea => {
    cardContainer.innerHTML += `
      <div class="idea-card" id="${idea.id}">
        <header class="idea-card-header">
          ${chooseStarImage(idea)}
          <img class="delete-idea" src="assets/delete.svg" alt="">
        </header>
        <div class="idea-card-body">
          <h3>${idea.title}</h3>
          <p>${idea.body}</p>
        </div>
        <footer class="idea-card-footer">
          <img src="assets/comment.svg" alt="">
          <p>Comment</p>
        </footer>
      </div>
    `
  })
}

function displayStarredIdeas() {
  cardContainer.innerHTML = ''

  ideas.forEach(idea => {
    if (!idea.star) { return }

    cardContainer.innerHTML += `
      <div class="idea-card" id="${idea.id}">
        <header class="idea-card-header">
          ${chooseStarImage(idea)}
          <img class="delete-idea" src="assets/delete.svg" alt="">
        </header>
        <div class="idea-card-body">
          <h3>${idea.title}</h3>
          <p>${idea.body}</p>
        </div>
        <footer class="idea-card-footer">
          <img src="assets/comment.svg" alt="">
          <p>Comment</p>
        </footer>
      </div>
    `
  })
}

// Helper functions
function updateLocalStorage() {
  const ideasJSON = JSON.stringify(ideas)

  localStorage.removeItem('ideas')
  localStorage.setItem('ideas', ideasJSON)
}

function changeStarImage(idea, target) {
  if (idea.star) {
    target.src = 'assets/star-active.svg'
  } else {
    target.src = 'assets/star.svg'
  }
}

function chooseStarImage(idea) {
  if (idea.star) {
    return '<img class="star-idea" src="assets/star-active.svg" alt="">'
  } else {
    return '<img class="star-idea" src="assets/star.svg" alt="">'
  }
}

function setTitleHasInput() {
  if (title.value === '') {
    titleHasInput = false 
  } else {
    titleHasInput = true
  }
}

function setBodyHasInput() {
  if (body.value === '') {
    bodyHasInput = false 
  } else {
    bodyHasInput = true
  }
}
