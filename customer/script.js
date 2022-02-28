var foodlist = [];
var quanti = document.getElementById("foodQt").children[1].innerText;
var food, qt;

$(".mod").click(function(){
    $('.modal').modal('show');
});

function showModal(foodId){
    document.getElementById("sub").disabled = false;
    document.getElementById("modLabel").innerHTML = document.getElementById(foodId).children[0].innerHTML;
    food = document.getElementById(foodId).children[2].children[1].children[0];
    quanti = document.getElementById(foodId).children[2].children[1].children[0].innerText;
    qt = quanti;
    if(quanti === ""){quanti = 0; document.getElementById("sub").disabled = true;}
    console.log(quanti)
    document.getElementById("foodQt").children[1].innerText = quanti;

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
    quanti = qt;
    if(quanti == 0){
        food.innerHTML = ""   
    }else {
        food.innerHTML = qt;
    }
    $('.modal').modal('hide');
    console.log(quanti)
}
function submit(){
    if(quanti == 0){
        food.innerHTML = ""   
    }else {
        food.innerHTML = quanti;
    }
    $('.modal').modal('hide');
    quanti = 0;
}