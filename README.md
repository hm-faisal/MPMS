# Minimal Project Management System (MPMS)

A production-ready project management system built with TypeScript, Bun, Express, and Mongoose. Features comprehensive API documentation, role-based access control, and a modular architecture for managing projects, sprints, and tasks.

## 🚀 Features

- **⚡ Bun Runtime** - Fast all-in-one JavaScript runtime
- **🔒 Security First** - Helmet, CORS, rate limiting, JWT authentication
- **📝 Winston Logging** - Production-ready logging with daily rotation
- **🛡️ Graceful Shutdown** - Proper signal handling (SIGTERM, SIGINT)
- **📚 Comprehensive API Documentation** - 47 endpoints with OpenAPI/Swagger
- **👥 Role-Based Access Control** - Admin, Manager, and Member roles
- **🗄️ Mongoose ODM** - Elegant MongoDB object modeling
- **🎨 Code Quality** - Biome for linting and formatting
- **🔄 Git Hooks** - Husky + lint-staged for pre-commit checks
- **📦 Conventional Commits** - Commitlint for standardized commits
- **🧪 Testing** - Bun's built-in test runner
- **🔧 Environment Config** - node-config for environment management

## 📋 Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- Node.js >= 18 (for compatibility)
- MongoDB >= 5.0
- Git

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mpms

# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Configure your environment variables
# Edit .env with your MongoDB connection string

# Start MongoDB (if running locally)
# mongod

```

## 🏃 Running the Application

### Development Mode

```bash
# Run with hot reload
bun run dev
```

Server will start at `http://localhost:8080`
API documentation available at `http://localhost:8080/api-docs`

### Production Mode

```bash
# Build the application
bun run build

# Start production server
bun run start
```

## 📁 Project Structure

```markdown
mpms/
├── config/                       # Environment-specific configurations
│   └── default.ts                # Default configuration
├── src/
│   ├── app/                      # Application bootstrapping
│   │   └── app.ts                # Server configuration
│   ├── config/                   # Configuration files
│   │   ├── cors.config.ts        # CORS configuration
│   │   ├── default.ts            # Default configuration
│   │   ├── helmet.config.ts      # Helmet configuration
│   │   ├── rate-limit.config.ts  # Rate limit configuration
│   │   ├── swagger.config.ts     # Swagger configuration
│   │   └── winston.ts            # Winston configuration
│   ├── db/                       # Database configurations
│   │   └── connection.ts         # MongoDB connection
│   ├── errors/                   # Custom error classes
│   │   ├── bad-request-error.ts  # HTTP error class
│   │   ├── not-found-error.ts    # HTTP error class
│   │   ├── unauthorized-error.ts # HTTP error class
│   │   └── unprocessable-entity-error.ts # HTTP error class
│   ├── middleware/               # Express middleware
│   │   ├── authenticate.middleware.ts
│   │   ├── has-permission.middleware.ts
│   │   └── validate-request.middleware.ts
│   ├── models/                   # Data models and types
│   │   ├── User.ts               # User model
│   │   ├── Project.ts            # Project model
│   │   ├── Sprint.ts             # Sprint model
│   │   └── Task.ts               # Task model
│   ├── modules/                  # Feature modules
│   │   ├── auth/                 # Authentication module
│   │   ├── users/                # User management
│   │   ├── projects/             # Project management
│   │   ├── sprints/              # Sprint management
│   │   └── tasks/                # Task management
│   ├── routes/                   # API routes
│   │   └── index.ts              # API routes
│   ├── utils/                    # Utility functions
│   │   ├── bcrypt.ts             # Password hashing
│   │   ├── catch-async.ts        # Try-catch handling
│   │   ├── jwt-helper.ts         # JWT handling
│   │   └── send-response.ts      # Response handling
│   ├── validators/               # Input validators
│   │   ├── boolean.ts            # Boolean validators
│   │   ├── date.ts               # Date validators
│   │   ├── number.ts             # Number validators
│   │   ├── string.ts             # String validators
│   │   ├── email.ts              # Email validators
│   │   ├── enum.ts               # Enum validators
│   │   ├── index.ts              # Validators entry point
│   │   └── password.ts           # Password validators
│   └── index.ts                  # Application entry point
├── docs/                       # Documentation
│   └── api-docs.yml              # OpenAPI specification
├── test/                       # Test files
└── logs/                       # Application logs (gitignored)
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8080
HOST=localhost
NODE_ENV=development

# Database
MONGODB_URI="mongodb://localhost:27017/mpms"
# Or for MongoDB Atlas:
# MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/mpms?retryWrites=true&w=majority"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_TOKEN_EXPIRY=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# Logging
LOG_LEVEL=debug
LOG_FORMAT=dev

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 📚 API Documentation

The MPMS API includes **47 endpoints** across 5 modules:

### Authentication Module (6 endpoints)

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user profile
- `POST /auth/forgot-password` - Request password reset *(Not Implemented)*
- `POST /auth/reset-password` - Reset password *(Not Implemented)*

### Users Module (10 endpoints)

- `GET /users` - Get all users (Admin only)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user (Admin/Manager)
- `DELETE /users/:id` - Delete user (Admin/Manager)
- `GET /users/profile` - Get current user profile
- `PATCH /users/profile` - Update current user profile
- `POST /users/change-password` - Change password

### Projects Module (13 endpoints)

- `GET /projects` - Get all projects
- `POST /projects` - Create project (Admin/Manager)
- `GET /projects/:id` - Get project by ID
- `PATCH /projects/:id` - Update project (Admin/Manager)
- `DELETE /projects/:id` - Delete project (Admin)
- `GET /projects/:id/members` - Get project members
- `POST /projects/:id/members` - Add members to project
- `DELETE /projects/:id/members/:userId` - Remove member
- `GET /projects/:id/sprints` - Get project sprints
- `POST /projects/:id/sprints` - Create sprint
- `GET /projects/:id/stats` - Get project statistics *(Not Implemented)*
- `GET /projects/:id/activity` - Get project activity *(Not Implemented)*

### Sprints Module (9 endpoints)

- `GET /sprints` - Get all sprints
- `GET /sprints/:id` - Get sprint by ID
- `PATCH /sprints/:id` - Update sprint
- `DELETE /sprints/:id` - Delete sprint
- `GET /sprints/:id/stats` - Get sprint statistics *(Partially Implemented)*
- `GET /sprints/:id/tasks` - Get sprint tasks
- `POST /sprints/:id/tasks` - Create task under sprint

### Tasks Module (9 endpoints)

- `GET /tasks` - Get all tasks with filters
- `GET /tasks/:id` - Get task by ID
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Accessing API Documentation

When the server is running, access the interactive API documentation:

```browser
http://localhost:8080/api-docs
```

The documentation includes:

- Complete request/response schemas
- Authentication requirements
- Example payloads
- Error responses
- Implementation status notes

## 👥 User Roles & Permissions

### Admin

- Full system access
- User management
- All CRUD operations on projects, sprints, and tasks

### Manager

- Project oversight
- Team management
- Create and manage projects
- Assign tasks

### Member

- View assigned projects and tasks
- Update task status
- Update own profile

## 🗄️ Database Schema

The application uses Mongoose ODM with MongoDB. Main collections:

- **users** - System users with roles and permissions
- **projects** - Projects with members and sprints
- **sprints** - Time-boxed iterations within projects
- **tasks** - Work items assigned to sprints
- **userpreferences** - User-specific settings

Database commands:

```bash
# Connect to MongoDB shell
mongo mpms

