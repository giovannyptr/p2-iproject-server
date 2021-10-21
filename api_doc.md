# **Beauty Hacks**

This is an application to buy skincare Product. This app has :

-   RESTful endpoint for asset's CRUD operation
-   JSON formatted response

&nbsp;

## **RESTful endpoints**

&nbsp;

---
---

### **POST /register**

> Create new user
&nbsp;

_Request Header_

```
Not needed
```

&nbsp;

_Request Body_

```
{
  "email" : <email for new account>,
  "password" : <password for new account>,

}
```

&nbsp;

_Response (201 - New User Created)_

```
{
  "id" : <new user id>,
  "email" : <new user email>
}
```

&nbsp;

_Response (400 - Bad Request)_

```
{
  "error" : <errors>
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  error : 'Internal Server Error'
}
```

&nbsp;

---

### **POST /login**

> Authenticate user
&nbsp;

_Request Header_

```
Not needed
```

&nbsp;

_Request Body_

```
{
  "email" : <user email>,
  "password" : <user password>
}
```

&nbsp;

_Response (200 - Login Success)_

```
{
  "access_token" : <access_token>
}
```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : 'Incorrect e-mail/password'
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---

### **GET /products**

> Get all products
&nbsp;

Not Needed

```
{
  "access_token" : <access_token>
}
```

&nbsp;


&nbsp;

_Response (200 - Success)_

```
[
    {
        "name" : "YOUR SKIN BAE SERIES",
        "brand": "Avoskin",
        "description": "Avoskin menghadirkan brightening dan hydrating toner dengan kandungan Niacinamide 7% yang dipadukan dengan Alpha Arbutin 1% dan ekstrak kale. Perpaduan kandungan active dan natural dalam Niacinamide 7% + Alpha Arbutin 1% + Kale Time to Glow bermanfaat untuk mencerahkan kulit, membantu mengurangi noda hitam dan menghidrasi kulit secara optimal sehingga memperkuat skin barrier.",
        "price": 137676,
        "CategoryId": 1,
        "img_url": "https://www.latifika.com/wp-content/uploads/2019/11/Vit-C-Avoskin-toner-scaled.jpg"
    },
    {
        "name" : "Face Toner Cica Series",
        "brand": "NPure",
        "description": "Membantu membersihkan wajah dari sisa kotoran, menyeimbangkan PH wajah, mencerahkan kulit wajah, merawat kulit berjerawat serta membuat kulit terasa segar, lembut dan lembab.",
        "price": 100000,
        "CategoryId": 1,
        "img_url": "https://jakimen.com/wp-content/uploads/2020/08/Review-Npure-Face-Toner-Centella-Asiatica.jpg"
    },
    {
        "name" : "CICA Care Toner",
        "brand": "Jarte Beauty",
        "description": "A lightweight and hydrating toner that helps to retore and balance the skin's natural moisture barrier and to soothe irritated skin",
        "price": 76000,
        "CategoryId": 1,
        "img_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-11046420/jarte_jarte_beauty_cica_care_toner_-100_ml-_full05_mj1iy0xx.jpeg"
    },
    {
        "name" : "Seastem Marine Hydrating Toner",
        "brand": "Sensatia Botanicals",
        "description": "Mengandung nutrisi dari laut yang kaya akan antioksidan, toner wajah ini memiliki manfaat anti-aging dan melembabkan secara intens. Kombinasi ekstrak giant sea kelp dan hyaluronate bersatu melembabkan kulit yang kering dan meningkatkan elastisitas. Apabila digunakan secara teratur, toner ini dapat memberikan kelembaban menyeluruh dan perlindungan jangka panjang terhadap polusi dari lingkungan.",
        "price": 250000,
        "CategoryId": 1,
        "img_url": "http://3.bp.blogspot.com/-Eu-qxlAC9RM/Vp9pnxgKczI/AAAAAAAADRw/o8L-SuKXiRk/s1600/snn.jpg"
    }
}

```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : "Authentication failed"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---

### **GET /user-credentials**

> Get user credentials
&nbsp;

_Request Header_

```
{
  "access_token" : <access_token>
}
```

&nbsp;

_Request Body_

```
Not needed
```

&nbsp;

_Response (200 - Success)_

```
{
  "usertitle" : <user title>,
  "id" : user.id,
  "email" : user.email,
  "role" : user.role,
}
```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : "Authentication failed"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---

### **POST /mycarts**

> Create posts
&nbsp;

_Request Header_

```
{
  "access_token" : <access_token>
}
```

&nbsp;

_Request Body_

```
{
  "UserId" : <req.user.id>,
  "PostId" : <New posts content>
}
```

