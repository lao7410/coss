document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
    loadRecipes();

    document.getElementById('loadMoreProducts').addEventListener('click', loadMoreProducts);
    document.getElementById('showLessProducts').addEventListener('click', showLessProducts);
    document.getElementById('loadMoreRecipes').addEventListener('click', loadMoreRecipes);
    document.getElementById('showLessRecipes').addEventListener('click', showLessRecipes);
});

let productsLoaded = 0;
let recipesLoaded = 0;

function loadProducts() {
    console.log('Cargando productos...');
    fetch('json/products.json')
        .then(response => response.json())
        .then(products => {
            console.log('Productos cargados:', products);
            const productRow = document.querySelector('#productRow');

            if (productRow) {
                productRow.innerHTML = ''; // Clear previous content
                products.slice(0, 3).forEach(product => {
                    const productBox = document.createElement('div');
                    productBox.classList.add('product-box');
                    productBox.innerHTML = `
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    `;
                    productRow.appendChild(productBox);
                });
                productsLoaded = 3;
            } else {
                console.error('Error: Elemento productRow no encontrado.');
            }
        })
        .catch(error => console.error('Error loading products:', error));
}


function loadMoreProducts() {
    fetch('json/products.json')
        .then(response => response.json())
        .then(products => {
            const productRow = document.querySelector('#productRow');

            const additionalProducts = products.slice(productsLoaded, productsLoaded + 3);
            additionalProducts.forEach(product => {
                const productBox = document.createElement('div');
                productBox.classList.add('product-box');
                productBox.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                `;
                productRow.appendChild(productBox);
            });
            productsLoaded += additionalProducts.length;
            document.getElementById('showLessProducts').style.display = 'block';
            if (productsLoaded >= products.length) {
                document.getElementById('loadMoreProducts').style.display = 'none';
            }
        })
        .catch(error => console.error('Error loading more products:', error));
}

function showLessProducts() {
    const productRow = document.querySelector('#productRow');

    while (productRow.childElementCount > 3) {
        productRow.removeChild(productRow.lastChild);
    }
    productsLoaded = 3;
    document.getElementById('showLessProducts').style.display = 'none';
    document.getElementById('loadMoreProducts').style.display = 'block';
}

function loadRecipes() {
    fetch('json/recipes.json')
        .then(response => response.json())
        .then(recipes => {
            const recipeRow = document.querySelector('#recetas .row');
            recipeRow.innerHTML = ''; // Clear previous content
            recipes.slice(0, 3).forEach(recipe => {
                const recipeBox = document.createElement('div');
                recipeBox.classList.add('recipe-box');
                recipeBox.innerHTML = `
                    <img src="${recipe.img}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                `;
                recipeBox.addEventListener('click', () => showRecipeContent(recipe));
                recipeRow.appendChild(recipeBox);
            });
            recipesLoaded = 3;
        })
        .catch(error => console.error('Error loading recipes:', error));
}

function loadMoreRecipes() {
    fetch('json/recipes.json')
        .then(response => response.json())
        .then(recipes => {
            const recipeRow = document.querySelector('#recetas .row');
            const additionalRecipes = recipes.slice(recipesLoaded, recipesLoaded + 3);
            additionalRecipes.forEach(recipe => {
                const recipeBox = document.createElement('div');
                recipeBox.classList.add('recipe-box');
                recipeBox.innerHTML = `
                    <img src="${recipe.img}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                `;
                recipeBox.addEventListener('click', () => showRecipeContent(recipe));
                recipeRow.appendChild(recipeBox);
            });
            recipesLoaded += additionalRecipes.length;
            document.getElementById('showLessRecipes').style.display = 'block';
            if (recipesLoaded >= recipes.length) {
                document.getElementById('loadMoreRecipes').style.display = 'none';
            }
        })
        .catch(error => console.error('Error loading more recipes:', error));
}

function showLessRecipes() {
    const recipeRow = document.querySelector('#recetas .row');
    while (recipeRow.childElementCount > 3) {
        recipeRow.removeChild(recipeRow.lastChild);
    }
    recipesLoaded = 3;
    document.getElementById('showLessRecipes').style.display = 'none';
    document.getElementById('loadMoreRecipes').style.display = 'block';
}

function showRecipeContent(recipe) {
    // Crear el modal y su contenido
    var modal = document.createElement("div");
    modal.classList.add("modal");

    var modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    var closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    var recipeTitle = document.createElement("h2");
    recipeTitle.textContent = recipe.title;

    var recipeImage = document.createElement("img");
    recipeImage.src = recipe.img; // Ruta de la imagen
    recipeImage.alt = recipe.title;

    var recipeDescription = document.createElement("p");
    recipeDescription.textContent = recipe.description;

    var recipeContent = document.createElement("p");
    recipeContent.textContent = recipe.content;

    // Agregar los elementos al modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(recipeTitle);
    modalContent.appendChild(recipeImage);
    modalContent.appendChild(recipeDescription);
    modalContent.appendChild(recipeContent);
    modal.appendChild(modalContent);

    // Mostrar el modal en la página
    document.body.appendChild(modal);
    modal.style.display = "block";

    // Función para cerrar el modal al hacer clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

