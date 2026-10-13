
# mood 

This is a soft clone of [Soundcloud](https://soundcloud.com/). 

## Table of Contents 

1. [General Info](#general-info)
2. [Wiki-Documentation](#wiki-documentation)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Development](#development)



### General Info 
***
# mood
mood is an application where users can store and organize their music into moods.
* Link to live  [mood](http://appmood.herokuapp.com/home) project. 

## Key Functionalities 

mood allows users to create different moods to store songs.

  * Moods: Users can create, read, update, and delete moods.
  * Songs: Users can create, play, update, and delete songs.


### mood Landing Page
![landing](https://user-images.githubusercontent.com/85750283/155817655-01f031e4-934c-4932-8bc1-977fd5d0b7ba.png)


### mood Moods page
![home](https://user-images.githubusercontent.com/85750283/155817904-0443d4b2-86a2-4e53-ae9e-a3b9a26f93da.png)


### mood Login page 
![login](https://user-images.githubusercontent.com/85750283/155817746-41b01f0b-a0e1-4272-aa30-51afccc114ea.png)


### mood Sign up page
![sign-up](https://user-images.githubusercontent.com/85750283/155817849-58e12c17-d83c-4355-b08d-b8ef8334c5db.png)


### mood Songs page
![songs-modal](https://user-images.githubusercontent.com/85750283/155818076-8a5fcae7-28e0-45d0-934e-814a288c6880.png)



## Wiki Documentation: 
***
* [Database Schema](https://github.com/MatthewSatt/mood/wiki/Database-Schema)
* [MVP Feature List](https://github.com/MatthewSatt/mood/wiki/Feature-List)
* [User Stories](https://github.com/MatthewSatt/mood/wiki/User-Stories)
* [Wireframes](https://github.com/MatthewSatt/mood/wiki/Wire-Frames)

## Technologies 
***
mood was developed using the following Technologies: 

<img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg"  height=40/><img  
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>


 React | Redux | Flask | Postgres |SQLAlchemy | Alembic | CSS | Git | Node.js | NPM | HTML / JSX | Heroku

## Languages 
***

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=50/>
* JavaScript (frontend)
* Python (backend)


## Installation 

To install mood on your local machine please clone the project repository. 

1 )  `git clone https://github.com/MatthewSatt/mood.git`

2 ) cd into mood and cd into mood-project
    `cd mood-project/`

3 )  Install dependencies
     
     `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`

4 )  Create a .env file based on the example with proper settings for your development environment

5 )  Setup your PostgreSQL user, password, database, and make sure it matches your .env file


  
6 ) To setup the backend application...
   
   enter the pipenv shell, migrate your database, seed your database, and run the flask application 
     
  •  `cd mood-project/` 

  •  `pipenv shell` to enter the pipenv shell 

  •  `flask db upgrade`

  •  `flask seed all`

  •  `flask run` while in the shell and within the backend (mood-project/) directory under localhost:5000
  
7 ) To run the frontend react application...

  •  Change into the frontend directory `mood-project/react-app/`

  •  Run `npm install` to install all dependencies from the package.json within the frontend directory 
  
  •  `npm start` within the frontend directory(mood-project/react-app) under localhost:3000
  
### Running with Docker

With [Docker Desktop](https://www.docker.com/products/docker-desktop/) running, from `mood-project/`:

  •  `docker compose up --build`

  •  Open http://localhost:8000 and log in as `demo@aa.io` / `password`

The first start builds the React app, runs the migrations, and seeds a Postgres container. Data persists between runs; `docker compose down -v` wipes it.

## Development 
This project was developed by a single developer (Matthew Satterwhite).

#### Highlight features: 

* Design: mood was designed to be an interactive website that focuses on user experience and incorporates modern design elements. This functionality also gives the application a sleak design. 



## Future Features:

• I would like to include a profile page for each user where others can view the current users highest rated songs.

• Allows users to add a profile picture to their account.
