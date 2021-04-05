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

    const commentEdit = document.querySelectorAll('.commentEdit');
    commentEdit.forEach((edit) => {
        edit.addEventListener('click', async (event) => {
            // when click, replace comment header with field input
            let id = event.target.id;
            let commentHeader = document.getElementById(`comment-${id}-title`);
            let editing = commentHeader.classList.contains("hidden-header")
            toggleCommentEdit(id, editing, edit);
            // make fetch with edit content
            })
        })


    function toggleCommentEdit(id, editing, btn) {
        let commentHeader = document.getElementById(`comment-${id}-title`);
        let editCommentForm = document.getElementById(`edit-comment-${id}-form`);
        if (editing) {
            btn.innerHTML = `<i id='${id}' class="far fa-edit"></i>`;
            commentHeader.classList.remove('hidden-header');
            editCommentForm.classList.add('hidden-edit-form');
        } else {
            btn.innerHTML = `<i id='${id}' class="fas fa-times"></i>`;
            commentHeader.classList.add('hidden-header');
            editCommentForm.classList.remove('hidden-edit-form');
            let submitBtn = document.getElementById(`edit-comment-submit-${id}`);
            submitBtn.addEventListener('click', async (event) => {
                let commentMessage = document.getElementById(`edit-comment-textarea-${id}`).value;
            })
        }
    }
})
