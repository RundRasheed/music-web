# music

# Simple Song Library Backend

This project provides a simple backend for a song library website, allowing public users to view a list of songs with metadata and enabling admin users to add new songs. The backend is built using NestJS and stores data in a MongoDB database. Additionally, the project is containerized using Docker for easy deployment.

## Prerequisites

Make sure you have the following tools installed on your system:

- Node.js and npm: [Node.js Downloads](https://nodejs.org/)
- Docker: [Docker Install](https://docs.docker.com/get-docker/)
- Docker Compose: [Docker Compose Install](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone the repository from GitHub:

```bash
git clone https://github.com/your-username/song-library-backend.git
cd song-library-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the following content:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace `your_mongodb_connection_string` with the actual connection string for your MongoDB instance and `your_secret_key` with a secure secret key for JWT authentication.

4. Build the Docker image:

```bash
docker build -t song-library-backend .
```

5. Run the Docker container:

```bash
docker run -p 3000:3000 --env-file .env song-library-backend
```

The backend server should now be running at http://localhost:3000.

## Docker Compose 

If you prefer using Docker Compose, make sure you have it installed. Then, run the following command:

```bash
docker-compose up
```

This will start both the backend server and MongoDB in separate containers.

## API Endpoints

### Get User by ID:
Endpoint: GET /users/:userId

Retrieve user information by providing the user ID in the path.

### Get All Users:
Endpoint: GET /users

Retrieve a list of all users.

### Create User
Endpoint: POST /users

Create a new user by providing the user details in the request body.

Request Body:
```json
{
  "name": "New User",
  "role": "USER"
}
```

### Update User by ID:
Endpoint: PATCH /users/:userId

Update user details by providing the user ID in the path and the updated details in the request body.

Request Body:
```json
{
  "name": "Updated User",
  "role": "ADMIN"
}
```

### Get Song by ID:
Endpoint: GET /music-list/:music_id

Retrieve song details by providing the song ID in the path.

### Get Paginated Song List:
Endpoint: GET /music-list

Retrieve a paginated list of songs. 

Optionally, provide page and limit query parameters for pagination. By default it gets 10 songs per page.

### Create Song:
Endpoint: POST /music-list

Create a new song by providing the song details in the request body. (Admin access only)

Request body:
```json
{
  "music_name": "New Song",
  "singer": "New Artist",
  "recording_date": "20230101",
  "cover_image": "https://example.com/new_cover_image.jpg"
}
```

### Update Song by ID:
Endpoint: PATCH /music-list/:music_id

Update song details by providing the song ID in the path and the updated details in the request body.

Request body:
```json
{
  "music_name": "New Song",
  "singer": "New Artist",
  "recording_date": "20230101",
  "cover_image": "https://example.com/new_cover_image.jpg"
}
```

### Search Songs:
Endpoint: GET /music-list/search/:query

Search for songs based on the provided query.



## Authentication
For admin functionality, JWT authentication is used. 

To authenticate as an admin, include the generated JWT token in the Authorization header of your requests.

