This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🌍 UnityServe — Together We Make a Difference

<p align="center">
  <strong>Small Actions. Big Impact.</strong>
  <br />
  A community-driven platform connecting people with meaningful volunteer opportunities and social initiatives.
</p>

---

## ✨ About UnityServe

**UnityServe** is a community-focused volunteering platform designed to bring people together and make a positive impact on society.

It allows users to discover upcoming social events, participate in community initiatives, organize volunteer activities, and keep track of the events they have joined.

Whether it's distributing food, donating clothes, helping the environment, or supporting people in need, UnityServe makes it easier to turn good intentions into meaningful actions.

## 🚀 Key Features

- 🔐 **Authentication System** — Secure email/password authentication and Google sign-in using Better Auth.
- 📅 **Explore Events** — Browse upcoming volunteer events and discover opportunities to contribute.
- ❤️ **Join Events** — Participate in social initiatives and manage your volunteering activities.
- ➕ **Create Events** — Organize and publish community events.
- 📋 **Manage Events** — View, update, and delete events created by you.
- 👥 **Joined Events** — Track all the events you have joined in one place.
- 👤 **User Profile** — View and manage your account information.
- 🌓 **Dark & Light Mode** — Switch between themes for a comfortable browsing experience.
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop devices.
- ⚡ **Dynamic Data** — Fetch and display event information from the backend API.

## 🛠️ Technologies Used

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and application routing |
| React 19 | User interface development |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive layouts |
| shadcn/ui | Reusable UI components |
| Lucide React | Interface icons |
| React Icons | Additional icons |
| React Hot Toast | Notifications |

### Authentication & Backend

| Technology | Purpose |
|---|---|
| Better Auth | Authentication and session management |
| Express.js | Backend REST API |
| MongoDB | Database |
| JWT | Token-based API authentication |
| JOSE | JWT verification |

## 📂 Project Structure

```text
unity-serve/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── events/
│   │   ├── joined-events/
│   │   ├── manage-events/
│   │   ├── create-event/
│   │   ├── profile/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   ├── lib/
│   └── proxy.ts
├── .env
├── package.json
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run UnityServe locally.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd unity-serve
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# MongoDB
MONGODB_URL=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Google Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Important:** Replace the placeholder values with your actual credentials. Never commit your `.env` file or expose your secrets publicly.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
```

To start the production server locally:

```bash
npm run start
```

## 🔗 Backend API

UnityServe communicates with an Express.js backend to manage events and user activities.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/upcoming_events` | Get upcoming events |
| GET | `/upcoming_event/:id` | Get event details |
| POST | `/add-event` | Create an event |
| GET | `/my-events/:email` | Get events created by a user |
| PUT | `/my-events/:id` | Update an event |
| DELETE | `/my-events/:id` | Delete an event |
| POST | `/join-event/:id` | Join an event |
| GET | `/joined-events/:email` | Get joined events |
| DELETE | `/leave-event/:id` | Leave an event |

Protected API requests use JWT authentication.

## 🎨 Design & Experience

UnityServe uses a clean, modern interface with an **Emerald Green + Slate** color palette.

- Emerald green represents growth, hope, and positive change.
- Slate provides a balanced and professional visual foundation.
- Responsive layouts provide a consistent experience across devices.
- Dark mode offers an alternative viewing experience.

## 🔒 Security

- Better Auth handles user authentication and sessions.
- JWT tokens are used for protected backend requests.
- Environment variables store sensitive configuration.
- Protected application routes are handled through Next.js proxy.

## 🌱 Our Mission

We believe that meaningful change starts with small actions.

UnityServe aims to make volunteering more accessible by connecting people, communities, and opportunities in one place.

**Together, we can build a better community — one event at a time.**

---

<p align="center">
  Made with ❤️ for a better community.
  <br />
  <strong>UNITYSERVE — TOGETHER WE MAKE A DIFFERENCE</strong>
</p>
