var botaoCriarProduto = document.querySelector('#botao_criar_produto')
botaoCriarProduto.addEventListener('click', criarProduto);

var botaoCriarInsumo = document.querySelector('#botao_criar');
botaoCriarInsumo.addEventListener('click', adicionarInsumo);

function criarProduto(event) {
    event.preventDefault();

    removeErrorMessages()

    var select = document.querySelector('#produto');
    
    var form = document.querySelector('#form_produto');

    var produto = criaProduto(form);

    var validacao = checaCamposProduto(produto);
    console.log(validacao);
    if (validacao.length > 0) {
        showErrorMessages(validacao);
        var errorBox = document.querySelector('.error_box');
        errorBox.classList.remove('desativado');
        return;
    } else {
        var errorBox = document.querySelector('.error_box');
        errorBox.classList.add('desativado');
    }

    var option = document.createElement('option');
    option.textContent = form.input_produto.value;
    option.setAttribute('value', form.input_produto.value + '-' + form.input_lucro.value);
    select.appendChild(option);

    var containerProdutos = document.querySelector('.produtos');
    var produtoDiv = document.createElement('div');
    produtoDiv.classList.add(form.input_produto.value.replace(/\s/g, '') + '-' + form.input_lucro.value);
    var nomeProduto = document.createElement('h3');
    nomeProduto.textContent = form.input_produto.value;

    produtoDiv.appendChild(nomeProduto);
    
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');

    var th1 = document.createElement('th');
    th1.textContent = 'Insumo';

    var th2 = document.createElement('th');
    th2.textContent = 'Qtde Insumo';

    var th3 = document.createElement('th');
    th3.textContent = 'Qtde Embalagem';

    var th4 = document.createElement('th');
    th4.textContent = 'Valor';
    
    var th5 = document.createElement('th');
    th5.textContent = 'Custo';

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    produtoDiv.appendChild(table);
    
    var parCusto = document.createElement('p');
    parCusto.setAttribute('id', 'custoProd');
    parCusto.textContent = 'Custo de produção: ' + formataValor(0);
    var parLucro = document.createElement('p');
    parLucro.textContent = 'Lucro: ' + form.input_lucro.value + '%';
    var valorFinal = document.createElement('p');
    valorFinal.setAttribute('id', 'valorFinal');
    valorFinal.textContent = 'Valor Final do Produto: ' + formataValor(0);
    
    produtoDiv.appendChild(parCusto);
    produtoDiv.appendChild(parLucro);
    produtoDiv.appendChild(valorFinal);
    
    containerProdutos.appendChild(produtoDiv);
    containerProdutos.classList.remove('desativado');
    
    //Limpa os campos do formulário
    form.reset();
}

function adicionarInsumo(event) {
    event.preventDefault();
    removeErrorMessages();

    //Captura e valida o formulário
    var form = document.querySelector('#form_insumo');
    var insumo = criaInsumo(form);
    
    var validacaoInsumo = checaCamposInsumo(insumo);
    console.log(validacaoInsumo);
    if (validacaoInsumo.length > 0) {
        showErrorMessages(validacaoInsumo);
        var errorBox = document.querySelector('.error_box');
        errorBox.classList.remove('desativado');
        return;
    } else {
        var errorBox = document.querySelector('.error_box');
        errorBox.classList.add('desativado');
    }

    adicionaInsumoTabela(insumo);

    //Limpa os campos do formulário
    form.reset();
}

function adicionaInsumoTabela(insumo) {
    var novoInsumo = criaLinhaTabela(insumo);
    
    var produto = document.querySelector('.'+insumo.nomeProduto.replace(/\s/g, ''));
    var table = produto.querySelector('tbody');
    table.appendChild(novoInsumo);

    var lucro = String(insumo.nomeProduto).split('-')[1];

    atualizaValores(produto, lucro);
}

function atualizaValores(produto, lucro) {
    var parCusto = produto.querySelector('#custoProd');
    parCusto.textContent = 'Custo de produção: ' + formataValor(calculaCustoProducao(produto));
    var valorFinal = produto.querySelector('#valorFinal');
    valorFinal.textContent = 'Valor Final do Produto: ' + formataValor(calculaValorFinal(calculaCustoProducao(produto), lucro));
}

//Função que formata o valor
function formataValor(value) {
    return parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

function calculaCusto(insumo) {
    return (insumo.valor / insumo.qtdeEmbalagem) * insumo.qtdeInsumo;
}

function calculaCustoProducao(produto) {
    var valores = produto.querySelectorAll('.custoInsumo');
    var soma = 0;
    valores.forEach(valor => {
        soma = soma + valor.textContent.substring(3).replace(',', '.') * 1;
    });
    return Math.ceil(soma);
}

function calculaValorFinal(custoProducao, lucro) {
    return Math.ceil(custoProducao + (custoProducao / 100 * lucro));
}

function criaLinhaTabela(insumo) {
    //Cria a nova linha da tabela
    var novaLinha = document.createElement('tr');
    
    //Cria e atribui textos às novas colunas da tabela
    novaLinha.appendChild(criaCampoTabela(insumo.nomeInsumo, 'nomeInsumo'));
    novaLinha.appendChild(criaCampoTabela(insumo.qtdeInsumo, 'qtdeInsumo'));
    novaLinha.appendChild(criaCampoTabela(insumo.qtdeEmbalagem, 'qtdeEmbalagem'));
    novaLinha.appendChild(criaCampoTabela(formataValor(insumo.valor), 'valor'));
    novaLinha.appendChild(criaCampoTabela(formataValor(calculaCusto(insumo)), 'custoInsumo'));
    
    return novaLinha;
}

function criaCampoTabela(content, className) {
    var td = document.createElement('td');
    td.textContent = content;
    td.classList.add(className);
    
    return td;
}

function criaInsumo(form) {
    var insumo = {
        nomeProduto: form.produto.value,
        nomeInsumo: form.input_insumo.value,
        qtdeInsumo: form.input_qtde.value,
        qtdeEmbalagem: form.input_embalagem.value,
        valor: form.input_valor.value,
    };
    
    return insumo;
}

function criaProduto(form) {
    var produto = {
        nomeProduto: form.input_produto.value,
        lucro: form.input_lucro.value,
    };
    
    return produto;
}