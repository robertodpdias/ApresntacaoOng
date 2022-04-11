const { con } = require('../database/Connection')

const modeloFuncionario = require('../model/funcionarioModel')

// atualização do método POST
const postFuncionario = (req, res) => {

    let foto = (req.body.foto === undefined) ? "" : req.body.foto
    let status = (req.body.data_demissao === undefined) ? 1 : 0
    let string = `insert into funcionarios(foto,matricula,nome_completo,rg,cpf,data_nascimento,estado_civil,cargo,sexo,data_admissao,email,senha,status) values ?;`
    let values = [

        [
            foto,
            req.body.matricula,
            req.body.nome_completo,
            req.body.rg,
            req.body.cpf,
            req.body.data_nascimento,
            req.body.estado_civil,
            req.body.cargo,
            req.body.sexo,
            req.body.data_admissao,
            req.body.email,
            req.body.senha,
            status
        ]

    ]
    con.query(string, [values], (err, result) => {

        if (err == null) {

            res.status(200).json({...req.body, id: result.insertId, "status": status }).end();

        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}

// Método de login atualizado

const login = (req, res) => {
    if (req.body.email !== undefined && req.body.senha !== undefined) {
        let string = `select * from funcionarios where email = '${req.body.email}' and senha = '${req.body.senha}'`
        con.query(string, (err, result) => {

            if (err === null) {

                if (result.length == 0) {
                    res.status(400).end()
                } else {
                    result.forEach((item, index) => {
                        delete item.senha
                        delete item.status
                        delete item.nome_completo
                        delete item.rg
                        delete item.cpf
                        delete item.data_nascimento
                        delete item.cargo
                        delete item.sexo
                        delete item.data_admissao
                        delete item.data_demissao
                        delete item.email
                        delete item.estado_civil
                    });
                    res.json(result[0]).end()
                }

            } else {
                res.status(400).json({ err: err.message }).end()
            }

        })
    } else {
        res.status(400).json({ err: `'envie os campos 'email' e 'senha'` }).end()
    }
}

// Reset sennha 




const resetSenha = (req, res) => {

    let email = req.body.email
    let cpf = req.body.cpf
    let nova_senha = req.body.nova_senha


    if (email !== undefined && cpf !== undefined && nova_senha !== undefined) {

        let string = `update funcionarios set senha = "${nova_senha}" where email = "${email}" and cpf = "${cpf}"`

        con.query(string, (err, result) => {

            if (err === null) {

                if (result.affectedRows === 0) {
                    res.status(200).json({ "err": "não foi possível alterar a senha" }).end()
                } else {
                    res.status(200).json(result).end()
                }

            } else {
                res.status(400).json({ err: err.message }).end()
            }


        })


    } else {

        res.status(400).json({ "err": "informe os campos email, cpf e nova_senha" }).end()
    }


}










// Método update atualizado 


const asynqQuery = (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) reject(err);
            console.log(result)
            resolve(result);
        });
    })
}






