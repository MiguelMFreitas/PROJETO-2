const express = require("express"); // importa o módulo express neste arquivo
const app = express(); // iniciando o express

// função que monta uma página HTML com menu
function pagina(titulo, conteudo) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>${titulo}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 0 16px; }
        nav a { margin-right: 12px; }
    </style>
</head>
<body>
    <nav>
        <a href="/">Início</a>
        <a href="/produtos">Produtos</a>
        <a href="/sobre">Sobre</a>
        <a href="/contato">Contato</a>
    </nav>
    <h1>${titulo}</h1>
    ${conteudo}
</body>
</html>`;
}

// rota inicial
app.get("/", function (req, res) {
    res.send(pagina("Bem-vindo ao meu site projeto 2!", "<p>Projeto 2 - Desenvolvimento de Software em Nuvem.</p>"));
});

// rota da lista de produtos
app.get("/produtos", function (req, res) {
    res.send(pagina("Lista de Produtos", `
        <ul>
            <li>Notebook</li>
            <li>Mouse</li>
            <li>Teclado</li>
        </ul>`));
});

// rota sobre
app.get("/sobre", function (req, res) {
    res.send(pagina("Sobre", "<p>Aplicação Node.js no modelo request-response, publicada na AWS (EC2) e no Railway.</p>"));
});

// rota de contato
app.get("/contato", function (req, res) {
    res.send(pagina("Contato", "<p>Aluno: Miguel Martins Freitas</p>"));
});

// rota com parâmetro
app.get("/consulta/:parametro", function (req, res) {
    // req --> dados enviados pelo cliente
    // res --> resposta enviada pelo servidor de volta ao cliente
    res.send(pagina("Consulta", "<p>Retorno da consulta: " + req.params.parametro + "</p>"));
});

// rota com parâmetro opcional
app.get("/cadastro/{:nome}", function (req, res) {
    var nome = req.params.nome;
    if (nome) {
        res.send(pagina("Cadastro", "<p>Produto " + nome + " criado!</p>"));
    } else {
        res.send(pagina("Cadastro", "<p>Produto criado!</p>"));
    }
});

// inicia o servidor na porta definida pela nuvem ou na 3000
app.listen(process.env.PORT ?? 3000, function (erro) {
    if (erro) {
        console.log("Erro ao iniciar.");
    } else {
        console.log("Servidor iniciado.");
    }
});
