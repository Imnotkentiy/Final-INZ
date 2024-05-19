class Product{
    product = null;
    promise = null
    static async request(){
        if(this.promise)return;
        this.promise = (async() => {
            const response = await fetch("products.json")
            const data = await response.json();
            const filter = data.filter(product => product.id == id);
            if(!filter.length) window.location = "index.html";
            return filter[0];
        })();
        
    }
    static async get(){
        if(!this.product){
            this.product = await this.promise;
        }
        return this.product;
    }
}
Product.request();
const id = (+(new URLSearchParams(window.location.search).get("id"))) || -1;
const main = document.getElementById("main");
const popup = document.getElementById("popup")
const popupInfo = document.getElementById("popup-info")

Product.get().then(product =>
    document.title = product.name
)
Product.get().then(product =>
    main.innerHTML = `
    <div id="product">
        <div class="info">
            <div class="product-img full-img" style="background-image: url('images/products/${product.img}');"></div>
            <h4 class="product-name">${product.name}</h4>
            <p>${product.fullDesc}</p>
        </div>
        <div class="buttons">
            <span>${product.price}$</span>
            <button onclick="addToCart()">Add to cart</button>
        </div>
    </div>
    `
)

const addToCart = () => {
    popup.style.top = 0;
    Product.get().then(product => {
        popupInfo.innerHTML = `
        <h3>You added ${product.name} to cart</h3>
        <div class="buttons">
        <button onclick="closePopUp()">Close</button>
        <button onclick="window.location = 'index.html'">Go to home page</button>
        </div>
        `
    })
}
const closePopUp = () => {
    popup.style.top = "-100dvh";
}