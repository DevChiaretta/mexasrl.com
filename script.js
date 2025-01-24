// Array di prodotti (puoi spostarlo in un file JSON o simulare con un'API)
const products = [
  { id: 1, name: "Crema Anticellulite", price: 20 },
  { id: 2, name: "Crema Anti Age", price: 25 },
  { id: 3, name: "Bendaggi Anticellulite", price: 30 },
  { id: 4, name: "Tisana Drenante", price: 15 },
];

// Recupera il carrello da localStorage o inizializza un array vuoto
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funzione per aggiungere un prodotto al carrello
function addToCart(productId) {
  const product = products.find((p) => p.id === parseInt(productId));
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart)); // Salva il carrello in localStorage
    alert(`${product.name} è stato aggiunto al carrello!`);
  }
}

// Funzione per mostrare i prodotti nel carrello
function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.querySelector(".cart-container");

  if (cartItems.length === 0) {
    container.innerHTML = '<p>Il carrello è vuoto. Torna <a href="index.html">alla home</a> per aggiungere prodotti.</p>';
    document.getElementById("cart-total").textContent = "0";
    return;
  }

  let cartHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price; // Calcola il totale
    cartHTML += `
      <div class="cart-item">
        <img src="images/${item.name.toLowerCase().replace(/ /g, "-")}.jpg" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Prezzo: €${item.price}</p>
        <button onclick="removeFromCart(${index})">Rimuovi</button>
      </div>
    `;
  });

  container.innerHTML = cartHTML;
  document.getElementById("cart-total").textContent = total.toFixed(2); // Mostra il totale
}

// Funzione per rimuovere un prodotto dal carrello
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Rimuove il prodotto selezionato
  localStorage.setItem("cart", JSON.stringify(cart)); // Aggiorna localStorage
  displayCart(); // Ricarica il carrello
}

// Aggiungi evento "click" ai pulsanti "Acquista"
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-id");
    addToCart(productId);
    window.location.href = "checkout.html"; // Reindirizza alla pagina del carrello
  });
});

  