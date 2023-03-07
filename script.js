const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))
console.log(notes)

if (notes) {
  notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
  // Create a new note div element and append it to the container div
  const note = document.createElement('div')
  note.classList.add('note')
  note.innerHTML = `
    <div class='nav'>
      <button class='edit'>
        <i class='fas fa-edit'></i>
      </button>

      <button class='delete'>
        <i class='fas fa-trash-alt'></i>
      </button>
    </div>
    <div class='main ${text ? "" : "hidden"}'></div>
    <textarea class='${text ? "hidden" : ""}'></textarea>
    `

  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')
  const main = note.querySelector('.main')
  const textArea = note.querySelector('textarea')

  textArea.value = text

  main.innerHTML = marked.parse(text)

  deleteBtn.addEventListener('click', () => {
    note.remove()
    updateLS()
  })

  editBtn.addEventListener('click', () => {
    if (editBtn.innerHTML === "<i class='fas fa-edit'></i>") {
      editBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i>'
      main.classList.toggle('hidden')
      textArea.classList.toggle('hidden')
    } else {
      editBtn.innerHTML = "<i class='fas fa-edit'></i>"
      main.innerHTML = marked.parse(textArea.value)
      main.classList.toggle('hidden')
      textArea.classList.toggle('hidden')
      updateLS();
    }
  })


  textArea.addEventListener('input', (event) => {
    event.preventDefault();
    const { value } = event.target
    main.innerHTML = marked.parse(value)
    updateLS();
  })


  document.body.appendChild(note)


}

function updateLS() {
  // Save notes to localStorage
  const notesText = document.querySelector('textarea')
  const notes = []

  // Issue: We are not getting the value
  console.log(Object.keys(notesText).forEach(note => notes.push(note.value)))

  localStorage.setItem('notes', JSON.stringify(notes))
}
