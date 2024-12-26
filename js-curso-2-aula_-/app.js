let listaNumeroSorteados = [];
let limiteDeNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let textoInicial = document.querySelector(tag);
    textoInicial.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Bem-vindo ao jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero de 1-10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; //input pois no html ele é o chute
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';        
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O numero é menor que ${chute}`); 
        } else {
            exibirTextoNaTela('p', `O numero é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteDeNumeros + 1); //aqui ele guarda o numero sorteado na lista
    let quantidadeDeElementoNaLista =  listaNumeroSorteados.length //guarda quantidade de elementos que foram guardados na lista

    if (quantidadeDeElementoNaLista == limiteDeNumeros) { //nesse if caso chegar no numero maximo ele limpa a lista
        listaNumeroSorteados = [];
    }

    if (listaNumeroSorteados.includes(numeroEscolhido)) { //aqui verifica se o numero sorteado ja esta na lista
        return gerarNumeroAleatorio; //caso estiver ele retorna para gerar um novo numero
    } else {
        listaNumeroSorteados.push(numeroEscolhido); //coloca o numero sorteado na lista
        return numeroEscolhido; //caso nao estiver na lista ele retorna o numero
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}