# DG Interns Hub — API Documentation

## Overview

**Base URL:** `http://localhost:5000/api`  
**Version:** 1.0.0  
**Format:** All responses are JSON.

---

## Standard Response Format

**Success:**
```json
{
  "success": true,
  "message": "Operation description",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

**Paginated Jobs:**
```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 45,
  "totalPages": 5,
  "data": []
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Resource created |
| 400  | Invalid input / validation error |
| 401  | Unauthenticated (missing or invalid token) |
| 403  | Forbidden (authenticated but insufficient role/ownership) |
| 404  | Resource not found |
| 409  | Conflict (duplicate email, duplicate application) |
| 429  | Rate limit exceeded |
| 500  | Unexpected server error |

---

## Authentication

JWTs are used for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after **7 days** (configurable via `JWT_EXPIRES_IN`).

Logout is stateless — the server acknowledges but the client must discard the token. The token remains technically valid until expiry.

---

## Rate Limits

| Scope | Limit |
|-------|-------|
| Global API | 200 requests / 15 min |
| Auth endpoints (`/api/auth/*`) | 20 requests / 15 min |

Exceeded limits return HTTP `429` with:
```json
{ "success": false, "message": "Too many authentication attempts. Please try again in 15 minutes." }
```

---

## Roles

| Role | Permissions |
|------|-------------|
| `candidate` | Register, login, view/manage own profile, view jobs, apply to jobs, view own applications |
| `recruiter` | All candidate permissions + create/update/delete own jobs, view/update status of applications to their jobs |
| `admin` | All permissions across all resources |

> **Security:** Admin role cannot be assigned via the public registration endpoint. Use the seed script or a direct database operation.

---

## Environment Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | `development` or `production` |
| `MONGODB_URI` | **Yes** | MongoDB connection string |
| `JWT_SECRET` | **Yes** | JWT signing secret (min 32 chars) |
| `JWT_EXPIRES_IN` | No | Token TTL (default: `7d`) |
| `FRONTEND_URL` | No | Allowed CORS origin (default: `http://localhost:5173`) |

---

## Setup

```bash
# 1. Clone and install
npm install

# 2. Copy and fill environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Seed the database with sample data
npm run seed

# 4. Start the backend
npm run server

# 5. Start the frontend (separate terminal)
npm run dev
```

---

## Endpoints

---

### Authentication — `/api/auth`

#### POST /api/auth/register

Register a new candidate account.

- **Auth:** None
- **Role:** Public
- **Rate limit:** 20/15min

**Request Body:**
```json
{
  "name": "Soham Kulkarni",
  "email": "soham@example.com",
  "password": "password123"
}
```

**Validation:**
- `name`: required, 2–60 characters
- `email`: required, valid format
- `password`: required, min 6 characters
- Role is always set to `candidate` — cannot be specified by client

**Success (201):**
```json
{
  "success": true,
  "message": "Registration successful. Welcome to DG Interns Hub!",
  "data": {
    "token": "eyJhbGci...",
    "user": { "_id": "...", "name": "Soham Kulkarni", "email": "...", "role": "candidate" }
  }
}
```

**Errors:**
- `400` — Validation failure
- `409` — Email already registered

---

#### POST /api/auth/login

Login and receive a JWT.

- **Auth:** None
- **Rate limit:** 20/15min

**Request Body:**
```json
{
  "email": "soham@example.com",
  "password": "password123"
}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": { "token": "eyJhbGci...", "user": { ... } }
}
```

**Errors:**
- `400` — Validation failure
- `401` — Invalid email or password (generic message prevents user enumeration)

---

#### GET /api/auth/me

Get the currently authenticated user.

- **Auth:** Required (`Bearer <token>`)

**Success (200):**
```json
{
  "success": true,
  "message": "Authenticated user retrieved.",
  "data": { "user": { "_id": "...", "name": "...", "role": "candidate", "profile": {} } }
}
```

**Errors:**
- `401` — Missing or invalid token

---

#### POST /api/auth/logout

Acknowledge logout (stateless JWT strategy).

- **Auth:** Required

**Success (200):**
```json
{
  "success": true,
  "message": "Logged out successfully. Please remove the token from your client storage."
}
```

---

### User Profile — `/api/users`

All endpoints require authentication.

---

#### GET /api/users/profile

Get own profile.

- **Auth:** Required

