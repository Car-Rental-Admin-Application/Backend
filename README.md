# Vehicle Rental Management – Admin Microservices Platform

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Kafka](https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)

A secure admin authentication and vehicle management system built with:

- **NestJS** backend (microservices architecture)
- **MongoDB** database
- **GraphQL** API
- **JWT** authentication

## Features

- Microservices: Auth Service & Vehicle Service
- Auto-creation of initial superadmin (`admin/admin123`)
- Admin creation restricted to authenticated users
- Password hashing with bcrypt
- Protected GraphQL endpoints
- JWT token expiration (1 hour)
- Vehicle CRUD operations

## Installation

### Prerequisites

- Node.js v16+
- MongoDB (local or Docker)
- Yarn/NPM

### Step 1: Clone and Install Root Dependencies

```bash
# Clone repository
git clone https://github.com/Car-Rental-Admin-Application/Backend.git && cd Backend

# Install root dependencies
npm install
```

### Step 2: Install Vehicle Service Dependencies

```bash
# Change directory to vehicle-service
cd vehicle-service

# Install required packages
npm install @nestjs/graphql graphql apollo-server-express
npm install @nestjs/mongoose mongoose
npm install redis ioredis
npm install @nestjs/config
```

### Step 3: Install Auth Service Dependencies

```bash
# Change directory to auth-service
cd ../auth-service

# Install required packages
npm install @nestjs/passport passport passport-jwt
npm install @nestjs/mongoose mongoose
npm install bcrypt @types/bcrypt
npm install jsonwebtoken @types/jsonwebtoken
npm install @nestjs/config
npm install cookie-parser @types/cookie-parser
```

## Running the Project

Each microservice must be run in its own terminal. Make sure to change to the correct directory before starting each service.

### Start Vehicle Service

```bash
cd vehicle-service
npm run start:dev
```

### Start Auth Service

```bash
cd auth-service
npm run start:dev
```

> **Note:** Both services must be running simultaneously in different terminals.

## Conception & Microservices Architecture

This project is structured as a set of independent microservices:

- **Auth Service:** Handles authentication, admin management, and JWT issuance.
- **Vehicle Service:** Manages vehicle CRUD operations.

Each service has its own GraphQL API and runs on a separate port (default: 3000 for auth-service, 3001 for vehicle-service). This allows for independent scaling, deployment, and testing.

## GraphQL API Reference


### Vehicle Service (default: http://localhost:3001/graphql)

#### findAll

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

#### findOne

```graphql
query {
  vehicle(id: "6855208a7e95a553f3be7b79") {
    brand
    model
    year
  }
}
```

#### updateVehicle

```graphql
mutation {
  updateVehicle(
    id: "68551e907e95a553f3be7b73"
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

#### createVehicle

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

#### deleteVehicle

```graphql
mutation {
  deleteVehicle(id: "6855208a7e95a553f3be7b79") {
    model
  }
}
```


### Auth Service (default: http://localhost:3000/graphql)

#### login

```graphql
mutation {
  login(username: "admin", password: "admin123")
}
```

#### Token Usage

Add the following header to requests requiring authentication:

```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

#### createAdmin

```graphql
mutation {
  createAdmin(username: "newadmin", password: "newpass123")
}
```

## Conclusion

This project demonstrates the design, development, and deployment of a modern web application based on a microservices architecture, following current development and DevOps standards. The chosen theme is an **admin-side car rental management system**, providing secure authentication, vehicle management, and scalable service communication. The backend leverages NestJS, GraphQL, MongoDB, Redis, and JWT authentication, and is designed for extensibility and real-world deployment scenarios. This project also includes UML conception for architecture and service interactions.

## Authors

- Mohammed CHERKAOUI
- Wassim ZAAIT
- Yousra Msaouri Charroud

## License

MIT © VSMP
