const naviElements = document.querySelectorAll(".navigation-title");
const mobileMenuBtn = document.getElementById("mobile_menu_btn");
const mobileMenu = document.getElementsByClassName("menupanel__mobile");
const swipingMenuCategories = document.querySelectorAll(
  ".swiping-menu_category"
);
const swipeMenuDiv = document.querySelector(".swiping-menu");
const clacciscMenuCategories = document.querySelectorAll(
  ".classic-menu-category"
);

for (let i = 0; i < naviElements.length; i++) {
  naviElements[i].addEventListener("click", (e) => {
    if (naviElements[i].classList.contains("active-category")) {
      return;
    } else {
      swipeMenuDiv.classList.toggle("swiped");
    }
  });
}
for (let i = 0; i < naviElements.length; i++) {
  naviElements[i].addEventListener("click", (element) => {
    naviElements.forEach((e) => e.classList.remove("active-category"));
    naviElements[i].classList.add("active-category");
  });
}
for (let i = 0; i < swipingMenuCategories.length; i++) {
  swipingMenuCategories[i].addEventListener("click", (element) => {
    swipingMenuCategories.forEach((e) => e.classList.remove("active-li"));
    swipingMenuCategories[i].classList.add("active-li");
  });
}

for (let i = 0; i < clacciscMenuCategories.length; i++) {
  clacciscMenuCategories[i].addEventListener("click", (element) => {
    clacciscMenuCategories.forEach((e) => e.classList.remove("active-li"));
    clacciscMenuCategories[i].classList.add("active-li");
  });
}

const showMobileMenu = () => {
  mobileMenu[0].classList.toggle("mobileMenuHidden");
};

mobileMenuBtn.addEventListener("click", showMobileMenu);
