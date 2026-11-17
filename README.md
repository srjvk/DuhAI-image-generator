# DuhAI Image Generator

DuhAI is a full-stack AI image generation and community sharing application. Enter a text prompt, generate an image using Hugging Face, then share it with a MongoDB-backed gallery.

## Features

- Generate images from text prompts with FLUX.1-schnell
- Store generated images in Cloudinary
- Share creations in a community gallery
- Search posts by creator name or prompt
- Download generated images
- Run the complete stack with Docker Compose
- Responsive React interface styled with Tailwind CSS

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **AI:** Hugging Face Inference API
- **Database:** MongoDB with Mongoose
- **Image Storage:** Cloudinary
- **Development:** Docker and Docker Compose

## Project Structure

```text
DuhAI-image-generator/
├── frontend/
│   ├── src/
│   │   ├── componenets/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── constants/
│   └── package.json
├── server/
│   ├── mongodb/
│   │   └── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
└── docker-compose.yml
```

## Prerequisites

- Node.js 24 or newer
- npm
- Docker and Docker Compose
- MongoDB database
- Hugging Face API token
- Cloudinary account

## Environment Variables

Create `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
HF_TOKEN=your_hugging_face_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Docker Setup

From the project root:

```bash
docker compose up --build
```

The services will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:1234
- API health check: http://localhost:1234

## Manual Setup

### Backend

```bash
cd server
npm install
npm start
```

The backend runs on port `1234`.

### Frontend

```bash
cd frontend
npm install
npm run dev -- --host
```

The frontend runs on port `5173`.

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Backend status |
| `POST` | `/api/v1/duhai` | Generate an image from a prompt |
| `GET` | `/api/v1/post` | Retrieve community posts |
| `POST` | `/api/v1/post` | Create a community post |

## Usage

1. Open the frontend.
2. Enter your name and an image prompt.
3. Select **Generate** to create the image.
4. Select **Share with the Community** to publish it.
5. Browse or search existing creations on the home page.
6. Download images using the card's download action.

## Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm start
```

## License

No license is currently specified. All rights are reserved by the repository owner until a license is added.
