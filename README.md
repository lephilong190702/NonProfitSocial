# 🌍 Nonprofit Social Network

A full-stack charity platform where users can **donate to charity projects**, **watch livestreams**, and **connect with others** through a real-time social network.
---

## ✨ Key Features

- 🔍 **Browse Projects** – Explore charity initiatives with full details.
- 💳 **Donate via VNPay** – Secure online payment integration.
- 📺 **Livestream Events** – Engage in live charity fundraising.
- 💬 **Chat System** – Real-time messaging using Firebase & WebSocket.
- 🛠 **Admin Dashboard** – Manage users, projects, and donations.

---

## 🏗️ System Architecture

| Layer             | Technologies                                                                 |
|------------------|------------------------------------------------------------------------------|
| **Frontend**      | ReactJS (User portal), Thymeleaf + Bootstrap 4 (Admin dashboard)             |
| **Backend**       | Java Spring Boot, REST APIs, Spring Security, JWT                            |
| **Database**      | MySQL (Relational DBMS with ER modeling)                                     |
| **Realtime**      | Firebase Cloud Messaging, WebSocket                                          |
| **Payment**       | VNPay integration                                                            |
| **Deployment**    | Docker, Kubernetes (AKS), Jenkins CI/CD pipeline                             |

---

## 🔐 Security Implementation

- ✅ JWT-based authentication & authorization.
- ✅ Role-based access control (Admin, User, Donor).
- ✅ Secure token handling and input validation via Spring Security.

---

## 🚀 CI/CD & Deployment

- 🐳 **Docker** – Containerized backend, frontend, and admin panel.
- ☸️ **Kubernetes** – Deployed on Azure Kubernetes Service (AKS).
- ⚙️ **Jenkins** – Automated CI/CD pipeline with environment configuration.

---

## 📁 Project Structure

