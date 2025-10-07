# Mini TaskBoard API 📋

This is the backend API for the Mini TaskBoard application, a simplified workspace management tool built with the MERN stack. It provides a RESTful interface for managing users, projects, and tasks.

---

## ✨ Features

-   **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Project Management**: Full CRUD (Create, Read, Delete) functionality for projects.
-   **Task Management**: Full CRUD functionality for tasks within specific projects.
-   **Protected Routes**: Middleware to secure endpoints, ensuring only authenticated users can manage their data.
-   **Cascade Deletes**: Deleting a project automatically deletes all of its associated tasks.

---

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs for password hashing
-   **Middleware**: CORS

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   npm
-   MongoDB Atlas account

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root of the `backend` directory and add your environment variables:
    ```env
    PORT=5001
    MONGO_URI="your_mongodb_atlas_connection_string"
    JWT_SECRET="your_super_secret_key"
    ```

4.  **Run the server:**
    ```bash
    # For development with auto-reload
    npm run dev

    # For production
    npm start
    ```
    The API will be available at `http://localhost:5001`.

---

## 🚦 API Endpoints

All protected routes require an `Authorization` header with a Bearer Token.
**Header Format:** `Authorization: Bearer <your_jwt_token>`

### User Authentication (`/api/users`)

#### 1. Register a New User
* **Route:** `POST /api/users/register`
* **Description:** Creates a new user account.
* **Authentication:** Public

* **Request Body (Payload):**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "password": "password123"
    }
    ```

* **Success Response (`201 Created`):**
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
    ```
* **Error Response (`400 Bad Request` - User Exists):**
    ```json
    {
      "message": "User already exists"
    }
    ```

#### 2. Login a User
* **Route:** `POST /api/users/login`
* **Description:** Authenticates a user and returns a JWT.
* **Authentication:** Public

* **Request Body (Payload):**
    ```json
    {
      "email": "jane.doe@example.com",
      "password": "password123"
    }
    ```
* **Success Response (`200 OK`):**
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
    ```
* **Error Response (`401 Unauthorized` - Invalid Credentials):**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

---

### Project Management (`/api/projects`)

#### 1. Create a Project
* **Route:** `POST /api/projects`
* **Description:** Creates a new project for the authenticated user.
* **Authentication:** **Protected**

* **Request Body (Payload):**
    ```json
    {
      "name": "Q4 Marketing Campaign",
      "description": "Plan and execute the marketing campaign for Q4."
    }
    ```
* **Success Response (`201 Created`):**
    ```json
    {
      "_id": "60d21b4667d0d8992e610c8b",
      "name": "Q4 Marketing Campaign",
      "description": "Plan and execute the marketing campaign for Q4.",
      "createdAt": "2025-10-07T10:00:00.000Z",
      "updatedAt": "2025-10-07T10:00:00.000Z"
    }
    ```
* **Error Response (`400 Bad Request` - Missing Name):**
    ```json
    {
        "message": "Project name is required"
    }
    ```

#### 2. Get All Projects
* **Route:** `GET /api/projects`
* **Description:** Retrieves all projects for the authenticated user.
* **Authentication:** **Protected**

* **Success Response (`200 OK`):**
    ```json
    [
      {
        "_id": "60d21b4667d0d8992e610c8b",
        "name": "Q4 Marketing Campaign",
        "description": "Plan and execute the marketing campaign for Q4.",
        "createdAt": "2025-10-07T10:00:00.000Z",
        "updatedAt": "2025-10-07T10:00:00.000Z"
      }
    ]
    ```

#### 3. Delete a Project
* **Route:** `DELETE /api/projects/:id`
* **Description:** Deletes a project and all of its associated tasks.
* **Authentication:** **Protected**

* **Success Response (`200 OK`):**
    ```json
    {
      "message": "Project and associated tasks deleted successfully"
    }
    ```
* **Error Response (`404 Not Found`):**
    ```json
    {
      "message": "Project not found"
    }
    ```
---

### Task Management (`/api/tasks`)

#### 1. Create a Task
* **Route:** `POST /api/tasks`
* **Description:** Creates a new task within a specified project.
* **Authentication:** **Protected**

* **Request Body (Payload):**
    ```json
    {
      "title": "Draft social media posts",
      "description": "Create content for Instagram and Twitter.",
      "projectId": "60d21b4667d0d8992e610c8b"
    }
    ```
* **Success Response (`201 Created`):**
    ```json
    {
        "_id": "60d21b8c67d0d8992e610c8e",
        "title": "Draft social media posts",
        "description": "Create content for Instagram and Twitter.",
        "status": "Todo",
        "projectId": "60d21b4667d0d8992e610c8b",
        "createdAt": "2025-10-07T10:01:00.000Z",
        "updatedAt": "2025-10-07T10:01:00.000Z"
    }
    ```

#### 2. Get Tasks by Project
* **Route:** `GET /api/tasks/project/:projectId`
* **Description:** Retrieves all tasks for a specific project.
* **Authentication:** **Protected**

* **Success Response (`200 OK`):**
    ```json
    [
      {
        "_id": "60d21b8c67d0d8992e610c8e",
        "title": "Draft social media posts",
        "status": "Todo",
        "projectId": "60d21b4667d0d8992e610c8b",
        "..."
      }
    ]
    ```

#### 3. Update a Task
* **Route:** `PUT /api/tasks/:id`
* **Description:** Updates a task's details, typically its status.
* **Authentication:** **Protected**

* **Request Body (Payload):**
    ```json
    {
      "status": "In Progress"
    }
    ```
* **Success Response (`200 OK`):**
    ```json
    {
        "_id": "60d21b8c67d0d8992e610c8e",
        "title": "Draft social media posts",
        "status": "In Progress",
        "..."
    }
    ```
* **Error Response (`404 Not Found`):**
    ```json
    {
      "message": "Task not found"
    }
    ```

#### 4. Delete a Task
* **Route:** `DELETE /api/tasks/:id`
* **Description:** Deletes a single task.
* **Authentication:** **Protected**

* **Success Response (`200 OK`):**
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```
* **Error Response (`404 Not Found`):**
    ```json
    {
      "message": "Task not found"
    }
    ```
