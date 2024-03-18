const cols = document.getElementById("card-container")
const addCol = document.getElementById("add")
const colForm = document.getElementById("column-form")
const colInput = document.getElementById("col-input")
const colSub = document.getElementById("sub")
const editBlocForm = document.getElementById("editbloc-form")
const editBlocSub = document.getElementById('editblocSub')
const close = document.getElementById('close')
const closedit = document.getElementById('closedit')
const titleEdited = document.getElementById('titleEdit')
const descriptionEdited = document.getElementById('descriptionEdit')
const cateEdited = document.getElementById('cateEdit')
const addBlocForm = document.getElementById('addbloc-form')
const closeBlocForm = document.getElementById('close-bloc-form')
const addBlocSub = document.getElementById('blocSub')
const title = document.getElementById('title')
const desc = document.getElementById('description')
const cate = document.getElementById('cate')

document.addEventListener('DOMContentLoaded', ()=>{
    refreshView()
});

//Ajouter une colonne
const addColumn = (title) =>
{
    cols.innerHTML=""
    let newCol = new Column(title);
    content.push(newCol);
    refreshView()
}
// Ajouter une colonne
addCol.addEventListener('click', () => {
    colForm.style.display = 'flex';

    // Détacher les gestionnaires d'événements existants
    close.removeEventListener('click', closeHandler);
    colSub.removeEventListener('click', colSubHandler);

    close.addEventListener('click', closeHandler);

    colSub.addEventListener('click', colSubHandler);
});

// Fonction de gestion pour le bouton close
const closeHandler = () => {
    colForm.style.display = 'none';
};

// Fonction de gestion pour le bouton colSub
const colSubHandler = (event) => {
    event.preventDefault();
    if (colInput.value === '')
    {
        alert('Rentre le nom de ta colonne')
    }else
    {
        addColumn(colInput.value);
        colForm.style.display = 'none';
        colInput.value = '';
        console.log('poney');
    }
};


// Définition de l'objet Column
function Column(titre) {
    this.title = titre;
    this.blocs = [];
}

// Définition de l'objet Bloc
function Bloc(titre, description, cate) {
    this.title = titre;
    this.description = description;
    this.cate = cate;
}

// Initialiser le tableau pour stocker les informations
let content = [];

// Selectionner tous les éléments ayant la classe .card
let colonnes = document.querySelectorAll('.card');

// Boucler a travers chaque colonne
colonnes.forEach(colonne => {
    // Créer un nouvel objet Column avec le titre de la colonne
    let nouvelleColonne = new Column(colonne.querySelector('.card-title').innerText);
    
    // Sélectionner tous les blocs dans la colonne
    let blocs = colonne.querySelectorAll('.bloc');
    
    // Boucler à travers chaque bloc
    blocs.forEach(bloc => {
        // Créer un nouvel objet Bloc avec le titre et la description du bloc
        let nouveauBloc = new Bloc(bloc.querySelector('.btitle').innerText, bloc.querySelector('.bdesc').innerText, bloc.querySelector('.bcate').innerText);
        
        // Ajouter le bloc à la colonne
        nouvelleColonne.blocs.push(nouveauBloc);
    });
    
    // Ajouter la colonne avec ses blocs au tableau content
    content.push(nouvelleColonne);
});





