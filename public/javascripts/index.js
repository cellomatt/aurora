const { DELETE } = require("sequelize/types/lib/query-types")

window.addEventListener("DOMContentLoaded", (event) => {


    const trash = document.querySelectorAll('.trash')

    trash.forEach((can) => {
        can.addEventListener('click', event => {

            console.log("_______________________" + event.target.id)

        })

    })


    // const button = document.querySelector(`trash${id}`)

    const deleteQuestion = async (url) => {
        await fetch(url, { method: DELETE })
    }

    button.addEventListener('click', event => {

        console.log(event.target.id)
        // event.preventDefault();
        // deleteQuestion()

    })


})
