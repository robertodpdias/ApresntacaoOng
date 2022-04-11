var cpf;
var matricula = localStorage.getItem("funcionario")
var getMatricula;
var getCargo;

function list() {
    let local = localStorage.getItem("funcionario");

    // fetch(`http://10.87.207.27:3000/funcionarios/${local}`, )
    fetch(`http://localhost:3000/funcionarios/${local}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {


            data.forEach((item, index) => {
                getMatricula = item.matricula
                getCargo = item.cargo
                var botaoEditar = document.querySelector(".btn")
                var Fotofuncionario = document.querySelector("#Funcfoto");
                var liNome = document.querySelector(".getNome");
                var liEstadoCivil = document.querySelector(".getDataNasc");
                var liMatricula = document.querySelector(".getMatricula");
                var liRg = document.querySelector(".getRG");
                var liCpf = document.querySelector(".getCPF");
                var liNasc = document.querySelector(".getDataNasc");
                var liCargo = document.querySelector(".getCargo");
                var liSex = document.querySelector(".getSexo");
                var liDataAdmissao = document.querySelector(".getDataAdmissao");
                var liDatademissao = document.querySelector(".getDemissao");
                var liEmail = document.querySelector(".getEmail");

                var SplitdataAdm = item.data_admissao.split("T")[0];

                var SplitdataNasc = item.data_nascimento.split("T")[0];

                if ((item.foto === null) || (item.foto === "undefined") || (item.foto == "null") || (item.foto == "")) {
                    Fotofuncionario.src = "../../Assets/icones/user.png"
                } else {
                    Fotofuncionario.src = item.foto
                }

                if (item.data_demissao === null) {
                    liDatademissao.innerHTML = "NDA";
                } else {
                    var SplitdataDem = item.data_demissao.split("T")[0];
                    liDatademissao.innerHTML = `${SplitdataDem.split("-")[2]}/${SplitdataDem.split("-")[1]}/${SplitdataDem.split("-")[0]}`;
                    botaoEditar.disabled = true;
                }


                liNome.innerHTML = item.nome_completo;
                liEstadoCivil.innerHTML = item.estado_civil;
                liMatricula.innerHTML = item.matricula;
                liRg.innerHTML = item.rg;
                liCpf.innerHTML = item.cpf;
                cpf = item.cpf;
                liNasc.innerHTML = `${SplitdataNasc.split("-")[2]}/${SplitdataNasc.split("-")[1]}/${SplitdataNasc.split("-")[0]}`;
                liCargo.innerHTML = item.cargo;
                liSex.innerHTML = item.sexo;
                liEmail.innerHTML = item.email;
                liDataAdmissao.innerHTML = `${SplitdataAdm.split("-")[2]}/${
          SplitdataAdm.split("-")[1]
        }/${SplitdataAdm.split("-")[0]}`;
            });
        });
}

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
        newImg.style.width = "70px";
        newImg.style.height = "70px";
        newImg.style.borderRadius = "50%";
    };
    fr.readAsDataURL(e.target.files[0]);
});
adcFoto.style.cursor = "pointer";
adcFoto.addEventListener("click", () => {
    fileInp.click();
});

function cadastrarFotoDepois() {
    let data = JSON.stringify({
        cpf: cpf,
        foto: fotinho,
    });


    // fetch(`http://10.87.207.27:3000/funcionario`, {
    fetch(`http://localhost:3000/funcionario`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Falha ao Atualizar Foto")
            }
        })
        .then((data) => {

            alert("Foto Atualizada");
            window.location.reload()

        });
}

function editarDados() {
    var ulEditarDados = document.querySelector(".EditarDados");
    var ulDadosFunc = document.querySelector(".DadosFuncionario");
    var btnDadosFunc = document.querySelector(".btn");
    var btnAtualizarDados = document.querySelector(".btn-Updt");
    var cargo = document.querySelector("#cargo");
    var matricula = document.querySelector("#Matricula")
    cargo.value = getCargo
    matricula.value = getMatricula

    ulDadosFunc.style.display = "none";

    if (ulDadosFunc.style.display === "none") {
        ulEditarDados.style.display = "flex";
        btnDadosFunc.style.display = "none";
        btnAtualizarDados.style.display = "block";
    }
}

function Atualizar() {
    var dataDemissao = document.querySelector("#Data").value;
    var cargo = document.querySelector("#cargo").value;
    var ulEditarDados = document.querySelector(".EditarDados");
    var ulDadosFunc = document.querySelector(".DadosFuncionario");
    var btnDadosFunc = document.querySelector(".btn");
    var btnAtualizarDados = document.querySelector(".btn-Updt");
    var matricula = document.querySelector("#Matricula").value

    var dia = dataDemissao.split("/")[0]
    var mes = dataDemissao.split("/")[1]
    var ano = dataDemissao.split("/")[2]

    cargo.placeholder = getCargo
    matricula.placeholder = getMatricula

    const data = JSON.stringify({
        matricula_funcionario: matricula,
        cargo: cargo,
        data_demissao: `${ano}-${mes}-${dia}`,
    });

    console.log(data)
        // fetch(`http://10.87.207.27:3000/funcionarios`, {
    fetch(`http://localhost:3000/funcionarios`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                alert("Falha ao Atualizar")
                ulDadosFunc.style.display = "flex";
                btnDadosFunc.style.display = "block";
                ulEditarDados.style.display = "none";
                btnAtualizarDados.style.display = "none";
            }
        })
        .then((data) => {
            alert("Atualizado com sucesso");
            ulDadosFunc.style.display = "flex";
            btnDadosFunc.style.display = "block";
            ulEditarDados.style.display = "none";
            btnAtualizarDados.style.display = "none";

            window.location.reload()

        });
}