# Vehicle Rental Management – Admin Microservices Platform

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Kafka](https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A secure admin authentication and vehicle management system built with NestJS microservices architecture.

## 📹 Video Demo

Watch the project in action: [Video Simulation](https://drive.google.com/file/d/1vzehjbfMX59Zdu3V8vLfS_7oZBIT_Nt_/view?usp=sharing)

## 📋 Table of Contents

- [What This Project Does](#-what-this-project-does)
- [What You Need to Install](#-what-you-need-to-install)
- [How to Run Locally (Step by Step)](#-how-to-run-locally-step-by-step)
- [How to Run with Docker (Step by Step)](#-how-to-run-with-docker-step-by-step)
- [How to Test Your Services](#-how-to-test-your-services)
- [What Each Service Does](#-what-each-service-does)
- [Troubleshooting](#-troubleshooting)
- [Authors & License](#-authors--license)

## 🎯 What This Project Does

This project is a **microservices system** with three main services:

1. **Auth Service** - Handles admin login and user management
2. **Vehicle Service** - Manages vehicle information (add, edit, delete vehicles)
3. **Log Service** - Handles logging and monitoring

Each service runs independently and communicates through a shared database (MongoDB).

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │ Vehicle Service │    │   Log Service   │
│   (Port 4001)   │    │   (Port 4003)   │    │   (Port 4002)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌─────────────────────────────────────────────────────┐
         │              Infrastructure Layer                   │
         ├─────────────────┬─────────────────┬─────────────────┤
         │    MongoDB      │     Redis       │     Kafka       │
         │   (Port 27017)  │   (Port 6379)   │   (Port 9092)   │
         └─────────────────┴─────────────────┴─────────────────┘
```

## 📦 What You Need to Install

### Option 1: Local Development

- **Node.js** (version 18 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **MongoDB** - Download from [mongodb.com](https://mongodb.com/)
- **Redis** - Download from [redis.io](https://redis.io/)
- **Apache Kafka** - Download from [kafka.apache.org](https://kafka.apache.org/)

### Option 2: Docker (Recommended for Beginners)

- **Docker Desktop** - Download from [docker.com](https://docker.com/)
- That's it! Docker will handle everything else for you.

## 🚀 How to Run Locally (Step by Step)

### Step 1: Download the Project

```bash
# Download the project files
git clone https://github.com/Car-Rental-Admin-Application/Backend.git
cd Backend
```

### Step 2: Install Dependencies

```bash
# Go to each service folder and install packages
cd auth-service
npm install

cd ../vehicle-service
npm install

cd ../log-service
npm install

cd ..
```

### Step 3: Start MongoDB

```bash
# Start MongoDB on your computer
# On Windows: Start MongoDB service
# On Mac/Linux: mongod
```

### Step 4: Start Redis

```bash
# Start Redis on your computer
# On Windows: Start Redis service
# On Mac/Linux: redis-server
```

### Step 5: Start Kafka

```bash
# Start Zookeeper first
zookeeper-server-start.sh config/zookeeper.properties

# Then start Kafka
kafka-server-start.sh config/server.properties
```

### Step 6: Start the Services

Open three separate terminal windows:

**Terminal 1 - Auth Service (Port 3001):**

```bash
cd auth-service
set PORT=3001 && npm run start:dev
```

**Terminal 2 - Vehicle Service (Port 3002):**

```bash
cd vehicle-service
set PORT=3002 && npm run start:dev
```

**Terminal 3 - Log Service (Port 3003):**

```bash
cd log-service
set PORT=3003 && npm run start:dev
```

**💡 Note**: We set different ports for each service to avoid conflicts:

- Auth Service: Port 3001
- Vehicle Service: Port 3002
- Log Service: Port 3003

### Step 7: Test Your Services

Open your web browser and go to:

- **Auth Service**: http://localhost:3001/graphql
- **Vehicle Service**: http://localhost:3002/graphql
- **Log Service**: http://localhost:3003

**💡 Recommendation**: Use the Docker setup below instead - it handles all port conflicts automatically!

## 🐳 How to Run with Docker (Step by Step)

### Option 1: Build from Source (Recommended for Development)

### Step 1: Install Docker Desktop

1. Go to [docker.com](https://docker.com/)
2. Download Docker Desktop for your operating system
3. Install and start Docker Desktop
4. Wait for Docker to finish starting (you'll see a green "Docker Desktop is running" message)

### Step 2: Download the Project

```bash
# Download the project files
git clone https://github.com/Car-Rental-Admin-Application/Backend.git
cd Backend
```

### Step 3: Start Everything with One Command

```bash
# This command will:
# 1. Download all required images (MongoDB, Redis, Kafka, etc.)
# 2. Build your services
# 3. Start everything automatically
docker-compose up --build
```

**What happens when you run this command:**

- Docker downloads MongoDB, Redis, Kafka, and Zookeeper images
- Docker builds your three services (auth, vehicle, log)
- All services start and connect to each other automatically
- You'll see logs from all services in your terminal

### Option 2: Use Pre-built Images from Docker Hub

### Step 1: Install Docker Desktop

1. Go to [docker.com](https://docker.com/)
2. Download Docker Desktop for your operating system
3. Install and start Docker Desktop

### Step 2: Pull and Run Pre-built Images

```bash
# Pull the latest images from Docker Hub
docker pull mohammed761/backend-auth-service:latest
docker pull mohammed761/backend-vehicle-service:latest
docker pull mohammed761/backend-log-service:latest

# Or pull the versioned images
docker pull mohammed761/backend-auth-service:vehicle-rental-v1
docker pull mohammed761/backend-vehicle-service:vehicle-rental-v1
docker pull mohammed761/backend-log-service:vehicle-rental-v1
```

### Step 3: Start Infrastructure Services

```bash
# Start MongoDB, Redis, and Kafka
docker run -d --name mongodb -p 27017:27017 mongo
docker run -d --name redis -p 6379:6379 redis
docker run -d --name zookeeper -p 2181:2181 confluentinc/cp-zookeeper:7.3.0
docker run -d --name kafka -p 9092:9092 --link zookeeper:zookeeper confluentinc/cp-kafka:7.3.0
```

### Step 4: Start Your Services

```bash
# Start Auth Service
docker run -d --name auth-service -p 4001:3000 \
  -e MONGODB_URI=mongodb://mongodb:27017/admin_auth \
  --link mongodb:mongodb \
  mohammed761/backend-auth-service:latest

# Start Vehicle Service
docker run -d --name vehicle-service -p 4003:3000 \
  -e MONGODB_URI=mongodb://mongodb:27017/vehicle_db \
  --link mongodb:mongodb \
  mohammed761/backend-vehicle-service:latest

# Start Log Service
docker run -d --name log-service -p 4002:3000 \
  -e MONGODB_URI=mongodb://mongodb:27017/logs_db \
  --link mongodb:mongodb \
  mohammed761/backend-log-service:latest
```

### Step 4: Wait for Everything to Start

You'll see messages like:

```
auth-service-1     | [Nest] 1234   - 06/21/2025, 12:34:56 AM   [NestApplication] Nest application successfully started
vehicle-service-1  | [Nest] 1234   - 06/21/2025, 12:34:57 AM   [NestApplication] Nest application successfully started
log-service-1      | [Nest] 1234   - 06/21/2025, 12:34:58 AM   [NestApplication] Nest application successfully started
```

When you see these messages, your services are ready!

### Step 5: Access Your Services

Open your web browser and go to:

| Service             | URL                           | What You'll See                 |
| ------------------- | ----------------------------- | ------------------------------- |
| **Auth Service**    | http://localhost:4001/graphql | GraphQL playground for login    |
| **Vehicle Service** | http://localhost:4003/graphql | GraphQL playground for vehicles |
| **Log Service**     | http://localhost:4002         | Simple welcome page             |

### Step 6: Stop Everything (When You're Done)

```bash
# Press Ctrl+C in the terminal where docker-compose is running
# Or open a new terminal and run:
docker-compose down
```

## 📦 Docker Hub Images

This project's Docker images are available on Docker Hub:

### **Latest Images:**

- `mohammed761/backend-auth-service:latest`
- `mohammed761/backend-vehicle-service:latest`
- `mohammed761/backend-log-service:latest`

### **Versioned Images:**

- `mohammed761/backend-auth-service:vehicle-rental-v1`
- `mohammed761/backend-vehicle-service:vehicle-rental-v1`
- `mohammed761/backend-log-service:vehicle-rental-v1`

### **Docker Hub Links:**

- [Auth Service Repository](https://hub.docker.com/r/mohammed761/backend-auth-service)
- [Vehicle Service Repository](https://hub.docker.com/r/mohammed761/backend-vehicle-service)
- [Log Service Repository](https://hub.docker.com/r/mohammed761/backend-log-service)

## 🧪 How to Test Your Services

**📹 Watch the video demo first**: [Video Simulation](https://drive.google.com/file/d/1vzehjbfMX59Zdu3V8vLfS_7oZBIT_Nt_/view?usp=sharing)

### Testing Auth Service

1. **Open**: http://localhost:4001/graphql
2. **You'll see**: A GraphQL playground interface

#### Login

```graphql
mutation {
  login(username: "admin", password: "admin123")
}
```

#### Create Admin

```graphql
mutation {
  createAdmin(username: "newadmin", password: "newpass123")
}
```

#### Using JWT Token

For protected operations, add this header:

```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

### Testing Vehicle Service

1. **Open**: http://localhost:4003/graphql
2. **You'll see**: A GraphQL playground interface

#### Get All Vehicles

```graphql
query {
  vehicles {
    model
    brand
    year
    status
    price
  }
}
```

#### Get One Vehicle

```graphql
query {
  vehicle(id: "6855f47dc77f9bf3495dc69b") {
    brand
    model
    year
  }
}
```

#### Create Vehicle

```graphql
mutation {
  addVehicle(
    input: {
      model: "Duster"
      brand: "Dacia"
      year: 2023
      price: 23000
      status: "sold"
      image: "duster.jpg"
      km: 70
    }
  ) {
    model
  }
}
```

#### Update Vehicle

```graphql
mutation {
  updateVehicle(
    id: "6855f47dc77f9bf3495dc69b"
    input: {
      model: "Divo"
      brand: "Bugatti"
      year: 2020
      status: "sold"
      price: 5800000
      image: "divo.jpg"
      km: 0
    }
  ) {
    model
  }
}
```

#### Delete Vehicle

```graphql
mutation {
  deleteVehicle(id: "6855f47dc77f9bf3495dc69b")
}
```

### Testing Log Service

1. **Open**: http://localhost:4002
2. **Expected result**: You'll see a welcome message

### Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 📋 What Each Service Does

### Auth Service (Port 4001)

- **Purpose**: Handles admin login and authentication
- **What it does**:
  - Lets admins log in with username/password
  - Creates new admin accounts
  - Returns JWT tokens for authentication
- **Default admin**: username: `admin`, password: `admin123`

### Vehicle Service (Port 4003)

- **Purpose**: Manages vehicle information
- **What it does**:
  - Shows all vehicles in the system
  - Adds new vehicles
  - Updates vehicle information
  - Deletes vehicles
- **Vehicle data**: model, price, status (available/sold/maintenance)

### Log Service (Port 4002)

- **Purpose**: Handles logging and monitoring
- **What it does**:
  - Receives log messages from other services
  - Stores logs in the database
  - Provides a simple health check endpoint

## 🔧 Troubleshooting

### "Server cannot be reached" Error

**Problem**: You can't access the GraphQL playground
**Solution**:

1. Make sure Docker is running
2. Wait 30-60 seconds for all services to start
3. Try refreshing the page
4. Check if ports 4001, 4002, 4003 are not used by other applications

### "Connection refused" Error

**Problem**: Services can't connect to MongoDB
**Solution**:

1. Make sure all Docker containers are running: `docker-compose ps`
2. Restart everything: `docker-compose down && docker-compose up --build`

### "Cannot find module" Error

**Problem**: Missing dependencies
**Solution**:

1. Make sure you ran `docker-compose up --build` (not just `docker-compose up`)
2. Check that all package.json files exist in each service folder

### Services Won't Start

**Problem**: Docker containers keep stopping
**Solution**:

1. Check Docker Desktop is running
2. Make sure you have enough disk space
3. Try: `docker system prune` to clean up Docker cache
4. Restart Docker Desktop

## 👥 Authors & License

### Authors

- **Mohammed CHERKAOUI** - _DevOps_ - [https://github.com/mohammed761-dl]
- **Wassim ZAAIT** - _BackEnd_ - [https://github.com/psyphonz]
- **Yousra Msaouri Charroud** - _Frontend_ - [https://github.com/yousraMsaouri]

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**💡 Tip for Beginners**: Start with the Docker method - it's easier and handles all the complex setup for you automatically!
