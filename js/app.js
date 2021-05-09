const main = (()=>
{
    let itemID = 2;
    const listings = document.querySelector("#items > div");
    const deleteItem = document.querySelector("#clear-items");
    const submit = document.querySelector("#submit-button");
    const textBox = document.querySelector("#text-box");
   

    const backendHost = `http://localhost:4000`;
    fetch(`${backendHost}/items`)
    .then(response=>response.json())
    .then(json=>{
        json.data.forEach(item => {
            listings.innerHTML+=`
            <div >
                <div data-itemid="${item._id}" class="dynamic-items grid col-2 ">
                    ${item.name}
                        <div class="dynamic-functions">
                            <i data-itemid="${item._id}" id="edit" class="far fa-edit"></i>
                            <i  id="trash" class="fas fa-trash"></i>
                        </div>
                </div>
            </div>
            
            `
        });
    })


    submit.addEventListener("click",()=>{
        let ID = itemID+1;
        fetch(`${backendHost}/items`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body:JSON.stringify({
                id:ID,
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

           
             for(let i=0;i<listings.children.length;i++)
            {
                
                listings.children[1].addEventListener("click",()=>{
                    console.log("hi")
                })

            }
           /*fetch(`${backendHost}/items/1`,{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  }
            })*/
        }
    
    })
    

    
 
    
})();