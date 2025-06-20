# Admin Authentication System

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

A secure admin authentication system built with:
- **NestJS** backend
- **MongoDB** database
- **GraphQL** API
- JWT authentication

## Features

- Auto-creation of initial superadmin (`admin/admin123`)
- Admin creation restricted to authenticated users
- Password hashing with bcrypt
- Protected GraphQL endpoints
- JWT token expiration (1 hour)

## Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (local or Docker)
- Yarn/NPM

### Installation
```bash
# Clone repository
git clone https://github.com/Car-Rental-Admin-Application/Backend.git && cd Backend

# Install dependencies
npm install

# Environment setup (create .env file)
cp .env.example .env
```

### Configuration
`.env` file:
```ini
MONGODB_URI=mongodb://localhost:27017/admin_auth
JWT_SECRET=your-strong-secret-here
```

### Running the App
```bash
# Start in development mode
npm run start:dev

# Production build
npm run build && npm run start:prod
```

## GraphQL API Reference

### Authentication
| Operation | Query/Mutation | Parameters |
|-----------|----------------|------------|
| Login | `mutation { login(username, password) }` | Returns JWT token |
| Create Admin | `mutation { createAdmin(username, password) }` | Requires authentication |

### Example Requests
```graphql
# Login
mutation {
  login(username: "admin", password: "admin123") {
    access_token
  }
}

# Create new admin (add Authorization header)
mutation {
  createAdmin(username: "staff", password: "staff123")
}
```

## Testing
1. Access GraphQL Playground: `http://localhost:3000/graphql`
2. Verify initial admin exists in MongoDB:
   ```bash
   mongosh admin_auth --eval "db.admins.find()"
   ```
3. Test protected routes with/without tokens

## Project Structure
```
src/
├── auth/
│   ├── auth.model.ts          # MongoDB schema
│   ├── auth.resolver.ts       # GraphQL endpoints
│   ├── auth.service.ts        # Business logic
│   ├── strategies/            # JWT authentication
│   └── guards/                # Route protection
├── app.module.ts              # Root module
└── main.ts                    # Application entry
```

## Deployment
For production deployment:
```bash
# Build Docker image
docker build -t admin-auth .

# Run with MongoDB
docker-compose up -d
```

## Troubleshooting
| Error | Solution |
|-------|----------|
| `MongoDB connection failed` | Verify `mongod` is running |
| `Invalid credentials` | Check admin exists in DB |
| `JWT validation failed` | Ensure token is in Authorization header |

## License
MIT © VSMP
```

Key features of this README:
1. Clear badges for tech stack visibility
2. Step-by-step setup instructions
3. Ready-to-use GraphQL examples
4. Visual project structure
5. Production deployment notes
6. Common issues table