//Fonction pour afficher le contenue de la page
function refreshView(){
    cols.innerHTML=""
    
    content.forEach((col, colKey) => {

        //Creation Div colonne
        const newCol = document.createElement('div')
        newCol.classList.add('card')
        cols.appendChild(newCol)
        newCol.id = `col${colKey}`
        //Creation Div Titre colonne
        const cardTitle = document.createElement('div')
        cardTitle.innerText = col.title
        cardTitle.classList.add('card-title')
        newCol.appendChild(cardTitle)

        

        //Bouton pour supprimer la colonne
        const closeCol = document.createElement('div')
        const pCloseCol = document.createElement('p')
        pCloseCol.innerText = 'x'
        closeCol.appendChild(pCloseCol)
        closeCol.classList.add('closecol')
        newCol.appendChild(closeCol)
        closeCol.addEventListener('click', ()=>{
            deleteCol(colKey)
        })

        //creation Div blocs
        col.blocs.forEach((bloc, blocKey) => {

            //Bloc
            const newBloc = document.createElement('div')
            newBloc.classList.add('bloc')
            newCol.appendChild(newBloc)

            //Header du bloc
            const blochead = document.createElement('div')
            blochead.classList.add('blochead')
            newBloc.appendChild(blochead)

            //boutons edit
            const edit = document.createElement('div')
            edit.classList.add('edit')
            blochead.appendChild(edit)
            const textbtn = document.createElement('p')
            textbtn.innerText ='edit'
            edit.appendChild(textbtn)
            edit.addEventListener('click', ()=>{
                editBlocForm.style.display ='flex'
                titleEdited.value = col.blocs[blocKey].title
                descriptionEdited.value = col.blocs[blocKey].description
                cateEdited.value = col.blocs[blocKey].cate
                closedit.addEventListener('click', ()=>{
                    editBlocForm.style.display= 'none'
                })
                editBlocSub.addEventListener('click', (event)=>{
                    event.preventDefault()
                    editBloc(colKey, blocKey, titleEdited.value, descriptionEdited.value, cateEdited.value)
                    editBlocForm.style.display= 'none'
                })

            })

            //boutons supprimer
            const done = document.createElement('div')
            done.classList.add('done')
            done.id = `done${colKey}_${blocKey}`
            blochead.appendChild(done)
            const x = document.createElement('p')
            x.innerText='x'
            done.appendChild(x)
            done.addEventListener('click', ()=>{
                deleteBloc(colKey, blocKey)
            })

            //Bloc content
            //Titre
            const title = document.createElement('div')
            title.classList.add('bloc-title')
            newBloc.appendChild(title)
            const pTitle = document.createElement('p')
            title.appendChild(pTitle)
            pTitle.innerText = col.blocs[blocKey].title
            //Description
            const desc = document.createElement('div')
            desc.classList.add('bloc-desc')
            newBloc.appendChild(desc)
            const pDesc = document.createElement('p')
            desc.appendChild(pDesc)
            pDesc.innerText = col.blocs[blocKey].description
            //Cate
            const cate = document.createElement('div')
            cate.classList.add('bloc-cate')
            newBloc.appendChild(cate)
            const pCate = document.createElement('p')
            cate.appendChild(pCate)
            pCate.innerText = col.blocs[blocKey].cate
        });

        //Bouton Ajout Bloc
        const add = document.createElement('div')
        add.classList.add('addbloc')
        newCol.appendChild(add)
        const pAdd = document.createElement('p')
        pAdd.innerText = '+'
        add.appendChild(pAdd)
        add.addEventListener('click', ()=>{
            addBlocForm.style.display = 'flex'
            addBlocSub.id = "addBlocSub"+colKey
            closeBlocForm.addEventListener('click', ()=>{
                addBlocForm.style.display = 'none'
            })
            addBlocSub.addEventListener('click', (event)=>{
                event.preventDefault()
                if(title.value==="")
                {
                    alert('Rentre au minimum un titre')
                }
                else
                {
                    addBloc(title.value, desc.value, cate.value, colKey)
                    colKey = ""
                    addBlocForm.style.display = 'none'
                    title.value = ""
                    desc.value = ""
                    cate.value =""
                }
            })
        })

        
    });
    
}




//Fonctions
//Ajouter un bloc
const addBloc = (title, desc, cate, col) =>
{
    let blocPush = new Bloc(title, desc, cate)
    content[col].blocs.push(blocPush)
    refreshView()
}

//Supprimer un bloc
const deleteBloc = (col, bloc) =>
{
    
    content[col].blocs.splice(bloc, 1)
    refreshView()
}

//Modifier un bloc
const editBloc = (col, bloc, title, desc, cate) =>
{
    content[col].blocs[bloc].title = title;
    content[col].blocs[bloc].description = desc;
    content[col].blocs[bloc].cate = cate;
    refreshView()
}


//Supprimer un colonne
const deleteCol = (col) =>
{
    content.splice(col, 1);
    refreshView()
} 

