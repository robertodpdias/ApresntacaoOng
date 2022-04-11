var func = localStorage.getItem("userdata");
var fotinho;
var newImg = document.querySelector("#Funcfoto");
var adcFoto = document.querySelector(".adcFoto");
var fileInp = document.querySelector("#inpFoto");

fileInp.addEventListener("change", (e) => {
    var fr = new FileReader();
    fr.onloadend = (foto) => {
        fotinho = foto.target.result;
        newImg.src = foto.target.result;
        newImg.style.width = "120px";
        newImg.style.height = "120px";
        newImg.style.borderRadius = "50%";
    };
    fr.readAsDataURL(e.target.files[0]);
});
adcFoto.style.cursor = "pointer";
adcFoto.addEventListener("click", () => {
    fileInp.click();
});

function cadastrarFunc() {
    var status = 1;
    var getNome = document.querySelector(".getNome").value
    var getEmail = document.querySelector(".getEmail").value
    var getMatricula = document.querySelector(".getMatricula").value
    var getRG = document.querySelector(".getRG").value
    var getCPF = document.querySelector(".getCPF").value
    var getDataNasc = document.querySelector(".getDataNasc").value
    var getCargo = document.querySelector(".getCargo").value
    var getSexo = document.querySelector(".getSexo").value
    var getDataAdmissao = document.querySelector(".getDataAdmissao").value
    var getSenha = document.querySelector(".getSenha").value

    var diaNasc = getDataNasc.split("/")[0]
    var mesNasc = getDataNasc.split("/")[1]
    var anoNasc = getDataNasc.split("/")[2]



    var diaAdm = getDataAdmissao.split("/")[0]
    var mesAdm = getDataAdmissao.split("/")[1]
    var anoAdm = getDataAdmissao.split("/")[2]



    var data = JSON.stringify({
        "foto": fotinho,
        "matricula": getMatricula,
        "nome_completo": getNome,
        "rg": getRG,
        "cpf": getCPF,
        "data_nascimento": `${anoNasc}-${mesNasc}-${diaNasc}`,
        "cargo": getCargo,
        "sexo": getSexo,
        "data_admissao": `${anoAdm}-${mesAdm}-${diaAdm}`,
        "email": getEmail,
        "senha": getSenha,
        "status": status,
        "estado_civil": ""
    })

    // fetch("http://10.87.207.27:3000/funcionario", {
    fetch("http://localhost:3000/funcionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then(response => {
            if (response.ok) {
                alert("Cadastro efetuado com sucesso")
                return response.json()

            } else {
                alert("Falha ao Cadastrar")
            }

        })

    .then(data => {

        window.location.href = '../ListarFuncionarios/'
    })
}