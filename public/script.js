/*const { application } = require("express");
const { json } = require("express/lib/response");
*/
var foodList = [];
var quanti = document.getElementById("foodQt").children[1].innerText;
var Fname, request, qt;

$(".mod").click(function(){
    $('.modal').modal('show');
});

function getFoodList(){
    return foodList;
}
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
        Fname = document.getElementById("modLabel").innerText;
        request = document.getElementById("message-text").value;
        qt = document.getElementById("foodQt").children[1].innerText;
        foodList.push([tableNum, Fname, request, qt])
        return foodList
    }
    const result = await fetch('/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            foodList
        })
    }).then((res)=> res.json())
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
