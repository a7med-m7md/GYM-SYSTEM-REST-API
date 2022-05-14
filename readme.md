 # sign up for client
 POST [localhost:3000/api/v1/users/signup](https://localhost:3000/api/v1/users/signup)
 
 Request Body
 ```
 {
    "firstName": "Mahmoud",
    "lastName": "Nabil",
    "gender": "Male",
    "birthDate": "1999-10-2",
    "phone": "01024251210",
    "email": "new2@gmail.com",
    "password": "123456789"
}
 ````
 Response
 ```
 {
    "status": "success",
    "user": {
        "id": 5,
        "firstName": "Mahmoud",
        "lastName": "Nabil",
        "gender": "Male",
        "birthDate": "1999-10-02",
        "phone": "01024251210",
        "email": "new2@gmail.com"
    }
}
 ```
 Or if it fails 
 ```
{
    "status": "failed",
    "message": "can't create this user, It seems the email attached to this user already exists"
}
```
# login for client
 POST [localhost:3000/api/v1/users/login](http://localhost:3000/api/v1/users/login)
 
 Request Body
 ```
{
    "email": "ahmed@gmail.com",
    "password": "123456789"
}
 ```
or if it fails

 ```
 
{
    "status": "falied",
    "message": "The password or the email is incorrect"
}
 ```
 
 # profile
GET [http://localhost:3000/api/v1/users/me](http://localhost:3000/api/v1/users/me)

```
{
    "status": "success",
    "clients": {
        "firstName": "Ahmed",
        "lastName": "Mohamed",
        "gender": "Male",
        "birthDate": "1999-02-20",
        "phone": "01024251210",
        "email": "ahmed@gmail.com",
        "info.age": 23,
        "info.weight": 65,
        "info.goal": "Fitness",
        "info.heigth": 175,
        "info.calories": 3000,
        "info.dietPlan": "asdasdsad",
        "info.trainingPlan": "Muscles",
        "info.progress": "onn"
    }
}
```

# Trainer Login
POST [localhost:3000/api/v1/trainers/login](http://localhost:3000/api/v1/trainers/login)

Request Body
```
{
    "email": "magdy@gmail.com",
    "password": "123456789"
}
```
Response
```
{
    "status": "success",
    "trainer": {
        "id": 2,
        "name": "Ahmed Magdy",
        "email": "magdy@gmail.com"
    }
}
```
Or if it fails
```
{
    "status": "failed",
    "message": "can't login with this trainer, It seems the email or password is invalid!"
}
```

# Logout for clients

POST [localhost:3000/api/v1/users/logout](http://localhost:3000/api/v1/users/logout)
# Logout for trainers

POST [localhost:3000/api/v1/trainers/logout](http://localhost:3000/api/v1/trainers/logout)

Response
```
{
    "status": "success"
}
```

or if it fails
```
{
    "status": "failed",
    "message": "You can't access this route"
}
```

# Get my excersies

GET [localhost:3000/api/v1/sports/me](http://localhost:3000/api/v1/sports/me)

```
{
    "status": "success",
    "sports": [
        {
            "name": "body building",
            "excercises": [
                {
                    "name": "Seated chest press"
                },
                {
                    "name": "Wide grip lat pulldown"
                },
                {
                    "name": "Seated leg press"
                },
                {
                    "name": "Dumbbell seated shoulder press"
                },
                {
                    "name": "Dumbbell bicep curls"
                },
                {
                    "name": "Close grip tricep press ups"
                }
            ]
        }
    ]
}
```

# Tainer Info 
GET [localhost:3000/api/v1/trainers/me](http://localhost:3000/api/v1/trainers/me)

```
{
    "status": "success",
    "trainer": [
        {
            "name": "Ahmed Araby",
            "email": "araby@gmail.com",
            "trainerInfo.city": "Faqous",
            "trainerInfo.state": "Sharqia",
            "trainerInfo.salary": 3000,
            "trainerInfo.gender": "Male",
            "trainerInfo.expert": "power lift"
        }
    ]
}
```

# Membership
Get [localhost:3000/api/v1/memberships](http://localhost:3000/api/v1/memberships)

```
{
    "status": "success",
    "data": {
        "active": "false",
        "renewAt": "2022-03-01"
    }
}
```


# Payments 
POST [localhost:3000/api/v1/payments](http://localhost:3000/api/v1/payments)

you can use theses codes for their corresponding amount of money 200 EG/Month
```{ "21853898079920": 200, "86263483302944": 400, "45083597053272": 600 }```

Request body
```
{
    "code": "86263483302944"
}
```

Response
```
{
    "status": "Success",
    "message": "You update your membership with 400 EG"
}
```

or if it fails

```
{
    "status": "Failed",
    "message": "Invalid Code, Please try again with valid one!"
}
```

# For any privilage route

Response
```
{
    "status": "failed",
    "message": "You can't access this route"
}
```

