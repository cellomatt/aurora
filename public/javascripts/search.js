// searching through question title, question message and topic name
// implement a sort on results for both topic and expertise level

// ex. search 'science' returns:
// any question where title/message includes (like %) 'science'
// any question with a topic where name includes (like %) 'science'

const searchBtn = document.querySelector(".nav__search_button");

searchBtn.addEventListener("click", ev => {

    const searchTerm = document.querySelector(".search_bar").value;

    const results = await Question.findAll({
        where: {
            title: {
                [Op.substring]: searchTerm
            },
            message: {
                [Op.substring]: searchTerm
            }
        },
        include: {
            model: Topic,
            name: {
                [Op.substring]: searchTerm
            }
        },
        order: [
            ['createdAt', 'DESC']
        ]

    })

    // redirect
    
})