&nbsp;

_Response (200 - Success)_

```
{
	"id": <New posts id>,
	"title": "<New posts title>",
	"content": "<New posts content>",
	"imgUrl": "<New posts imgUrl>",
	"categoryId": <New posts categoryId>,
	"status": <New posts status>,
	"authorId": <New posts authorId>,
	"updatedAt": "<New posts updatedAt>",
	"createdAt": "<New posts createdAt>"
}
```

&nbsp;

_Response (400 - Bad Request)_

```
{
  "error" : <errors>
}
```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : "Authentication failed"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---


### **GET /product/:productId**

> Get product details
&nbsp;

_Request Header_

```
no needed
```

&nbsp;

_Request Body_

```
Not needed
```

&nbsp;

_Response (200 - Success)_

```
{
  "id": <posts id>,
  "title": "<posts title>",
  "description": "<posts description>",
  "imgUrl": "<posts imgUrl>",
  "price": "<product price>"
}
```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : "Authentication failed"
}
```

&nbsp;

_Response (404 - posts not found)_

```
{
  "error" : "posts not found"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---

### **PUT /posts/:postsId**

> Update posts
&nbsp;

_Request Header_

```
{
  "access_token" : <access_token>
}
```

&nbsp;

_Request Body_

```
{
  "title" : <New posts title>,
  "content" : <New posts content>,
  "categoryId" : <New posts categoryId>,
  "imgUrl" : <New posts imgUrl>,
}
```

&nbsp;

_Response (200 - Success)_

```
{
	"id": <New posts id>,
	"title": "<New posts title>",
	"content": "<New posts content>",
	"imgUrl": "<New posts imgUrl>",
	"categoryId": <New posts categoryId>,
	"status": <New posts status>,
	"authorId": <New posts authorId>,
	"updatedAt": "<New posts updatedAt>",
	"createdAt": "<New posts createdAt>"
}
```

&nbsp;

_Response (400 - Bad Request)_

```
{
  "error" : <errors>
}
```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : "Authentication failed"
}
```

&nbsp;

_Response (403 - Forbidden)_

```
{
  "error" : "Don't have permission to access"
}
```

&nbsp;

_Response (404 - posts not found)_

```
{
  "error" : "posts not found"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---

### **DELETE /posts/:postsId**

> Delete posts
&nbsp;

_Request Header_

```
{
  "access_token" : <access_token>
}
```

&nbsp;

_Request Body_

```
Not needed
```

&nbsp;

_Response (200 - Success)_

```
{
	"message": "Success at deleting <deleted posts title>"
}
```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : "Authentication failed"
}
```

&nbsp;

_Response (403 - Forbidden)_

```
{
  "error" : "Don't have permission to access"
}
```

&nbsp;

_Response (404 - posts not found)_

```
{
  "error" : "posts not found"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---

### **PATCH /posts/:postsId**

> Delete posts
&nbsp;

_Request Header_

```
{
  "access_token" : <access_token>
}
```

&nbsp;

_Request Body_

```
{
  "status": <new status>
}
```

&nbsp;

_Response (200 - Success)_

```
[
  {
    "id": <New posts id>,
    "title": "<New posts title>",
    "content": "<New posts content>",
    "imgUrl": "<New posts imgUrl>",
    "categoryId": <New posts categoryId>,
    "status": <New status>
    "authorId": <New posts authorId>,
    "updatedAt": "<New posts updatedAt>",
    "createdAt": "<New posts createdAt>"
  }
]
```

&nbsp;

_Response (400 - Bad Request)_

```
{
  "error" : "Invalid request ID"
}
```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : "Authentication failed"
}
```

&nbsp;

_Response (403 - Forbidden)_

```
{
  "error" : "Don't have permission to access"
}
```

&nbsp;

_Response (404 - posts not found)_

```
{
  "error" : "posts not found"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---

### **GET /histories**

> Get all posts
&nbsp;

_Request Header_

```
{
  "access_token" : <access_token>
}
```

&nbsp;

_Request Body_

```
Not needed
```

&nbsp;

_Response (200 - Success)_

```
[
	{
		"id": <history id>,
		"title": "<history title>",
		"content": "<history content>",
		"updatedBy": <UserId who updates>,
		"entityId": "<postsId>",
		"createdAt": "<hsitory createdAt>",
		"updatedAt": "<hsitory updatedAt>"
	}, etc
]
```

&nbsp;

_Response (401 - Unauthorized)_

```
{
  "error" : "Authentication failed"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```
{
  "error" : 'Internal Server Error'
}
```

&nbsp;

---