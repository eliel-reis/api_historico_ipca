const express = require("express");
const app = express();

const historicoInflacao = require("./data/dados"); 
const funcoes = require("./service/service");

app.get("/historicoIPCA/calculo", (req, res) => {
    let valor = req.query.valor;
    let mes_inicial = req.query.mes_inicial;
    let ano_inicial = req.query.ano_inicial;
    let mes_final = req.query.mes_final;
    let ano_final = req.query.ano_final;


   if(
        valor && 
        mes_inicial >= 1 && 
        mes_inicial <= 12 && 
        ano_inicial >= 2015 &&
        ano_inicial <= 2023 && 
        mes_final >= 1 && 
        mes_final <= 12 && 
        ano_final >= 2015 &&
        ano_final <= 2023
    ) {
        
            let resultado = funcoes.calculo_ipca(valor, mes_inicial, ano_inicial, mes_final, ano_final);

            res.json({resultado: resultado});
    } else {
        res.status(400).json({erro: "Parâmetros inválidos"});
    }
    
  
});


app.get("/historicoIPCA", (req, res) => {
    let ano = req.query.ano;

    if (ano < 2015 || ano > 2023) {
        res.status(404).json({erro: "Nenhum histórico encontrado para o ano específicado"});
    }else{
        (ano) ? res.json(funcoes.buscar_ano(ano)) : res.json(historicoInflacao.historicoInflacao);
    }
});

app.get("/historicoIPCA/:id", (req, res) => {
    let id = req.params.id;

    (funcoes.buscar_id(id)) ? res.json(funcoes.buscar_id(id)) : res.status(404).json({erro: "Elemento não encontrado"});
}); 

app.listen(8080, () => {
    console.log("Aplicação Node Iniciada...");
});