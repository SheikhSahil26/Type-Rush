# ⚡ TypeRush 🧠⌨️

A real-time multiplayer typing race game where speed, accuracy, and thrill collide! Compete with friends or strangers, test your WPM, and climb the leaderboard 🏁

![Banner](./assets/Screenshot%202025-07-14%20141038.png)

---

## 🚀 Live Demo

> 🌐 [TypeRush Live](https://type-rush-three.vercel.app)  
> 🔗 [Frontend Code](./frontend) • [Backend Code](./backend)

---

## 🎮 Gameplay Preview

![Gameplay](./assets/Screenshot%202025-07-14%20141204.png)

Challenge opponents in a high-stakes race! Get real-time stats like **WPM**, **Accuracy**, and **Character Progress** as you type your way to victory.

---

## 🧩 Features

- 🧑‍🤝‍🧑 Real-time multiplayer typing rooms
- 🔐 Secure login & matchmaking
- 📈 Dynamic WPM & accuracy graphs
- 🏆 Animated results screen with rankings
- 🔔 Real-time notifications using Firebase
- 📊 Leaderboards and personal performance stats

---

## 🖼️ Screenshots

### 🏁 Room Lobby
> Invite or wait for an opponent to join...

![Room Preview](./assets/Screenshot%202025-07-14%20141224.png)

### 🏆 Results & Graphs
> See your performance over time with animated WPM and Accuracy charts.

![Game Results](./assets/Screenshot%202025-07-14%20141524.png)

---

## 🛠️ Tech Stack

| Frontend       | Backend        | Real-time DB    | Auth & Hosting |
|----------------|----------------|-----------------|----------------|
| React + Vite   | Express.js     | Firebase RTDB   | Firebase       |
| Tailwind CSS   | Node.js        | Realtime Events | JWT / Cookies  |
| Recharts       | REST APIs      |                 |                |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/typerush.git
cd typerush

# Setup frontend
cd frontend
npm install
npm run dev

# Setup backend
cd ../backend
npm install
npm run dev
