var booklist= {
    "Charles Dickens": [
        {
            "name":"Oliver Twist",
            "price":20.5
        }, 
        {
            "name":"Great Expectations",
            "price":18.5
        }, 
        {
            "name":"A Tale of Two Cities",
            "price":19.5
        },
        {
            "name":"Hard Times",
            "price":21.5
        },
        {
            "name":"Bleak House",
            "price":22
        }
    ],
    "Stephen King": [
        {
            "name":"The Shining",
            "price":20.5
        }, 
        {
            "name":"Billy Summers",
            "price":18.5
        }, 
        {
            "name":"Insomnia",
            "price":19.5
        },
        {
            "name":"Dreamcatcher",
            "price":21.5
        },
        {
            "name":"The Long Walk",
            "price":22
        }
    ],
    "Margaret Atwood": [
        {
            "name":"The Handmaid's Tale",
            "price":20.5
        }, 
        {
            "name":"Lady Oracle",
            "price":18.5
        }, 
        {
            "name":"You Are Happy",
            "price":19.5
        },
        {
            "name":"Good Bones",
            "price":21.5
        },
        {
            "name":"The Heart Goes Last",
            "price":22
        }
    ],
    "Maya Angelou": [
        {
            "name":"And Still I Rise",
            "price":20.5
        }, 
        {
            "name":"Woman Work",
            "price":18.5
        }, 
        {
            "name":"Life Doesn’t Frighten Me",
            "price":19.5
        },
        {
            "name":"A Song Flung Up To Heaven",
            "price":21.5
        },
        {
            "name":"Angelina of Italy",
            "price":22
        }
    ],
    "Nicholas Sparks": [
        {
            "name":"The Notebook",
            "price":20.5
        }, 
        {
            "name":"Message in a Bottle",
            "price":18.5
        }, 
        {
            "name":"The Guardian",
            "price":19.5
        },
        {
            "name":"A Walk to Remember",
            "price":21.5
        },
        // {
        //     "name":"Every Breath",
        //     "price":22
        // }
    ],

}

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
    console.log(localStorage.getItem("cart"));
}

for (var x in booklist) {
    for(var y in booklist[x] ) {
    var b = booklist[x][y]
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
    numberInput.value="0";
    numberInput.id="numbers-to-add_"+x.replace(" ","-")+"_"+y;
    var btn1 = document.createElement('button');
    btn1.innerHTML="-";
    btn1.id="sub-btn_"+x.replace(" ","-")+"_"+y;
    btn1.disabled=true;
    btn1.addEventListener('click', (evt) => clickSubtractOne(evt));
    btnDiv.appendChild(btn1);
    btnDiv.appendChild(numberInput);
    var btn2 = document.createElement('button');
    btn2.innerHTML="+";
    btn2.id="add-btn_"+x.replace(" ","-")+"_"+y;
    btn2.addEventListener('click', (evt) => {clickAddOne(evt)});
    // btn2.click = clickAddOne(numberInput.id)
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