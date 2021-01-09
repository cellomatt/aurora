window.addEventListener("DOMContentLoaded", (event) => {
    const questionTrash = document.querySelectorAll('.trash')
    questionTrash.forEach((can) => {
        console.log("======== adding ev listener for questionTrash")
        can.addEventListener('click', async (event) => {
            event.preventDefault();
            let id = event.target.id;
            let container = document.getElementById(`trash-container-${id}`);
            container.innerHTML = '';
            await fetch(`/questions/${id}/delete`);
        })
    })

    const answerTrash = document.querySelectorAll('.answerTrash');
    answerTrash.forEach((can) => {
        console.log("======== adding ev listener for answerTrash")
        can.addEventListener('click', async (event) => {
            let id = event.target.id;
            let container = document.getElementById(`answer-trash-container-${id}`);
            container.innerHTML = '';
            await fetch(`/answers/${id}/delete`);
        })
    })

    const commentTrash = document.querySelectorAll('.commentTrash');
    commentTrash.forEach((can) => {
        console.log("======== adding ev listener for commentTrash")
        can.addEventListener('click', async (event) => {
            let id = event.target.id;
            let container = document.getElementById(`comment-trash-container-${id}`);
            container.innerHTML = '';
            await fetch(`/comments/${id}/delete`);
        })
    })
})