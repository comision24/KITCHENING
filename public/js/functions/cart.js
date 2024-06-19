const $ = (element) => document.querySelector(element);
const cutText = (text = "", long) => text.substring(0, long) + "...";
const converterMoneyArg = (num = 0) =>
  num.toLocaleString({
    currency: "ARS",
    style: "currency",
  });

const server = "http://localhost:3030";
let productsCart = [];

const getShoppingCart = (server) =>
  fetch(`${server}/api/cart?idUser=2`).then((res) => res.json());

const getCardStructure = (p) => {
  return `
    <div class="card col-12 col-lg-10 my-5">
      <div class="card-body row">
        <img class="col-4" style="object-fit: cover;"
          src="${p.imagePrincipal}" alt="">
        <div class="col-8 position-relative">
          <button class="fs-5 p-0 border-0 bg-transparent position-absolute text-danger "
            style="top:-3px;right:10px" onclick=""><i style="padding:2px"
              class="rounded-circle btn-clear far fa-times-circle"></i></button>

          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">${cutText(p.description, 70)}</p>
          <p class="d-flex align-items-center gap-2">
            <label for="">Cantidad </label>
            <button class="btn btn-light" onclick="lessProduct(${
              p.id
            })">-</button>
            <output style="width:50px" class="form-control text-center">
              ${p.orderproducts.quantity}
            </output>
            <button class="btn btn-light" onclick="moreProduct(${
              p.id
            })">+</button>
            <div class="d-flex justify-content-between">
              <span class="text-primary">$ ${converterMoneyArg(p.price)}</span>
              <a href="#" class="btn btn-outline-dark">Ver más</a>
            </div>
          </p>
        </div>
      </div>
    </div>
    `;
};

const paintCartsInView = (products = [], elementContainerProduct) => {
  elementContainerProduct.innerHTML = "";
  products.forEach((product) => {
    elementContainerProduct.innerHTML += getCardStructure(product);
  });
};

const processReloadCart = async (server, containerProducts, outputTotal) => {
  const {
    ok,
    data: {total ,products },
  } = await getShoppingCart(server);

  ok && (productsCart = products);

  paintCartsInView(productsCart, containerProducts);
  outputTotal.innerHTML = total
};

window.addEventListener("load", async (event) => {
  const containerProducts = $("#card-container");
  const btnClearCart = $("#clear-cart");
  const btnBuy = $("#btn-buy");
  const outputTotal = $("#show-total");
  try {
    processReloadCart(server, containerProducts, outputTotal);
  } catch (error) {
    console.error(error.message);
  }

  // Eliminar todos los productos del orden
  btnClearCart.addEventListener("click", async () => {
    try {

      const { ok, msg } = await fetch(`${server}/api/cart/clear?idUser=2`, {
        method: "PATCH",
      }).then((res) => res.json());

      if (ok) {
        processReloadCart(server, containerProducts);
      }

    } catch (error) {
      console.error(error.message);
    }
  });
});

// Disminuir un producto
const lessProduct = async (id) => {
  try {
    const containerProducts = $("#card-container");
    const outputTotal = $("#show-total");
    
    const { ok, msg } = await fetch(`${server}/api/cart/less/${id}?idUser=2`, {
      method: "PATCH",
    }).then((res) => res.json());

    if (ok) {
      processReloadCart(server, containerProducts, outputTotal);
    }
    // console.log({ok, msg})
  } catch (error) {
    console.error(error.message);
  }
};

// Aumentar un producto
const moreProduct = async (id) => {
  try {
    const containerProducts = $("#card-container");
    const outputTotal = $("#show-total");
    const { ok, msg } = await fetch(`${server}/api/cart/more/${id}?idUser=2`, {
      method: "PATCH",
    }).then((res) => res.json());

    if (ok) {
      processReloadCart(server, containerProducts, outputTotal);
    }
    // console.log({ok, msg})
  } catch (error) {
    console.error(error.message);
  }
};

const removeProductCart = async (id) => {

}
