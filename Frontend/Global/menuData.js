function getfunc() {
    let user = document.querySelector(".Username");
    let foto = document.querySelector(".userimg");
    user.innerHTML = funcionario.nome_completo
    foto.src = funcionario.foto


    // fetch(`http://10.87.207.27:3000/funcionarios/${funcionario.matricula}`)
    fetch(`http://localhost:3000/funcionarios/${funcionario.matricula}`)
        .then(resp => { return resp.json() })
        .then(data => {
            user.innerHTML = data[0].nome_completo
            foto.src = data[0].foto


        })
}