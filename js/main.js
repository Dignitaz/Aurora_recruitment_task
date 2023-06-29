const naviElements = document.querySelectorAll(".navigation-title");
const mobileMenuBtn = document.getElementById("mobile_menu_btn");
const mobileMenu = document.getElementsByClassName("menupanel__mobile");
for (let i = 0; i < naviElements.length; i++) {
  naviElements[i].addEventListener("click", (element) => {
    naviElements.forEach((e) => e.classList.remove("active-category"));
    naviElements[i].classList.add("active-category");
  });
}

const showMobileMenu = () => {
  mobileMenu[0].classList.toggle("mobileMenuHidden");
};

mobileMenuBtn.addEventListener("click", showMobileMenu);
