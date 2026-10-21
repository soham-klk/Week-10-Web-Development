# DG Interns Hub — Week 8: REST API & Advanced Backend Engineering

> **Intern:** Soham Kulkarni | **Role:** Web Development Intern | **Cohort:** DG Interns Hub

---

## Project Overview

DG Interns Hub is a full-stack Job & Internship Portal built during the DG Interns Hub web development internship program.

- **Week 7** delivered a polished React + Vite frontend with job listings, search/filter, an application modal, and a contact page.
- **Week 8** adds a complete, modular Node.js + Express + MongoDB backend with JWT authentication, role-based authorization, REST APIs, advanced search/filter/pagination/sort, and API security hardening.

---

## Week 8 Objectives

- [x] Modular Express.js backend with clean architecture
- [x] MongoDB + Mongoose data models with indexes
- [x] JWT authentication with secure password hashing
- [x] Role-based access control (candidate, recruiter, admin)
- [x] Full CRUD REST APIs for jobs, users, and applications
- [x] Advanced database-backed search, filtering, pagination, and sorting
- [x] 6 security practices: JWT, bcrypt, validation, protected routes, RBAC, env vars
- [x] Advanced security: Helmet, CORS, rate limiting, body limits
- [x] Centralized error handling
- [x] Standard API response format
- [x] Postman collection with test assertions
- [x] API documentation
- [x] Frontend integration with graceful fallback

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| Framer Motion | 14 | Animations |
| Lucide React | Latest | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 5 | HTTP framework |
| MongoDB | Atlas/Local | Database |
| Mongoose | 8 | ODM |
| bcryptjs | 2 | Password hashing |
| jsonwebtoken | 9 | JWT auth |
| express-validator | 7 | Input validation |
| helmet | 8 | Security headers |
| cors | 2 | CORS control |
| express-rate-limit | 7 | Rate limiting |
| dotenv | 16 | Environment config |

---

## Architecture

```
E:\w7\
├── src/                        # React frontend (preserved from Week 7)
│   ├── assets/
│   ├── components/
│   │   ├── ApplicationModal.jsx  # Updated: API-connected
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Jobs.jsx              # Updated: API-connected with pagination
│   │   ├── Home.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   └── api.js                # NEW: Frontend API client
│   └── data/
│       └── jobs.js               # Preserved: fallback static data
│
├── server/                     # NEW: Backend
│   ├── config/
│   │   └── database.js           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register, login, me, logout
│   │   ├── jobController.js      # CRUD + search/filter/pagination
│   │   ├── applicationController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── User.js               # Roles, bcrypt hook, indexes
│   │   ├── Job.js                # Text + field indexes
│   │   └── Application.js        # Duplicate guard, referenceId
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # authenticateUser, authorizeRole
│   │   ├── errorMiddleware.js     # Centralized handler + 404
│   │   └── validationMiddleware.js
│   ├── validators/
│   │   ├── authValidators.js
│   │   ├── jobValidators.js
│   │   └── applicationValidators.js
│   ├── utils/
│   │   └── helpers.js
│   ├── scripts/
│   │   └── seedDB.js             # Database seeder
│   └── server.js                 # Entry point
│
├── postman/
│   └── DG-Interns-Hub-API.json  # Importable Postman collection
├── docs/
│   └── screenshots/              # Project screenshots
├── API-DOCUMENTATION.md
├── LINKEDIN-POST.md
├── .env.example                  # Safe placeholder env template
├── .env.frontend.example         # Frontend env template
└── package.json                  # Combined frontend + backend scripts
```

---

## Prerequisites

- Node.js 18+
- A MongoDB database (MongoDB Atlas free tier recommended)
- npm

---

## Installation

```bash
# Clone the repository (or navigate to the project folder)
cd E:\w7

# Install all dependencies
npm install
```

---

## Environment Setup

### Backend
```bash
# Copy the example and fill in values
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/dg-interns-hub?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_here_minimum_32_chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend
```bash
cp .env.frontend.example .env.local
```

Edit `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

---

## Database Setup

```bash
# Seed the database with 6 sample jobs and 3 test users
npm run seed

# Clear all collections (use with caution)
npm run seed:clear
```

