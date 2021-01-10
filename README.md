<p align="center">
<img src="https://user-images.githubusercontent.com/70561117/103392693-04dc4a00-4ad4-11eb-9bbb-9d213c1607ad.png" width="600">
</p>


---

**Aurora** is a clone of **[Quora](https://www.quora.com/)** with an added "ranking" of questions by expertise level.
The expertise level ranking allows the questions to be easily accessed by novice, 
intermediate and expert levels of difficulty. 
<img alt="Logo" align="right" src="https://user-images.githubusercontent.com/70561117/103400052-8645d380-4af8-11eb-8c61-1f2bab847bfd.png" width="20%" />
* Users can **log in** or **sign up** to access some functionality the site.
* A logged in user has the ability to **post questions** with both a topic and expertise level.
* Posted questions can be **answered**, and answers can be **commented on**.
* The **search** bar can find questions using a search term and **SQL queries**.  
* Search results can be **sorted** by topic or expertise level.

<p align="center">
<img src="https://user-images.githubusercontent.com/70362985/104137695-4981a400-5364-11eb-8ff9-7efc03e85bfd.png">
</p>

<h2>Try the site live: <a href=http://aurora-quora.herokuapp.com/>Here</a> <b>|</b> Check out our <a href="https://github.com/cellomatt/aurora/wiki">documentation</a></h2>

## How to run the site locally

- Clone the repo
- Use the command ```npm install``` to install all dependencies
- Make a copy of the .env.example file and edit to match local db configuration
- Create the database and user in psql
  * Run all migrations with ```npx dotenv sequelize db:migrate```
  * Seed all data with ```npx dotenv sequelize db:seed:all```
- Use the start script ```npm start``` to run the server

## Technologies used in Aurora
<p align="left">
<a href="https://sequelize.org/">
<img src="https://img.shields.io/badge/Sequelize-v6.3.5-blue">
<a/>

<a href="https://expressjs.com/">
<img src="https://img.shields.io/badge/Express-v4.17.1-blue">
<a/>
   
<a href="https://pugjs.org/api/getting-started.html">
<img src="https://img.shields.io/badge/Pug-v3-blue">
<a/>
  
<a href="https://nodejs.org/en/">  
<img src="https://img.shields.io/badge/Node-v14.15.3-blue">
<a/>

<a href="https://www.heroku.com/">
<img src="https://img.shields.io/badge/Heroku-hosting-blue">
<a/>
</p>

**Sequelize** was used to store and easily manage data with its amazing 
data models and migrations.

**Express JS** was our framework and it reduced a ton of boiler plate 
code, freeing us to implement more features. 

**npm** was our software registry, and within it we installed many packages;
some notable examples include:
* nodemon,
* morgan, 
* express-validator,
* *and more* 

**Pug** is an excellent view engine we used to quickly and
beautifully display HTML on our pages.

**Heroku** is the web hosting app of our choice that allowed us to 
run our app on the cloud! 

**Honorable Mentions** are the developement tools that made life 
much more enjoyable! 
* Postman made route testing very easy and fun!
* Postbird, its wonderful GUI made all the difference!

## Features that we implemented
The first big feature we tackled is the searching algorithm,
which populates the page with results containing either a question's
title or its message. 
    ```
    const {
           searchTerm
       } = req.body;


    const results = await Question.findAll({

          where: {
               [Op.or]: [{
                       title: {
                           [Op.iLike]: '%' + searchTerm + '%'
                       }
                   },
                   {
                       message: {
                           [Op.iLike]: '%' + searchTerm + '%'
                       }
                   }
               ]
           },
           include:
                [Topic, Expertise, User]
           ,
           order: [
               ['createdAt', 'DESC']
           ]

       })
    ```
<details><summary><b>How it was done</b></summary>

1. We started by extracting the search term from the POST request.

    ```
    const {
        searchTerm
    } = req.body;
    ```
2. Then we queried the database for questions where either the question title 
  or the question message (case insensitive) matched the search term.
  
    ```
    const results = await Question.findAll({
            where: {
                [Op.or]: [{
                        title: {
                            [Op.iLike]: '%' + searchTerm + '%'
                        }
                    },
                    {
                        message: {
                            [Op.iLike]: '%' + searchTerm + '%'
                        }
                    }
                ]
            },

        })
    ```
    
3. We included each question's topic, expertise level, and user, and 
  ordered the results so that the most recent question appears first. 

    ```
    include:
             [Topic, Expertise, User]
        ,
        order: [
            ['createdAt', 'DESC']
        ]
    ```    

</details>

The other big feature that we implemented was a sorting algorithm on our search results.

    ```
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
            div.style.display = 'flex';
        } else {
            if (topic === 'All' && expertise !== 'All') {
                if (div.classList.contains(expertise)) {
                    div.style.display = "flex";
                } else {
                    div.style.display = "none";
                }
            } else if (expertise === 'All' && topic !== 'All') {
                if (div.classList.contains(topic)) {
                    div.style.display = "flex";
                } else {
                    div.style.display = "none";
                }
            } else if (div.classList.contains(topic) && div.classList.contains(expertise)) {
                div.style.display = 'flex';
            } else {
                div.style.display = 'none';
            }
        }
    }
    ```
<details><summary><b>How it was done</b></summary>

1. We started by populating the dropdown menus for Topic and Expertise Level on the 
search results page to reflect the topics and expertise levels of the result questions:

    ```
    let topicIds = []
    let expertiseIds = [];

    results.forEach((result) => {
        if (!topicIds.includes(result.Topic.id)) {
            topicIds.push(result.Topic.id)
        }
        if (!expertiseIds.includes(result.Expertise.id)) {
            expertiseIds.push(result.Expertise.id)
        }
    })

    const topics = await Topic.findAll({ where: {
        id: {
            [Op.in]: topicIds
        }
    }})

    const expertises = await Expertise.findAll({ where: {
        id: {
            [Op.in]: expertiseIds
        }
    }})
    ```
2. Then we cleared local storage when the search results page was loaded 
in order to make space for our sorting function variables:

    ```    
    document.addEventListener('DOMContentLoaded', ev => {
    localStorage.clear();
    })
    ```
    
    
3. We rendered the dropdown select menus with the content from our query in step 1, 
then set up an event listener to save the selected value to local storage:
    ```
    div.sort_bar
      select#topicSelect(name="topicId" class="form__dropdown" onchange="filterText('topicSelect')")
        option(value="" disabled selected hidden) Topic
        option(value="All") All
        each topic in topics
          option(value=topic.id class="form__dropdown--option")=topic.name

      select#expertiseSelect(name="expertiseId" class="form__dropdown" onchange="filterText('expertiseSelect')")
        option(value="" disabled selected hidden) Expertise Level
        option(value="All") All
        each expertise in expertises
          option(value=expertise.description class="form__dropdown--option")=expertise.description
    ```
    
    ```
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
    };
    ```
      
4. We called a helper function on each of our result divs to filter results
based on the variables in local storage and render them dynamically:

    ```
    let divs = document.querySelectorAll(".result");

      divs.forEach((div) => {
          displayCombinator(localTopic, localExpertise, div);
    ```
    ```
    function displayCombinator(topic, expertise, div) {
      if (topic === 'All' && expertise === 'All') {
          div.style.display = 'flex';
      } else {
          if (topic === 'All' && expertise !== 'All') {
              if (div.classList.contains(expertise)) {
                  div.style.display = "flex";
              } else {
                  div.style.display = "none";
              }
          } else if (expertise === 'All' && topic !== 'All') {
              if (div.classList.contains(topic)) {
                  div.style.display = "flex";
              } else {
                  div.style.display = "none";
              }
          } else if (div.classList.contains(topic) && div.classList.contains(expertise)) {
              div.style.display = 'flex';
          } else {
              div.style.display = 'none';
          }
      }
    }
    ```
</details>

## Challenges throughout the development process
We faced a few challenges while we were building Aurora:

1. We encountered a merge issue with one of our features that took a long time to sort out.
Make sure you stay up to date with ```main```, folks!

2. It took us a long time to figure out what the best way to sort our search results was.
Thankfully, we were able to reference some other people's strategies and come up with something
that fit our project.


## Developers

<img alt="Developer" align="right" src="https://user-images.githubusercontent.com/70561117/103400187-079d6600-4af9-11eb-8d20-00c8f88e3936.png" width="20%" />
<table style="width:100%">
  <tr>
    <th><a href="https://github.com/vantanova" rel="nofollow"><img src="https://avatars1.githubusercontent.com/u/70561117?s=460&u=85a68af6fc136866eb4f33ee657aeb751aba9935&v=4" height="auto" width="100"></a></th>
    <th><a href="https://github.com/cellomatt" rel="nofollow"><img src="https://avatars3.githubusercontent.com/u/70362985?s=460&u=f842593461c24188b7472e98ec2813b87221bca2&v=4" height="auto" width="100"></a></th>
    <th><a href="https://github.com/QuintinHull" rel="nofollow"><img src="https://avatars2.githubusercontent.com/u/70037265?s=460&u=c4f09b24fc3acea13c4c81e5f0eef835bf54780b&v=4" height="auto" width="100"></a></th>
    <th><a href="https://github.com/lettemax" rel="nofollow"><img src="https://avatars0.githubusercontent.com/u/11065513?s=460&u=0c6a04b31933e0835366b26a34b62c33f3c427ca&v=4" height="auto" width="100"></a></th>
  </tr>
  <tr>
    <td>Antonio A.</td>
    <td>Matt K.</td>
    <td>Quintin H.</td>
    <td>Max L.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/vantanova">@vantanova</a></td>
    <td><a href="https://github.com/cellomatt">@cellomatt</a></td>
    <td><a href="https://github.com/QuintinHull">@QuintinHull</a></td>
    <td><a href="https://github.com/lettemax">@lettemax</a></td>
  </tr>
</table>

<p> <i>Thank you for reading our project README ❤️</i> </p>

