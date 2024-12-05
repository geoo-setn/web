
document.getElementById("formFinanceiro").addEventListener("submit", function(event) {
    event.preventDefault();

    var descricao = document.getElementById('descricao').value;
    var categoria = document.getElementById('categoria').value;
    var data = document.getElementById('data').value;
    var valor = parseFloat(document.getElementById('valor').value);

    var transacao = { descricao: descricao, categoria: categoria, data: data, valor: valor };

    var listaTransacoes = JSON.parse(localStorage.getItem('listaTransacoes')) || [];
    listaTransacoes.push(transacao);

    localStorage.setItem('listaTransacoes', JSON.stringify(listaTransacoes));

    document.getElementById("formFinanceiro").reset();

    exibirTransacoes();
});

function exibirTransacoes() {
    var listaTransacoes = JSON.parse(localStorage.getItem('listaTransacoes')) || [];
    var lista = document.getElementById("listaTransacoes");
    lista.innerHTML = "";

    var totalReceitas = 0;
    var totalDespesas = 0;

    listaTransacoes.forEach(function(transacao, index) {
        var li = document.createElement("li");
        li.textContent = `${transacao.descricao} - ${transacao.categoria} - ${transacao.data} - R$ ${transacao.valor.toFixed(2)}`;

        var botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", function() {
            listaTransacoes.splice(index, 1);
            localStorage.setItem('listaTransacoes', JSON.stringify(listaTransacoes));
            exibirTransacoes();
        });

        li.appendChild(botaoExcluir);
        lista.appendChild(li);

        if (transacao.categoria == "receita") {
            totalReceitas += transacao.valor;
        } else {
            totalDespesas += transacao.valor;
        }
    });

    document.getElementById("totalReceitas").textContent = `R$ ${totalReceitas.toFixed(2)}`;
    document.getElementById("totalDespesas").textContent = `R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById("saldoFinal").textContent = `R$ ${(totalReceitas - totalDespesas).toFixed(2)}`;
}

exibirTransacoes();
