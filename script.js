const container = document.getElementById("listaProdutos");
const contadorCarrinho = document.getElementById("contadorCarrinho");
const abrirCarrinho = document.getElementById("abrirCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const painelCarrinho = document.getElementById("painelCarrinho");
const finalizarPedido = document.getElementById("finalizarPedido");

const carrinho = JSON.parse(
    localStorage.getItem("carrinho")) || [
];

abrirCarrinho.addEventListener("click", () => {
    painelCarrinho.classList.toggle("ativo")
});

fecharCarrinho.addEventListener("click", () => {
    painelCarrinho.classList.remove("ativo")
});

function salvarCarrinho(){
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    )
}

function criarCards(produto){
    return `
    <div class="card">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarCarrinho(${produto.id})">
    Comprar
</button>
    </div>
    `;

}

function adicionarCarrinho(id){
    const produtoSelecionado = produtos.find(
        produto => produto.id === id);

    carrinho.push(produtoSelecionado);
    salvarCarrinho();

    contadorCarrinho.textContent = carrinho.length;

    atualizarCarrinho();

    alert(`${produtoSelecionado.nome} adicionado ao carrinho!`);

}

function removerCarrinho(index){
    carrinho.splice(index, 1);
    salvarCarrinho();

    contadorCarrinho.textContent = carrinho.length;

    atualizarCarrinho();
}

function atualizarCarrinho(){
    const itensCarrinho = document.getElementById("itensCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");

    itensCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach((produto, index) => {
        itensCarrinho.innerHTML +=`
        <div class="item-carrinho">
        <p>${produto.nome}</p>
            <button class="btn btn-remover" onclick="removerCarrinho(${index})">
        Remover
        </button>
        </div>
        `;
        total += produto.preco;
    }
    )
    totalCarrinho.textContent = total.toFixed(2);
}


produtos.forEach(produto => {
    container.innerHTML += criarCards(produto);
    
});

contadorCarrinho.textContent = carrinho.length;
atualizarCarrinho();

finalizarPedido.addEventListener("click", () => {

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "🛒 *Novo Pedido*%0A%0A";

    carrinho.forEach(produto => {
        mensagem += `• ${produto.nome} - R$ ${produto.preco}%0A`;
    });

    const total = carrinho.reduce(
        (soma, produto) => soma + produto.preco,
        0
    );

    mensagem += `%0A💰 Total: R$ ${total.toFixed(2)}`;

    window.open(
        `https://wa.me/5535991034070?text=${mensagem}`,
        "_blank"
    );

    carrinho.length = 0;
    localStorage.removeItem("carrinho");
    contadorCarrinho.textContent = 0;
    atualizarCarrinho();
});
