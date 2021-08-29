
// Creating nav element


const nav=document.createElement('nav');
nav.setAttribute('class','nav');
nav.innerHTML=`
<h1 class="nav-heading">Anime API</h1>

`;
document.body.append(nav);


// End of nav element

// Creating search elemnt

const searchDiv= document.createElement('div');
searchDiv.setAttribute('class','searchBox');
document.body.append(searchDiv)


const searchInput=document.createElement('input');
searchInput.setAttribute('class','searchInput');
searchInput.setAttribute('name','searchInput');
searchInput.setAttribute('placeholder','Search');
searchDiv.appendChild(searchInput);


const searchButton=document.createElement('button');
searchButton.setAttribute('class','searchButton');
searchButton.setAttribute('onclick',"search()")
searchDiv.appendChild(searchButton);

const insideSearchButton=document.createElement('i');
insideSearchButton.setAttribute('class','material-icons')
insideSearchButton.innerText="Search";
searchButton.appendChild(insideSearchButton);


//dropdoewn div
const dropDownDiv=document.createElement('div');
dropDownDiv.setAttribute('class','dropDownDiv');
document.body.append(dropDownDiv);

//type select
const typeDropdown=document.createElement('select');
typeDropdown.setAttribute('id','type-select');



dropDownDiv.appendChild(typeDropdown);
typeDropdown.innerHTML=`<option value="" disabled selected>Select  Type</option>`;





//Creating card container 
const animeCards=document.createElement('div');
animeCards.setAttribute('class','anime-cards')
document.body.append(animeCards);

// creating search function

async function search(){

    //Removing dropdown div when search button is pressed
    document.querySelector('.dropDownDiv').classList.remove("showDropDownDiv")



    let animename=document.querySelector('.searchInput').value;
    if(animename.length<3){
        alert("Please enter atleast 3 characters to begin search")
    }
    // var data;
    const baseURL=" https://api.jikan.moe/v3/search/anime"
    let searchURL=`${baseURL}?q=${animename}`;
    animeCards.innerHTML="";
    try{
        const response= await fetch(searchURL).then(res=>res.json()).then(d=> { CreateAnimeDOM( d.results)}).catch(err=>console.log(err));
    }
    catch(error){
        alert("There was some problem wihle searching")
        console.log(error)
    }

}


function CreateAnimeDOM(data){
    
    if (data!==undefined){


        //enabling dropdowns
        document.querySelector('.dropDownDiv').classList.add("showDropDownDiv")


        //getting the types
        let types=[];
        data.forEach((singleData)=>{
            types.push(singleData.type)

        })
       types=new Set(types);
       console.log(types)

    
    
        //cleanig types dropdown
        typeDropdown.innerHTML=`<option value="" disabled selected>Select  Type</option>`;


        types.forEach((singletype)=>{
            let option=document.createElement('option');
            option.setAttribute('value',`${singletype}`);
            option.innerText=`${singletype}`;
            typeDropdown.appendChild(option);

        })

        //creating logic for data filtering


        //For type filtering
        var selValue;
        var typeSelect = document.getElementById("type-select");
        typeSelect.onchange = function() {
        var selIndex = typeSelect.selectedIndex;
        selValue = typeSelect.options[selIndex].innerHTML;
        typeFilter(data,selValue)
        }
        
       
        
    

    data.forEach(element => {
        let startDateValue = element.start_date!==null ? element.start_date.split("T")[0] : "Yet to start"
   
   
        //single card conatiner
    const singleCard = document.createElement('article');
    singleCard.setAttribute('class','single-card');
    animeCards.appendChild(singleCard);
    
    
    singleCard.innerHTML=`
    <img src=${element.image_url} alt="" class="single-card-image">
            
    <h1 class="single-card-title">${element.title}</h1>
    <p class="single-card-desc">
       ${element.synopsis}
    </p>
    <p class=" single-card-common ">start-date: <span class="single-card-start-date">${startDateValue!==null ? startDateValue : "Still running"}</span></p>

    <p class=" single-card-common  ">end-date: <span class="single-card-end-date">${element.end_date !==null ? element.end_date.split("T")[0] : "Still running"}</span></p>

    <p class=" single-card-common ">score: <span class="single-card-score">${element.score}</span></p>

    <p class=" single-card-common ">type: <span class="single-card-type"> ${element.type}</span></p>
    
    
    `;
    });
    
}
else{
    alert("No data found")
}


    
    
}

//function for type filter

function typeFilter(tempdata,typeValue){
            
    data=tempdata.filter((singleData)=>singleData.type === typeValue)
    animeCards.innerHTML="";
    data.forEach(element => {
        let startDateValue = element.start_date!==null ? element.start_date.split("T")[0] : "Yet to start"
   
   
        //single card conatiner
    const singleCard = document.createElement('article');
    singleCard.setAttribute('class','single-card');
    animeCards.appendChild(singleCard);
    
    
    singleCard.innerHTML=`
    <img src=${element.image_url} alt="" class="single-card-image">
            
    <h1 class="single-card-title">${element.title}</h1>
    <p class="single-card-desc">
       ${element.synopsis}
    </p>
    <p class=" single-card-common ">start-date: <span class="single-card-start-date">${startDateValue!==null ? startDateValue : "Still running"}</span></p>

    <p class=" single-card-common  ">end-date: <span class="single-card-end-date">${element.end_date !==null ? element.end_date.split("T")[0] : "Still running"}</span></p>

    <p class=" single-card-common ">score: <span class="single-card-score">${element.score}</span></p>

    <p class=" single-card-common ">type: <span class="single-card-type"> ${element.type}</span></p>
    
    
    `;
    });
    return tempdata;
}


    
