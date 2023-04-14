import { booklist } from './booklist_Belle.js';

class Item {
    constructor(bookName, author, price, quantity) {
      this.bookName = bookName;
      this.author = author;
      this.price = price;
      this.quantity = quantity;
      this.subTotal = price * quantity;
    }
  }
  var cart = [];
  var items  = JSON.parse(localStorage.getItem("cart"));
  if(items && items.length) {
    cart = items;
  }
  

const clickAddOne =  (evt) => {
    let btnId = evt.target.id;
    let textId = btnId.replace("add-btn","numbers-to-add");
    let textInput = document.getElementById(textId);
    if(textInput != null) {
        let num = parseInt(textInput.value) + 1;
        if(num <= 20){
            textInput.value = num;
        }
        if(num == 20) {
            document.getElementById(btnId).disabled = true;
        }
        if(num > 0) {
            document.getElementById(btnId.replace("add-btn","sub-btn")).disabled = false;
            document.getElementById(btnId.replace("add-btn","add-to-cart-btn")).disabled = false;
        }
    }
}

const clickSubtractOne =  (evt) => {
    let btnId = evt.target.id;
    let textId = btnId.replace("sub-btn","numbers-to-add");
    let textInput = document.getElementById(textId);
    if(textInput != null) {
        let num = parseInt(textInput.value) - 1;
        if(num >= 0) {
            textInput.value = num;
        }
        if(num == 0) {
            document.getElementById(btnId).disabled = true;
            document.getElementById(btnId.replace("sub-btn","add-to-cart-btn")).disabled = true;
        }
        if(num < 20) {
            document.getElementById(btnId.replace("sub-btn","add-btn")).disabled = false;
        }
    }   
}

const clickAddToCart = (evt) => {
    let info = evt.target.id.split("_")
    let x = info[1].replace("-"," ");
    let y = parseInt(info[2]);
    let selectedBook = booklist[x][y];
    let qty = document.getElementById(evt.target.id.replace("add-to-cart-btn", "numbers-to-add")).value;
    var item = new Item(selectedBook.name, x, parseFloat(selectedBook.price), parseInt(qty));
    let j = -1;
    if(cart.length != 0){
        for (i in cart) {
            if(cart[i].bookName == item.bookName) {
                j = i;
            }
        }
        if(j == -1) {
            cart.push(item);
        }
        else {
            cart[j] = item;
        }
    }
    else {
        cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    var count = 0;
    cart.forEach(element => {
        count += parseInt(element.quantity);
    });
    localStorage.setItem("count", count);
    document.getElementById('item-count').textContent = count;
    console.log(localStorage.getItem("cart"));
}

for (var x in booklist) {
    for(var y in booklist[x] ) {
    var items = JSON.parse(localStorage.getItem("cart"));
    var qty = 0;
    var b = booklist[x][y];
    if(items && items.length) {
        items.forEach(e=> {
            if (e.author == x) {
                e.bookName == b.name? qty = e.quantity : qty = qty;
            }
        });
    }
    var newDiv = document.createElement('div');
    newDiv.className = "book_card";
    var newImg = document.createElement('img');
    newImg.src="../images/book1.jpg";
    newImg.className="book-img";
    newDiv.appendChild(newImg);
    var newP1 = document.createElement('p');
    newP1.className="book-info";
    newP1.innerHTML=`Name: ${b.name}`;
    newDiv.appendChild(newP1);
    var newP2 = document.createElement('p');
    newP2.className="book-info";
    newP2.innerHTML=`Author: ${x}`;
    newDiv.appendChild(newP2);
    var newP3 = document.createElement('p');
    newP3.className="book-info";
    newP3.innerHTML=`Price: $${b.price}`;
    newDiv.appendChild(newP3);
    var btnDiv = document.createElement('div');
    btnDiv.id="numeric-btns";
    var numberInput = document.createElement('input');
    numberInput.type="number";
    numberInput.min="0";
    numberInput.max="20";
    numberInput.value=qty;
    numberInput.id="numbers-to-add_"+x.replace(" ","-")+"_"+y;
    var btn1 = document.createElement('button');
    btn1.innerHTML="-";
    btn1.id="sub-btn_"+x.replace(" ","-")+"_"+y;
    btn1.disabled=qty?true:false;
    btn1.addEventListener('click', (evt) => clickSubtractOne(evt));
    btnDiv.appendChild(btn1);
    btnDiv.appendChild(numberInput);
    var btn2 = document.createElement('button');
    btn2.innerHTML="+";
    btn2.id="add-btn_"+x.replace(" ","-")+"_"+y;
    btn2.addEventListener('click', (evt) => {clickAddOne(evt)});
    btnDiv.appendChild(btn2);
    newDiv.appendChild(btnDiv);
    var btn3 = document.createElement('button');
    btn3.innerHTML="Add to Cart";
    btn3.id="add-to-cart-btn_"+x.replace(" ","-")+"_"+y;
    btn3.addEventListener('click', (evt) => {clickAddToCart(evt)});
    btn3.disabled=true;
    newDiv.appendChild(btn3);
    var targetDiv = document.getElementById("booklist");
    targetDiv.appendChild(newDiv);
    } 
}
