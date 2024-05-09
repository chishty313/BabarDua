# API Documentation

Base url : `http://{host}:{port}/api/v1`  
i.e `http://localhost:4000/api/v1/`

**Available APIs:**

[Authentication](#auth-api)  
[Books APIs](#books-apis)

## Auth api

### signup

Method: `POST`, Endpoint: baseurl`/auth/signup`

<details>
<summary>Reqest body:</summary>
 
```json
{
    "username": "soumitra",
    "firstName": "Soumitra",
    "lastName": "Das",
    "email": "soumitra@gmail.com",
    "password": "********"
}
```
</details>

<details>
<summary>JSON Response:</summary>
 
```json
{
    "success": true,
    "message": "User created successfully",
    "user": {
        "username": "soumitra",
        "email": "soumitra@gmail.com"
    }
}
```
</details>

### login
Method: `POST`, Endpoint: baseurl`/auth/login`

<details>
<summary>Reqest body:</summary>
 
```json
{
    "email": "faysel@gmail.com",
    "password": "********"
}
```
</details>

<details>
<summary>JSON Response:</summary>
 
```json
{
    "message": "User logged in successfully",
    "success": true,
    "user": {
        "_id": "655d4a9281278104da2ce8e3",
        "username": "syedfaysel",
        "firstName": "Syed Faysel",
        "lastName": "Ahammad Rajo",
        "email": "faysel@gmail.com",
        "createdAt": "2023-11-22T00:25:54.715Z",
        "updatedAt": "2023-11-22T00:25:54.715Z",
        "__v": 0
    },
    "token": "jwt token"
}
```
</details>

## Books APIs

[get all books](#get-books)

### get-books
Method: `GET`, Endpoint: baseurl`/books/get-books`



## Google Book API

### Search books by author, title and keywords

Method: `GET`, Endpoint: baseurl`/gbooks/`  
Query Params (req.query): Takes 2 parameters - search, maxResults  
No Request body required
i.e `http://localhost:4000/api/v1/gbooks/?search={search query}`  
Optional `maxResults` query: `.../gbooks/?search={search query}&maxResults={int}`  
Default `maxResults` = 10
<details>
<summary>Reqest body: Empty</summary>
 
```json

```
</details>

<details>
<summary>JSON Response:</summary>
 
```json
{
    "success": true,
    "books": [
        {
            "id": "gbs_book_id", //unique
            "title": "Atomic Habits",
            "subtitle": "the life-changing million-copy",
            "authors": [
                "James Clear"
            ],
            "description": "THE PHENOMENAL INTER...",
            "pageCount": 234,
            "categories": [
                "Self-Help"
            ],
            "averageRating": 4,
            "ratingsCount": 4,
            "imageLinks": {
                "smallThumbnail": "image_url",
                "thumbnail": "image_url"
            },
            "previewLink": "external_google_book link",
            "_isbn": "isbn_number" //unique
        }
    ]
}
```
</details>


