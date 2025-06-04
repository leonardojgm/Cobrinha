let tela = document.getElementById("tela");
let contexto = tela.getContext("2d");
let caixa = 32;
let cobrinha = [];
let direcao = "direita";
let corFundo = "lightgreen";
let corCobrinha = "green";

function iniciarJogo() {
    cobrinha[0] = {
        x: (caixa/4) * caixa,
        y: (caixa/4) * caixa
    }
}

function criarFundo() {
    contexto.fillStyle = corFundo;
    contexto.fillRect(0, 0, (caixa/2) * caixa, (caixa/2) * caixa);
}

function criarCobrinha() {
    for(i = 0; i < cobrinha.length; i++) {
        contexto.fillStyle = corCobrinha;
        contexto.fillRect(cobrinha[i].x, cobrinha[i].y, caixa, caixa);
    }
}

function definirMovimentoCobrinha() {
    let cobrinhaX = cobrinha[0].x;
    let cobrinhaY = cobrinha[0].y;

    switch(direcao) {
        case "direita":
            cobrinhaX += caixa;
            break;
        case "esquerda":
            cobrinhaX -= caixa;
            break;
        case "cima":
            cobrinhaY -= caixa;
            break;
        case "baixo":
            cobrinhaY += caixa;
            break;
    }

    cobrinha.pop();

    let novaCabeca = {
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobrinha.unshift(novaCabeca);
}

function capturaComandosTeclado() {
    document.addEventListener("keydown", atualizarDirecao);
}

function atualizarDirecao(event) {
    switch(event.keyCode) {
        case 39:
        case 68:
            if (direcao == "esquerda") return;
            direcao = "direita";
            break;
        case 37:
        case 65:
            if (direcao == "direita") return;
            direcao = "esquerda";
            break;
        case 38:
        case 87:
            if (direcao == "baixo") return;
            direcao = "cima";
            break;
        case 40:
        case 83:
            if (direcao == "cima") return;
            direcao = "baixo";
            break;
    }
}

function repeticaoJogo() {
    if (cobrinha[0].x > (caixa/2 - 1) * caixa && direcao == "direita") cobrinha[0].x = 0;
    if (cobrinha[0].x < 0 && direcao == "esquerda") cobrinha[0].x = (caixa/2) * caixa;
    if (cobrinha[0].y > (caixa/2 - 1) * caixa && direcao == "cima") cobrinha[0].y = 0;
    if (cobrinha[0].y < 0 && direcao == "baixo") cobrinha[0].y = (caixa/2) * caixa;

    criarFundo();
    criarCobrinha();
    definirMovimentoCobrinha();
}

iniciarJogo();
capturaComandosTeclado();

let jogo = setInterval(repeticaoJogo, 100);