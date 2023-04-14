var items = JSON.parse(localStorage.getItem("cart"));

let count = 0;
let total = 0;

for (i in items) {
    let j = i;
    let cart_table_body = document.getElementById("cart-items-body");
    let cart_table_row = document.createElement("tr");
    let col1 = document.createElement("td");
    col1.textContent = parseInt(j)+1;
    cart_table_row.appendChild(col1);
    let col2 = document.createElement("td");
    let col2_book = document.createElement("strong");
    col2_book.innerHTML = items[i].bookName;
    col2.appendChild(col2_book);
    let col2_break = document.createElement("br");
    col2.appendChild(col2_break);
    let col2_author = document.createElement("span");
    col2_author.innerHTML = items[i].author;
    col2.appendChild(col2_author);   
    cart_table_row.appendChild(col2);
    let col3 = document.createElement("td");
    col3.textContent = items[i].quantity;
    cart_table_row.appendChild(col3);
    let col4 = document.createElement("td");
    col4.textContent = "$"+items[i].price;
    col4.className = "unit-price";
    cart_table_row.appendChild(col4);
    let col5 = document.createElement("td");
    col5.textContent = "$"+items[i].subTotal;
    col5.className = "subtotal-amount";
    cart_table_row.appendChild(col5);
    cart_table_body.appendChild(cart_table_row);
    count += parseInt (items[i].quantity);
    total += parseFloat(items[i].subTotal);
}

document.getElementById('total-items').textContent = count;
document.getElementById('total-amount').textContent = "$"+total;

