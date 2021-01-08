
document.addEventListener('DOMContentLoaded', ev => {
  localStorage.clear();
})

const filterText = id => {

  let select = document.getElementById(id);
  let option = select.value;

  if (id === 'expertiseSelect') {
    localStorage.setItem('expertiseSort', option);
  } else {
    localStorage.setItem('topicSort', option);
  }

  let localTopic = localStorage.getItem('topicSort');
  let localExpertise = localStorage.getItem('expertiseSort');

  if (!localTopic) localStorage.setItem('topicSort', 'All');
  if (!localExpertise) localStorage.setItem('expertiseSort', 'All');

  localTopic = localStorage.getItem('topicSort');
  localExpertise = localStorage.getItem('expertiseSort');

  let divs = document.querySelectorAll(".result");

  divs.forEach((div) => {
    displayCombinator(localTopic, localExpertise, div);
  });
};

function displayCombinator(topic, expertise, div) {
  if (topic === 'All' && expertise === 'All') {
    div.style.display = 'inline';
  } else {
    if (topic === 'All' && expertise !== 'All') {
      if (div.classList.contains(expertise)) {
        div.style.display = "inline";
      } else {
        div.style.display = "none";
      }
    } else if (expertise === 'All' && topic !== 'All') {
      if (div.classList.contains(topic)) {
        div.style.display = "inline";
      } else {
        div.style.display = "none";
      }
    } else if (div.classList.contains(topic) && div.classList.contains(expertise)) {
      div.style.display = 'inline';
    } else {
      div.style.display = 'none';
    }
  }
}