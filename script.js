let tela = document.getElementById("tela");
let contexto = tela.getContext("2d");
let caixa = 32;
let cobra = [];
let comidas = [];
let direcao = "direita";
let corFundo = "lightgreen";
let corCobra = "green";
let corComida = "red";

function iniciarJogo() {
    cobra[0] = {
        x: (caixa/4) * caixa,
        y: (caixa/4) * caixa
    }

    comidas[0] = {
        x: Math.floor(Math.random() * (caixa/2)) * caixa,
        y: Math.floor(Math.random() * (caixa/2)) * caixa
    }
}

function criarFundo() {
    contexto.fillStyle = corFundo;
    contexto.fillRect(0, 0, (caixa/2) * caixa, (caixa/2) * caixa);
}

function criarCobrinha() {
    for(i = 0; i < cobra.length; i++) {
        contexto.fillStyle = corCobra;
        contexto.fillRect(cobra[i].x, cobra[i].y, caixa, caixa);
    }
}

function criarComida() {
    for(i = 0; i < comidas.length; i++) {
        contexto.fillStyle = corComida;
        contexto.fillRect(comidas[i].x, comidas[i].y, caixa, caixa);
    }
}

function definirMovimentoCobrinha() {
    let cobrinhaX = cobra[0].x;
    let cobrinhaY = cobra[0].y;

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

    cobra.pop();

    let novaCabeca = {
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobra.unshift(novaCabeca);
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
    if (cobra[0].x > (caixa/2 - 1) * caixa && direcao == "direita") cobra[0].x = 0;
    if (cobra[0].x < 0 && direcao == "esquerda") cobra[0].x = (caixa/2) * caixa;
    if (cobra[0].y > (caixa/2 - 1) * caixa && direcao == "cima") cobra[0].y = 0;
    if (cobra[0].y < 0 && direcao == "baixo") cobra[0].y = (caixa/2) * caixa;

    criarFundo();
    criarCobrinha();
    criarComida();
    definirMovimentoCobrinha();
}

iniciarJogo();
capturaComandosTeclado();

let jogo = setInterval(repeticaoJogo, 100);