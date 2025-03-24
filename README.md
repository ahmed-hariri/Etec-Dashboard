# Etec Dashboard Project

## Description
This project focuses on the admin dashboard for managing products in an e-commerce system. Built with modern technologies, 
it provides a dynamic and user-friendly interface for administrators to manage inventory, view customer orders, and perform
other administrative tasks.

## Features
- Admin dashboard for managing products and orders
- User authentication for secure login
- CRUD (Create, Read, Update, Delete) operations for product management
- Real-time updates for product and order status
- Responsive design using Tailwind CSS
- State management with Zustand
- Animations with Framer Motion

## Prerequisites
Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB installation

## Installation

### Back-End

1. Clone the project
   ```bash
   git clone https://github.com/Kodatchi-001/Etec-Dashboard.git
   cd Etec-E-commerce
   ```

2. Navigate to the back-end folder and install dependencies
   ```bash
   cd backend
   npm install
   ```

3. Configure your MongoDB connection in `backend/config/db.js` by replacing the connection details with your MongoDB URI.

4. Run the back-end server using `nodemon` (if you don't have `nodemon` installed, you can install it globally using `npm install -g nodemon`):
   ```bash
   npm start
   ```

5. The back-end server will be running at `http://localhost:5000`.

### Front-End

1. Navigate to the front-end folder
   ```bash
   cd frontend
   ```

2. Install the front-end dependencies
   ```bash
   npm install
   ```

3. Start the front-end server
   ```bash
   npm run dev
   ```

4. The front-end will be running at `http://localhost:3000`.

### Running the Full Stack

1. Ensure both the back-end and front-end servers are running on different ports:
   - **Back-End**: `http://localhost:5000`
   - **Front-End**: `http://localhost:3000`

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Main Dependencies

- *Express.js*: A framework to handle HTTP requests on the server side.
- *MongoDB*: NoSQL database to store the data.
- *Mongoose*: ODM to interact with MongoDB and simplify database operations.
- *CORS*: Middleware to handle cross-origin requests.
- *Next Js*: JavaScript framework to build the user interface.
- *Tailwind CSS*: Utility-first CSS framework for styling.
- *Framer Motion*: Animation library for React.
- *Zustand*: State management tool for React.

## Testing

No tests have been implemented in this project yet.
