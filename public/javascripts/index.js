// const { DELETE } = require("sequelize/types/lib/query-types")

console.log('hello from index.js************************')

window.addEventListener("DOMContentLoaded", (event) => {
    const trash = document.querySelectorAll('.trash')
    trash.forEach((can) => {
        console.log("======== adding ev listener")
        can.addEventListener('click', async (event) => {
            event.preventDefault();
            let id = event.target.id;
            let container = document.getElementById(`trash-container-${id}`);
            container.innerHTML = '';
            await fetch(`/questions/${id}/delete`);
        })
    })
})

