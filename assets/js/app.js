/* 
    Fonction d'ajout de participant
*/
function addParticipant(event){
    //console.log(event)
    event.preventDefault();

    const nameInputElt = document.getElementById('nameInput');

    //alternative pour récupérer l'input à partir de son name
    //const nameInputElt2 = document.querySelector('input[name="nameInput"]');

    //Je créé mon prénom
    const participantName = nameInputElt.value.trim();
    //trim() ==> permet d'enlever les espaces du début et de la fin

    //si le nom est vide, j'affiche une message d'erreur
    if(participantName === ''){
        alert('Le nom est obligatoire');
        return //permet de sortir de la fonction, ainsi, le nom ne sera pas rentrer
    }

    //Je créé un élément li qui contient mon prénom
    const participantElt = `
    <li class="participant">${participantName}</li>
    `;

    //Je récupère l'élément ul qui contient la liste des participants
    const participantListElt = document.getElementById("participantList");

    //J'ajoute mon élément li à l'élément ul
    participantListElt.innerHTML = participantListElt.innerHTML + participantElt;

    //je vide l'input nameInput
    nameInputElt.value = "";
}

//Je récupère le formulaire d'ajout de nom
const addNameFormElt = document.getElementById('addNameForm');

//quand on soumet le formulaire, je veux que la fonction addParticipant soit appelée
addNameFormElt.addEventListener("submit", addParticipant);

const participants = ["Grégory", "Julien", "Nicolas", "Pierre", "Paul", "Jacques", "Sofian"];
const numberGroups = 3;

/** 
* Fonction de génération des groupes
* @param {array} participants
* @param {int} numberGroups
*/

function generateGroups(participants, numberGroups){
    //Je veux trier un tableau de nom aléatoirement 
// La fonction map prend un tableau en entrée
// Applique une fonction sur chaque élément du tableau 
// Et retourne un nouveau tableau
const sorted = participants
.map((participant) => ({ name : participant, sort: Math.random() }))
.sort((a, b) => a.sort - b.sort)
.map((participant) => participant.name)

//console.log(sorted)
//Je veux générer des groupes de nom
const groupsArr = [];
for(let i = 0; i < numberGroups; i++){
groupsArr.push([]);
}

var groupsArrIndex = 0;
while(sorted.length > 0){
//je prends le dernier élément du tableau sorted
//et je l'ajoute dans le groupe correspondant à groupsArrIndex
groupsArr[groupsArrIndex].push(sorted.pop());
//j'ajoute 1 à groupsArrIndex
groupsArrIndex++;
//si groupsArrIndex est supérieur à la taille du tableau groupsArr
//Je réinitialise groupsArrIndex à 0
if(groupsArrIndex >= groupsArr.length){
    groupsArrIndex = 0;
}
}
//Je veux afficher les groupes sur la page
//Je récupère l'élément HTML 
const groupListElt = document.getElementById("groupList");
//POur chaque groupe je créé une div sous forme de card
for(let groupIndex = 0; groupIndex < groupsArr.length; groupIndex++){
let groupElt = `
<div class="card bg-light mb-3" style="max-width: 20rem;">
    <div class="card-header">Groupe ${groupIndex + 1}</div>
        <div class="card-body">
            <ul>`
// pour chaque groupe, j'affiche la liste des participants
for(let participantIndex = 0; participantIndex < groupsArr[groupIndex].length; participantIndex++){
    groupElt += `<li>${groupsArr[groupIndex][participantIndex]}</li>`
}
groupElt += `
            </ul>
        </div>
    </div>
`;
groupListElt.innerHTML += groupElt
}
}

const generateForm = document.getElementById('generateGroup');
generateForm.addEventListener('submit', function(event) {
    event.preventDefault();
    //Je récupère la valeur de l'input numberGroups
    //Je la convertis en integer
    const numberGroups = parseInt(document.getElementById('groupNumber').value);
    
    // on veut récupérer la liste des participants
    const participants = [];
    const participantsElt = document.querySelectorAll('.participant');

    //pour chaque li, je push le texte dans le tableau participants
    participantsElt.forEach(element => participants.push(element.textContent));

    //Gestion des erreurs
    // si numberGroups n'est pas un nombre j'affiche un message d'erreur
    if (Number.isNaN(numberGroups)) {
        alert("Le nombre de groupes doit être un nombre");
        return
    }

    //Si numberGroups est inférieur à 1 j'affiche un message d'erreur
    if(numberGroups < 1){
        alert('Le nombre de groupes doit etre supérieur à 1')
        return
    }

    //Si numberGroups est supérieur à la taille du tableau participants j'affiche un message d'erreur
    if(numberGroups > participants.length){
        alert('Le nombre de groupes doit être inférieur ou égal au nombre de participants')
        return
    }

    //S'il n'y a pas de participants j'affiche un message d'erreur
    if(participants.length === 0){
        alert("Il n'y a pas de participants")
        return
    }
    //je génère les groupes
    generateGroups(participants, numberGroups)

})
