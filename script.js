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

    aleatorizarComida();
    capturaComandosTeclado();
}

function criarFundo() {
    contexto.fillStyle = corFundo;
    contexto.fillRect(0, 0, (caixa/2) * caixa, (caixa/2) * caixa);
}

function criarCobra() {
    for(i = 0; i < cobra.length; i++) {
        contexto.fillStyle = corCobra;
        contexto.fillRect(cobra[i].x, cobra[i].y, caixa, caixa);
    }
}

function aleatorizarComida() {
    comidas[0] = {
        x: Math.floor(Math.random() * (caixa/2)) * caixa,
        y: Math.floor(Math.random() * (caixa/2)) * caixa
    }
}

function criarComida() {
    for(i = 0; i < comidas.length; i++) {
        contexto.fillStyle = corComida;
        contexto.fillRect(comidas[i].x, comidas[i].y, caixa, caixa);
    }
}

function definirMovimentoCobra() {
    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    switch(direcao) {
        case "direita":
            cobraX += caixa;
            break;
        case "esquerda":
            cobraX -= caixa;
            break;
        case "cima":
            cobraY -= caixa;
            break;
        case "baixo":
            cobraY += caixa;
            break;
    }

    if (cobraX != comidas[0].x || cobraY != comidas[0].y) {
        cobra.pop();
    } else {
        comidas.pop();
        
        aleatorizarComida();
    }

    let novaCabeca = {
        x: cobraX,
        y: cobraY
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

function definirNaoColisaoCobraCaixa() {
    if (cobra[0].x > (caixa/2 - 1) * caixa && direcao == "direita") cobra[0].x = 0;
    if (cobra[0].x < 0 && direcao == "esquerda") cobra[0].x = (caixa/2) * caixa;
    if (cobra[0].y < 0 && direcao == "cima") cobra[0].y = (caixa/2) * caixa;
    if (cobra[0].y > (caixa/2 - 1) * caixa && direcao == "baixo") cobra[0].y = 0;
}

function verificarColisao() {
    for(i = 1; i < cobra.length; i++) {
        if (cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y) {
            clearInterval(jogo);
            alert("Você perdeu! :(");

            return true;
        }
    }
}

function repeticaoJogo() {
    if (verificarColisao()) return;

    definirNaoColisaoCobraCaixa();
    criarFundo();
    criarCobra();
    criarComida();
    definirMovimentoCobra();
}

iniciarJogo();

let jogo = setInterval(repeticaoJogo, 100);