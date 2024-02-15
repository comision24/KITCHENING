module.exports = (req, res) => {
  const banner = ["img-banner.jpg", "img-banner-2.jpg"];
  res.render("home", { 
    bannerImages: banner
  });
};
