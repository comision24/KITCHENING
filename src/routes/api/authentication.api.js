const router = require("express").Router();
const {} = require("../../controllers/api/authentication");

module.exports = router;

const fetch = require("node-fetch");
fetch("https://api.pexels.com/v1/search?query=animales", {
  headers: {
    Authorization: "563492ad6f91700001000001633879f2e9d243bf95c92cc6634bf19e",
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