**Seed credentials:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@dginternshub.com | Admin@1234 |
| Recruiter | recruiter@dginternshub.com | Recruiter@1234 |
| Candidate | candidate@dginternshub.com | Candidate@1234 |

---

## Running the Application

```bash
# Start the backend (Terminal 1)
npm run server

# Start the frontend (Terminal 2)
npm run dev
```

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173
- **API Health:** http://localhost:5000/api/health

---

## API Endpoint Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | None | Register (candidate) |
| POST | /api/auth/login | None | Login → JWT |
| GET | /api/auth/me | Required | Get current user |
| POST | /api/auth/logout | Required | Logout |
| GET | /api/users/profile | Required | Get own profile |
| PUT | /api/users/profile | Required | Update own profile |
| DELETE | /api/users/profile | Required | Delete own account |
| GET | /api/jobs | None | List/search/filter/paginate jobs |
| GET | /api/jobs/:id | None | Get single job |
| POST | /api/jobs | Recruiter/Admin | Create job |
| PUT | /api/jobs/:id | Recruiter/Admin | Update job |
| DELETE | /api/jobs/:id | Recruiter/Admin | Delete job |
| POST | /api/applications | Candidate | Apply for job |
| GET | /api/applications/my | Required | View own applications |
| GET | /api/applications/:id | Required | View single application |
| PUT | /api/applications/:id/status | Recruiter/Admin | Update status |
| DELETE | /api/applications/:id | Required | Delete application |

See [API-DOCUMENTATION.md](./API-DOCUMENTATION.md) for full details.

---

## Postman Collection

1. Open Postman
2. Import → `postman/DG-Interns-Hub-API.json`
3. Set collection variable `base_url` = `http://localhost:5000/api`
4. Run "Login — Valid" to auto-populate `auth_token`
5. Run requests in sequence

---

## Security Measures

| # | Measure | Implementation |
|---|---------|---------------|
| 1 | JWT Authentication | jsonwebtoken, verified per-request |
| 2 | Password Hashing | bcryptjs, salt factor 12 |
| 3 | Input Validation | express-validator on all mutation routes |
| 4 | Protected Routes | authenticateUser middleware |
| 5 | Role-Based Authorization | authorizeRole() factory |
| 6 | Environment Variables | dotenv, .env excluded from git |
| 7 | Security Headers | Helmet (11+ headers) |
| 8 | CORS | Strict origin allowlist |
| 9 | Rate Limiting | Global 200/15min, auth 20/15min |
| 10 | Body Size Limits | 10kb max |
| 11 | Mass Assignment Prevention | Whitelist-based field updates |
| 12 | Regex Injection Protection | User input escaped before regex |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Missing required environment variables` | Copy `.env.example` to `.env` |
| `MongoDB Connection Error` | Check your Atlas URI and network access |
| `CORS error` | Ensure `FRONTEND_URL` matches your frontend origin |
| `401 errors` | Token expired — log in again |
| `403 errors` | Log in with correct role account |
| Frontend shows static data | Backend not running or `VITE_API_URL` not set |

---

## Deliverables

| File | Location |
|------|----------|
| Backend source | `server/` |
| API Documentation | `API-DOCUMENTATION.md` |
| Postman Collection | `postman/DG-Interns-Hub-API.json` |
| Week 8 Report | `docs/DG-Interns-Hub-Week-8-Report.pdf` *(create after running)* |
| Presentation | `docs/DG-Interns-Hub-Week-8-Presentation.pptx` *(create after running)* |
| Screenshots | `docs/screenshots/` |
| LinkedIn Post draft | `LINKEDIN-POST.md` |

---

## Incomplete / External Dependencies

> The following require external configuration before they work:

1. **MongoDB** — Provide a valid `MONGODB_URI` in `.env`. Without it the server will not start.
2. **PDF Report & PPTX** — Must be created with screenshots after the server is running.
3. **JWT token revocation** — Currently stateless. A Redis-based blacklist would be needed for hard logout.
#   W e e k - 9 - W e b - D e v e l o p m e n t  
 