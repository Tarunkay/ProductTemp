document.getElementById('adminForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('imageUrl').value; 
    
    const product = {
        name: name,
        category: category,
        price: price,
        image: imageUrl 
    };

    let cakes = JSON.parse(localStorage.getItem('cakes')) || [];
    let cupcakes = JSON.parse(localStorage.getItem('cupcakes')) || [];
    let donuts = JSON.parse(localStorage.getItem('donuts')) || [];
    let allItems = JSON.parse(localStorage.getItem('allItems')) || [];

    const isDuplicate = allItems.some(item => item.name === name && item.image === imageUrl);   

        if (isDuplicate) {
            alert('Item already exists.');
            return;
        }

        const validImageExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
        const isImageValid = validImageExtensions.some(ext => imageUrl.toLowerCase().endsWith(ext));
    
        if (!isImageValid) {
            alert('Please enter a valid image URL (allowed formats: .jpg, .jpeg, .png, .svg).');
            return;
        }

    if (category.toLowerCase() === 'cakes') {
        cakes.push(product);
        localStorage.setItem('cakes', JSON.stringify(cakes));
    } else if (category.toLowerCase() === 'cupcakes') {
        cupcakes.push(product);
        localStorage.setItem('cupcakes', JSON.stringify(cupcakes));
    } else if (category.toLowerCase() === 'donuts') {
        donuts.push(product);
        localStorage.setItem('donuts', JSON.stringify(donuts));
    } else {
        alert('Unknown category! Please use "cakes", "cupcakes", or "donuts".');
        return;
    }

    allItems.push(product);
    localStorage.setItem('allItems', JSON.stringify(allItems));

    document.getElementById('adminForm').reset();

    alert('Product saved to the appropriate category and allItems in local storage!');
});

let allCategories = JSON.parse(localStorage.getItem('allItems')) || [];
console.log('All Categories:', allCategories);
