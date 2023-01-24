const btn = document.getElementById("btn");
const noteCon = document.getElementById("con");

getNote().forEach((note) => {
    const noteEl = createNoteE(note.id, note.content);
    noteCon.insertBefore(noteEl, btn);
})

btn.addEventListener("click", addNote);


function createNoteE(id, content) {

    const element = document.createElement("textarea")
    element.classList.add("note");
    element.placeholder = "Empty note...";
    element.value = content;

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note..?");
        if (warning) {
            deleteNote(id, element);
        }
    });

    element.addEventListener("input", () => {
        updateNote(id, element.value);
    });

    return element;

}

function deleteNote(id, element) {

    const notes = getNote().filter((note) => note.id != id);
    saveNote(notes);
    noteCon.removeChild(element);
}

function updateNote(id, content) {

    const notes = getNote();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);

}

function addNote() {
    const notes = getNote();
    const noteObject = {
        id: Math.floor(Math.random() * 1000000),
        content: "",
    };
    const noteElement = createNoteE(noteObject.id, noteObject.content)
    noteCon.insertBefore(noteElement, btn);

    notes.push(noteObject);
    saveNote(notes);
}

function saveNote(notes) {

    localStorage.setItem("note-app", JSON.stringify(notes));

}

function getNote() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}