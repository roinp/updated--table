const btn = document.getElementById('btn');
const del = document.getElementById('delete');
const dateP = document.getElementById('date')
const search = document.getElementById('search');
const textarea = document.getElementById('write-area');
const ul = document.getElementById('text')
let selectedLi = null;
let notes = JSON.parse(localStorage.getItem("notes")) ?? [];

dateP.textContent =  new Date().toLocaleDateString() + new Date().toLocaleTimeString();

let interval = setInterval(function(){
    dateP.textContent = new Date().toLocaleDateString() + new Date().toLocaleTimeString();
},1000);


for (let i = 0; i<notes.length; i++){
    const li = document.createElement("li");
    li.textContent = notes[i].value + " - " + notes[i].time;
    li.id = notes[i].id;
    ul.appendChild(li);
}



btn.addEventListener('click',  function() {
    if(textarea.value == ""){
        return;
    }

    if(selectedLi !== null){
        const mas = [];
        for(let i = 0; i<notes.length; i++ ){
            if(selectedLi.id != notes[i].id ){
            mas.push(notes[i]);
            }
        }
        notes = mas;
        selectedLi.remove();

    }

    const newNote = {
        id: Date.now(),
        value: textarea.value,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    const li = document.createElement("li");
    li.textContent = newNote.value + " - " + newNote.time;
    li.id = newNote.id;
    ul.appendChild(li);
    
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    textarea.value = "";
    interval = setInterval(function(){
        dateP.textContent = new Date().toLocaleDateString() + new Date().toLocaleTimeString();
    },1000);
} );

ul.addEventListener('click', function(e){
    clearInterval(interval);
    selectedLi = e.target;
    const id = e.target.id;
    for(let i = 0 ; i<notes.length; i++){
        if(notes[i].id == id){
            textarea.value = notes[i].value;
            dateP.textContent=notes[i].date + " " + notes[i].time;
            break;
        }
    }
})

del.addEventListener('click', function(){
    if(selectedLi !== null){
        const mas = [];
        for(let i = 0; i<notes.length; i++ ){
            if(selectedLi.id != notes[i].id ){
            mas.push(notes[i]);
            }
        }
        notes = mas;
        selectedLi.remove();
        localStorage.setItem('notes', JSON.stringify(notes));
        textarea.value = "";
        interval = setInterval(function(){
            dateP.textContent = new Date().toLocaleDateString() + new Date().toLocaleTimeString();
        },1000);
    }
} )
 search.addEventListener('keyup',function(){
    ul.innerHTML = ""
    for(let i = 0; i<notes.length; i++ ){
        if(notes[i].value.includes(search.value)){
            const li = document.createElement("li");
            li.textContent = notes[i].value + " - " + notes[i].time;
            li.id = notes[i].id;
            ul.appendChild(li);
            
        }
        
    }
    })