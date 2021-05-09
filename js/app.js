const main = (()=>
{
 
    const listings = document.querySelector("#items > div");
    const deleteItem = document.querySelector("#clear-items");
    const submit = document.querySelector("#submit-button");
    const textBox = document.querySelector("#text-box");
    let id =1;

    const backendHost = `http://localhost:4000`;
    fetch(`${backendHost}/items`)
    .then(response=>response.json())
    .then(json=>{
        json.data.forEach(item => {
            listings.innerHTML+=`
             <div>
                <div data-divID="${item._id}" class="dynamic-items grid col-2 ">
                    ${item.name}
                        <div class="dynamic-functions">
                            <i data-itemid="${item._id}" id="edit" class="far fa-edit"></i>
                            <i data-itemid="${item._id}" id="trash" class="fas fa-trash"></i>
                        </div>
                </div>
            </div>
            
            `
        });
    })


    submit.addEventListener("click",()=>{
       
        fetch(`${backendHost}/items`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body:JSON.stringify({
                name:textBox.value
            })
        })
        window.location.reload();
        textBox.value= "";
        textBox.focus();
        itemID++;
        console.log(itemID);
    })

    deleteItem.addEventListener("click",()=>{
        fetch(`${backendHost}/items`,{
            method:"Delete",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
        })
        //window.location.reload();
    })

    

    
    listings.addEventListener("click",(event)=>{
        console.log(listings.childElementCount)
        /*if(event.target.children[0].className)
        {
            alert("hey");
        }
        //console.log(event.target.children[0]);
        //console.log(listings.childNode)
        console.log(event.target.children[0].className)
        if(event.target.children[0].getAttribute("class")=="far fa-edit")
        {
            console.log("hey")
        }
        
        if(event.tagName == "I" && event.target.children[1].className=="fas fa-trash")
        {
            console.log("hiiiii")
        }*/

       // console.log(event.target.children[0])
        

        if(event.target.tagName == "I" && event.target.className=="fas fa-trash")
        {
            alert(event.target.dataset.itemid)
            const itemID = event.target.dataset.itemid;
            
            
                fetch(`${backendHost}/items/${itemID}`,{
                    method:"Delete",
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      }
                })
                window.location.reload();
           
        }

        if(event.target.tagName == "I" && event.target.className=="far fa-edit")
        {
            
              const id = event.target.dataset.itemid ;
              if(event.target.parentNode.parentNode.dataset.divid == event.target.dataset.itemid )
              {
                
                event.target.parentNode.parentNode.parentNode.innerHTML = 
                ` <div data-itemid="${id}" >
                <div class="dynamic-items grid col-2 ">
                    <input type="text">
                        <div class="dynamic-functions">
                            <button  type="submit"> Submit </button>
                        </div>
                </div>
            </div>`
              }
             
             
            //listings.children[0].innerHTML=`<div class="dynamic-items"> hi </div>`
          
        }
    
        if(event.target.tagName == 'BUTTON')
        {
            const itemID = event.target.parentNode.parentNode.parentNode.dataset.itemid;
            //console.log(event.target.parentNode.parentNode.firstElementChild)
            fetch(`${backendHost}/items/${itemID}`,{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body:JSON.stringify({
                    name:event.target.parentNode.parentNode.firstElementChild.value
                })
            })
        }
    })
    

    
 
    
})();