**Success (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully.",
  "data": { "user": { "_id": "...", "name": "...", "email": "...", "role": "candidate", "profile": { "phone": "", "bio": "", "location": "", "resumeLink": "", "linkedin": "", "github": "" } } }
}
```

---

#### PUT /api/users/profile

Update own profile. Only whitelisted fields are accepted (prevents mass assignment).

- **Auth:** Required

**Allowed Fields:**
- Top-level: `name`, `company`
- Under `profile`: `phone`, `bio`, `location`, `resumeLink`, `linkedin`, `github`

> Role and email **cannot** be changed here.

**Request Body:**
```json
{
  "name": "Updated Name",
  "profile": {
    "phone": "+91 99887 76655",
    "bio": "Aspiring developer",
    "location": "Pune, India",
    "resumeLink": "https://github.com/soham",
    "linkedin": "https://linkedin.com/in/soham"
  }
}
```

**Success (200):**
```json
{ "success": true, "message": "Profile updated successfully.", "data": { "user": { ... } } }
```

---

#### DELETE /api/users/profile

Permanently delete own account and all associated applications.

- **Auth:** Required

**Success (200):**
```json
{ "success": true, "message": "Your account and all associated applications have been permanently deleted." }
```

---

### Jobs — `/api/jobs`

GET endpoints are public. POST/PUT/DELETE require authentication and recruiter/admin role.

---

#### GET /api/jobs

Retrieve jobs with search, filtering, pagination, and sorting.

- **Auth:** None (public)

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | — | Search title, company, skills, location |
| `type` | string | — | Filter by work type: `remote`, `hybrid`, `on-site` |
| `location` | string | — | Filter by location (partial match) |
| `skill` | string | — | Filter by skill (partial match) |
| `category` | string | — | Filter by category (exact, case-insensitive) |
| `page` | int | 1 | Page number (min 1) |
| `limit` | int | 10 | Results per page (max 50) |
| `sort` | string | `newest` | `newest`, `oldest`, or `deadline` |

**Sort behavior:**
- `newest` — `createdAt` descending
- `oldest` — `createdAt` ascending
- `deadline` — `deadline` ascending (null deadlines sorted last)

**Example:**
```
GET /api/jobs?search=react&type=remote&sort=newest&page=1&limit=5
```

**Success (200):**
```json
{
  "success": true,
  "page": 1,
  "limit": 5,
  "total": 12,
  "totalPages": 3,
  "data": [ { "_id": "...", "title": "React JS Developer Intern", "company": "TechPulse Solutions", ... } ]
}
```

---

#### GET /api/jobs/:id

Get a single job by ID.

- **Auth:** None

**Path Parameters:**
- `id` — MongoDB ObjectId

**Success (200):**
```json
{ "success": true, "message": "Job retrieved successfully.", "data": { "_id": "...", "title": "...", "skills": [], ... } }
```

**Errors:**
- `400` — Invalid ID format
- `404` — Job not found

---

#### POST /api/jobs

Create a new job listing.

- **Auth:** Required
- **Role:** `recruiter` or `admin`

**Request Body:**
```json
{
  "title": "Backend Node.js Intern",
  "company": "TestCo Ltd",
  "location": "Remote",
  "workType": "Remote",
  "duration": "3 Months",
  "stipend": "₹15,000 / month",
  "salaryAmount": 15000,
  "category": "Web Development",
  "deadline": "2026-12-01",
  "openings": 2,
  "shortDescription": "Build REST APIs with Node.js.",
  "fullDescription": "Full description here...",
  "skills": ["Node.js", "Express.js", "MongoDB"],
  "responsibilities": ["Write clean code", "Review PRs"],
  "perks": ["Certificate", "PPO"]
}
```

**Validation:**
- `title`: required, 3–120 chars
- `company`: required, max 100 chars
- `location`: required
- `workType`: required, one of `Remote`, `Hybrid`, `On-site`
- `deadline`: optional, ISO 8601 date

**Success (201):**
```json
{ "success": true, "message": "Job created successfully.", "data": { "_id": "...", ... } }
```

**Errors:**
- `400` — Validation failure
- `401` — Not authenticated
- `403` — Not a recruiter or admin

---

#### PUT /api/jobs/:id

Update an existing job.

- **Auth:** Required
- **Role:** Owner recruiter or admin
- **Ownership:** Recruiter can only update jobs they created

**Request Body:** (any subset of job fields)
```json
{
  "openings": 5,
  "stipend": "₹18,000 / month"
}
```

**Errors:**
- `400` — Validation failure or invalid ID
- `403` — Not authorized (not the owner)
- `404` — Job not found

---

#### DELETE /api/jobs/:id

Soft-delete a job (sets `isActive: false`).

- **Auth:** Required
- **Role:** Owner recruiter or admin

**Success (200):**
```json
{ "success": true, "message": "Job deleted successfully." }
```

---

### Applications — `/api/applications`

All endpoints require authentication.

---

#### POST /api/applications

Apply for a job.

- **Auth:** Required
- **Role:** `candidate` only

**Request Body:**
```json
{
  "jobId": "64abc123...",
  "fullName": "Soham Kulkarni",
  "email": "soham@example.com",
  "phone": "+91 98765 43210",
  "resumeLink": "https://github.com/soham/resume",
  "coverMessage": "I am very interested in this role..."
}
```

**Success (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "data": {
    "referenceId": "DGH-847291",
    "application": { "_id": "...", "status": "pending", ... }
  }
}
```

