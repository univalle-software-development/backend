# Frontend CI/CD Pipeline Project

This repository contains a React frontend application with a comprehensive CI/CD pipeline implemented using GitHub Actions and Vercel deployment.

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── production-deployment.yml  # Production deployment workflow
│       ├── staging-deployment.yml     # Staging deployment workflow
│       └── sonar-workflow.yaml        # Quality gate and testing workflow
├── filmore/                          # Frontend application directory
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── services/                 # API services
│   │   └── test/                     # Test files
│   └── public/                       # Static assets
├── sonar-project.properties          # SonarCloud configuration
├── Dockerfile                        # Docker configuration
├── docker-compose.yml                # Docker Compose configuration
├── deployment.yml                    # Kubernetes deployment configuration
└── README.md                         # Project documentation
```

## CI/CD Pipeline

Our CI/CD pipeline consists of three main workflows that work together to ensure code quality and reliable deployments:

### 1. Quality Gate and Tests (sonar-workflow.yaml)
- Runs on push to main/staging and pull requests
- Performs automated testing with 80% coverage requirement
- Conducts code analysis using SonarCloud
- Acts as a quality gate for deployments

### 2. Staging Deployment (staging-deployment.yml)
- Triggers on push to staging branch
- Waits for quality gate approval
- Deploys to staging environment for testing
- Uses Vercel for deployment

### 3. Production Deployment (production-deployment.yml)
- Triggers on push to main branch
- Waits for quality gate approval
- Deploys to production environment
- Uses Vercel for deployment

## Development Environment

### Prerequisites
- Node.js 18
- PNPM package manager
- Vercel CLI
- Docker (optional)
- Kubernetes (optional)

### Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
cd filmore
pnpm install
```

3. Set up environment variables:
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
- FRONTEND_SONAR_TOKEN

4. Run tests:
```bash
pnpm test
```

## Container Support

The project includes Docker and Kubernetes configurations for containerization:

- Use `Dockerfile` for building container images
- Use `docker-compose.yml` for local development
- Use `deployment.yml` for Kubernetes deployments

## Quality Standards

The project enforces the following quality standards:

- Minimum 80% test coverage
- SonarCloud quality gate checks
- Automated testing before deployment
- Code review requirements via pull requests

## Deployment

The project uses Vercel for deployments with two environments:

- Staging: For testing and verification
- Production: For end users

Deployments are automated through GitHub Actions and require passing the quality gate.

## Contributing

1. Create a feature branch from staging
2. Make your changes
3. Submit a pull request to staging
4. Once approved and merged, changes will be automatically deployed to staging
5. After verification, merge staging to main for production deployment

## License

[Project License Information]
