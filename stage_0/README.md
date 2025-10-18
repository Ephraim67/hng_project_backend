# HNG Backend Task — Profile Endpoint (`/me`)

This is a simple backend API built as part of the **HNG Internship Stage 0 Task**.  
The project exposes a single endpoint — `/me` — which returns dynamic user profile data along with a random cat fact fetched from the [Cat Facts API](https://catfact.ninja/fact).



## Features

1. A `GET /me` endpoint returning:
- `status`: Always `"success"`
- `user`: Personal profile (email, full name, backend stack)
- `timestamp`: Current UTC time in ISO 8601 format
- `fact`: A random cat fact fetched dynamically from the Cat Facts API

2. Integrates external API (`https://catfact.ninja/fact`)  
3. Proper error handling and fallback message  
4. Dynamic timestamp (updates every request)  
5. Logging using [morgan](https://www.npmjs.com/package/morgan)  
6. Rate limiting with [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)  
7. Environment variables support with [dotenv](https://www.npmjs.com/package/dotenv)



## Technologies Used

- **Node.js**
- **Express.js**
- **Axios** — for HTTP requests to Cat Facts API  
- **dotenv** — for environment configuration  
- **morgan** — for request logging  
- **express-rate-limit** — for basic rate limiting  



## API Endpoint

### **GET `/me`**

#### Example Response
```json
{
  "status": "success",
  "user": {
    "email": "youremail@example.com",
    "name": "Ephraim Norbert",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-18T21:10:32.290Z",
  "fact": "A cat’s normal pulse is 140–240 beats per minute, with an average of 195."
}
````

#### Response Fields

| Field        | Type   | Description                                    |
| ------------ | ------ | ---------------------------------------------- |
| `status`     | string | Always `"success"`                             |
| `user.email` | string | Your personal email address                    |
| `user.name`  | string | Your full name                                 |
| `user.stack` | string | Your backend stack                             |
| `timestamp`  | string | Current UTC time in ISO 8601 format            |
| `fact`       | string | Random cat fact fetched from the Cat Facts API |



## Setup Instructions

### 1️. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2️. Install dependencies

```bash
npm install
```

### 3️. Create a `.env` file

In the project root, create a `.env` file and add:

```env
PORT=3000
USER_EMAIL=youremail@example.com
USER_NAME=Ephraim Norbert
USER_STACK=Node.js/Express
```

### 4️. Run the project

```bash
npm start
```

If you have **nodemon** installed globally, you can run:

```bash
nodemon index.js
```



## Testing the Endpoint

Once the server starts, open your browser or use **curl** / **Postman** to test:

```
GET http://localhost:3000/me
```

Expected output:

* JSON response in the required format
* `timestamp` changes on every request
* A new cat fact is returned each time



## Error Handling

If the Cat Facts API is down or times out:

```json
{
  "status": "success",
  "user": { ... },
  "timestamp": "<current UTC time>",
  "fact": "Cat fact unavailable at the moment."
}
```



## Project Structure

```
.
├── index.js
├── package.json
├── .env
└── README.md
```



## License

This project is licensed under the **MIT License**.



## Author

**Ephraim Norbert**

* Email: [youremail@example.com](mailto:youremail@example.com)
* Stack: Node.js / Express
* HNG Backend Stage 0



## Task Reference

**HNG Backend Task:** Build a `/me` endpoint returning user details and a random cat fact.
**Deadline:** Sunday, 19 Oct 2025 (GMT+1 / WAT)
**Submission Link:** [https://forms.gle/cqXmjZwzRr4rchYBA](https://forms.gle/cqXmjZwzRr4rchYBA)

