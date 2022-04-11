
const modeloFuncionario = (id_funcionario, foto, matricula, nome_completo, rg, cpf, data_nascimento, 
    cargo, sexo, data_admissao, data_demissao, email, senha, estado) => {


        let json = {
            "id_funcionario": id_funcionario,
            "foto": foto,
            "matricula": matricula,
            "nome_completo": nome_completo,
            "rg": rg,
            "cpf": cpf,
            "data_nascimento": data_nascimento,
            "cargo": cargo,
            "sexo": sexo,
            "data_admissao": data_admissao,
            "data_demissao": data_demissao,
            "email": email,
            "senha": senha,
            "status": estado
        }

        return json
    }

    module.exports = {
        modeloFuncionario
    }