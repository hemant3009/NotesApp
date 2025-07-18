const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes"); // if notes is there in the browser then it will be displayed on the webpage.
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML); //whatever is written in the notesContainer's innerHTmL will be stored in the browser as the name of notes.
}

createBtn.addEventListener("click", ()=>{
    let note = document.createElement("div");
    note.className = "input-box";

    let heading = document.createElement("div");
    heading.className = "note-heading";
    heading.setAttribute("contenteditable", "true");
    heading.setAttribute("data-placeholder", "Enter title...");

    let content = document.createElement("div");
    content.className = "note-content";
    content.setAttribute("contenteditable", "true");
    content.setAttribute("data-placeholder", "Enter your note...");

    let img = document.createElement("img");
    img.src = "images/delete.png";

    note.appendChild(heading);
    note.appendChild(content);
    note.appendChild(img);
    notesContainer.appendChild(note);

    heading.focus();

    updateStorage();
})

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage(); //storage will be be updated when we press the delete icon
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage(); // it will update the storage when we start typing anything in the p tag
            }
        })
    }
})

document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})