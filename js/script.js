//element inicialization

const champRow = document.getElementById("champ-row")
const modalContainer = document.getElementById("modal-container")


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
      
      console.log(data.data[champId].name)

      modalContainer.innerHTML = `
      <div class="modal-background">
    <div class="champ-modal">
      <h3 class="champ-modal-title">${data.data[champId].title}</h3>
      <h1 class="champ-modal-name">${data.data[champId].name}</h1>
      <a class="modal-exit">X</a>
      <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg" class="champ-full-splash">
      <div class="champ-skills">
        <div class="champ-skill"><img id ="Passive" class="champ-skill-img" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/passive/${data.data[champId].passive.image.full}"></div>
        <div class="champ-skill"><img id ="Q"  class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${data.data[champId].spells[0].image.full}"></div>
        <div class="champ-skill"><img id ="W"  class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${data.data[champId].spells[1].image.full}"></div>
        <div class="champ-skill"><img id ="E"  class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${data.data[champId].spells[2].image.full}"></div>
        <div class="champ-skill"><img id ="R"  class="champ-skill-img clickeable-skill" src="https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${data.data[champId].spells[3].image.full}"></div>
      </div>
      <h1 class="modal-skill-title">Passive - ${data.data[champId].passive.name}</h1>
      <p class="modal-skill-text">${data.data[champId].passive.description}</p>
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

//callings

renderChampions()