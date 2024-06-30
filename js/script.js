//element inicialization

const champRow = document.getElementById("champ-row")
const modalContainer = document.getElementById("modal-container")
let modalData = ''
let currentChamp = ''

//render champion cards

const renderChampions = async () =>{
    try{
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion.json')
        if(response.status === 200){
            const data = await response.json()

            for(let champ in data.data){
                champRow.innerHTML += `
      <div class="col-3 d-flex justify-content-center card-frame align-items-center">
        <div class="champCard" id="${data.data[champ].id}">
          <img src="${`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.data[champ].id}_0.jpg`}">
          <div class="cardContent">
            <p class="champ-name">${data.data[champ].name.toUpperCase()}</p>
          </div>
        </div>
      </div>
    `
            }
        }
        else{
            throw new Error('failed to fetch data')
        }
        
        
    }
    catch(err){
        console.log(err)
    }
}

//render champion modal

const renderChampionModal = async (champId) =>{
  try{
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion/${champId}.json`)
    if(response.status == 200){
      
      const data = await response.json()
      modalData = data
      
      currentChamp = data.data[champId].id

      modalContainer.innerHTML = `
      <div class="modal-background">
    <div class="champ-modal">
      <h3 class="champ-modal-title">${data.data[champId].title}</h3>
      <h1 class="champ-modal-name">${data.data[champId].name}</h1>
      <a class="modal-exit">X</a>
      <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg" class="champ-full-splash">
      <div class="champ-skills">
        <div class="champ-skill"><img id ="Passive" class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/passive/${data.data[champId].passive.image.full}"></div>
        <div class="champ-skill"><img id ="Q"  class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${data.data[champId].spells[0].image.full}"></div>
        <div class="champ-skill"><img id ="W"  class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${data.data[champId].spells[1].image.full}"></div>
        <div class="champ-skill"><img id ="E"  class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${data.data[champId].spells[2].image.full}"></div>
        <div class="champ-skill"><img id ="R"  class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${data.data[champId].spells[3].image.full}"></div>
      </div>
      <h1 class="modal-skill-title" id="modal-skill-current-title" >Passive - ${data.data[champId].passive.name}</h1>
      <p class="modal-skill-text" id="modal-skill-current-description" >${data.data[champId].passive.description}</p>
    </div>
  </div>
      `
    }
    else{
      throw new Error('failed to fetch data')
    }
  }
  catch(error){
    console.log(error)
  }
}


//card event listener that render modal

champRow.addEventListener('click', (e)=>{
  if(e.target.classList.contains('card-frame')){
    return
  }
  else{
    renderChampionModal(e.target.closest(".champCard").id)
  }
  
})

//exit the modal

modalContainer.addEventListener('click', (e)=>{
  if(e.target.classList.contains('modal-exit')){
    modalContainer.innerHTML = ''
    modalData = ''
    currentChamp = ''
  }
  else if(e.target.classList.contains('clickeable-skill')){
    if(e.target.id == 'Passive'){
      document.getElementById('modal-skill-current-title').innerHTML = `Passive - ${modalData.data[currentChamp].passive.name}`;
      document.getElementById('modal-skill-current-description').innerHTML = `${modalData.data[currentChamp].passive.description}`
    }
    else if(e.target.id == 'Q'){
      document.getElementById('modal-skill-current-title').innerHTML = `Q - ${modalData.data[currentChamp].spells[0].name}`;
      document.getElementById('modal-skill-current-description').innerHTML = `${modalData.data[currentChamp].spells[0].description}`
    }
    else if(e.target.id == 'W'){
      document.getElementById('modal-skill-current-title').innerHTML = `W - ${modalData.data[currentChamp].spells[1].name}`;
      document.getElementById('modal-skill-current-description').innerHTML = `${modalData.data[currentChamp].spells[1].description}`
    }
    else if(e.target.id == 'E'){
      document.getElementById('modal-skill-current-title').innerHTML = `E - ${modalData.data[currentChamp].spells[2].name}`;
      document.getElementById('modal-skill-current-description').innerHTML = `${modalData.data[currentChamp].spells[2].description}`
    }
    else if(e.target.id == 'R'){
      document.getElementById('modal-skill-current-title').innerHTML = `R - ${modalData.data[currentChamp].spells[3].name}`;
      document.getElementById('modal-skill-current-description').innerHTML = `${modalData.data[currentChamp].spells[3].description}`
    }
  }
})

//callings

renderChampions()