# Emergency Surveillance
> Get help during an emergency situation.
# So What Is It
> what the name suggests
## In Short is helps you to declare an emergency so that an other person who you mentioned during signup will come and assist you through the situation . You only need to got to the main page and then declare emergency and the other persion will get a call and an sms then he will login with the username name and password which you and the pther person know then he will have a direct audio contact with you via socket io and he can see you real time location and you current position and everything. After the issue is resolved you will just post is as issue resolved then that person is releaved. [WIP]

# Sign up
## you can signup over ``/signup``


# Declaring emergency 

## you can declare emergency over ``/``

# Dashboard

## you can find dashboard over ``/dashboard``

# Usage 

## first clone the repo by ``git clone https://github.com/alestor123/EMERGENCY-SURVEILLANCE.git``

## then use ``npm i `` to install deps

## and then set the env by adding ``.env`` file to directory (add env model)
```
PASS=<30 character long password>
SID=<twillio sid>
KEY=<twillio key>
MONGO_URL=<mongodb url>
NUM=<twillio call number>
fileName=<path to the logs>
AKEY=<KEY for opencagedata>
LANG=<language short code>
UPLOADS=<path to upload>
```

## after all that you can run it by  `` npm start`` 
    