var database = require("../database/config");

function listar() {

    var instrucaoSql = `
        select 
livro.id,
livro.titulo,
livro.precoCompra,
livro.precoVenda,
livro.quantidade,
autor.nome as nomeAutor,
genero.nome as nomeGenero
 from livro join autor on autor.id = livro.fkAutor join genero on genero.id = livro.fkGenero;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function cadastrar(titulo, fkAutor, fkGenero, precoCompra, precoVenda, quantidade) {

    var instrucaoSql = `
        INSERT INTO livro (titulo, fkAutor, fkGenero, precoCompra, precoVenda, quantidade) VALUES ('${titulo}', '${fkAutor}', '${fkGenero}', '${precoCompra}', '${precoVenda}', '${quantidade}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(novoPrecoCompra, novoPrecoVenda, id) {

    var instrucaoSql = `
        UPDATE livro 
        SET precoCompra = '${novoPrecoCompra}', 
            precoVenda = '${novoPrecoVenda}'
        WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function qtdLivrosCategoria() {

    var instrucaoSql = `
        SELECT genero.nome AS categoria, COUNT(livro.id) AS quantidade
        FROM livro
        JOIN genero ON 
        livro.fkGenero = genero.id
        GROUP BY genero.id, genero.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function generoMaiorQtd() {

    var instrucaoSql = `
        SELECT genero.nome AS genero, COUNT(livro.id) AS quantidade
        FROM livro
        JOIN genero ON livro.fkGenero = genero.id
        GROUP BY genero.id, genero.nome
        ORDER BY quantidade DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autoresMaisCaros() {

    var instrucaoSql = `
        SELECT autor.nome AS autor, ROUND(AVG(livro.precoVenda), 2) AS precoMedio
        FROM livro
        JOIN autor ON livro.fkAutor = autor.id
        GROUP BY autor.id, autor.nome
        ORDER BY precoMedio DESC
        LIMIT 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    editar,
    qtdLivrosCategoria,
    generoMaiorQtd,
    autoresMaisCaros
}
