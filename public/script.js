
var foodlist = [];
var quanti = document.getElementById("foodQt").children[1].innerText;
var Fname, request, qt;

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
function submit(){
    if(document.getElementById("foodQt").children[1].innerText != 0){
       Fname = document.getElementById("modLabel").innerText;
    request = document.getElementById("message-text").value;
    qt = document.getElementById("foodQt").children[1].innerText;
    foodlist.push([Fname, request, qt])
    console.log(Fname, request, qt) 
    }
    for(let i = 0; i < foodlist.length; i++){
        console.log(foodlist[i]);
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

/* Kitchen js*/ 
var Chef = [
  
    {
      Username: "Thictikorne",
      Password: "vin"
    },
    {
      Username: "Suradit",
      Password: "Luo"
    }
  ]
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  
  

function ChefLogin(){

    var username = document.querySelector('#Username').value
    var password = document.querySelector("Password").value
   
    for(i = 0;i<Chef.length;i++){
        if(username ==Chef[i].Username&&password==Chef[i].Password)
        {
            alert("TRUE")
            return
        }
    
        }
        alert ("FALSE")
    }

    