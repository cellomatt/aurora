window.addEventListener("DOMContentLoaded", () => {
    const questionTrash = document.querySelectorAll('.questionTrash')
    questionTrash.forEach((can) => {
        can.addEventListener('click', async (event) => {
            event.preventDefault();
            let id = event.target.id;
            let container = document.getElementById(`trash-container-${id}`);
            // container.innerHTML = '';
            container.remove();
            const deleted = await fetch(`/questions/${id}/delete`);
            if (deleted.ok) {
                window.location.replace("/");
            }
        })
    })

    const answerTrash = document.querySelectorAll('.answerTrash');
    answerTrash.forEach((can) => {
        can.addEventListener('click', async (event) => {
            let id = event.target.id;
            let container = document.getElementById(`answer-trash-container-${id}`);
            // container.innerHTML = '';
            container.remove();
            await fetch(`/answers/${id}/delete`);
        })
    })

    const commentTrash = document.querySelectorAll('.commentTrash');
    commentTrash.forEach((can) => {
        can.addEventListener('click', async (event) => {
            let id = event.target.id;
            let container = document.getElementById(`comment-trash-container-${id}`);
            // container.innerHTML = '';
            container.remove();
            await fetch(`/comments/${id}/delete`);
        })
    })
})
