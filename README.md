# Blog Api
This is an api for a blog app

---

## Requirements
1. User should be able to register 
2. User should be able to login with JWT authentication
3. Implement basic auth
4. User should be able to get all blog posts
5. Users should be able to create blog posts
6. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm start`

---
## Base URL
https://ichie-blogging-api.cyclic.app/


## Models
---

### UserDB
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |
|  created_at|  date   |   required |


### blogPost
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  title |  string |  required |
|  author |  string |  required | unique
|  description |  string |  required |
|  body |  string |  required |
|  created_at |  date |  required |
|  updated_at |  date |  required |
| 



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "firstname": "jon",
  "lastname": "doe",
  "email": "doe@example.com",
  "password": "Password1"
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "email": 'doe@example.com",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsmfanajdnd'
}
```

---
### Create post

- Route: /posts/store
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    title : i love javascript
|  author : linda hanson
|  description : javascript is a programming language
|  body: javascript is a webdevelopment scripting language
|  created_at :  data
|  updated_at :  date 
}
```

- Responses

Success
```
{ 
  title : i love javascript
|  author : linda hanson
|  description : javascript is a programming language
|  body: javascript is a webdevelopment scripting language
|  created_at :  data
|  updated_at :  date 
}
```
---
### Get postById

- Route: /post/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
   title : i love javascript
|  author : linda hanson
|  description : javascript is a programming language
|  body: javascript is a webdevelopment scripting language
| read_count : Number
|  created_at :  data
|  updated_at :  date
}
```
### Get postBy Title and author

- Route: //blogs/:title
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
   title : i love Altschool
|  author : ichie chinemerem
|  description : Altschool is a school of software engineering
|  body: Altschool is a school of software engineering, data science.........
| read_count : Number
|  created_at :  data
|  updated_at :  date
}

```
---

### Get home

- Route: /
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - get_by (default: created_at)
    - created_at
- Responses

Success
```
{
    title : i love softwares
|  author : ichie chinemerem
|  description : softwares makes life easy
|  body: softwares makes life easy.....
|  created_at :  data
}
```
---

...

## Contributor
- Ichie Chinemerem
