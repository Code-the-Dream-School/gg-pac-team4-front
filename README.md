# TalentStudio: Front-End Repository

[Visit Website](https://gg-pac-team4-front-1.onrender.com)

Welcome to the front-end repository for **TalentStudio** — an innovative platform that connects students with passionate teachers in the world of arts. Our application isn’t just about making connections — it’s about fostering a rich learning environment where students can enhance their artistic journeys, while teachers efficiently organize their lessons.

This repository contains the **React.js application** code, which interfaces with our [Back-End Repository](https://github.com/Code-the-Dream-School/gg-pac-team4-back).

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Key Features](#key-features)
3. [Quick Start](#quick-start)
4. [Presentation](#presentation)
5. [Authors](#authors)

## Technologies Used

Our front-end is powered by a suite of modern tools and libraries to ensure a responsive, efficient, and visually appealing user experience:

- **Core Frameworks:**
  - `React` - A JavaScript library for building user interfaces, ensuring a reactive and component-based architecture.
  - `React DOM` - Serves as the entry point to the DOM and server renderers for React.

- **Routing and Navigation:**
  - `React Router Dom` - Enables dynamic routing in a web app, which is critical for single-page applications.

- **Real-time Communication:**
  - `Socket.io` - A library for real-time, bidirectional communication between clients and servers, ensuring a seamless, live interaction experience.

- **HTTP Requests:**
  - `Axios` - Promise-based HTTP client for making requests to back-end services.

- **UI Components and Design:**
  - `React tailwindcss select` -  A select input made with Tailwindcss and React.
  - `React modal` - Accessible modal dialog component for React.JS.

- **Styling and CSS Frameworks:**
  - `Tailwind CSS` - A utility-first CSS framework for rapid UI development.

- **Development and Build Tools:**
  - `Vite` - A modern front-end build tool that provides a faster and leaner development experience.
  - `ESLint` - Linting utility for JavaScript and JSX, with plugins for React-specific linting.
  - `Prettier` - An opinionated code formatter to ensure code style consistency.

## Development Scripts

This project includes several NPM scripts to facilitate development, testing, and production builds. Below is a breakdown of the available scripts:

- **`start`**:  
  Serves the production build of the project from the `dist` directory using the `serve` package. Use this after running a build to test the production version locally.  
  ```bash
  npm start

- **`dev`**:  
  Starts the Vite development server for local development. This provides fast hot module replacement (HMR) and a quick feedback loop during development. 
  ```bash
  npm run dev

- **`build`**:  
  Builds the project for production using Vite. The output is optimized for deployment and placed in the **`dist`** directory.
  ```bash
  npm run dev

- **`format`**:  
  Runs Prettier to automatically format all supported files in the project according to the project's Prettier configuration.
  ```bash
  npm run format

- **`lint`**:  
  Runs ESLint to lint all JavaScript and JSX files in the project. The **`--max-warnings 0`** option ensures that any warnings will cause the linting process to fail, encouraging clean code.
  ```bash
  npm run lint

- **`preview`**:  
  Serves the built application locally, using Vite’s preview command. This simulates a production environment for testing purposes.
  ```bash
  npm run preview

This configuration utilizes modern technologies and tools to optimize the development process and boost the application's performance.

## Key Features

### Effortless Registration and Profile Creation

- **Sign Up**: Users can sign up as either a student or a teacher. After completing the registration, they will be redirected to the login page. Upon successful login, users gain full access to the dashboard. In case of a forgotten password, they can request a reset link via email and log in with a newly created password.
- **Edit Profile**: Users can update their personal information, upload the their photo.
- **Add Portfolio and Welcome Video**: Showcase skills with portfolio items and an introduction video.
- **Class Management**: Users can add, edit, or delete classes.

### Search Functionality

- All users can explore classes tailored to their artistic interests by browsing categories on the main page or using the search bar with relevant keywords. 
- Detailed class information and teacher profiles are accessible exclusively to logged-in users.

### Effortless Lesson Browsing and Booking

- After registering, students gain access to detailed lesson information and can easily request bookings by submitting a simple form. 
- Teachers receive these requests in their My Applications section, where they can choose to approve or decline them. Once approved, the lessons are added to the student's profile, allowing them to view and manage all their enrolled classes with ease.

### Integrated Communication and Notifications

- Our platform features a built-in messaging system for real-time interactions between students and teachers.
- A robust notification system ensures that users are promptly informed about class requests, approvals, and other significant updates, facilitating seamless coordination and engagement.

## Quick Start

### Setup

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**: Run `npm install` to install all required dependencies.
3. **Start the Development Server**: Run `npm run dev` to start the development server on `localhost:5173`.
4. **Explore the Application**: Navigate through the application to explore its features.

### Additional Configuration

- Ensure the back-end server is running as per the instructions in our [Back-End Repository](https://github.com/Code-the-Dream-School/gg-pac-team4-back).

### Environment Variables

To properly run this application, you need to set up environment variables. This is done by creating a `.env` file in the root directory of the project with the following variables:

- **`VITE_API_BASE_URL`**:  
  This is the base URL for the API. In development, it points to your local backend.
  ```bash
  VITE_API_BASE_URL=http://localhost:8000/api/v1

- **`VITE_FRONTEND_URL`**:  
  This is the URL where your front-end application is served during development.
  ```bash
  VITE_FRONTEND_URL=http://localhost:5173

- **`VITE_CLIENT_ID`**:  
  This is your client ID used for authentication purposes. Replace your_ClienT_ID with the actual client ID provided by your authentication service.
  ```bash
  VITE_CLIENT_ID=your_ClienT_ID

---
## Presentation
- [Final Presentation Slides](https://docs.google.com/presentation/d/10YtT_JwBUy68j0Cfj-cmbwI22-Gy1HeS8je2AlQ_QJA/edit#slide=id.p2)

---

## Authors

- [Elena Bychenkova](https://github.com/ElenaByc)
- [Maria Doronkina](https://github.com/mariyador)
- [Oksana Feterovskaya](https://github.com/ofeterovskaya)
- [Tetiana Andriyanova](https://github.com/Tanyaa-a)
- [Valentina Rudnitskaya](https://github.com/vrudnitskaya)
