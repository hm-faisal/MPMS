# TypeScript Starter

A production-ready TypeScript boilerplate built with Bun, Express, and Winston logging. Features graceful shutdown, comprehensive logging, security best practices, and a modular architecture.

## 🚀 Features

- **⚡ Bun Runtime** - Fast all-in-one JavaScript runtime
- **🔒 Security First** - Helmet, CORS, rate limiting configured
- **📝 Winston Logging** - Production-ready logging with daily rotation
- **🛡️ Graceful Shutdown** - Proper signal handling (SIGTERM, SIGINT)
- **📚 API Documentation** - Swagger/OpenAPI integration
- **🎨 Code Quality** - Biome for linting and formatting
- **🔄 Git Hooks** - Husky + lint-staged for pre-commit checks
- **📦 Conventional Commits** - Commitlint for standardized commits
- **🧪 Testing** - Bun's built-in test runner
- **🔧 Environment Config** - node-config for environment management

## 📋 Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- Node.js >= 18 (for compatibility)
- Git

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd typescript-starter

# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Configure your environment variables
# Edit .env with your settings
```

## 🏃 Running the Application

### Development Mode

```bash
# Run with hot reload
bun run dev
```

### Production Mode

```bash
# Build the application
bun run build

# Start production server
bun run start
```

## 📁 Project Structure

```
typescript-starter/
├── config/                      # Environment-specific configurations
│   ├── default.ts              # Default configuration
│   ├── development.ts          # Development overrides
│   ├── production.ts           # Production overrides
│   └── test.ts                 # Test environment config
├── src/
│   ├── app/                    # Express app configuration
│   ├── config/                 # Application configurations
│   │   ├── winston/           # Winston logger setup
│   │   │   ├── formats/       # Log formats
│   │   │   ├── handlers/      # Exception/rejection handlers
│   │   │   ├── transports/    # Log transports
│   │   │   └── utils/         # Logger utilities
│   │   ├── cors.config.ts     # CORS configuration
│   │   ├── rate-limit.config.ts
│   │   ├── security.config.ts # Helmet security config
│   │   └── swagger.config.ts  # API documentation
│   ├── errors/                 # Custom error classes
│   ├── middleware/             # Express middleware
│   ├── routes/                 # API routes
│   ├── utils/                  # Utility functions
│   └── index.ts               # Application entry point
├── test/                       # Test files
├── logs/                       # Application logs (gitignored)
│   ├── info/                  # Info level logs
│   ├── errors/                # Error logs
│   ├── exceptions/            # Uncaught exceptions
│   └── rejections/            # Unhandled rejections
└── dist/                       # Build output (gitignored)
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# Logging
LOG_LEVEL=debug
LOG_FORMAT=dev

# Swagger
SWAGGER_ENABLED=true
SWAGGER_PATH=/api/v1/api-docs

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Security
CONTENT_SECURITY_POLICY=default-src 'self'
```

### Configuration Files

The project uses [node-config](https://github.com/node-config/node-config) for configuration management:

- `config/default.ts` - Base configuration
- `config/development.ts` - Development overrides
- `config/production.ts` - Production overrides
- `config/test.ts` - Test environment config

## 📝 Logging

### Winston Logger

The application uses Winston for production-ready logging:

**Features:**
- Console output with colors (development)
- Daily rotating file logs
- Separate error log files
- Exception and rejection handlers
- JSON formatted logs for production
- Automatic log compression and rotation

**Log Levels:**
- `error` - Error messages
- `warn` - Warning messages
- `info` - Informational messages
- `debug` - Debug information
- `verbose` - Verbose output

**Usage:**

```typescript
import { logger } from './config';

logger.info('User logged in', { userId: '123' });
logger.error('Database connection failed', { error: err });
logger.warn('High memory usage detected');
```

**Log Files:**
- `logs/info/application-YYYY-MM-DD.log` - All logs
- `logs/errors/error-YYYY-MM-DD.log` - Error logs only
- `logs/exceptions/exceptions-YYYY-MM-DD.log` - Uncaught exceptions
- `logs/rejections/rejections-YYYY-MM-DD.log` - Unhandled rejections

## 🧪 Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

### Writing Tests

```typescript
import { describe, expect, test } from 'bun:test';

describe('My Feature', () => {
  test('should work correctly', () => {
    expect(1 + 1).toBe(2);
  });
});
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

### Git Hooks

Pre-commit hooks automatically:
- Format and lint staged files
- Run tests on test files
- Validate commit messages

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
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
git commit -m "fix(logger): resolve file rotation issue"
```

## 📦 Release Management

```bash
# Create a new release (auto-determines version)
bun run release

# Create specific version releases
bun run release:patch  # 1.0.0 -> 1.0.1
bun run release:minor  # 1.0.0 -> 1.1.0
bun run release:major  # 1.0.0 -> 2.0.0
```

## 🔒 Security

### Built-in Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - Request validation
- **Error Handling** - Secure error responses

### Security Best Practices

1. Never commit `.env` files
2. Use environment variables for secrets
3. Keep dependencies updated
4. Review security headers in production
5. Enable HTTPS in production
6. Configure proper CORS origins

## 🚀 Deployment

### Building for Production

```bash
# Build the application
bun run build

# The output will be in ./dist directory
```

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production environment variables
3. Set appropriate `LOG_LEVEL` (info or warn)
4. Configure CORS origins
5. Set up log rotation and monitoring

### Docker (Optional)

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

# Run
EXPOSE 3000
CMD ["bun", "run", "start"]
```

## 📚 API Documentation

When `SWAGGER_ENABLED=true`, API documentation is available at:

```
http://localhost:3000/api/v1/api-docs
```

## 🛡️ Graceful Shutdown

The application handles graceful shutdown for:
- `SIGTERM` - Termination signal
- `SIGINT` - Interrupt signal (Ctrl+C)
- Uncaught exceptions
- Unhandled promise rejections

**Features:**
- Closes HTTP server gracefully
- Prevents duplicate shutdown attempts
- Force shutdown after 10 seconds timeout
- Comprehensive error logging

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
- [Winston](https://github.com/winstonjs/winston) - Logging library
- [Biome](https://biomejs.dev) - Linting and formatting
- [Husky](https://typicode.github.io/husky) - Git hooks

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the logs in `logs/` directory

---

**Built with ❤️ using Bun and TypeScript**
