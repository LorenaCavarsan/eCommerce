// criar array para armazenar os produtos selecionados no carrinho 
const carrinho = []


// adicionar produto ao carrinho 
function adicionarAoCarrinho(nome, preco) {

    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    // se o ítem ja estiver na lista, então aumentar sua quantidade e preço 
    if (itemExistente) {
        itemExistente.quantidade += 1;

        // caso o produto não estiver na lista, adicionar um ítem novo
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    // evento para atualizar o carrinho 
    atualizarCarrinho();
}

// atualizar tabela do carrinho
function atualizarCarrinho() {
    const corpoTabela = document.querySelector("tbody");
    corpoTabela.innerHTML = "";    // limpa a tabela

    // passa por cada produto da lista salva no localStorage
    carrinho.forEach((item, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
            <td><button onclick="removerItem(${index})">Remover</button></td>
        `;

        corpoTabela.appendChild(linha);
    });
}

// remover item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// adiciona evento de click nos botões adicionar
const botoesAdicionar = document.querySelectorAll(".card button");

botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        const card = botao.closest(".card");
        const nome = card.querySelector("h2").textContent;
        const precoTexto = card.querySelector("p").textContent.replace("R$", "").replace(",", ".");
        const preco = parseFloat(precoTexto);

        adicionarAoCarrinho(nome, preco);
    });
});