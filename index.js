const container = document.getElementById("products")
const query = document.getElementById("query");

const renderProducts = (data) => {
    let products = ""
    data.forEach(element => {
        products += 
        `<div class="product">
            <div class="product-img" style="background-image: url('images/products/${element.img}');"></div>
            <p class="product-name">${element.name}</p>
        </div>`
    })
    container.innerHTML = products
    resizeGrid()
}
const filterData = (data) => {
    return data.filter(product => product.name.toLowerCase().includes(query.value.toLowerCase()))
}
const rerender = () => {
    fetch("products.json")
        .then(response => response.json())
        .then(data => renderProducts(filterData(data)))
}
rerender()



const resizeGrid = () => {
    if (!container.childElementCount)return;
    const gap = +getComputedStyle(container).gap.slice(0, -2);
    const childWidth = +getComputedStyle(container.children[0]).minWidth.slice(0, -2);
    const perChild = childWidth + gap;
    const columns = Math.floor(container.getBoundingClientRect().width / perChild);
    container.style.gridTemplateColumns = `repeat(${Math.min(columns, container.childElementCount)}, 1fr)`
}
window.addEventListener('resize', (e) => resizeGrid())
query.addEventListener("change", (e) => rerender())