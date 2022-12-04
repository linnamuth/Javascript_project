const dataList = [
    {
        img: "https://assets.ajio.com/medias/sys_master/root/20220225/Svcr/6218ece1aeb26921afb7f739/-473Wx593H-463897470-peach-MODEL.jpg",
        name: "pink T-shirt",
        description : "Easy 15 days return and exchange. Return Policies may vary based on products and promotions. For full details on our Returns Policies, please",
        price: "22"
    },
    {
        img: "https://images.asos-media.com/products/new-look-oversized-t-shirt-in-black/202846122-1-black?$n_480w$&wid=476&fit=constrain",
        name: "black T-shirt",
        description : "New Look oversized t-shirt in black",
        price: "15"
    },
    {
        img: "https://putshirt.com/wp-content/uploads/2020/04/SLAYER-Heavy-Metal-Band-Hoodie.jpg",
        name: "hodie",
        description : "description:Copyright ownership gives the owner the exclusive right to use the work, with some exceptions. When a person creates an original work, fixed in a tangible medium, he or she automatically owns copyright to the work.",
        price: "20"
    },
    {
        img: "https://imusic.b-cdn.net/images/item/original/166/0803341578166.jpg?deftones-2022-around-the-fur-2022-hoodie&class=scaled",
        name: "girl hodie",
        description : "description:Copyright ownership gives the owner the exclusive right to use the work, with some exceptions. When a person creates an original work, fixed in a tangible medium, he or she automatically owns copyright to the work.",
        price: "17"
    },
    {
        img: "https://media.missguided.com/i/missguided/TJF25319_01",
        name: "hoodie ",
        description : "\"I have a good faith belief that use of the copyrighted materials described above as allegedly infringing is not authorized by the copyright owner, its agent, or the law.\" \"The information in this notification is accurate and I swear, under penalty of perjury, that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.\"",
        price: "20"
    },
    {
        img: "https://www.lulus.com/images/product/xlarge/4873910_962222.jpg?w=375&hdpi=1",
        name: "grey hoodie",
        description : "Be comfy cozy wherever you are when you're rockin' the NYTT Edinburgh Charcoal Grey Oversized Hoodie! Medium-weight French terry shapes this oversized",
        price: "19"
    },
    {
        img: "https://www.lulus.com/images/product/xlarge/5297770_946902.jpg",
        name: "hoodie",
        description : "Lulus Exclusive! Everyone says there's a time and place for everything, but when it comes to the Lulus Time For Cozy Charcoal Grey Oversized Pullover",
        price: "21"
    }
] 


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
function saveProduct(data=arrayOfproduct){
    // console.log('user is saving')
    localStorage.setItem("arrayOfproduct" ,JSON.stringify(data));
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
    //Change this to use local data.
    saveProduct(dataList);
    loadProduct()
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