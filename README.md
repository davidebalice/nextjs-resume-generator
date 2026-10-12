# Next.js Resume Generator

A resume builder built with Next.js. Enter your personal information, work experience, education and skills step by step, choose a theme color, then save, print and share your resume.

![Screenshot](https://www.aroundweb.it/screenshot/next-resume1.jpg)

![Screenshot](https://www.aroundweb.it/screenshot/next-resume2.jpg)

## Features

- Login with email and password (JWT stored in the browser)
- Dashboard with the list of your resumes
- Step-by-step editor: personal information, summary, experiences, education, skills
- Rich text editor for the summary and the job descriptions
- Theme color picker for each resume
- Skill levels (Poor, Basic, Moderate, Advanced, Expert)
- Live preview while editing
- Download/print the resume and copy a public link to share it
- Light/dark theme
- Optional demo mode that prevents changes to demo resumes

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router, Route Handlers, Server Actions)
- [React 18](https://react.dev/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) and [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components (Radix UI)
- [React Quill](https://github.com/zenoamaro/react-quill), [react-colorful](https://github.com/omgovich/react-colorful), [next-themes](https://github.com/pacocoursey/next-themes), [React Hot Toast](https://react-hot-toast.com/), [Lucide](https://lucide.dev/)

## Getting started

### Requirements

- Node.js 18 or later
- npm
- A MongoDB database (local or Atlas)

### Installation

```bash
git clone https://github.com/davidebalice/nextjs-resume-generator.git
cd nextjs-resume-generator
npm install
```

### Configuration

Create a `.env.local` file in the project root:

```env
DATABASE=mongodb://localhost:27017/resume-generator
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DEMO_MODE=false
```

| Variable                | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `DATABASE`              | MongoDB connection string                                 |
| `JWT_SECRET`            | Secret used to sign the authentication tokens             |
| `NEXT_PUBLIC_API_URL`   | Base URL of the app, used to call the auth API routes     |
| `NEXT_PUBLIC_DEMO_MODE` | `true` to block changes to resumes flagged as `demo`      |

There is no sign-up page: users are stored in the `users` collection (`name`, `surname`, `username`, `email`, `password` hashed with bcrypt).
A sample resume is available in `db/resumes.json` and can be imported into the `resumes` collection.

### Available scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create a production build            |
| `npm start`     | Start the app (runs `npm run dev`)   |
| `npm run lint`  | Run ESLint                           |

### Docker

```bash
docker build -t resume-generator .
docker run -p 3000:3000 --env-file .env.local resume-generator
```

## API endpoints

| Method | Endpoint                    | Description                                  |
| ------ | --------------------------- | -------------------------------------------- |
| POST   | `/api/auth/login`           | Log in with email and password, returns a JWT |
| GET    | `/api/auth/getCurrentUser`  | Return the logged-in user (`Authorization: Bearer <token>`) |

Resume data is read and written through Server Actions in `controller/resume.js`.

## Project structure

```
app/            # Pages (home, dashboard, resume create/edit/download, public resume) and API routes
components/     # Resume steps, previews, cards, navigation and UI components
context/        # Auth, resume and theme providers
controller/     # Server Actions for resumes
database/       # MongoDB connection
models/         # Mongoose models (User, Resume)
db/             # Sample data
```

## Author

**Davide Balice** – [davidebalice.dev](https://www.davidebalice.dev)
