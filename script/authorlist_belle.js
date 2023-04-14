import { booklist } from './booklist_belle.js';
var authorlist = [
    {
        name: "Charles Dickens",
        bio: "Charles Dickens was a Victorian author born in Hampshire, England. He worked as a law clerk then a court stenographer which led him to become a shorthand reporter. His first publication was a sketch in 1833 and novels soon followed the year after. He gave professional readings (speech/acting) from 1858 to his death in 1870.",
    },
    {
        name: "Stephen King",
        bio: "Stephen King is best known for horror and fantasy genre books. He graduated with a degree in English and became a teacher while writing in his spare time. Many of his books have turned into films. In 2015, he was awarded the National Medal of Arts for his work.",
    },
    {
        name: "Margaret Atwood",
        bio: "Margaret Atwood is a Canadian author, born in Ottawa, Ontario. Her written work comprises of over 50 books in fiction, short stories, critical essays, novels, children’s books and poetry; published in over 45 countries. She has a master’s degree in English literature and has taught at many Canadian and American universities. Some of her books have been made into television series.",
    },
    {
        name: "Maya Angelou",
        bio: "Maya Angelou is a world renowned author but also a poet, dancer, singer, activist and scholar. She is best known for her autobiographies. Her love for writing began when she was a child; writing journals, essays and poetry. Maya’s success from writing turned into screen play and film production; becoming an actor, director and producer. She was awarded the Presidential Medal of Freedom for her contribution to arts and literature.",
    },
    {
        name: "Nicholas Sparks",
        bio: "Nicholas Sparks is an American novelist best known for his romance stories; many of which were made into films. He lives in New Bern, North Carolina, where it was used as a setting for his novels. He devotes his time and literary profits to writing programs and charities; one of which he and his wife established in 2011: Nicholas Sparks foundation.",
    },
    {
        name: "Veronica Roth",
        bio: "Veronica Roth is an American author, best known for the Divergent Trilogy (post apocalypse). She loved reading and began writing at an early age. She wrote the first book of the trilogy over winter break during her senior year at Northwestern University. HarperCollins bought the book and it hit number six on the New York Times best-seller list.",
    },
    {
        name: "Nora Roberts",
        bio: "Nora Roberts is an American novelist best known for her romance novels. She married right after high school and had two sons. She wrote her first novel as a young mother who set a maximum forty hours per week of writing schedule. By 2012, she had released her 200th book and regularly hitting best-seller lists.",
    },
    {
        name: "Ken Follett",
        bio: "Ken Follett began reading at a young age as his parents didn’t allow him to watch TV. He worked in journalism and as a reporter after graduating university but loved publishing more. Ken starting writing as hobby while he worked at publishing company. Many of his novels hit the New York Times best-seller lists and turned into films.",
    },
]

const selectedBookChange = (evt) => {
    console.log(evt.target.value);
    var items = JSON.parse(localStorage.getItem("cart"));
    let foundInCart = false;
    let index = parseInt(evt.target.id.replace("book",""));
    for(let i in items) {
        if(items[i].bookName == evt.target.value) {
            foundInCart = true;
            document.getElementById("book-qty"+index).innerHTML = items[i].quantity+ " items of this book in the cart!";
        }
    }
    if(!foundInCart) {
        document.getElementById("book-qty"+index).innerHTML = "This book has not been added to the cart yet!";
    }
}

for(var i in authorlist) {
    let authorListTag = document.getElementById("author-list");
    let div = document.createElement("div");
    div.className = "author-list-item";
    let dtTag = document.createElement("dt");
    dtTag.innerHTML = authorlist[i].name;
    let ddTag1 = document.createElement("dd");
    ddTag1.innerHTML = authorlist[i].bio;
    div.appendChild(dtTag);
    div.appendChild(ddTag1);
    let ddTag2 = document.createElement("dd");
    let labelForList = document.createElement("label");
    labelForList.htmlFor = "book"+i;
    labelForList.innerText = "Select One of "+authorlist[i].name+"\'s books: ";
    ddTag2.appendChild(labelForList);
    let inputForList = document.createElement("input");
    inputForList.setAttribute('list','books'+i);
    inputForList.addEventListener('change', (evt) => selectedBookChange(evt));
    inputForList.name = "book"+i;
    inputForList.id = "book"+i;
    ddTag2.appendChild(inputForList);
    let datalistForBooks = document.createElement("datalist");
    datalistForBooks.id = "books"+i;
    var listOfBooks = booklist[authorlist[i].name];
    let optionList = [];
    console.log(listOfBooks);
    for(let i in listOfBooks) {
        let option = document.createElement("option");
        option.value = listOfBooks[i].name;
        optionList.push(option);
    }
    for(let j in optionList) {
        datalistForBooks.appendChild(optionList[j]);
    }
    console.log(optionList);
    ddTag2.appendChild(datalistForBooks);
    let bookQty = document.createElement("span");
    bookQty.id = "book-qty"+i;
    bookQty.className = "book-qty";
    ddTag2.appendChild(bookQty);
    div.appendChild(ddTag2);
    authorListTag.appendChild(div);
}