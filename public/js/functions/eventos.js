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

  /* VALIDATION INPUT TITLE */
  inputTitle.addEventListener("blur", function () {
    const value = this.value.trim();
    const exRegAlfanumeric = /^[a-zA-Z0-9\s]*$/;

    switch (true) {
      case value.length === 0:
        errTitle.innerHTML = "El titulo es requerido";
        this.classList.add("is-invalid");
        break;

      case value.length < 5 || value.length > 100:
        errTitle.innerHTML = "El titulo debe tener un mínimo de 5 caracteres";
        this.classList.add("is-invalid");
        break;

      case !exRegAlfanumeric.test(value):
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

  inputTitle.addEventListener("focus", function () {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    errTitle.innerHTML = null;
  });
  /* END VALIDATION INPUT TITLE */

  /* VALIDATION INPUT PRICE */

  const errPrice = document.querySelector(".error-price");
  inputPrecio.addEventListener("blur", function () {
    switch (true) {
      case this.value.length === 0:
        errPrice.innerHTML = "El precio es requerido";
        this.classList.add("is-invalid");
        break;
      case isNaN(this.value):
        errPrice.innerHTML = "El precio debe ser numérico";
        this.classList.add("is-invalid");
        break;
      case +this.value < 0:
        errPrice.innerHTML = "El precio debe tener un valor positivo";
        this.classList.add("is-invalid");
        break;
      default:
        errPrice.innerHTML = null;
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
        existError = false;
        break;
    }
  });

  inputPrecio.addEventListener("focus", function () {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    errPrice.innerHTML = null;
  });
  /* END VALIDATION INPUT PRICE */

  /* VALIDATION INPUT DESCRIPTION */
  const errDescription = document.querySelector(".error-description");
  inputDescription.addEventListener("blur", function () {
    const value = this.value.trim();
    const exRegAlfanumeric = /^[a-zA-Z0-9\s]*$/;

    switch (true) {
      case value.length === 0:
        errDescription.innerHTML = "La descripción es requerido";
        this.classList.add("is-invalid");
        break;

      case !exRegAlfanumeric.test(value):
        errDescription.innerHTML = "La descripción debe ser alfanumérico";
        this.classList.add("is-invalid");
        break;

      case value.length < 30 || value.length > 500:
        errDescription.innerHTML =
          "La descripción debe tener un mínimo de 30 y un máximo de 500 caracteres";
        this.classList.add("is-invalid");
        break;

      default:
        errDescription.innerHTML = null;
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
        existError = false;
        break;
    }
  });

  inputDescription.addEventListener("focus", function () {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    errDescription.innerHTML = null;
  });
  /* END VALIDATION INPUT DESCRIPTION */

  /* VALIDATION INPUT CHEF */
  const errChef = document.querySelector(".error-chef");
  inputChef.addEventListener("blur", function () {
    if (!this.options[this.selectedIndex].value) {
      errChef.innerHTML = "El chef es requerido";
      this.classList.add("is-invalid");
    } else {
      errChef.innerHTML = null;
      this.classList.add("is-valid");
      this.classList.remove("is-invalid");
      existError = false;
    }
  });
  /* END VALIDATION INPUT CHEF */


  /* VALIDATION INPUT IMAGE PRINCIPAL */
  const errImgPrincipal = document.querySelector(".err-img-principal");
  inputImagePrincipal.addEventListener("change", function () {
    const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
    const files = Array.from(this.files);

    switch (true) {
      case !files.length:
        errImgPrincipal.innerHTML = "Debes ingresar una imagen principal";
        this.classList.add("is-invalid");
        break;

      case files.length > 1:
        errImgPrincipal.innerHTML = "No puedes ingresar mas de 1 archivo";
        this.classList.add("is-invalid");
        break;

      case files.some(file => !regExpFiles.test(file.name)):
        errImgPrincipal.innerHTML = "El formato de la imagen principal es invalido";
        this.classList.add("is-invalid");
        break;
    
      default:
        errImgPrincipal.innerHTML = null;
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
        existError = false;
        break;
    }
  })

  inputImagePrincipal.addEventListener("blur", function () {
    const files = Array.from(this.files);

    switch (true) {
      case !files.length:
        errImgPrincipal.innerHTML = "Debes ingresar una imagen principal";
        this.classList.add("is-invalid");
        break;
      default:
        errImgPrincipal.innerHTML = null;
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
        existError = false;
        break;
    }
  })
  /* END VALIDATION INPUT IMAGE PRINCIPAL */

  /* VALIDATION INPUT IMAGE SECONDARY */
  const errImgSecondary = document.querySelector(".err-img-secondary");
  inputImageSecondary.addEventListener("change", function () {
    const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
    const files = Array.from(this.files);
    switch (true) {
      case !files.length:
        errImgSecondary.innerHTML = "Debes ingresar imágenes secundarias";
        this.classList.add("is-invalid");
        break;

      case files.length > 3:
        errImgSecondary.innerHTML = "No puedes ingresar mas de 3 archivos";
        this.classList.add("is-invalid");
        break;

      case files.some(file => !regExpFiles.test(file.name)):
        errImgSecondary.innerHTML = "Uno de los archivos son inválidos. Formatos validos: .png .jpg .jpeg .webp .gif";
        this.classList.add("is-invalid");
        break;
    
      default:
        errImgSecondary.innerHTML = null;
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
        existError = false;
        break;
    }
  })

  
  inputImageSecondary.addEventListener("blur", function () {
  const files = Array.from(this.files);

  switch (true) {
    case !files.length:
      errImgSecondary.innerHTML = "Debes ingresar una imagen principal";
      this.classList.add("is-invalid");
      break;
    default:
      errImgSecondary.innerHTML = null;
      this.classList.add("is-valid");
      this.classList.remove("is-invalid");
      existError = false;
      break;
  }
})
  /* END VALIDATION INPUT IMAGE SECONDARY */

  /* FORMULARIO */
  const formCreate = document.querySelector("#form-create-product");
  const errFormGeneral = document.querySelector(".err-form-general");
  const fieldsRequired = document.querySelectorAll(".field-required");
  formCreate.addEventListener("submit", function (event) {
    const isTitle = inputTitle.value?.trim();
    const isPrecio = inputPrecio.value?.trim();
    const isDescription = inputDescription.value?.trim();
    const isChef = inputChef.options[inputChef.selectedIndex].value?.trim();
    const isImagePrincipal = inputImagePrincipal.files.length;
    const isImageSecondary = inputImageSecondary.files.length;
    event.preventDefault();

    switch (true) {
      case !isTitle:
      case !isPrecio:
      case !isDescription:
      case !isChef:
      case !isImagePrincipal:
      case !isImageSecondary:
        existError = true;
        errFormGeneral.innerHTML = "Todos los campos son requeridos";
        errFormGeneral.classList.add("alert","alert-danger");
        fieldsRequired.forEach(field => {
          field.innerHTML = "*";
        });
        break;
    }

    if (!existError) {
      this.submit();
    }
  });
});

/* change */
/* submit */
