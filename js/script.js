const champRow = document.getElementById("champ-row")

const renderChampions = async () =>{
    try{
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion.json')
        if(response.status === 200){
            const data = await response.json()

            for(let champ in data.data){
                champRow.innerHTML += `
    <div class="col-3 d-flex justify-content-center align-items-center">
        <div class="champCard">
          <img src="${`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.data[champ].id}_0.jpg`}">
          <div class="cardContent">
            <p class="champ-name">${data.data[champ].name}</p>
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
renderChampions()