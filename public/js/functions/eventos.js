// const inputTitle = document.querySelector("[name='title']");
// const inputPrecio = document.querySelector("[name='price']");
// const inputDescription = document.querySelector("[name='description']");
// const inputChef = document.querySelector("[name='chef']");
// const inputsSection = document.querySelectorAll("[name='section']"); // []
// const inputAvailable = document.querySelector("[name='available']");
// const inputImagePrincipal = document.querySelector("[name='imagePrincipal']");
// const inputImageSecondary = document.querySelector("[name='imagesSecondary']");

/* EVENTOS DE MOUSE */
/* mouseover */
/* inputTitle.onmouseover = function() {

} */

// inputTitle.addEventListener("mouseover", function () {
//   // inputTitle.style.border = "1px solid red";
//   // event.target.style.border = "1px solid red";
//   // this.style.border = "1px solid red";
//   this.classList.add("border-danger");
// });

// /* mouseout */
// inputTitle.addEventListener("mouseout", function () {
//   // this.style.border = "1px solid lightgrey"
//   this.classList.remove("border-danger");
// });

// /* EVENTOS DE TECLADO */
// const showLengthTitle = document.querySelector(".showLength-title");
// /* keydown */
// inputTitle.addEventListener("keydown", function() {
//   showLengthTitle.innerHTML = this.value.length + 1

//   console.log("Hola mundo")
// })

// /* keyup */
// inputTitle.addEventListener("keyup", function () {
//   const minLength = 5;
//   const maxLength = 100;

//   showLengthTitle.innerHTML = getMessage(this.value.length, maxLength);

//   // console.log("Hola mundo")
// });

// const getMessage = (length, limitInput) => `${length} de ${limitInput}`;

// /* keypress */
// const showLengthDescription = document.querySelector(".showLength-description")

// inputDescription.addEventListener("keypress",function() {
//   const minLength = 30;
//   const maxLength = 500;

//   showLengthDescription.innerHTML = getMessage(this.value.length + 1, maxLength)

//   // console.log("Hola mundo")
// })

const inputTitle = document.querySelector("[name='title']");
const inputPrecio = document.querySelector("[name='price']");
const inputDescription = document.querySelector("[name='description']");
const inputChef = document.querySelector("[name='chef']");
const inputsSection = document.querySelectorAll("[name='section']"); // []
const inputAvailable = document.querySelector("[name='available']");
const inputImagePrincipal = document.querySelector("[name='imagePrincipal']");
const inputImageSecondary = document.querySelector("[name='imagesSecondary']");

/* EVENTOS DE FORMULARIO */
/* focus */



window.addEventListener("load", () => {
  let existError = true;
  const errTitle = document.querySelector(".error-title");
  /* blur */

  /* INPUT TITLE */
  inputTitle.addEventListener("blur", function () {
    const value = this.value.trim();
    const exRegAlfanumeric = /^([A-Z]|[a-z]){4}\s\d{6}\s\d/;

    switch (true) {
      case value.length === 0:
        errTitle.innerHTML = "El titulo es requerido";
        this.classList.add("is-invalid");
        break;

      case value.length < 5 || value.length > 100:
        errTitle.innerHTML = "El titulo debe tener un mínimo de 5 caracteres";
        this.classList.add("is-invalid");
        break;

      case exRegAlfanumeric.test(value):
        errTitle.innerHTML = "El titulo debe ser alfanumérico";
        this.classList.add("is-invalid");
        break;

      default:
        errTitle.innerHTML = null;
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
        existError = false;
        break;
    }
  });

  inputTitle.addEventListener("focus", function() {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    errTitle.innerHTML = null;
  })



  inputChef.addEventListener("change", async function() {

    const optionSelected = this.options[this.selectedIndex]
    console.log(optionSelected.value, optionSelected.textContent)

    const data = await fetch(
      "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
    ).then((res) => res.json());

    console.log(data)
  })




  /* FORMULARIO */
  const formCreate = document.querySelector("#form-create-product");

  formCreate.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("haciendo click");

    if(!existError) {
      this.submit();
    }

  });
});

/* change */
/* submit */
