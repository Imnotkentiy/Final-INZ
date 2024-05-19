const container = document.getElementById("products")
const query = document.getElementById("query");

const renderProducts = (products) => {
    let innerHTML = ""
    products.forEach(product => {
        innerHTML += `
        <div class="product">
            <div class="info">
                <div class="product-img" style="background-image: url('images/products/${product.img}');"></div>
                <h4 class="product-name">${product.name}</h4>
                <p>${product.desc}</p>
            </div>
            <div class="buttons">
                <span>${product.price}$</span>
                <button onclick="window.location = 'product.html?id=${product.id}'">See more</button>
            </div>
        </div>
        `
    })
    container.innerHTML = innerHTML
    resizeGrid()
}
const filterProducts = (products) => {
    return products.filter(product => product.name.toLowerCase().includes(query.value.toLowerCase()))
}
const rerender = () => {
    fetch("products.json")
        .then(response => response.json())
        .then(data => renderProducts(filterProducts(data)))
}
rerender()



const resizeGrid = () => {
    if (!container.childElementCount)return;
    const gap = +getComputedStyle(container).gap.slice(0, -2);
    const childWidth = +getComputedStyle(container.children[0]).minWidth.slice(0, -2);
    const perChild = childWidth + gap;
    const columns = Math.floor(container.getBoundingClientRect().width / perChild);
    console.log(columns, container.childElementCount);
    console.log(container)
    container.style.gridTemplateColumns = `repeat(${Math.min(columns, container.childElementCount)}, 1fr)`
}
window.addEventListener('resize', (e) => resizeGrid())
query.addEventListener("change", (e) => rerender())