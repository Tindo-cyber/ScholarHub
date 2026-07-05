# InnovateX

**Build. Innovate. Launch.**

An AI-powered Digital Innovation Ecosystem that supports students from idea to startup — replacing GitHub Classroom, Moodle submissions, university repositories, and student portfolios.

## Architecture

```
InnovateX/
├── src/                          # React 19 Frontend
│   ├── features/                 # Feature-based modules
│   │   ├── auth/                 # JWT authentication
│   │   ├── projects/             # Lifecycle, health scores
│   │   ├── marketplace/        # Innovation marketplace
│   │   ├── startup/              # Startup incubator
│   │   ├── supervisor/           # Supervisor workspace
│   │   ├── search/               # Natural language search
│   │   └── analytics/            # Innovation analytics
│   ├── components/               # Shared UI components
│   ├── hooks/                    # React Query data layer
│   ├── lib/                      # API client, mock data, utils
│   ├── pages/                    # Route pages
│   ├── shared/                   # Cross-feature components
│   ├── stores/                   # Zustand UI state
│   └── types/                    # TypeScript domain models
├── backend/                      # Spring Boot 3 API
│   └── src/main/java/com/scholarhub/
│       ├── ai/                   # OpenAI abstraction layer
│       ├── config/               # Security, OpenAPI, CORS
│       ├── controller/           # REST endpoints
│       ├── domain/               # JPA entities & enums
│       ├── dto/                  # Request/response DTOs
│       ├── repository/           # Spring Data JPA
│       ├── security/             # JWT authentication
│       └── service/              # Business logic
└── docker-compose.yml            # PostgreSQL, Redis, MinIO, API
```

## Tech Stack

### Frontend
- React 19, Vite, TypeScript, Tailwind CSS v4
- Shadcn UI (Radix), Framer Motion, Lucide Icons
- React Query, Zustand, React Hook Form, Zod, Axios

### Backend
- Spring Boot 3.3, Java 21, Spring Security, JWT
- PostgreSQL, Redis, MinIO, Flyway migrations
- OpenAPI/Swagger, WebSocket-ready

## Quick Start

### Frontend only (mock data)
```bash
npm install
npm run dev
```
Open http://localhost:5173 — login with:
- **Email:** alex.morgan@university.edu
- **Password:** ScholarHub2026!

### Full stack with Docker
```bash
docker-compose up -d
```
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html

### Backend (local, requires Java 21)
```bash
cd backend
mvn spring-boot:run
```

Set `VITE_USE_MOCK=false` in `.env` to connect frontend to the live API.

## Modules

| Module | Description |
|--------|-------------|
| **Innovation Workspace** | Continue working, deadlines, feedback, AI suggestions |
| **Project Lifecycle** | Idea → Proposal → Research → Design → Development → Testing → Review → Deploy → Portfolio → Archive |
| **Project Health** | Documentation, testing, code quality, deployment, presentation, research, security scores |
| **InnovateX AI** | Abstracts, code review, viva prep, documentation, ERD/UML |
| **Supervisor Workspace** | Review, approve milestones, feedback, meetings |
| **Portfolio Generator** | Auto-built skills, projects, certificates, achievements |
| **Innovation Marketplace** | Public project discovery for industry & investors |
| **Startup Incubator** | Continue as startup — roadmap, team, pitch deck, funding |
| **Analytics** | Innovation score, portfolio score, project health, growth |
| **Search** | Natural language project search |

## Deploy on GitHub Pages

**Production URL:** [https://www.scholarhub.com](https://www.scholarhub.com)

The frontend auto-deploys on every push to `main`. Custom domain `www.scholarhub.com` is configured via `public/CNAME`.

### Demo login (mock mode)

- **Email:** alex.morgan@university.edu
- **Password:** ScholarHub2026!

## Environment Variables

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_USE_MOCK=true
VITE_APP_NAME=InnovateX
VITE_APP_TAGLINE=Build. Innovate. Launch.
VITE_APP_URL=https://www.scholarhub.com
```

## License

Proprietary — InnovateX © 2026
