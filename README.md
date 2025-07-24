# Kanban Board Demo App

A modern Kanban board web app built with React, Vite, and TypeScript. This project demonstrates a simple, persistent Kanban workflow with user authentication and per-user data storage, all using localStorage for demo purposes.

---

## Features

- **User Registration & Login**

  - Register a new account or log in with an existing one.
  - Usernames are case-insensitive and trimmed.
  - Each user's board data is private and persistent.

- **Kanban Board**

  - Three columns: Unstarted, In Progress, Completed.
  - Add, edit, and delete tickets (tasks).
  - Drag and drop tickets between columns.
  - Edit ticket details and status (column) in-place.
  - All board data is saved to localStorage and tied to the logged-in user.

- **Responsive UI**
  - Modern, clean design with a sticky header and modal forms.
  - Works on desktop and mobile browsers.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Setup

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd kanban-board
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser to [http://localhost:5173](http://localhost:5173)

---

## Usage

1. **Register** a new account with a username and password.
2. **Log in** with your credentials.
3. Add, edit, drag, and delete tickets on your personal Kanban board.
4. Log out and log back in to see your data persist.

---

## Authentication Logic (Demo-Only)

> **Note:** This app uses a very basic authentication system for demonstration purposes only. **Do not use this approach in production.**

- **How it works:**

  - All users are stored in localStorage as an array of `{ username, password }` objects.
  - When you register, your username and password are saved in localStorage.
  - When you log in, the app checks for a matching username and password in localStorage.
  - The current session is stored as the username in localStorage.
  - Each user's board data is stored under a key like `kanban_tickets_{username}`.

- **Limitations:**

  - **No encryption:** Passwords are stored in plain text in the browser's localStorage.
  - **No security:** Anyone with access to your browser can view or modify user data.
  - **No backend:** All data is local to your browser; there is no server or real authentication.
  - **No password reset or email verification.**

- **Why?**
  - This approach is for learning, prototyping, and demoing UI/UX only.
  - It allows you to see how authentication and per-user data might work in a real app, but without any real security.

---

## Folder Structure

```
kanban-board/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── KanbanBoard.tsx
│   │   ├── LoginForm.tsx
│   │   └── TicketCard.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

---

## License

This project is open source and free to use for learning and demo purposes.
