const historicoInflacao = require("../data/dados");

function buscar_ano(ano) {
    let ano_exato = historicoInflacao.historicoInflacao.filter((dado) => dado.ano == ano);
    return ano_exato;
};

function buscar_id(id) {
    let id_exato = historicoInflacao.historicoInflacao.find((dado) => dado.id == id);
    return id_exato;
}

function calculo_ipca(valor,mes_inicial,ano_inicial,mes_final,ano_final) {
    let resultado = valor;

    let dados = historicoInflacao.historicoInflacao.filter((dado) => dado.mes >= mes_inicial && dado.mes <= mes_final && dado.ano >= ano_inicial && dado.ano <= ano_final);

    for (let dado of dados) {
       resultado *= (1 + (dado.ipca/valor));
    }
    return resultado.toFixed(2);
};





exports.calculo_ipca = calculo_ipca;
exports.buscar_ano = buscar_ano;
exports.buscar_id = buscar_id;