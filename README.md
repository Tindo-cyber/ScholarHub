# ScholarHub

**Build. Innovate. Launch.**

An AI-powered Digital Innovation Ecosystem that supports students from idea to startup — replacing GitHub Classroom, Moodle submissions, university repositories, and student portfolios.

## Architecture

```
ScholarHub/
├── src/                          # React 19 Frontend
│   ├── features/                 # Feature-based modules
│   │   ├── auth/                 # JWT authentication
│   │   ├── projects/             # Lifecycle, health scores
│   │   ├── marketplace/          # Innovation marketplace
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
- PostgreSQL: localhost:5432
- MinIO Console: http://localhost:9001

### Backend (local, requires Java 21)
```bash
cd backend
mvn spring-boot:run
```
> **Note:** Java 21 is required. Java 25 is not yet compatible with Lombok. Install [Temurin 21](https://adoptium.net/) and set `JAVA_HOME` before building.

Set `VITE_USE_MOCK=false` in `.env` to connect frontend to the live API.

## Modules

| Module | Description |
|--------|-------------|
| **Innovation Workspace** | Continue working, deadlines, feedback, AI suggestions |
| **Project Lifecycle** | Idea → Proposal → Research → Design → Development → Testing → Review → Deploy → Portfolio → Archive |
| **Project Health** | Documentation, testing, code quality, deployment, presentation, research, security scores |
| **AI Mentor** | Scholar AI — abstracts, code review, viva prep, documentation, ERD/UML |
| **Supervisor Workspace** | Review, approve milestones, feedback, meetings |
| **Portfolio Generator** | Auto-built skills, projects, certificates, achievements |
| **Innovation Marketplace** | Public project discovery for industry & investors |
| **Startup Incubator** | Continue as startup — roadmap, team, pitch deck, funding |
| **Analytics** | Innovation score, portfolio score, project health, growth |
| **Search** | Natural language project search |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/login` | Authenticate |
| POST | `/api/v1/auth/register` | Register |
| GET | `/api/v1/auth/me` | Current user |
| GET | `/api/v1/workspace` | Innovation workspace |
| GET | `/api/v1/projects` | List projects |
| GET | `/api/v1/projects/{id}` | Project details |
| GET | `/api/v1/projects/search?q=` | Search projects |
| GET | `/api/v1/notifications` | User notifications |
| GET | `/api/v1/portfolio` | User portfolio |
| POST | `/api/v1/ai/chat` | Scholar AI mentor |

## User Roles

- Student
- Supervisor
- Administrator
- Industry Partner
- Startup Mentor
- University Admin

## Deploy on GitHub Pages

The frontend auto-deploys on every push to `main`.

**Production URL:** [https://www.scholarhub.com](https://www.scholarhub.com)

### GitHub setup

1. Repo → **Settings** → **Pages** → **Source:** GitHub Actions
2. **Custom domain:** `www.scholarhub.com` (matches `public/CNAME`)
3. Enable **Enforce HTTPS** once DNS is verified

### DNS configuration (at your domain registrar)

| Type | Name | Value |
|------|------|-------|
| **CNAME** | `www` | `tindo-cyber.github.io` |

**Apex domain** (`scholarhub.com` → `www`):

| Type | Name | Value |
|------|------|-------|
| **A** | `@` | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |

Then set a redirect at your registrar: `scholarhub.com` → `https://www.scholarhub.com`

### Demo login (mock mode)

- **Email:** `alex.morgan@university.edu`
- **Password:** `ScholarHub2026!`

### Connecting a live API

Edit `.github/workflows/deploy.yml`:

```yaml
VITE_USE_MOCK: false
VITE_API_URL: https://api.scholarhub.com/api/v1
```

Set backend `CORS_ALLOWED_ORIGINS` to include `https://www.scholarhub.com`.

## Environment Variables

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_USE_MOCK=true
VITE_APP_TAGLINE=Build. Innovate. Launch.
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
```

## License

Proprietary — ScholarHub © 2026
