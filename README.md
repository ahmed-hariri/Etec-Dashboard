# E-commerce MENN Stack Project

## Description
This project is a full-stack e-commerce application built with the MENN stack (MongoDB, Express.js, Next.js, Node.js).
It features an admin dashboard for product management and a shopping section for customers to browse and purchase products.
The back-end handles data management through Express.js and MongoDB, while the front-end is built in Next for a dynamic and responsive
user experience.

## Features
- Admin dashboard for managing products
- Customer shopping section for browsing and purchasing products
- User authentication and management
- CRUD (Create, Read, Update, Delete) operations for product management
- CORS handling for cross-origin requests
- MongoDB connection via Mongoose
- Responsive design using Tailwind CSS
- Animations with Framer Motion
- State management with Zustand

## Prerequisites
Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB installation

## Installation

### Back-End

1. Clone the project
   ```bash
   git clone https://github.com/Kodatchi-001/Etec-Ecommerce.git
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

5. The back-end server will be running at `http://localhost:3000`.

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

4. The front-end will be running at `http://localhost:3001`.

### Running the Full Stack

1. Ensure both the back-end and front-end servers are running on different ports:
   - **Back-End**: `http://localhost:3000`
   - **Front-End**: `http://localhost:3001`

2. Open your browser and navigate to `http://localhost:3001` to see the application in action.

## Main Dependencies

- *Express.js*: A framework to handle HTTP requests on the server side.
- *MongoDB*: NoSQL database to store the data.
- *Mongoose*: ODM to interact with MongoDB and simplify database operations.
- *CORS*: Middleware to handle cross-origin requests.
- *Next Js*: JavaScript framework to build the user interface.
- *Tailwind CSS*: Utility-first CSS framework for styling.
- *Framer Motion*: Animation library for React.
- *Zustand*: State management tool for React.

## Project Structure

```
/Etec-E-commerce
    /back-end
        .env
        .gitignore
        /controllers
            /authentication
            /category
            /client
            /contact
            /order
            /product
            /purchased
        /dto
        index.ts
        /middleware
        /models
        nodemon.json
        package-lock.json
        package.json
        /repositories
            /authentication
            /category
            /client
            /contact
            /order
            /product
            /purchased
        /routes
            /authentication
            /category
            /client
            /contact
            /order
            /product
            /purchased
        tsconfig.json
    /front-end
        /public
        /src
            /api
                authentication.ts
                cart.ts
                category.ts
                clients.ts
                product.ts
                subscribe.ts
            /app
                /admin
                    /pages
                        /categories
                        /clients
                        /contacts
                        /dashboard
                        layout.tsx
                        /orders
                        /products
                        /purchased
                    layout.tsx
                    page.tsx
                /auth
                    /sign-in
                    /sign-up
                layout.tsx
                not-found.tsx
                page.tsx
            /components
            /data
            /lib
            middleware.ts
            /styles
            /types
        tailwind.config.ts
        tsconfig.json
    README.md
    .gitignore
    package.json
```

## Testing

No tests have been implemented in this project yet.
