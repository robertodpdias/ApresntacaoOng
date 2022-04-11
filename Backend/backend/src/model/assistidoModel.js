

const modeloAssistido = (id_assistido, id_saude, id_familiar, id_droga, id_funcionario, nome_completo, nome_social,
    rg, cpf, data_nascimento, estado_civil, naturalidade, sexo, cartao_cidadao, cartao_sus, foto, foto_depois, relatorio) => {


        let json = {
            "id_assistido": id_assistido,
            "id_saude": id_saude,
            "id_familiar": id_familiar,
            "id_droga": id_droga,
            "id_funcionario": id_funcionario,
            "nome_completo": nome_completo,
            "nome_social": nome_social,
            "rg": rg,
            "cpf": cpf,
            "data_nascimento": data_nascimento,
            "estado_civil": estado_civil,
            "naturalidade": naturalidade,
            "sexo": sexo,
            "cartao_cidadao": cartao_cidadao,
            "cartao_sus": cartao_sus,
            "foto": foto,
            "foto_depois": foto_depois,
            "relatorio": relatorio
        }

        return json

}

module.exports = {
    modeloAssistido
}