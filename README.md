# Real-Time Chat Application - Technical Assignment

## Live Deployment
- **Frontend (Vercel):** [https://adverayze-chat.vercel.app/](https://adverayze-chat.vercel.app/)
- **Backend (Render):** [https://adverayze-chat.onrender.com](https://adverayze-chat.onrender.com)

## Project Overview
A full-stack real-time chat application built for the Adverayze technical assignment. The application supports sending messages, pinning important conversations, and deleting messages (for self or everyone) with real-time updates.

## Tech Stack
- **Frontend:** React.js, Context API, Socket.io-client, Lucide-React, CSS
- **Backend:** Node.js, Express.js, Socket.io (MVC Architecture)
- **Database:** MongoDB (Atlas), Mongoose
- **Icons:** Lucide-React
- **Date Handling:** date-fns

## Features (Requirement 3)
- **Real-Time Messaging:** Instantly send and receive messages without page refresh.
- **Pinning (Requirement 4.3):** Pin important messages. Pinned messages are highlighted and also shown in a dedicated section at the top.
- **Soft Deletion (Requirement 4.2):** 
  - *Delete for Me:* Obscures the message content ("This message was deleted") specifically for the current user.
  - *Delete for Everyone:* Obscures the content for all users in the chat.
- **Authentication:** Signup and Login with Email, Username, and Password.
- **User List:** View all registered users in a sidebar.

## Setup Instructions

### Backend
1. Go to `/Backend`.
2. Run `npm install`.
3. Create `.env` with `MONGODB_URI` and `PORT=5000`.
4. Run `npm run dev`.

### Frontend
1. Go to `/frontend`.
2. Run `npm install`.
3. Run `npm run dev`.

## API Documentation
- `POST /api/users/register`: Create a new account.
- `POST /api/users/login`: Authenticate via email.
- `GET /api/users/`: Fetch all users.
- `GET /api/messages`: Fetch all message history.
- `POST /api/messages`: Send a new message.
- `PATCH /api/messages/:id/pin`: Toggle message pinned status.
- `DELETE /api/messages/:id?type=me|everyone&userId=...`: Delete message.

## Design Decisions & Tradeoffs
- **Real-Time Strategy (Requirement 4.4):** Chosen Socket.io over Polling to reduce latency and server load.
- **Soft Deletion Assumption (Requirement 4.2):** Based on user preference, "Delete for me" replaces content with a "deleted" placeholder rather than removing the message item entirely from the DOM. This provides a consistent visual record while protecting the privacy of the deleted content.
- **Scalability (Requirement 8.1):** MongoDB with proper indexing and Mongoose schemas ensure we can handle well over the 100-message requirement.
- **Error Handling (Requirement 8.2):** Implemented backend validation to prevent empty or oversized message storage.

## Deployment Details (Requirement 9)
- **Frontend:** Deployed on **Vercel** with automatic deployments from the GitHub `master` branch.
- **Backend:** Deployed on **Render** using a Web Service.
- **CORS:** Securely configured to only allow requests from the specific Vercel frontend domain.
