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
    <li>${participantName}</li>
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

var groups = groupsArrIndex = 0;
while(sorted.length > 0){
    //je prends le dernier élément du tableau sorted
    //et je l'ajoute dans le groupe correspondant à groupsArrIndex
    groupsArr[groupsArrIndex].push(sorted.pop());
}

console.log(groupsArr)
//Je veux afficher les groupes sur la page