function conectar() {
    let email = document.querySelector(".email");
    let cpf = document.querySelector(".cpf");
    let nova_senha = document.querySelector(".senhaNova");
    let data = JSON.stringify({
        email: email.value,
        cpf: cpf.value,
        nova_senha: nova_senha.value,
    });

    //  fetch("http://10.87.207.27:3000/funcionario/reset_senha",{
    fetch("http://localhost:3000/funcionario/reset_senha", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then((resp) => {
            if (resp.status == 400) {
                alert("Email Invalido");
            }
            return resp.json();
        })
        .then((data) => {
            window.location.href = "../../Login/"
        });
}

function olharSenha() {
    let img = document.querySelector(".olhar");
    let input = document.querySelector(".senha");

    if (input.type == "password") {
        input.type = "text";
        img.src = "../Assets/icones/visibility.png";
    } else {
        input.type = "password";
        img.src = "../Assets/icones/view.png";
    }
}