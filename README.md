# Vehicle Rental Management – Admin Microservices Platform

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Kafka](https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A secure admin authentication and vehicle management system built with NestJS microservices architecture.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Local Development Setup](#-local-development-setup)
- [Docker Setup](#-docker-setup)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Authors & License](#-authors--license)

## ✨ Features

- **🔐 Secure Authentication**: JWT-based admin authentication
- **🚗 Vehicle Management**: Complete CRUD operations for vehicles
- **📊 Logging System**: Centralized logging with Kafka integration
- **🔄 Microservices**: Scalable architecture with separate services
- **📈 GraphQL API**: Modern API with GraphQL playground
- **🗄️ MongoDB**: NoSQL database for flexible data storage
- **⚡ Redis**: High-performance caching
- **🐳 Docker Ready**: Containerized deployment

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

## 📋 Prerequisites

### For Local Development

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (running locally or cloud)
- Redis (running locally or cloud)
- Apache Kafka (running locally or cloud)

### For Docker Setup

- Docker Desktop
- Docker Compose

## 🚀 Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd Backend

# Install dependencies for all services
cd auth-service && npm install && cd ..
cd vehicle-service && npm install && cd ..
cd log-service && npm install && cd ..
```

### 2. Start Infrastructure Services

Start MongoDB, Redis, and Kafka locally or use Docker:

```bash
# Using Docker for infrastructure only
docker run -d --name mongodb -p 27017:27017 mongo
docker run -d --name redis -p 6379:6379 redis
docker run -d --name zookeeper -p 2181:2181 confluentinc/cp-zookeeper:7.3.0
docker run -d --name kafka -p 9092:9092 --link zookeeper:zookeeper confluentinc/cp-kafka:7.3.0
```

### 3. Configure Environment Variables

Create `.env` files in each service directory:

**auth-service/.env:**

```env
MONGODB_URI=mongodb://localhost:27017/admin_auth
JWT_SECRET=your-secret-key
```

**vehicle-service/.env:**

```env
MONGODB_URI=mongodb://localhost:27017/vehicle_db
```

**log-service/.env:**

```env
MONGODB_URI=mongodb://localhost:27017/logs_db
```

### 4. Start Services

```bash
# Terminal 1 - Auth Service
cd auth-service && npm run start:dev

# Terminal 2 - Vehicle Service
cd vehicle-service && npm run start:dev

# Terminal 3 - Log Service
cd log-service && npm run start:dev
```

### 5. Access Services

| Service             | URL                           | Description                       |
| ------------------- | ----------------------------- | --------------------------------- |
| **Auth Service**    | http://localhost:3000/graphql | Authentication & admin management |
| **Vehicle Service** | http://localhost:3000/graphql | Vehicle CRUD operations           |
| **Log Service**     | http://localhost:3000         | Logging endpoint                  |

## 🐳 Docker Setup

### 1. Prerequisites

- Docker Desktop installed and running
- No local Node.js installation required

### 2. Start All Services

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

### 3. Access Services

| Service             | URL                           | Description                       |
| ------------------- | ----------------------------- | --------------------------------- |
| **Auth Service**    | http://localhost:4001/graphql | Authentication & admin management |
| **Vehicle Service** | http://localhost:4003/graphql | Vehicle CRUD operations           |
| **Log Service**     | http://localhost:4002         | Logging endpoint                  |
| **MongoDB**         | localhost:27017               | Database (direct access)          |
| **Redis**           | localhost:6379                | Cache (direct access)             |
| **Kafka**           | localhost:9092                | Message broker                    |

### 4. Docker Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs
docker-compose logs auth-service

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build
```

## 🧪 Testing

### GraphQL Playground Testing

Open the GraphQL Playground in your browser and test the following queries:

#### Auth Service (http://localhost:4001/graphql)

**Login:**

```graphql
mutation {
  login(username: "admin", password: "admin123")
}
```

**Create Admin:**

```graphql
mutation {
  createAdmin(username: "newadmin", password: "password123")
}
```

#### Vehicle Service (http://localhost:4003/graphql)

**Get All Vehicles:**

```graphql
query {
  vehicles {
    id
    model
    price
    status
  }
}
```

**Create Vehicle:**

```graphql
mutation {
  createVehicle(
    input: { model: "Tesla Model 3", price: 45000, status: "available" }
  ) {
    id
    model
    price
    status
  }
}
```

**Update Vehicle:**

```graphql
mutation {
  updateVehicle(
    id: "VEHICLE_ID_HERE"
    input: { model: "Tesla Model 3 Updated", price: 47000, status: "sold" }
  ) {
    id
    model
    price
    status
  }
}
```

**Delete Vehicle:**

```graphql
mutation {
  deleteVehicle(id: "VEHICLE_ID_HERE")
}
```

### Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 📚 API Documentation

### Auth Service Endpoints

| Method | Endpoint   | Description                         |
| ------ | ---------- | ----------------------------------- |
| `POST` | `/graphql` | GraphQL endpoint for authentication |

**Available Operations:**

- `login(username: String!, password: String!): String!` - Login and get JWT token
- `createAdmin(username: String!, password: String!): Admin!` - Create new admin

### Vehicle Service Endpoints

| Method | Endpoint   | Description                             |
| ------ | ---------- | --------------------------------------- |
| `POST` | `/graphql` | GraphQL endpoint for vehicle operations |

**Available Operations:**

- `vehicles: [Vehicle!]!` - Get all vehicles
- `vehicle(id: String!): Vehicle` - Get vehicle by ID
- `createVehicle(input: CreateVehicleInput!): Vehicle!` - Create new vehicle
- `updateVehicle(id: String!, input: UpdateVehicleInput!): Vehicle!` - Update vehicle
- `deleteVehicle(id: String!): Boolean!` - Delete vehicle

### Log Service Endpoints

| Method | Endpoint | Description  |
| ------ | -------- | ------------ |
| `GET`  | `/`      | Health check |
| `POST` | `/logs`  | Log endpoint |

## 🔧 Environment Variables

The services use the following environment variables (configured in docker-compose.yml):

| Variable      | Description               | Default          |
| ------------- | ------------------------- | ---------------- |
| `NODE_ENV`    | Node environment          | `production`     |
| `PORT`        | Service port              | `3000`           |
| `MONGODB_URI` | MongoDB connection string | Service-specific |

## 👥 Authors & License

### Authors

- **Your Name** - _Initial work_ - [YourGitHub](https://github.com/yourusername)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This project is designed for educational and development purposes. For production use, ensure proper security measures, environment variable management, and database backups are implemented.
