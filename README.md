# nodejs-posts

### **1. Get All Posts**
**Endpoint:**  
`GET /api/posts`

**Query Parameters:**  
- `sortBy` (optional): Field to sort the posts (e.g., `title`, `desc`).
- `page` (optional): Page number for pagination (default: 1).
- `limit` (optional): Number of posts per page (default: 10).
- `keyword` (optional): Keyword to search in `title` or `desc`.
- `tag` (optional): Tag ID to filter posts by a specific tag.

**Response:**  
- **200 OK**: Returns a list of posts with pagination. Each post includes the populated tag details.
- **400 BAD_REQUEST**: If invalid query parameters are provided.
- **500 SERVER_ERROR**: If an error occurs on the server.

**Example Request:**  
```http
GET /api/posts?sortBy=title&page=1&limit=5&keyword=sample&tag=6754001745bf6d2e3fb1dce2
```

**Example Response:**  
```json
[
  {
    "_id": "6754001745bf6d2e3fb1dce4",
    "title": "Sample Post",
    "desc": "This is a sample post.",
    "image": "data:image/png;base64,...",
    "tags": [
      {
        "_id": "6754001745bf6d2e3fb1dce2",
        "name": "Technology"
      }
    ]
  }
]
```

---

### **2. Create a New Post**
**Endpoint:**  
`POST /api/posts`

**Request Body (Form-Data):**  
- `title` (required): Title of the post.
- `desc` (required): Description of the post.
- `tags` (optional): Array of tag IDs or a JSON stringified array.
- `image` (optional): An image file to be uploaded.

**Response:**  
- **201 CREATED**: Returns the created post with populated tags.
- **400 BAD_REQUEST**: If `title` or `desc` is missing, or if the image format is invalid.
- **404 NOT_FOUND**: If one or more tag IDs are not found.
- **500 SERVER_ERROR**: If an error occurs on the server.

**Example Request (Form-Data):**  
```plaintext
title: "New Post"
desc: "This is a new post description."
tags: ["6754001745bf6d2e3fb1dce2", "6754001745bf6d2e3fb1dce3"]
image: <File Upload>
```

**Example Response:**  
```json
{
  "_id": "6754001745bf6d2e3fb1dce5",
  "title": "New Post",
  "desc": "This is a new post description.",
  "image": "data:image/jpeg;base64,...",
  "tags": [
    {
      "_id": "6754001745bf6d2e3fb1dce2",
      "name": "Technology"
    },
    {
      "_id": "6754001745bf6d2e3fb1dce3",
      "name": "Science"
    }
  ]
}
```

---

### **3. Create a New Tag**
**Endpoint:**  
`POST /api/tags`

**Request Body:**  
- `name` (required): Name of the tag.

**Response:**  
- **201 CREATED**: Returns the created tag.
- **500 SERVER_ERROR**: If an error occurs on the server.

**Example Request:**  
```json
{
  "name": "Technology"
}
```

**Example Response:**  
```json
{
  "_id": "6754001745bf6d2e3fb1dce2",
  "name": "Technology"
}
```


### **Dependencies**
- **`Post` Model:** Handles post data, including `title`, `desc`, `image`, and `tags`.
- **`Tag` Model:** Handles tag data, including `name`.
- **`multer` Middleware:** For handling file uploads.
- **`mongoose` ORM:** For interacting with MongoDB.

