// Variables
let ideas = JSON.parse(localStorage.getItem('ideas')) || []
let titleHasInput = false 
let bodyHasInput = false 
let commentHasInput = false
let filterEnabled = false

// DOM elements
const filterButton = document.querySelector('.filter-ideas button')
const form = document.querySelector('form')
const title = document.querySelector('input#title')
const body = document.querySelector('textarea#body')
const comment = document.querySelector('textarea#comment')
const saveButton = document.querySelector('.save-idea-button')
const searchInput = document.querySelector('#search')
const cardContainer = document.querySelector('.card-container')
const commentForm = document.querySelector('.comment-container')
const saveCommentButton = document.querySelector('.save-comment-button')
const cancelCommentButton = document.querySelector('.cancel-comment-button')

// Event listeners
document.addEventListener('DOMContentLoaded', displayAllIdeas);
filterButton.addEventListener('click', toggleFilter)
saveButton.addEventListener('click', saveIdea)
title.addEventListener('input', changeFormButtonStatus)
body.addEventListener('input', changeFormButtonStatus)
comment.addEventListener('input', changeAddCommentButtonStatus)
searchInput.addEventListener('change', displayMatchedIdeas)
searchInput.addEventListener('keyup', displayMatchedIdeas)
saveCommentButton.addEventListener('click', addComment)
cancelCommentButton.addEventListener('click', () => commentForm.style.display = 'none')

cardContainer.addEventListener('click', event => {
  if (event.target.className === 'delete-idea') {
    deleteIdea(event)
  } else if (event.target.className === 'star-idea') {
    toggleStar(event)
  } else if (event.target.className === 'comment-idea') {
    commentForm.style.display = 'block'
  }
})

// Handlers
function saveIdea() {
  const idea = new Idea(title.value, body.value)

  form.reset()
  ideas.push(idea)
  updateLocalStorage()
  displayAllIdeas()
}

function deleteIdea(event) {
  const id = event.path[2].id
  const index = ideas.findIndex(idea => idea.id === id)

  ideas.splice(index, 1)
  updateLocalStorage()
  displayAllIdeas()
}

function toggleStar(event) {
  const id = event.path[2].id
  const idea = ideas.find(idea => idea.id === id)

  idea.star = !idea.star
  updateLocalStorage()
  changeStarImage(idea, event.target)
}

function addComment(event) {
  console.log(event)
  const id = event.path[2].id
  console.log(id)
  // const idea = ideas.find(idea => idea.id === id)
  // const newComment = new Comment(comment.value)
  // console.log(idea)
}

function changeFormButtonStatus() {
  setTitleHasInput()
  setBodyHasInput()

  if (titleHasInput && bodyHasInput) {
    saveButton.disabled = false
  } else {
    saveButton.disabled = true
  }
}

function changeAddCommentButtonStatus() {
  setCommentHasInput()

  if (commentHasInput) {
    saveCommentButton.disabled = false
  } else {
    saveCommentButton.disabled = true
  }
}

function toggleFilter() {
  filterEnabled = !filterEnabled

  if (filterEnabled) {
    filterButton.textContent = 'Show All Ideas' 
    displayStarredIdeas()
  } else {
    filterButton.textContent = 'Show Starred Ideas' 
    displayAllIdeas()
  }
}

function displayAllIdeas() {
  const html = ideas.map(idea => cardComponent(idea)).join('')

  cardContainer.innerHTML = html
}

function displayStarredIdeas() {
  const html = ideas.map(idea => {
    if (idea.star) { return cardComponent(idea) }
  }).join('')

  cardContainer.innerHTML = html
}

function displayMatchedIdeas() {
  const matches = findMatches(this.value, ideas)
  const html = matches.map(idea => cardComponent(idea)).join('')

  cardContainer.innerHTML = html
}

// Helper functions
function cardComponent(idea) {
  return `
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
        <img class="comment-idea" src="assets/comment.svg" alt="">
        <p>Comment</p>
      </footer>
      <div class="idea-card-comments">
        <button type="button">View Comments</button>
      </div>
    </div>
  `
}

function findMatches(wordToMatch, ideas) {
  return ideas.filter(idea => {
    const regex = new RegExp(wordToMatch, 'gi')
    return idea.title.match(regex) || idea.body.match(regex)
  })
}

function updateLocalStorage() {
  const ideasJSON = JSON.stringify(ideas)

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

function setCommentHasInput() {
  if (comment.value === '') {
    commentHasInput = false 
  } else {
    commentHasInput = true
  }
}
