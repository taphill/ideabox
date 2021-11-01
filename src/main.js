// Variables
let ideas = []
let titleHasInput = false 
let bodyHasInput = false 

// DOM elements
const form = document.querySelector('form')
const title = document.querySelector('input#title')
const body = document.querySelector('textarea#body')
const saveButton = document.querySelector('.save-idea-button')
const cardContainer = document.querySelector('.card-container')

// Event listeners
saveButton.addEventListener('click', saveIdea)
title.addEventListener('input', changeButtonStatus)
body.addEventListener('input', changeButtonStatus)

// Handlers
function saveIdea() {
  const idea = new Idea(title.value, body.value)

  ideas.push(idea)
  displayIdeas()
  addIdeaEventListeners()
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
  console.log('Click')
  let id = event.path[2].id
  let index = ideas.findIndex(idea => idea.id === id)

  ideas.splice(index, 1)
  displayIdeas()
}

// Helper functions
function displayIdeas() {
  cardContainer.innerHTML = ''

  ideas.forEach(idea => {
    const elementExists = document.getElementById(`${idea.id}`) 

    if(elementExists) { return }

    cardContainer.innerHTML += `
      <div class="idea-card" id="${idea.id}">
        <header class="idea-card-header">
          <img class="star-idea" src="assets/star.svg" alt="">
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

function addIdeaEventListeners() {
  document.querySelectorAll('.delete-idea').forEach(item => {
    item.addEventListener('click', deleteIdea)
  })
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
