const categories=document.getElementById('categories')
const products=document.getElementById('products')
const cartCount=document.getElementById('cartCount')

// const url='https://api.escuelajs.co/api/v1/products'
 const url='https://fakestoreapi.com/products/'

async function getProducts (){
    const res= await fetch(url)
    const data= await res.json()
      console.log(data);
      showCategories(data)
      showProducts(data)
     
   
}

getProducts()

function showCategories(arr) {
  let newCategories=[]

  const categoriesFilter=arr.filter(el=>{
   console.log(el);
   if(el.category.name && !newCategories.includes(el.category.name) ){
     newCategories.push(el.category.name)
   }
  })

  console.log(newCategories);
  
    for (const name of newCategories ) {
      categories.innerHTML+=`<li>${name}</li>`
      // console.log(obj.category.name);
 
  } 
}




function showProducts(arr) {
  products.innerHTML=''
  for (const product of arr) {
    products.innerHTML+=`
    <div onclick='getItemBuld (${product.id})' class="card d-flex" style="width: 18rem; ">
    <img src="${product.image} " alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.category}</p>
     <h6>${product.price}$</h6>
    </div>
  </div>



     ` 
}    
}

async function getItemBuld (id){
    const response=await fetch(url+id)
    const data=await response.json()
      console.log(data);
      showOneCard(data)
    //   renderAddCard(data)
}

// getItemBuld(2)

 function showOneCard(obj) {
    products.innerHTML=''
    products.innerHTML+=`
    <div class="card d-flex" style="width: 22rem; ">
    <img src="${obj.image} " alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${obj.title}</h5>
      <p class="card-text">${obj.despriction}</p>
      <h4>${obj.price}$</h4>
      <a href="#" onclick='addItemToCart(${obj.id})' class="btn btn-primary">Добавить в корзину</a>
    </div>
  </div>
     ` 
}

// function renderAddCard(id){
//     getItemBuld(id)
//     localStorage.setItem()
//     console.log(id);

// //     let cartAmount=0
// //    ++cartAmount
// //     cartCount.innerHTML=cartAmount


// }

let arrCart=[]

async function addItemToCart(id){
  const isItemInCart = arrCart.some(item => item.id === id);

  if (!isItemInCart) {
      const res = await fetch(url + id);
      const data = await res.json();


      console.log(data);
      arrCart.push(data)
      
     const cartData=JSON.stringify(arrCart)
    localStorage.setItem('cart', cartData)
    getItemFromCard()
  } else {
    console.log('Этот товар уже добавлен');
}
}


function getItemFromCard() {
    const data=JSON.parse(localStorage.getItem('cart'))
    console.log(data, 'localStorage');
    arrCart=data
}

getItemFromCard()
cartCount.innerHTML=arrCart.length

//filter / id


