function checaCamposProduto(produto) {

    var erros = [];

    //Verifica se o produto é válido
    if (validaProduto(produto.nomeProduto)) {
        erros.push('O nome do produto é inválido!');
        addClass('input_produto');
    }

    //Verifica se o lucro é válido
    if (!validaLucro(produto.lucro)) {
        erros.push('O lucro do produto é inválido!');
        addClass('input_lucro');
    }

    return erros;
}

function checaCamposInsumo(insumo) {

    var erros = [];

    //Verifica se o produto é válido
    if (validaProduto(insumo.nomeProduto)) {
        erros.push('Selecione um produto!');
        addClass('produto');
    }

    //Verifica se o produto é válido
    if (validaProduto(insumo.nomeInsumo)) {
        erros.push('O nome do insumo é inválido!');
        addClass('input_insumo');
    }

    //Verifica se o lucro é válido
    if (!validaLucro(insumo.qtdeInsumo)) {
        erros.push('A quantidade do insumo é inválida!');
        addClass('input_qtde');
    }

    //Verifica se o lucro é válido
    if (!validaLucro(insumo.qtdeEmbalagem)) {
        erros.push('A quantidade da embalagem é inválida!');
        addClass('input_embalagem');
    }

    //Verifica se o lucro é válido
    if (!validaLucro(insumo.valor)) {
        erros.push('O valor do insumo é inválido!');
        addClass('input_valor');
    }

    return erros;
}
//Função para validação do nome do produto
function validaProduto(produto) {
    if (!produto) {
        return true;
    } else {
        return false;
    }
}

//Função para validação da quantidade
function validaLucro(lucro) {
    if (!isNaN(lucro) && lucro > 0) {
        return true;
    } else {
        return false;
    }
}

//Função para exibir as mensagens de erro
function showErrorMessages(errors) {
    var ul = document.querySelector('#error_messages');

    errors.forEach(error => {
        var li = document.createElement('li');
        li.textContent = error;
        ul.appendChild(li);
    });
}

//Função que remove os erros do formulário
function removeErrorMessages() {
    var ul = document.querySelector('#error_messages');
    ul.textContent = '';

    removeClass('input_produto');
    removeClass('input_lucro');
    removeClass('produto');
    removeClass('input_insumo');
    removeClass('input_qtde');
    removeClass('input_embalagem');
    removeClass('input_valor');
}

//Função que adiciona a classe de estilização de erro do formulário
function addClass(id) {
    var input = document.querySelector(`#${id}`);
    var text = document.querySelector(`#${id}_text`);
    input.classList.add('border-error');
    text.classList.add('text-error');
}

//Função que remove a classe de estilização de erro do formulário
function removeClass(id) {
    var input = document.querySelector(`#${id}`);
    var text = document.querySelector(`#${id}_text`);
    input.classList.remove('border-error');
    text.classList.remove('text-error');
}