const updateFuncionario = (req, res) => {

    let cargo = req.body.cargo
    let matricula_funcionario = req.body.matricula_funcionario
    let data_demissao = req.body.data_demissao
    let status = (data_demissao == undefined) ? 1 : 0
    let verificacao = false


    let string = [
        `update funcionarios set data_demissao = "${data_demissao}", status = ${status} where matricula = "${matricula_funcionario}";`,
        `update funcionarios set cargo = "${cargo}" where matricula = "${matricula_funcionario}"`,
        `update funcionarios set cargo = "${cargo}", data_demissao = "${data_demissao}", status = "${status}" where matricula = "${matricula_funcionario}"`
    ]



    function busca() {

        if (data_demissao !== undefined && cargo === undefined) {
            return string[0]
        } else if (data_demissao === undefined && cargo !== undefined) {
            return string[1]
        } else if (data_demissao !== undefined && cargo !== undefined) {
            return string[2]
        } else if (cargo !== undefined && email === undefined && senha === undefined) {
            return string[1]
        } else if (cargo == undefined && email !== undefined && senha == undefined) {
            return string[2]
        } else if (cargo == undefined && email == undefined && senha !== undefined) {
            return string[3]
        } else {
            return string[4]
        }

    }

    let resultado = busca()

    console.log(resultado)

    con.query(resultado, (err, result) => {
        if (err == null) {
            res.status(200).json({...req.body }).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })

}

const getAll = (req, res) => {
    let string = 'select * from funcionarios'
    con.query(string, (err, result) => {
        result.forEach((item, index) => {
            delete item.senha
        });

        res.json(result).end()
    })
}



const getMatricula = (req, res) => {

    let string = 'select * from funcionarios where matricula =' + req.params.matricula_funcionario
    con.query(string, (err, result) => {

        if (err === null) {
            if (result.length == 0) {
                res.status(404).end()
            } else {
                result.forEach((item, index) => {
                    delete item.senha
                        //delete item.status
                });
                res.json(result).end()
            }
        } else {
            res.status(404).json({ err: err.message }).end()
        }
    })
}



const updateFotoFuncionario = (req, res) => {

    let cpf = req.body.cpf
    let foto = req.body.foto
    let string = `update funcionarios set foto = '${foto}' where cpf = '${cpf}'`

    con.query(string, (err, result) => {
        if (err == null) {
            res.status(200).json({...req.body }).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })

}




const deletarFuncionario = (req, res) => {

    let string = `delete from funcionarios where id_funcionario = ${req.params.matricula};`

    con.query(string, (err, result) => {
        if (err == null) {
            res.status(200).json({...req.body }).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}


// métodos referentes a tabela financeira 


const postFinanca = (req, res) => {

    let id_funcionario = req.body.id_funcionario
    let tipo = req.body.tipo
    let descricao = req.body.descricao
    let valor = req.body.valor



    if (id_funcionario !== undefined && tipo !== undefined && descricao !== undefined && valor !== undefined) {


        let string = `insert into financeiro (id_funcionario,tipo,descricao,valor,data_lancamento) values (${id_funcionario}, "${tipo}", "${descricao}", ${valor}, curdate())`


        con.query(string, (err, result) => {

            if (err === null) {

                res.status(200).json(result).end()

            } else {
                res.status(400).json({ err: err.message }).end()
            }
        })




    } else {


        res.status(400).json({ "err": "informe os camppos 'id_funcionario', 'tipo', 'descricao', 'valor'" }).end()
    }

}


const getAllFinancas = (req, res) => {

    let string = `select * from financeiro`

    con.query(string, (err, result) => {

        if (err === null) {

            res.status(200).json(result).end()

        } else {
            res.status(400).json({ err: err.message }).end()
        }
    })

}


const getIDFinanca = (req, res) => {

    let id_financa = req.params.id_financa

    if (id_financa !== undefined) {

        let string = `select * from financeiro where id_lancamento = ${id_financa}`

        con.query(string, (err, result) => {

            if (err === null) {

                res.status(200).json(result).end()

            } else {

                res.status(400).json({ err: err.message }).end()
            }
        })

    } else {

        res.status(400).json({ "err": "informe o id da financa" }).end()
    }

}


const updateFinanca = (req, res) => {

    let id_lancamento = req.body.id_lancamento
    let tipo = req.body.tipo
    let descricao = req.body.descricao
    let valor = req.body.valor

    if (tipo !== undefined && descricao !== undefined && valor !== undefined) {


        let string = `update financeiro set tipo = "${tipo}", descricao = "${descricao}", valor = ${valor} where id_lancamento = ${id_lancamento}`

        con.query(string, (err, result) => {

            if (err === null) {

                res.status(200).json(result).end()

            } else {
                res.status(400).json({ err: err.message }).end()
            }
        })

    } else {

        res.status(400).json({ "err": "informe os campos 'tipo', 'descricao', 'valor'" }).end()
    }
}






// métodos assistências 



async function executeQuery(string) {

    return new Promise((resolve, reject) => {

        con.query(string, (err, result) => {

            if (err === null) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })


}


const postAssistencia = (req, res) => {

    let id_funcionario = req.body.id_funcionario
    let id_assistido = req.body.id_assistido
    let itens = req.body.itens
    let index = 0
    let comerro = false
    let stringSolicitacao


    if (id_funcionario !== undefined && id_assistido !== undefined && itens.length > 0) {

        let stringAssistencia = `insert into assistencias (id_assistido, id_funcionario, data_registro) values(${id_assistido}, ${id_funcionario}, curdate())`
        try {

            con.beginTransaction()

            con.query(stringAssistencia, (err, result) => {


                if (err === null) {

                    let id_assistencia = result.insertId

                    //console.log(id_assistencia)

                    while (!comerro) {

                        console.log("index: " + index)
                        console.log("tamanho do vetor" + itens.length)

                        stringSolicitacao = `insert into solicitacao (id_assistencia, id_item) values(${id_assistencia}, ${itens[index].id_item})`

                        console.log(stringSolicitacao)

                        let a = executeQuery(stringSolicitacao)
                            .then(() => {
                                console.log("entrou no then")

                                if (itens.length === 2) {

                                    console.log("entrou no if")
                                    con.commit()
                                    res.status(200).json({ "ok": "ok" }).end()
                                    comerro = true
                                }



                            }).catch((err) => {
                                res.status(400).json({ err }).end()
                                con.rollback()
                                comerro = true
                            })



                        index++
                    }

                } else {

                    res.status(400).json({ err: err.message }).end()
                }


            })


        } catch {

            con.rollback()
            console.log("err")
        }




    } else {
        res.status(400).json({ "err": "informe os campos 'id_funcionario', 'id_assistido', 'itens'" }).end()
    }



}






module.exports = {
    getAll,
    getMatricula,
    login,
    resetSenha,
    postFuncionario,
    updateFuncionario,
    updateFotoFuncionario,
    deletarFuncionario,
    postFinanca,
    getAllFinancas,
    getIDFinanca,
    updateFinanca,
    postAssistencia
}