const filterText = function (id) {
  let select = document.getElementById(id);
  let option = select.value;
  let divs = document.querySelectorAll(".result");

  divs.forEach((div) => {
    if (option === "All") {

      div.style.display = "inline";
      return;
    }
    if (!div.classList.contains(option)) {
      div.style.display = "none";
    } else {
      div.style.display = "inline";
    }
  });
};
