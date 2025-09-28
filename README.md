# MonkeyTracker Pro

This is a full-stack React application for tracking and managing data about monkeys, built entirely with Manifest as the backend.

## Features

- **User Authentication**: Researchers can sign up and log in to manage their data.
- **Monkey Management**: CRUD functionality for adding, viewing, updating, and deleting monkey records.
- **Troop Organization**: Group monkeys into troops to track social structures.
- **Ownership**: Researchers can only edit or delete the monkey records they create.
- **Admin Panel**: A complete admin interface is available at `/admin` for managing all users, troops, and monkeys.

## Backend (Manifest)

The backend is defined in `manifest.yml` and includes three main entities:

- **User**: An authenticable entity representing researchers or admins.
- **Troop**: Represents a group of monkeys.
- **Monkey**: The core entity for tracking individual monkeys, with properties for name, species, age, and a photo. It has `belongsTo` relationships with `User` (owner) and `Troop`.

Policies are configured to ensure data integrity and proper access control based on user roles and ownership.

## Frontend (React)

The frontend is a single-page application built with React and Vite, using Tailwind CSS for styling.

- **`App.jsx`**: The main component that handles state management, routing logic, and communication with the Manifest backend via the `@mnfst/sdk`.
- **`screens/LandingPage.jsx`**: A public-facing page with a demo login button.
- **`screens/DashboardPage.jsx`**: The main interface for authenticated researchers to manage their monkey data.

## Getting Started

1.  **Run the backend**: The Manifest backend should already be running.
2.  **Install dependencies**: `npm install`
3.  **Run the frontend**: `npm run dev`
4.  **Access the app**: Open your browser to `http://localhost:5173`.

### Default Credentials

- **Researcher**: `researcher@manifest.build` / `researcher`
- **Admin**: `admin@manifest.build` / `admin` (Access the admin panel at `<BACKEND_URL>/admin`)