**Errors:**
- `400` — Validation failure
- `403` — Not a candidate
- `404` — Job not found or inactive
- `409` — Already applied to this job

---

#### GET /api/applications/my

Get all applications submitted by the authenticated user.

- **Auth:** Required

**Success (200):**
```json
{
  "success": true,
  "message": "Your applications retrieved successfully.",
  "data": [ { "_id": "...", "status": "pending", "job": { "title": "...", "company": "..." }, ... } ]
}
```

---

#### GET /api/applications/:id

Get a specific application.

- **Auth:** Required
- **Access:** Candidate (own) | Recruiter (their job) | Admin (any)

**Errors:**
- `403` — Not authorized to view this application
- `404` — Not found

---

#### PUT /api/applications/:id/status

Update application status.

- **Auth:** Required
- **Role:** Recruiter (for their job's applications) or admin

**Valid statuses:** `pending`, `reviewed`, `shortlisted`, `rejected`, `hired`

**Request Body:**
```json
{ "status": "shortlisted" }
```

**Success (200):**
```json
{ "success": true, "message": "Application status updated to 'shortlisted'.", "data": { ... } }
```

**Errors:**
- `400` — Invalid status value
- `403` — Not authorized (not the job's recruiter)
- `404` — Application not found

---

#### DELETE /api/applications/:id

Delete an application.

- **Auth:** Required
- **Access:** Candidate (own) or admin

**Success (200):**
```json
{ "success": true, "message": "Application deleted successfully." }
```

---

## Error Handling

All errors follow the standard format. Specific cases:

| Scenario | Status | Example message |
|----------|--------|-----------------|
| Missing token | 401 | "Authentication required." |
| Invalid/expired token | 401 | "Invalid token." / "Token has expired." |
| Wrong role | 403 | "Access denied. This action requires: recruiter, admin." |
| Invalid MongoDB ID | 400 | "Invalid job ID format." |
| Malformed JSON | 400 | "Malformed JSON in request body." |
| Duplicate key (email) | 409 | "A record with that email already exists." |
| Validation failure | 400 | "Job title is required." |
| Resource not found | 404 | "Job not found." |
| Rate limit | 429 | "Too many authentication attempts." |
| Server error | 500 | "An unexpected error occurred." |

> Stack traces and internal details are **never** exposed in production responses.

---

## Security Implementation

1. **JWT Authentication** — HS256 signed tokens, verified server-side
2. **Password Hashing** — bcryptjs with salt factor 12
3. **Input Validation** — express-validator on all mutation endpoints
4. **Protected Routes** — `authenticateUser` middleware on all sensitive routes
5. **Role-Based Authorization** — `authorizeRole()` factory enforces role at route level
6. **Environment Variables** — Secrets in `.env`, never committed
7. **Helmet** — Sets 11+ HTTP security headers
8. **CORS** — Strict allowlist of frontend origins
9. **Rate Limiting** — Global + strict auth limits
10. **Body Size Limit** — 10kb maximum request body
11. **Regex Injection Protection** — User input escaped before regex construction
12. **Mass Assignment Prevention** — Whitelist-based field updates in user controller

---

## Postman Collection

Import: `postman/DG-Interns-Hub-API.json`

**Setup:**
1. Open Postman → Import → select the JSON file
2. Set collection variable `base_url` = `http://localhost:5000/api`
3. Run `npm run seed` to populate the database
4. Run "Login — Valid" to auto-populate `auth_token`
5. Run other requests using the populated variables

**Test users (after seeding):**

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@dginternshub.com | Admin@1234 |
| Recruiter | recruiter@dginternshub.com | Recruiter@1234 |
| Candidate | candidate@dginternshub.com | Candidate@1234 |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `MONGODB_URI is not set` | Copy `.env.example` to `.env` and fill values |
| `MongoDB Connection Error` | Check URI format and network access in MongoDB Atlas |
| `401 Authentication required` | Add `Authorization: Bearer <token>` header |
| `403 Access denied` | Login with correct role account |
| `429 Rate limit` | Wait 15 minutes or restart server in development |
| CORS error in browser | Add frontend origin to `FRONTEND_URL` in `.env` |
