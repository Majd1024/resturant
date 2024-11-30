document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');
    const cartIcon = document.querySelector('.cart-icon');
    const cartPanel = document.querySelector('.cart-panel');
    const closeCartButton = document.querySelector('.close-cart');
    const cartCount = document.getElementById('cart-count');
    const payButton = document.getElementById('pay-button');
  
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
    
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(li);
            total += item.price;
        });
    
        totalElement.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    
        // Attach event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                cart.splice(index, 1); // Remove the item from the cart
                updateCart(); // Re-render the cart
            });
        });
    }
  
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const id = product.dataset.id;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);
    
            cart.push({ id, name, price });
            updateCart();
        });
    });
  
    cartIcon.addEventListener('click', () => {
        cartPanel.classList.add('active'); // Slide the cart panel in
    });
  
    closeCartButton.addEventListener('click', () => {
        cartPanel.classList.remove('active'); // Slide the cart panel out
    });
  
    payButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        const totalAmount = totalElement.textContent;
        alert(`Redirecting to payment. Total: $${totalAmount}`);
        window.location.href = 'payment.html'; // Redirect to payment page
    });
});


