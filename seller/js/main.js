
const dialog = document.querySelector("#dailog_element");
const table = document.getElementById("list-product");

const btn_edit=document.querySelector("#edit");
const dailog_element=document.querySelector("#dailog_element");

const header_edit = document.querySelector("#btn-add-product");
const btn_submit = document.querySelector("#create");
const form_header=document.querySelector(".form-title");
// console.log(dialog)
let arrayOfproduct= []

// function show________________________________________________
function show(element){
    element.style.display="block"
}
// function hide________________________________________________

function hide(element){
    element.style.display="none"
}

// save to local storage_______________________________________________
function saveProduct(){
    // console.log('user is saving')
    localStorage.setItem("arrayOfproduct" ,JSON.stringify(arrayOfproduct));
    // console.log(localStorage)
}

// load function form local stroage_______________________________________________
function loadProduct(){
    let storeName = JSON.parse(localStorage.getItem("arrayOfproduct"));
    if(storeName !==null){
        arrayOfproduct = storeName;
    }
    else{
        localStorage.removeItem("arrayOfproduct");
    }
}

// create table_______________________________________________
function displayList() {
    loadProduct();
    let listProduct = document.getElementById("tbody");
    listProduct.remove();
    let productTable = document.createElement("tbody");
    productTable.id = "tbody";
    
    table.appendChild(productTable);
    let index = 0
    for(let product of arrayOfproduct) {
        
        let tr = document.createElement("tr");
        tr.id = "table-row";
        tr.dataset.index = index;
        
        
        let nameProduct = document.createElement("td");
        nameProduct.textContent = product.name;
        
        let descript = document.createElement("td");
        descript.textContent = product.description;
        
        let price = document.createElement("td");
        price.textContent = "$"+ product.price ;
       
        let img =document.createElement("img");
        img.className='img-product'
        img.src = product.img;
        
        
        let storeImg = document.createElement("td");
        storeImg.id = "td-img"
        storeImg.appendChild(img);
        
        // button action ____________________________________
        let tdButton = document.createElement("td");
        tdButton.id = "action"
        
        let bntDelete = document.createElement("button");
        bntDelete.id = "btn-delete";
        bntDelete.textContent = "Delete"
        // function detelet_______________________________________
        bntDelete.addEventListener("click", deleteProduct)

        let bntEdit = document.createElement("button");
        bntEdit.id = "btn-edit";
        bntEdit.textContent = "Edit";
        tdButton.appendChild(bntDelete);
        tdButton.appendChild(bntEdit);
        bntEdit.addEventListener('click',editProduct)
        
        
        
        tr.appendChild(storeImg);
        tr.appendChild(nameProduct);
        tr.appendChild(descript);
        tr.appendChild(price);
        tr.appendChild(tdButton);
        productTable.appendChild(tr);
        // console.log(productTable)
        index++
        
    }  
}
// add product_______________________________________________
function addNewProduct(){
    show(dialog);
    btn_submit.textContent="CREATE ";
    form_header.textContent="CREATE PRODUCT"
 
    // clear element that create already___________________________________
    document.getElementById("img").value="";
    document.getElementById("Name").value="";
    document.getElementById("descrip").value="";
    document.getElementById("price").value=""; 
} 


// delete product_______________________________________________
function deleteProduct(event){
        event.preventDefault();
        let index = event.target.parentElement.parentElement.dataset.index;
        arrayOfproduct.splice(index,1)
        saveProduct();
        displayList();
}

// cancel product_______________________________________________
function onCancel(event){
    event.preventDefault();
    hide(dialog);
    // loadProduct();
}
// create prodcut_______________________________________________
let productIndex=null;
function onCreate(event){
    // console.log('ye')
    event.preventDefault();
    // validation form
    if (document.querySelector("#img").value !='' && document.querySelector("#Name").value !='' && document.querySelector("#descrip").value !='' && document.querySelector("#price").value!=""){
        // check if event work  on edit or create_______________________________
        if(productIndex !==null){   
            // for edit product_____________________________________
            let product = arrayOfproduct[productIndex];
            product.img=document.querySelector("#img").value;
            product.name=document.querySelector("#Name").value;
            product.description=document.querySelector("#descrip").value;
            product.price=document.querySelector("#price").value;
        }
        else{
            // for create product_____________________________________
            let newProduct={};
            newProduct.img=document.querySelector("#img").value;
            newProduct.name=document.querySelector("#Name").value;
            newProduct.description=document.querySelector("#descrip").value;
            newProduct.price=document.querySelector("#price").value;
            arrayOfproduct.push(newProduct);
        }
        // called function____________________________________________________
        hide(dialog);
        saveProduct();
        displayList();
    }
    else{
        alert("you must fill in for all input!")
    }
}

// for add event listener_______________________________________________
let getBtnAddProduct = document.getElementById("btn-add-product");
getBtnAddProduct.addEventListener("click",addNewProduct)
// fuction editProduct______________________________________________
function editProduct(event){
    let newProduct = event.target.parentElement.parentElement.dataset.index;
    productIndex=newProduct;
    // console.log(newProduct)
    let edits = arrayOfproduct[newProduct];
    document.getElementById("img").value=edits.img;
    document.getElementById("Name").value=edits.name;
    document.getElementById("descrip").value=edits.description;
    document.getElementById("price").value=edits.price;
    btn_submit.textContent="EDIT";
    form_header.textContent="EDIT PRODUCT"
    // console.log(header_edit)
    show(dialog);
}
// for call function _______________________________________________
loadProduct();
saveProduct();
displayList();
 