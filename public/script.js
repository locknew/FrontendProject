document.getElementById('submit').disabled = true;
var foodList = [];
var quanti = document.getElementById("foodQt").children[1].innerText;
var Fname, request, qt;
var orderID = 0;
$(".mod").click(function(){
    $('.modal').modal('show');
});

function showModal(foodId){
    quanti = 0;
    document.getElementById("message-text").value = "";
    document.getElementById("modLabel").innerHTML = document.getElementById(foodId).children[0].innerHTML;
    document.getElementById("foodDescript").innerHTML = document.getElementById(foodId).children[2].children[0].children[0].innerHTML
    document.getElementById("foodQt").children[1].innerText = quanti;
    document.getElementById("sub").disabled = true;
}

function addition(){
    quanti++;
    document.getElementById("foodQt").children[1].innerText = quanti;
    document.getElementById("sub").disabled = false;
    console.log(quanti)
}
function substract(){
    quanti--;
    document.getElementById("foodQt").children[1].innerText = quanti;
    if (document.getElementById("foodQt").children[1].innerText == 0){
        document.getElementById("sub").disabled = true;
    }
    console.log(quanti)
}
function closeMod(){
    $('.modal').modal('hide');
}
async function submit(){
    let tableNum = document.getElementById('sel-number').value;
    if(document.getElementById("foodQt").children[1].innerText != 0){
        orderID++;
        Fname = document.getElementById("modLabel").innerText;
        request = document.getElementById("message-text").value;
        qt = document.getElementById("foodQt").children[1].innerText;
        foodList.push(['order'+orderID,tableNum, Fname, request, qt])
        addOrder(orderID, Fname, request, qt);
        document.getElementById('submit').disabled = false;
    }
    for(let i = 0; i < foodList.length; i++){
        console.log(foodList[i]);
    }

    $('.modal').modal('hide');
}

function searchFood(){
    var input, filter, list, a;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    list = document.getElementsByClassName("row mod");
    console.log(list.length);
    for(let i = 0; i < list.length; i++){
        a = list[i].children[0].children[0].innerHTML;
        console.log(a);
        if(a.toUpperCase().indexOf(filter) > -1){
            list[i].style.display = "";
        } else {
            list[i].style.display = "none"
        }
    }
}

function addOrder(Id, name, request, qt){
    
    let orderBox = document.createElement("div");orderBox.className="orderList";
    let orderRow = document.createElement("div");orderRow.className="row";    
    let orderNameBox = document.createElement("div");orderNameBox.className="foodOr col-10 col-sm-10";
    let orderName = document.createElement("h2");orderName.innerHTML=name;
    let deleteButtonBox = document.createElement("div");deleteButtonBox.className="deleteOrder col-2 col-sm-2";
    let deleteButton = document.createElement("h2");deleteButton.setAttribute('id','order'+Id);deleteButton.setAttribute('role','button');deleteButton.setAttribute('onclick','deleteOrder(this.id)');deleteButton.innerHTML = '-';
    let requestRow = document.createElement("div");requestRow.className="row";
    let requestBox = document.createElement("div");requestBox.className="request col-10 col-sm-10";
    let requestMessage = document.createElement("h5");requestMessage.innerHTML=request;
    let qtBox = document.createElement("div");qtBox.className="qt col-2 col-sm-2";
    let qtTxt = document.createElement("h3");qtTxt.innerHTML=qt;qtTxt.className="qt";
    
    orderNameBox.appendChild(orderName);deleteButtonBox.appendChild(deleteButton);
    orderRow.appendChild(orderNameBox);orderRow.appendChild(deleteButtonBox);
    orderBox.appendChild(orderRow);
    requestBox.appendChild(requestMessage);qtBox.appendChild(qtTxt);
    requestRow.appendChild(requestBox);requestRow.appendChild(qtBox);
    orderBox.appendChild(requestRow);

    document.getElementById("orderRow").prepend(orderBox);
}

function deleteOrder(orderID){
    console.log(orderID)
    if(confirm('Do you want to remove this order?') == true){
        document.getElementById(orderID).parentNode.parentNode.parentNode.remove();
        for (let i = 0; i < foodList.length; i++) {
            if(foodList[i][0] == orderID){
                foodList.splice(i,1)
            }
        } 
    }
    checkSubmit();
}

function checkSubmit(){
    if(foodList.length < 1){
        document.getElementById('submit').disabled = true;
    } else {
        document.getElementById('submit').disabled = false;
    }
}

/* Kitchen js*/ 
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  


function ChefLogin(){

    var username = document.querySelector('#Username').value
    var password = document.querySelector("#Password").value
    
 
  }