const express = require('express')

const route = express.Router()
const funcionarioControll = require("./src/controller/funcionarioControll")
const assistidoControll = require('./src/controller/assistidoControll')

route.post('/funcionarios', funcionarioControll.login)
route.get('/funcionarios', funcionarioControll.getAll)
route.get('/funcionarios/:matricula_funcionario', funcionarioControll.getMatricula)
route.post('/funcionario', funcionarioControll.postFuncionario)
route.put('/funcionarios', funcionarioControll.updateFuncionario)
route.put('/funcionario', funcionarioControll.updateFotoFuncionario)
route.delete('/funcionarios/:matricula', funcionarioControll.deletarFuncionario)
route.put('/funcionario/reset_senha', funcionarioControll.resetSenha)

route.post("/funcionario/financas", funcionarioControll.postFinanca)
route.get("/funcionario/financas", funcionarioControll.getAllFinancas)
route.get("/funcionario/financa/:id_financa", funcionarioControll.getIDFinanca)
route.put("/funcionario/financa", funcionarioControll.updateFinanca)

route.post("/funcionario/assistencia", funcionarioControll.postAssistencia)

route.get('/assistidos', assistidoControll.getAll)
route.get('/assistidos/:id_assistido', assistidoControll.getID)
route.post('/assistidos', assistidoControll.postAssistido)
route.get('/assistido_nome/:nome_completo', assistidoControll.buscarAssistidoNomeCompleto)
route.get('/assistido_cpf/:cpf', assistidoControll.buscarAssistidoCPF)
route.get('/assistido_rg/:rg', assistidoControll.buscarAssistidoRG)
route.put('/assistido/update', assistidoControll.updateAssistido)
route.put('/assistido_foto', assistidoControll.updateFotoAssistido)
route.put('/assistido_foto_depois', assistidoControll.updateFotoDepoisAssistido)


route.get("/assistido/saude", assistidoControll.getAssistSaude)
route.get("/assistido/saudeID/:id_assistido", assistidoControll.getSaudeID)
route.post("/assistido/saude", assistidoControll.postSaude)
route.put("/assistido/saude", assistidoControll.updateSaude)
route.get("/assistido/comorbidade", assistidoControll.getComorbidades)

route.post("/assistido/familiar", assistidoControll.postFamiliar)
route.post("/assistido_familiar", assistidoControll.postRelacionamentoFamiliar)
route.get("/assistido/busca_familiar/:id_assistido", assistidoControll.getVWFamiliar)

module.exports = route