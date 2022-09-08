
//DEFINING SELECTORS TO GRAB THE DOM ELEMENTS
let todoForm  = document.querySelector(".todoForm"); //FORM ELEMENT
let todoInput  = document.querySelector(".todoInput");//INPUT ELEMENT
let todoList  = document.querySelector(".todoList");// UL ELEMENT
let favorite  = document.querySelector(".fav");
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
    todoInput.classList.add("red");
});
todoInput.addEventListener("blur",function(event){
    todoInput.classList.remove("red");
});


function addTodo(value){
    console.log(value,todoArray)
    //VALUE IS NOT EQUAL TO EMPTY - CONDITION IS TRUE
    // if(value == ""){
    //     return false;
    // }
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

function getStoredData(){
    //GET THE LIST IF PRESENT
    let todoList = JSON.parse(localStorage.getItem("todoList"));

    //SEND THE LIST TO THE RENDER FUNCTION TO SHOW IT ON THE BROWSER
    if(todoList!=null){
        todoArray = todoList;
        renderData(todoList)
    }
}

function renderData(array){
    console.log("Hello, I'm render");
    //LOOP OVER ALL THE ELEMENTS AND ASSIGN THE NAME PROPERTY TO LI AND APPEND IT TO THE UL
    todoList.innerHTML = "";
    array.forEach((value,index) =>{
        let li = document.createElement("li");
        li.setAttribute("class","list-group-item d-flex");
        // li.setAttribute("hacker","1212")
        let p = document.createElement("p");
        p.setAttribute("class","mb-0")
        p.textContent = value.name;

        p.addEventListener("click",function(event){
            console.log(event.target)
            let deleteButton = event.target.nextSibling;
            deleteButton.removeAttribute("disabled")
        });
        //BUTTONS
        let favourtieList = [];
        let img = document.createElement("img");
        img.setAttribute("src","favorite.png");
        img.setAttribute("class","favicon")
        img.addEventListener("click",function(event){
            console.log("hello i m fav")
            console.log(event.target.previousElementSibling.previousElementSibling.textContent )
            let li = document.createElement
            ("li");
        li.setAttribute("class","list-group-item d-flex");
        li.innerHTML=event.target.previousElementSibling.previousElementSibling.textContent;
        favourtieList.push(event.target.previousElementSibling.previousElementSibling.textContent);
        localStorage.setItem("todoFavourite",JSON.stringify(favourtieList));
        favorite.append(li)
        let tittle=document.querySelector(".tittle");
        tittle.classList.remove("tittle");
        

         });

        let button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn btn-danger");
        button.textContent = "Delete";
        button.setAttribute("disabled",true)
        button.setAttribute("task-id",value.id)
        button.addEventListener("click",function(event){
            console.log(event.target.getAttribute("task-id"))
            let elementTobeRemoved;
            for (let index = 0; index < todoArray.length; index++) {
                const elementId = array[index].id;
                console.log(elementId)
                if(elementId == event.target.getAttribute("task-id")){
                    elementTobeRemoved = index;
                }
            }
            todoArray.splice(elementTobeRemoved,1)
            setLocalData(todoArray)
        });

        li.append(p);
        li.append(button);
        li.append(img);
        
        todoList.append(li)
        
    })
}
//FIRST FUNCTION TO BE CALLED WHEN OUR APPLICATION IS LOADED
getStoredData();

// function arrayMethods(){
   // let dummyArray = [1,2,3];
    // dummyArray.unshift(4);
    //dummyArray.push(5);
  //  dummyArray.pop();}



