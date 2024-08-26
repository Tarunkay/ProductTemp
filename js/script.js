document.addEventListener('DOMContentLoaded', function() {
    const allItems = JSON.parse(localStorage.getItem('allItems')) || [];
    const itemContainer = document.getElementById('item-container');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderItems(items) {
        itemContainer.innerHTML = ''; 
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Category: ${item.category}</p>
                <p>Price: $${item.price}</p>
                <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
            `;
            itemContainer.appendChild(itemCard);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                addToCart(name, price);
            });
        });
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalElement.textContent = total.toFixed(2);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = itemCount;
    }

    function clearCart() {
        cart = [];
        localStorage.removeItem('cart');
        updateCartTotal();
    }

    renderItems(allItems);
    updateCartTotal();

    document.querySelectorAll('nav ul li a').forEach(navLink => {
        navLink.addEventListener('click', function(event) {
            event.preventDefault();
            const filter = this.getAttribute('data-filter');

            if (filter === 'all') {
                renderItems(allItems);
            } else {
                const filteredItems = allItems.filter(item => item.category.toLowerCase() === filter);
                renderItems(filteredItems);
            }
        });
    });

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();

        if (searchTerm.length >= 3) {
            const filteredItems = allItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
            renderItems(filteredItems);
        } else {
            renderItems(allItems);
        }
    });

    document.getElementById('clear-cart').addEventListener('click', clearCart);
});
