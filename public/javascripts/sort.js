const filterText = function (id) {
  let select = document.getElementById(`${id}`);
  let option = select.value;
  let divs = document.querySelectorAll(".result");
  console.log(divs);
  divs.forEach((div) => {
    if (option === "All") {
      console.log(option);
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
