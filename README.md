# 🎙️ Podcaster — AI Voice Podcast Generator

Podcaster is an AI-powered podcast creation platform that allows users to generate, manage, and listen to podcasts using synthetic voices. Built with **Next.js**, it integrates modern third-party services like **Clerk** for authentication, **Convex** for backend logic, and **Eleven Labs** for lifelike AI voices.

> 🚀 This is my **first Next.js app** and my **first project using third-party services** like Clerk, Convex, and Eleven Labs — a milestone in my developer journey.

---

## 🌟 Features

- 🔐 **Authentication** – Secure sign-up and login with [Clerk](https://clerk.dev)
- ☁️ **Backend** – Real-time podcast storage and management using [Convex](https://convex.dev)
- 🧠 **AI Voices** – Create podcasts using 7–8 AI voice models powered by [Eleven Labs](https://elevenlabs.io)
- ➕➖ **Add/Delete Podcasts** – Manage your AI-generated podcasts with ease
- 🖥️ **Responsive Design** – Works beautifully on mobile, tablet, and desktop
- 🎧 **Interactive UI** – Smooth audio playback and dynamic podcast interface
- 🛠️ **Clean Tech Stack** – Built using Tailwind CSS and modern React practices

---

## 🛠 Tech Stack

- **Framework**: Next.js
- **Auth**: Clerk
- **Backend**: Convex
- **AI Voices**: Eleven Labs
- **Styling**: Tailwind CSS

---

## 📦 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Ajinkya-909/Ajinkya-909/Next-Js-Poadcaster-Project.git
cd podcaster

# 2. Install dependencies
npm install

# 3. Set up environment variables
touch .env.local

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api

NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

ELEVENLABS_API_KEY=your_elevenlabs_api_key

# 4. Run the development server
npm run dev
