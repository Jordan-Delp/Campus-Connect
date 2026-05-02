# CampusConnect

CampusConnect is a full-stack marketplace web application designed for university students to buy and sell items such as textbooks, electronics, housing, services, and more.

Built with **Next.js 15 (App Router)**, **MongoDB**, **NextAuth.js**, and **Tailwind CSS**, the project features listing management, authentication, mobile responsiveness, toast notifications, and demo listings on initial launch.

---

## Features

- Secure authentication via NextAuth.js (Credentials)
- Create, edit, and delete listings
- Search + filter listings by category and keywords
- Contact seller via email link
- Fully responsive mobile UI
- Seed demo listings for quick preview
- Toast feedback for all key actions

---

## Live Demo

 https://campus-connect-prod.vercel.app

---

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Node.js API routes (in Next.js)
- **Database:** MongoDB with Mongoose
- **Auth:** NextAuth.js (Credentials Provider)
- **Storage:** Cloudinary (cloud image hosting)

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/Jordan-Delp/Campus-Connect.git
cd Campus-Connect
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

Create a `.env.local` file in the root directory and add the following:

```
MONGODB_URI=your_mongo_connection_string
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=generate_a_secure_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> See `.env.example` for all required variables and where to find them.

You can generate a secure secret with:

```bash
openssl rand -base64 32
```

### 4. Seed demo listings (optional)

```bash
MONGODB_URI="your_mongo_connection_string" npx tsx scripts/seed.ts 
```

> This will populate your database with 3 demo listings (MacBook, Textbook, Mini Fridge).

### 5. Run the development server

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000)

---


## 🧠 Lessons & Highlights

- Implemented SSR and API logic with App Router (`app/` folder)
- Handled secure credentials-based auth with JWT via NextAuth
- Improved UX with toast notifications (react-hot-toast)
- Used Tailwind + responsive classes for mobile-friendly design

---

## 📁 Folder Structure

```
src/
|── app/               # App router pages
|── components/        # Reusable UI components
|── lib/               # DB and auth utilities
|── models/            # Mongoose models (Listing, User)
|── scripts/           # Seed script for demo data
```

---

## 💡 Future Improvements

- Search engine optimization (SEO metadata)
- Pagination or infinite scroll
- Admin/moderation tools

---

## 👤 Author

Jordan Delp

- [GitHub](https://github.com/Jordan-Delp)
- [LinkedIn](https://www.linkedin.com/in/jordandelp03/)

---

## 📄 License

MIT License
