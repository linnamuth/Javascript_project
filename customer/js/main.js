const dom_dialog =document.querySelector("#detail-dialog");
let arrayOfproduct = [];
let container = document.querySelector("#container") ;


// save to local storage_______________________________________________
function saveProduct(){
    // console.log('user is saving')
    localStorage.setItem("arrayOfproduct" ,JSON.stringify(arrayOfproduct));
    // console.log(localStorage)
}

// load function form local stroage_______________________________________________
function loadProduct(){
    let storeName = JSON.parse(localStorage.getItem("arrayOfproduct"));
    if(storeName != null){
        arrayOfproduct = storeName;
    }
    else{
        localStorage.removeItem("arrayOfproduct");
    }
}




function addProduct(){
    // loadProduct();
    // let container = document.querySelector("#container");
    let card = document.querySelector(".search");
    for(let i in  arrayOfproduct){
        let product = arrayOfproduct[i]
        let div = document.createElement("div");
        div.setAttribute("class","ptoto")
        
        let div1 = document.createElement("div")
        div1.setAttribute("class","nav")
        div.appendChild(div1)

        let img = document.createElement("img");
        img.setAttribute("src",product.image);
        img.id="img-add"
        img.src = product.img
        div1.appendChild(img)

        let star = 5;
        for(let i=0; i< star; i++){
            let i = document.createElement("i");
            i.className="fa fa-star";
            i.setAttribute("style","color:orange")
            div1.appendChild(i)
            console.log(i)
           
        }
        // create paragraph___________________________________________
        let p = document.createElement("p");
        p.textContent=product.name;
        
        let price = document.createElement("Price");
        price.textContent= "$"+product.price;
        // create button buy________________________________________________

        let button = document.createElement("button");
        button.textContent="BUY";
      
        
        let detail = document.createElement("button");
        detail.textContent="MORE";
        detail.id="detail";
        detail.dataset.index=i;
        detail.addEventListener("click",detailProduct);
        // append p price button detail in div________________________________________
        div.appendChild(p);
        div.appendChild(price);
        div.appendChild(button);
        div.appendChild(detail);
    
        card.appendChild(div);
    }
}

// #funtion search name of product ____________________________________________
function searchName(event){
    let searchtext = searchNameInput.value;
    let mytext = searchtext.toLowerCase();
    let listname = document.querySelectorAll(".search .ptoto");
    for(let value  of listname){
        let nameoflist = value.textContent.toLowerCase();
        let displaystyle=""
        if(nameoflist.indexOf(mytext)>-1){
            displaystyle="block";
        }
        else{
            displaystyle="none";
        }
        value.style.display=displaystyle;
    }
}
// main of research addevenlistener____________________________________________
let searchNameInput = document.getElementById("search").querySelector("input");
searchNameInput.addEventListener("keyup",searchName);


// called all fuction___________________________________________________
loadProduct();
saveProduct();
addProduct();
searchName();

function show(element){
    element.style.display="block"
}
// function hide________________________________________________

function hide(element){
    element.style.display="none"
}


// cancel product_______________________________________________
function onCancel(event){
    event.preventDefault();
    hide(dom_dialog);
    show(container)
    // loadProduct();
}

// function detail all product_________________________________________________
function detailProduct(event){
    questions_dialog =document.querySelector(".detail-all");
    questions_dialog.remove();
    questions_dialog =document.createElement("div");
    questions_dialog.className="detail-all";
    dom_dialog.appendChild(questions_dialog)

   
    
    let storeName = JSON.parse(localStorage.getItem("arrayOfproduct"));
    let i= event.target.dataset.index;
    console.log(i)

    let productDetail=storeName[i];
    let div = document.createElement("div");
    div.setAttribute("id","detail-dialog");
    

    let dialog = document.querySelector("dialog");

    let detail_all = document.createElement("div");
    detail_all.setAttribute("class","detail-all");
    dialog.appendChild(detail_all);

    let image = document.createElement("img");
    image.setAttribute("src", productDetail.img);
    image.id="images"
    detail_all.appendChild(image)

    let star = 5;
    for(let i=0; i< star; i++){
        let i = document.createElement("i");
        i.className="fa fa-star";
        i.setAttribute("style","color:orange")
        detail_all.appendChild(i)
        console.log(i)
       
    }

    let p = document.createElement("p");
    p.setAttribute("class","name-detail");
    p.textContent=productDetail.name;
    detail_all.appendChild(p);

    let descri = document.createElement("p");
    descri.setAttribute("class","de-detail");
    descri.textContent=productDetail.description;
    detail_all.appendChild(descri);

    let price = document.createElement("p");
    price.textContent="$"+productDetail.price;
    detail_all.appendChild(price);
    
    let button_detail = document.createElement("button");
    button_detail.className="button-s";
    button_detail.textContent="Cancel";
    button_detail.addEventListener("click",onCancel)
    detail_all.appendChild(button_detail);
    questions_dialog.appendChild(detail_all);
    show(dom_dialog)
    hide(container)
}
