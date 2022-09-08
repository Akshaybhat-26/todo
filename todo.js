
//DEFINING SELECTORS TO GRAB THE DOM ELEMENTS
let todoForm  = document.querySelector(".todoForm"); //FORM ELEMENT
let todoInput  = document.querySelector(".todoInput");//INPUT ELEMENT
let todoList  = document.querySelector(".todoList");// UL ELEMENT
let favorite  = document.querySelector(".fav");
let favourtieList = [];
//DECLATE AN EMPTY ARRAY TO STORE THE DATA

let todoArray = [];

//USE SUBMIT EVENT TO ADD THE TODO
todoForm.addEventListener("submit",function(event){
    //TO PREVENT DEFAULT NATURE THAT IS TO REFRESH THE BROWSER
    event.preventDefault();
    console.log(todoArray);
    //CALL THE FUNCTION ADDTODO AND ADD THE VALUE TO THE TODO LIST
    addTodo(todoInput.value);
});
todoInput.addEventListener("focus",function(event){
    //todoInput.classList.add("red");
    let alertElement = document.querySelector(".alertMessage");
    alertElement.style.display = "none";

});
todoInput.addEventListener("blur",function(event){
    //todoInput.classList.remove("red");
});

function changeBg(color){
    document.querySelector("body").style.backgroundColor = color
}

function addTodo(value){

    if(value == ""){
        let alertElement = document.querySelector(".alertMessage");
        alertElement.style.display = "block"
    }
    if(value !== ""){
        let todoConfig = {
            name:value,
            id:Date.now()
        }
        //PUSH ELEMENTS TO THE ARRAY
        todoArray.push(todoConfig)
    }
    console.log(todoArray);
    //CALL THE FUNCTION TO STORE DATA IN THE LOCAL STORAGE
    setLocalData(todoArray);
    //RESET THE INPUT BOX TO EMPTY
    todoInput.value = "";
}

function setLocalData(todoArray){
    //todoList is the key
    localStorage.setItem("todoList",JSON.stringify(todoArray));
    renderData(todoArray)
}

function setLocalDataForFav(favArray){
    //todoList is the key
    localStorage.setItem("todoFavourite",JSON.stringify(favArray));
    renderFavorites(favArray)
}
function getStoredData(){
    //GET THE LIST IF PRESENT
    let todoList = JSON.parse(localStorage.getItem("todoList"));

    //SEND THE LIST TO THE RENDER FUNCTION TO SHOW IT ON THE BROWSER
    //RUN THE BELOW CODE ONLY WHEN TODLIST IS
    if(todoList!=null){
        todoArray = todoList;
        renderData(todoList)
    }
}

function getStoredFavData(){
    //GET THE LIST IF PRESENT
    let favList = JSON.parse(localStorage.getItem("todoFavourite"));
    if(favList ==null){return}
    //SEND THE LIST TO THE RENDER FUNCTION TO SHOW IT ON THE BROWSER
    //RUN THE BELOW CODE ONLY WHEN TODLIST IS
    favList.forEach((value,index) =>{
        let li = document.createElement("li");
        li.setAttribute("class","list-group-item d-flex");
        li.innerHTML= value.name
        favorite.append(li);
        let favLength = document.querySelector(".fav").getElementsByTagName("li").length;
        if(favLength > 0) {
            document.querySelector(".fav-title").style.display = "block";
        }
    });
}
function renderFavorites(array){
    favorite.innerHTML = "";
    array.forEach((value,index) =>{
        let li = document.createElement("li");
        li.setAttribute("class","list-group-item d-flex");
        li.setAttribute("data-id",value.id);
        li.innerHTML = value.name;
        favorite.append(li);

    });
    let favLength = document.querySelector(".fav").getElementsByTagName("li").length;
        if(favLength > 0) {
            document.querySelector(".fav-title").style.display = "block";
        }
        else{
            document.querySelector(".fav-title").style.display = "none";
        }

}
function renderData(array){
    console.log("Hello, I'm render");
    let initialClick = true;
    //LOOP OVER ALL THE ELEMENTS AND ASSIGN THE NAME PROPERTY TO LI AND APPEND IT TO THE UL
    todoList.innerHTML = "";
    array.forEach((value,index) =>{
        let li = document.createElement("li");
        li.setAttribute("class","list-group-item listItem");
        // li.setAttribute("hacker","1212")
        let p = document.createElement("p");
        p.setAttribute("class","mb-0")
        p.textContent = value.name;

        p.addEventListener("click",function(event){
            if(initialClick){
                enableDeleteButton(event);
                initialClick = false;
            }
            else{
                disableDeleteButton(event);
                initialClick = true;
            }
        });
        // FAVORITE BUTTON
        favourtieList = JSON.parse(localStorage.getItem("todoFavourite"));
        if(favourtieList == null) favourtieList = [];
        // let img = document.createElement("img");
        // img.setAttribute("src","favorite1.png");
        // img.setAttribute("class","favicon")
        let span = document.createElement("span");
        span.innerHTML = `<i class="fa-solid fa-heart"></i>`;

        span.addEventListener("click",function(event){
            let exists = checkExistence(event.target.parentNode.parentNode.querySelector("p").textContent)
            if(exists){
                return
            }
            else{
                favourtieList.push({
                    name:event.target.parentNode.parentNode.querySelector("p").textContent,
                    id:value.id
                });
                setLocalDataForFav(favourtieList);
            }

        //img.style.visibility = "hidden";
        });

        //BUTTONS
        let button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn btn-danger");
        button.textContent = "Delete";
        button.setAttribute("disabled",true)
        button.setAttribute("task-id",value.id)
        deleteTodoItem(button,array);

         // TRASH
        let trash = document.querySelector(".deleteall");
        trash.addEventListener("click",function(event){
            console.log("delete all")
            //li.innerHTML="";
            todoArray = [];
            //trash.append(li);
            favourtieList = [];
            setLocalData(todoArray);
            setLocalDataForFav(favourtieList);
        });
        li.append(p);
        li.append(button);
        li.append(span);
        todoList.append(li)
    })
    checktodoarraylength()
}

function checkExistence(name){
    let elementExists = favourtieList.filter((value) =>{
        return value.name == name;
    }).length > 0;
    return elementExists;
}
//FIRST FUNCTION TO BE CALLED WHEN OUR APPLICATION IS LOADED
getStoredData();
getStoredFavData();
function enableDeleteButton(event){
    event.target.classList.add("todo-name");
    let deleteButton = event.target.nextSibling;
    deleteButton.removeAttribute("disabled")
}
function disableDeleteButton(event){
    event.target.classList.remove("todo-name");
    let deleteButton = event.target.nextSibling;
    deleteButton.setAttribute("disabled",true)
}

function deleteTodoItem(button,array){
    button.addEventListener("click",function(event){
        console.log(event.target.getAttribute("task-id"))
        let elementTobeRemoved;
        let deletedElement;
        for (let index = 0; index < todoArray.length; index++) {
            let elementId = array[index].id;
            if(elementId == event.target.getAttribute("task-id")){
                deletedElement = elementId;
                elementTobeRemoved = index;
            }

        }
        let fav = favourtieList.filter((value)=>{
            return value.id != deletedElement
        });
        favourtieList = fav;
        setLocalDataForFav(favourtieList);

        todoArray.splice(elementTobeRemoved,1)
        setLocalData(todoArray)
    });
}


function checktodoarraylength(){
    if(todoArray.length >0){
        let trash = document.querySelector(".deleteall");
        trash.style.display = "block";
    }

}


//function getStoredData(){




