###   Used Stack  ####

- FastApi
- Next js
- Type script
- sqllite
- nginx
- Docker
- Tailwind


###  Cookies Based Authentication  ####
- Used server side cookies base authentication so the fontend and backend need to be on same domain . 
- It have used virtual host on my local.
- It help to prevent from xss and csrf




##   Api Enpoints build  ##

- register
- login
- candidate details
- submit score for other candidate
- view own score as reviewer
- LLM Summary  (using ollama)


##  DataBase migrations
 - candidates
 - scores
 - users


 ##  Docker ###

 - Backend on  8000
 - Frontend on 5173


 # How to run this project using docker (recommended) because of cookies based authentication
   - docker compose build
   - docker compose up
   - go to sudo nano /etc/hosts
   - add 127.0.0.1 scoring.local
   - for frontend scoring.local
   - for backend scoring.local/api


 # How to run this project without using docker
    #  Backend 
    - python3 venv venv on root folder of backend 
    - pip install -r requirements.txt
    - copy .env.example to .env 

    # npm i 
    # npm run dev

 
# Credential

  # admin 
   - email : rose@gmail.com
   - password : 9824845020@Ab


   
   ![Alt Text](assets/login.png)
   ![Alt Text](assets/datatable.png)
   ![Alt Text](assets/details.png)   
   ![Alt Text](assets/llmone.png)   
   ![Alt Text](assets/candidatesdetails.png)
   ![Alt Text](assets/othercandidates.png)



   


 
 