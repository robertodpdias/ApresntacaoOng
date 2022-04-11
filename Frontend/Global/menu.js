let menuImg = document.querySelector(".menuJS")
let menuContent = document.querySelector(".menucontent")
let pgAssistencia = document.querySelector(".Assistencia")
let pgFuncionario = document.querySelector(".Funcionario")
let pgAssistido = document.querySelector(".Assistido")
let logout = document.querySelector(".logout")



menuContent.style.marginLeft = "-550px";

function abrirMenu() {

    menuImg.classList.toggle("down");
    if (!menuImg.classList.contains("down")) {
        menuContent.style.marginLeft = "0px";
        menuContent.style.transition = "all 0.5s linear";
        menuImg.style.display = "none";
    }
}

function closeMenu() {
    menuContent.style.marginLeft = "-550px";
    menuContent.style.transition = "all 0.2s linear";
    menuImg.style.display = "flex";
    menuImg.classList.toggle("down");
}

let sair = document.querySelector(".logout")
sair.style.cursor = "pointer"
sair.addEventListener("click", () => {
    window.location.href = "../../Login/index.html"
    localStorage.clear
})

let Funcionario = document.querySelector(".Funcionario")
Funcionario.style.cursor = "pointer"
Funcionario.addEventListener("click", () => {
    window.location.href = "../../Funcionario/OpcoesFuncionario/index.html"
    localStorage.clear
})


let Assistido = document.querySelector(".Assistidos")
Assistido.style.cursor = "pointer"
Assistido.addEventListener("click", () => {
    window.location.href = "../../Assistidos/OpcoesAssistido/index.html"
    localStorage.clear
})

let dados = localStorage.getItem('userdata')
let funcionario = JSON.parse(dados)
console.log(funcionario)