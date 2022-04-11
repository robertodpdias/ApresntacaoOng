function menuDown() {
    let menuFam = document.querySelector(".dadosFamilia");
    let littlearrow = document.querySelector(".faArrow");
    menuFam.classList.toggle(".faDown");

    if (menuFam.classList.contains(".faDown")) {
        menuFam.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)";
    } else {
        menuFam.style.display = "none";
        littlearrow.style.transform = "rotate(0deg)";
    }
}

function getFamiliares() {
    let dadosFamilia = document.querySelector(".dadosFamilia");
    var local = localStorage.getItem("assistido");
    // fetch(`http://10.87.207.27:3000/assistido/busca_familiar/${local}`)
    fetch(`http://localhost:3000/assistido/busca_familiar/${local}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            var dadosFamilia = document.querySelector(".dadosFamilia")
            data.forEach((item, index) => {

                var div = document.createElement("div")
                var ul_nome = document.createElement("ul")
                var litxtNome = document.createElement("li")
                var litgetNome = document.createElement("li")

                var ul_rg = document.createElement("ul")
                var litxtrg = document.createElement("li")
                var litgetrg = document.createElement("li")

                var ul_rg = document.createElement("ul")
                var litxtrg = document.createElement("li")
                var litgetrg = document.createElement("li")


                var ul_par = document.createElement("ul")
                var litxtpar = document.createElement("li")
                var litgetpar = document.createElement("li")

                var ul_tel = document.createElement("ul")
                var litxttel = document.createElement("li")
                var litgettel = document.createElement("li")

                var ul_email = document.createElement("ul")
                var litxtemail = document.createElement("li")
                var litgetemail = document.createElement("li")

                var ul_end = document.createElement("ul")
                var litxtend = document.createElement("li")
                var litgeend = document.createElement("li")



                litxtNome.innerHTML = "Nome: "
                litgetNome.innerHTML = item.nome_familiar
                litxtrg.innerHTML = "RG: "
                litgetrg.innerHTML = item.rg_familiar
                litxtpar.innerHTML = "Parentesco: "
                litgetpar.innerHTML = item.parentesco
                litxttel.innerHTML = "Telefone: "
                litgettel.innerHTML = item.telefone_familiar
                litxtemail.innerHTML = "Email: "
                litgetemail.innerHTML = item.email_familiar
                litxtend.innerHTML = "Endereço: "
                litgeend.innerHTML = item.endereco_familiar



                ul_email.appendChild(litxtemail)
                ul_email.appendChild(litgetemail)
                ul_end.appendChild(litxtend)
                ul_end.appendChild(litgeend)
                ul_tel.appendChild(litxttel)
                ul_tel.appendChild(litgettel)
                ul_par.appendChild(litxtpar)
                ul_par.appendChild(litgetpar)
                ul_rg.appendChild(litxtrg)
                ul_rg.appendChild(litgetrg)
                ul_nome.appendChild(litxtNome)
                ul_nome.appendChild(litgetNome)
                div.appendChild(ul_nome)
                div.appendChild(ul_rg)
                div.appendChild(ul_par)
                div.appendChild(ul_tel)
                div.appendChild(ul_email)
                div.appendChild(ul_end)
                dadosFamilia.appendChild(div)
                div.className = "itens"
            });


        });
}

function menuDownPsco() {
    let menuAco = document.querySelector(".psclist");
    let littlearrow = document.querySelector(".pscArrow");
    menuAco.classList.toggle(".psDown");

    if (menuAco.classList.contains(".psDown")) {
        menuAco.style.display = "flex";
        menuAco.style.width = "100%";
        menuAco.style.height = "100%";
        littlearrow.style.transform = "rotate(180deg)";
    } else {
        menuAco.style.display = "none";
        littlearrow.style.transform = "rotate(0deg)";
    }
}

function menuDownDoenca() {
    let menuAco = document.querySelector(".doclist");
    let littlearrow = document.querySelector(".doArrow");
    menuAco.classList.toggle(".doDown");

    if (menuAco.classList.contains(".doDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)";
    } else {
        menuAco.style.display = "none";
        littlearrow.style.transform = "rotate(0deg)";
    }
}

function list() {
    getComorbidadeAssistido()

    var local = localStorage.getItem("assistido");

    var body = document.querySelector(body);
    // fetch(`http://10.87.207.27:3000/assistidos/${local}`)
    fetch(`http://localhost:3000/assistidos/${local}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Falha ao Listar Assistido")
            }
        })
        .then((data) => {
            console.log(data)
            var antes = document.querySelector("#assistidoAntes");
            antes.src = data.foto_antes;
            antes.style.borderRadius = "50%";
            var depois = document.querySelector("#assistidoDepois");
            depois.src = data.foto_depois;
            depois.style.borderRadius = "50%";

            if ((data.foto_antes == null) || (data.foto_antes == "undefined") || (data.foto_antes == "null") || (data.foto_antes == "")) {
                antes.src = "../../../Assets/icones/user.png"
            } else { antes.src = data.foto_antes }


            if ((data.foto_depois === null) || (data.foto_depois === "undefined") || (data.foto_depois == "null") || (data.foto_depois == "null")) {
                depois.src = "../../Assets/icones/user.png"
            } else {
                depois.src = data.foto_depois
            }


            var dataNascimento;
            var newData = data.data_nascimento.split("T");
            newData.forEach((item, index) => {
                if (index === 0) {
                    var ano = item.split("-")[0];
                    var mes = item.split("-")[1];
                    var dia = item.split("-")[2];
                    dataNascimento = `${dia}/${mes}/${ano}`;
                }
            });

            let nome = document.querySelector(".nomeCom");
            let nomeSoc = document.querySelector(".nomeSoc");
            let rg = document.querySelector(".rg-con");
            let cpf = document.querySelector(".cpf-con");
            let datanasc = document.querySelector(".data");
            let cartCid = document.querySelector(".cartcid");
            let cartSUs = document.querySelector(".cartSus");
            let antecedente = document.querySelector(".ant")
            let sex = document.querySelector(".sex");
            let estado = document.querySelector(".getEstCiv")


            if (data.antecedente_criminal == null) {
                antecedente.innerHTML = "Não possui"
            } else {
                antecedente.innerHTML = data.antecedente_criminal;
            }

            if (data.cpf == null) {
                cpf.innerHTML = "Não possui"
            } else {
                cpf.innerHTML = data.cpf;
            }

            if (data.nome_social == null) {
                nomeSoc.innerHTML = "Não possui"
            } else {
                nomeSoc.innerHTML = data.nome_social;
            }

            if (data.cartao_sus == null) {
                cartSUs.innerHTML = "Não possui"
            } else {
                cartSUs.innerHTML = data.cartao_sus;
            }
            if (data.cartao_cidadao == null) {
                cartCid.innerHTML = "Não possui"
            } else {
                cartCid.innerHTML = data.cartao_cidadao;
            }


            nome.innerHTML = data.nome_completo;
            nomeSoc
            rg.innerHTML = data.rg;
            cpf
            datanasc.innerHTML = dataNascimento;
            cartCid
            cartSUs
            sex.innerHTML = data.sexo;
            antecedente
            estado.innerHTML = data.estado_civil

        });
}

function getComorbidadeAssistido() {
    var ulDroga = document.querySelector(".psclist");
    var ulDoenca = document.querySelector(".doclist");
    var local = localStorage.getItem("assistido");

    fetch(`http://localhost:3000/assistido/saudeID/${local}`)
        // fetch(`http://10.87.207.27:3000/assistido/saudeID/${local}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            data.forEach((item, index) => {

                if (item.tipo === 0) {
                    var liDroga = document.createElement("li");
                    liDroga.innerHTML = item.comorbidade;
                    ulDroga.appendChild(liDroga);
                } else {
                    var liDoenca = document.createElement("li");
                    liDoenca.innerHTML = item.comorbidade;
                    ulDoenca.appendChild(liDoenca);
                }


            });
        });
}
var telaUPDT = document.querySelector("#telaUPDT").addEventListener("click", () => {
    window.location.href = "../Atualizar/"
});;
var telaFamiliar = document.querySelector("#telaFamiliar").addEventListener("click", () => {
    window.location.href = "../../Familiar/"
});


var func = localStorage.getItem("userdata");
var fotinho;
var newImg = document.querySelector("#assistidoDepois");
var adcFoto = document.querySelector(".adcFoto");
var fileInp = document.querySelector("#inpFoto");

// fileInp.addEventListener("change", (e) => {
//     var fr = new FileReader();
//     fr.onloadend = (foto) => {
//         fotinho = foto.target.result;
//         newImg.src = foto.target.result;
//         newImg.style.width = "70px";
//         newImg.style.height = "70px";
//         newImg.style.borderRadius = "50%";
//     };
//     fr.readAsDataURL(e.target.files[0]);

// });
// adcFoto.style.cursor = "pointer";
// adcFoto.addEventListener("click", () => {
//     fileInp.click();

// });

// function cadastrarFotoDepois() {
//     var local = localStorage.getItem("assistido");
//     let data = JSON.stringify({
//         'id_assistido': local,
//         'foto_depois': fotinho,
//     });


//     // fetch(`http://10.87.207.27:3000/assistido_foto_depois`, {
//     fetch(`http://localhost:3000/assistido_foto_depois`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: data
//         })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {

//             window.location.href = "http://127.0.0.1:5500/Assistidos/VerAssistido/index.html"

//         });

// }