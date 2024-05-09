/* const inputEmail = document.querySelector("#email")

const listInputs = document.querySelectorAll(".form-control")

console.log(listInputs)

listInputs.forEach(inp => {
  inp.value = "Hola comisión"
})

const listInputArr = Array.from(listInputs) */

// const inputPass = document.querySelector(".input-password");
// const inputPass3 = document.querySelector("input"); // no captura el input password sino el primer elemento que es "email"
// const inputPass4 = document.querySelector("[type='password']");

const inputPass2 = document.querySelector("#contrasenia");
const btnEye = document.querySelector("#btn-eye");

const lblRemember = document.querySelector(".lbl-rememberr");
/* 
textContent
innerText
innerHTML
*/

// lblRemember.innerText += " Remember";
// lblRemember.innerHTML += " <span class='text-danger'>Remember</span>";
// lblRemember.textContent += " 🔜";

// lblRemember.style.color = "rgb(0,0,255)";
// lblRemember.style.color = "blue";
/* lblRemember.style.color = "#0000FF";
lblRemember.style.width = "200%";
lblRemember.style.textAlign = "center";
*/

// lblRemember.classList.add("active")
lblRemember.style.backgroundColor = "rgba(200,200,200,.5)";

// lblRemember.classList.remove("active", "lbl-remember");

// lblRemember.classList.toggle("active");

// console.log(lblRemember.classList.contains("active"));

// window.onload = function() {
//   const inputs = document.querySelectorAll("input")

//   inputs.forEach(input => {
//     // input.style.border = "px solid pink"
//     input.classList.add("active")
//   })
// }

// btnEye.onclick = function() {

// }

window.addEventListener("load", () => {
  const inputPass2 = document.querySelector("#contrasenia");
  const btnEye = document.querySelector("#btn-eye");
  const iconEye = document.querySelector("#icon-eye");

  btnEye.addEventListener("click", (event) => {
    const isActive = iconEye.classList.contains("fa-eye-slash");
    if (isActive) {
      /*  iconEye.classList.remove("fa-eye-slash")
      iconEye.classList.add("fa-eye") */
      inputPass2.type = "password";
    } else {
      /* iconEye.classList.add("fa-eye-slash")
      iconEye.classList.remove("fa-eye") */
      inputPass2.type = "text";
    }
    iconEye.classList.toggle("fa-eye");
    iconEye.classList.toggle("fa-eye-slash");
  });

  const linkProducts = document.querySelector("#link-products");

  linkProducts.addEventListener("click", (event) => {
    event.preventDefault();

    const btn = document.querySelector("body")
    console.log(btn)

    setTimeout(() => {
      window.location.href = "http://localhost:3030/productos";
    }, 2000);
    
  });

});
