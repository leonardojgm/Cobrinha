let tela = document.getElementById("tela");
let contexto = tela.getContext("2d");
let caixa = 32;
let cobra = [];
let comidas = [];
let direcao = "direita";
let corFundo = "lightgreen";
let corCobra = "green";
let corComida = "red";
let pontos = 0;

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

function definirPonto() {
    pontos += 1;
    document.getElementById("pontos").innerHTML = pontos;
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

        definirPonto();
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

    document.getElementById("btn-cima").addEventListener("click", () => {
        if (direcao !== "baixo" && verificarPodeMudarDirecao("cima")) direcao = "cima";
    });
    document.getElementById("btn-baixo").addEventListener("click", () => {
        if (direcao !== "cima" && verificarPodeMudarDirecao("baixo")) direcao = "baixo";
    });
    document.getElementById("btn-esquerda").addEventListener("click", () => {
        if (direcao !== "direita" && verificarPodeMudarDirecao("esquerda")) direcao = "esquerda";
    });
    document.getElementById("btn-direita").addEventListener("click", () => {
        if (direcao !== "esquerda" && verificarPodeMudarDirecao("direita")) direcao = "direita";
    });
}

function verificarPodeMudarDirecao(novaDirecao) {
    let foraX = cobra[0].x < 0 || cobra[0].x >= caixa * (caixa/2);
    let foraY = cobra[0].y < 0 || cobra[0].y >= caixa * (caixa/2);

    if ((foraX && (novaDirecao === "cima" || novaDirecao === "baixo")) ||
        (foraY && (novaDirecao === "esquerda" || novaDirecao === "direita"))) {
        return false;
    }

    return true;
}

function atualizarDirecao(event) {
    switch(event.keyCode) {
        case 39:
        case 68:
            if (direcao == "esquerda" && verificarPodeMudarDirecao("direita")) return;
            direcao = "direita";
            break;
        case 37:
        case 65:
            if (direcao == "direita" && verificarPodeMudarDirecao("esquerda")) return;
            direcao = "esquerda";
            break;
        case 38:
        case 87:
            if (direcao == "baixo" && verificarPodeMudarDirecao("cima")) return;
            direcao = "cima";
            break;
        case 40:
        case 83:
            if (direcao == "cima" && verificarPodeMudarDirecao("baixo")) return;
            direcao = "baixo";
            break;
    }
}

function definirNaoColisaoCobraCaixa() {
    if (cobra[0].x > (caixa/2 - 1) * caixa) cobra[0].x = 0;
    else if (cobra[0].x < 0) cobra[0].x = (caixa/2) * caixa;

    if (cobra[0].y > (caixa/2 - 1) * caixa) cobra[0].y = 0;
    else if (cobra[0].y < 0) cobra[0].y = (caixa/2) * caixa;
}

function verificarColisao() {
    for(i = 1; i < cobra.length; i++) {
        if (cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y) {
            clearInterval(jogo);
            alert("Você perdeu! :(");
            document.location.reload();

            return true;
        }
    }
}

function repeticaoJogo() {
    if (verificarColisao()) return;

    definirMovimentoCobra();
    definirNaoColisaoCobraCaixa();
    criarFundo();
    criarCobra();
    criarComida();
}

iniciarJogo();

let jogo = setInterval(repeticaoJogo, 100);