# View collections
show collections

# Drop database (development only)
db.dropDatabase()

# Create indexes (automatically handled by Mongoose schemas)
```

## 🧪 Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

## 🎨 Code Quality

### Linting and Formatting

```bash
# Format code
bun run format

# Lint code
bun run lint

# Check code (lint + format)
bun run check

# Auto-fix issues
bun run organize
```

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```commitlint
<type>(<scope>): <subject>
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Test changes
- `chore` - Build/tooling changes

**Example:**

```bash
git commit -m "feat(auth): add JWT authentication"
git commit -m "fix(tasks): resolve task assignment issue"
git commit -m "docs(api): update API documentation"
```

## 🔒 Security

### Built-in Security Features

- **JWT Authentication** - Token-based authentication
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - Zod schema validation
- **Role-Based Access Control** - Permission-based routes
- **Password Hashing** - Bcrypt encryption

### Security Best Practices

1. Never commit `.env` files
2. Use strong JWT secrets in production
3. Keep dependencies updated
4. Review security headers in production
5. Enable HTTPS in production
6. Configure proper CORS origins
7. Implement proper session management

## 🚀 Deployment

### Building for Production

```bash
# Build the application
bun run build

# The output will be in ./dist directory
```

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI (MongoDB Atlas recommended)
3. Set strong JWT secrets
4. Set appropriate `LOG_LEVEL` (info or warn)
5. Configure CORS origins for your domain
6. Set up log rotation and monitoring
7. Ensure MongoDB indexes are created

### Docker Deployment

```dockerfile
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Copy source
COPY . .

# Build
RUN bun run build

# Start application
EXPOSE 8080
CMD ["bun", "run", "start"]
```

## 📊 API Response Format

All API responses follow a standardized format:

### Success Response

```json
{
  "code": 200,
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response

```json
{
  "code": 400,
  "success": false,
  "message": "Error happened",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": { ... }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Bun](https://bun.sh) - Fast JavaScript runtime
- [Express](https://expressjs.com) - Web framework
- [Mongoose](https://mongoosejs.com) - Elegant MongoDB object modeling
- [MongoDB](https://www.mongodb.com) - NoSQL database
- [Winston](https://github.com/winstonjs/winston) - Logging library
- [Biome](https://biomejs.dev) - Linting and formatting
- [Zod](https://zod.dev) - TypeScript-first schema validation

## 📞 Support

For issues and questions:

- Open an issue on GitHub
- Check API documentation at `/api-docs`
- Review the logs in `logs/` directory

---

## **Built with ❤️ using Bun and TypeScript**
