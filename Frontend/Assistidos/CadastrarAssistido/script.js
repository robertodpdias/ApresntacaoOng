var func = localStorage.getItem('userdata');

var fotinho;
var newImg = document.querySelector(".foto")
var adcFoto = document.querySelector('.adcFoto')
var fileInp = document.querySelector("#inpFoto")
fileInp.addEventListener('change', (e) => {
    var fr = new FileReader();
    fr.onloadend = (foto) => {
        fotinho = foto.target.result;
        newImg.src = foto.target.result;
        newImg.style.width = "70px";
        newImg.style.height = "70px";
        newImg.style.borderRadius = "50%"
    }
    fr.readAsDataURL(e.target.files[0]);

})


adcFoto.style.cursor = "pointer"

adcFoto.addEventListener('click', () => {
    fileInp.click();
})

function cadastrarAssistido() {
    var inpNomeCom = document.querySelector(".nome-Completo")
    var nome = document.querySelector(".nome")
    var nomesoc = document.querySelector(".nome-soc");
    var rg = document.querySelector(".rg");
    var cpf = document.querySelector(".cpf");
    var est = document.querySelector(".estado");
    var nat = document.querySelector(".naturalidade");
    var nasc = document.querySelector(".nasc").value;
    var cartCid = document.querySelector(".cartCid");
    var cartSus = document.querySelector(".cartSus");
    var ante = document.querySelector(".ante").value

    var dia = nasc.split("/")[0]
    var mes = nasc.split("/")[1]
    var ano = nasc.split("/")[2]

    if ((nome.value == "")) {
        var nomeerr = document.createElement("p")
        nomeerr.innerHTML = "* Preencha este campo"
        nomeerr.style.display = "flex"
        nomeerr.style.color = "red"
        nomeerr.style.width = "90%"
        nomeerr.style.fontSize = "14px"
        inpNomeCom.appendChild(nomeerr)
    }


    var sexMasc = document.querySelector("#Masculino");
    var sexFem = document.querySelector("#Feminino");
    var sexOutr = document.querySelector("#Outro");

    var sex = [];

    if (sexMasc.checked == 1) {
        sexMasc.value = "Masculino";
        sex.push(sexMasc.value)
    } else if (sexFem.checked == 1) {
        sexFem.value = "Feminino";
        sex.push(sexFem.value)
    } else if (sexOutr.checked == 1) {
        sexOutr.value = "Outro";
        sex.push(sexOutr.value);
    } else if ((sexOutr.checked == 0) && (sexMasc.checked == 0) && (sexFem.checked == 0)) {
        alert("Selecione pelo menos uma opção (Sexo)")
    }

    var data = JSON.stringify({
        "id_funcionario": JSON.parse(func).id_funcionario,
        "nome_completo": nome.value,
        "nome_social": nomesoc.value,
        "rg": rg.value,
        "cpf": cpf.value,
        "data_nascimento": `${ano}-${mes}-${dia}`,
        "estado_civil": est.value,
        "naturalidade": nat.value,
        "sexo": sex,
        "cartao_cidadao": cartCid.value,
        "cartao_sus": cartSus.value,
        "foto": fotinho,
        "antecedente_criminal": ante
            // "foto_depois": fotinho
    })

    // fetch("http://10.87.207.27:3000/assistidos", {
    fetch("http://localhost:3000/assistidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then(response => { return response.json() })
        .then(data => {
            if (data.id_assistido !== null) {
                console.log(data)
                var listaComorbidade = document.querySelectorAll(".Comorbidade");
                listaComorbidade.forEach((item, index) => {

                    if (item.checked === true) {
                        var comor = {
                            "id_assistido": data.id_assistido,
                            "comorbidades": [{
                                "value": `${item.value}`
                            }]
                        }

                        fetch("http://localhost:3000/assistido/saude", {
                                // fetch("http://10.87.207.27:3000/assistido/saude", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(comor)
                            })
                            .then(response => {
                                if (response.ok) {
                                    return response.json()
                                } else {
                                    alert("Falha ao Cadastrar Comorbidades")
                                }
                            })
                            .then(data => {

                                console.log(data)
                            })
                    }
                });
            }
            window.location.reload();
        })
}



function showMenu() {
    let menuPsco = document.querySelector(".listadrogas")
    let menuimgPsco = document.querySelector(".pscArrow")
    menuPsco.classList.toggle("psDown")
    menuimgPsco.style.transform = "rotate(0deg)"

    if (menuPsco.classList.contains("psDown")) {
        menuPsco.style.display = "flex";
        menuimgPsco.style.transform = "rotate(180deg)"
    } else {
        menuPsco.style.display = "none"
        menuimgPsco.style.transform = "rotate(0deg)"
    }
}

function showMenuDoenca() {
    let menuDoenca = document.querySelector(".listadoencas")
    let menuimgDoen = document.querySelector(".doArrow")
    menuDoenca.classList.toggle("doDown")
    menuimgDoen.style.transform = "rotate(0deg)"

    if (menuDoenca.classList.contains("doDown")) {
        menuDoenca.style.display = "flex";
        menuimgDoen.style.transform = "rotate(180deg)"
    } else {
        menuDoenca.style.display = "none"
        menuimgDoen.style.transform = "rotate(0deg)"
    }
}

function getComorbidades() {
    let listaDrogas = document.querySelector(".listadrogas")
    let listaDoencas = document.querySelector(".listadoencas")
    let ulDoenca = document.createElement("ul")
    let ulDroga = document.createElement("ul")
    let liDoenca = document.createElement("p")
    let liDroga = document.createElement("p")

    // fetch("http://10.87.207.27:3000/assistido/comorbidade")
    fetch("http://localhost:3000/assistido/comorbidade")
        .then(response => { return response.json() })
        .then(data => {
            data.forEach((item) => {
                let inpDoenca = document.createElement("input")
                let inpDroga = document.createElement("input")

                inpDroga.type = "checkbox"
                inpDoenca.type = "checkbox"
                inpDroga.className = "Comorbidade"
                inpDoenca.className = "Comorbidade"

                if (item.tipo === 1) {
                    liDoenca.innerHTML = item.comorbidade
                    inpDoenca.value = item.id_comorbidade
                    liDoenca.appendChild(inpDoenca)
                    ulDoenca.appendChild(liDoenca.cloneNode(true));
                    // ul.appendChild(liinp.cloneNode(true));
                    listaDoencas.appendChild(ulDoenca)
                } else if (item.tipo === 0) {
                    inpDroga.value = item.id_comorbidade
                    liDroga.innerHTML = item.comorbidade
                    liDroga.appendChild(inpDroga)
                    ulDroga.appendChild(liDroga.cloneNode(true));
                    // ul.appendChild(liinp.cloneNode(true));
                    listaDrogas.appendChild(ulDroga)
                }

            })


        })

}