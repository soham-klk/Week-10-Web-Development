# DG Interns Hub — Week 10 Job & Internship Portal

A full-stack job and internship portal upgraded from the Week 9 project for the DG Interns Hub Web Development Internship. It includes role-based workspaces, JWT authentication, server-side job discovery, application management, notifications, analytics, and responsive light/dark themes.

## Features

- Candidate, recruiter, and admin accounts with persisted JWT sign-in and role-protected routes.
- Recruiter job CRUD, applicant search, and application status management.
- Admin user controls, listing moderation, platform metrics, and analytics charts.
- Job filtering by title, skill, location, work type, category, experience, salary, and company; debounced search, sorting, and server pagination.
- Application submission with PDF/DOC/DOCX resume upload (maximum 5 MB), validated by the browser and API.
- Candidate application history, status tracker, saved jobs, profile editing, skill-match recommendations, and notifications.
- Central Axios client, retryable error states, loaders/skeletons, empty states, and toast feedback.
- Responsive mobile navigation, dashboard sidebars, persisted dark mode, lazy-loaded routes, and reusable components.

## Technology

| Area | Technology |
|---|---|
| Frontend | React 19, Vite 8, JavaScript, HTML5, CSS3 |
| Routing/forms | React Router 7, React Hook Form, Zod |
| State/API | Context API, Axios |
| Charts | Recharts |
| Backend | Node.js, Express 5 |
| Database/auth | MongoDB, Mongoose, JWT, bcrypt |
| Validation/security | express-validator, Helmet, CORS allowlist, rate limiting |
| Tooling | Git, npm, Postman, Oxlint |

## Architecture

This repository preserves the Week 9 single-root scripts and import paths to avoid a risky directory migration. It implements the requested frontend/backend separation logically (`src/` and `server/`); it does not physically rename them to `frontend/` and `backend/`.

```text
.
├── src/
│   ├── components/       # Navbar, Sidebar, JobCard, JobFilter, Loader, ProtectedRoute, shared UI
│   ├── context/          # AuthContext, AppContext, ThemeContext, ToastContext
│   ├── hooks/            # useAuth, useDebounce
│   ├── pages/            # Jobs, Login, Register, JobDetails, role dashboards, Profile, etc.
│   ├── services/api.js   # Axios instance, interceptors, endpoint clients
│   └── utils/validation.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/          # seedDB.js
│   └── server.js
├── docs/                 # API, test results, report source/checklists
├── postman/              # Importable API collection
├── screenshots/          # Capture checklist; add actual captures here
├── API-DOCUMENTATION.md
└── package.json
```

## Requirements and setup

- Node.js 20.19+ (or 22.12+) and npm.
- MongoDB local instance or Atlas database.

In PowerShell from the repository root:

```powershell
npm install
Copy-Item .env.example .env
Copy-Item .env.frontend.example .env.local
```

Set the values in `.env` and `.env.local`:

| Variable | Used by | Description |
|---|---|---|
| `PORT` | Backend | API port; defaults to `5000` |
| `NODE_ENV` | Backend | `development` or `production` |
| `MONGODB_URI` | Backend | Required MongoDB connection string |
| `JWT_SECRET` | Backend | Required signing secret; use a unique random value of at least 32 characters |
| `JWT_EXPIRES_IN` | Backend | JWT lifetime, default `7d` |
| `FRONTEND_URL` | Backend | Comma-separated allowed browser origins |
| `VITE_API_URL` | Frontend | API base URL, default `http://localhost:5000/api` |

Never commit `.env` or expose `JWT_SECRET`.

```powershell
npm run seed          # Seed demo users, jobs, and sample applications
npm run server        # API at http://localhost:5000
npm run dev           # Vite UI at http://localhost:5173 (another terminal)
npm run build         # Production frontend build
npm run lint          # Oxlint
```

The seed operation is idempotent for existing demo records. `npm run seed:clear` permanently deletes users, jobs, and applications in the configured database; use it only on a disposable development database.

### Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@dginternshub.com` | `Admin@1234` |
| Recruiter | `recruiter@dginternshub.com` | `Recruiter@1234` |
| Candidate | `candidate@dginternshub.com` | `Candidate@1234` |

These are development-only seed credentials. Replace them and the seed passwords before any production deployment.

## API overview

All API responses are JSON except the authenticated resume download. Send `Authorization: Bearer <token>` to protected endpoints.

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/health` | Public | Health check |
| `POST` | `/api/auth/register` | Public | Register a candidate (name, email, password, phone) |
| `POST` | `/api/auth/login` | Public | Login; returns JWT and user |
| `GET` | `/api/auth/me` | Authenticated | Restore current user |
| `POST` | `/api/auth/logout` | Authenticated | Stateless logout acknowledgement; client discards token |
| `GET` | `/api/jobs` | Public | Search/filter/sort jobs; supports `page`, `limit`, `search`, `title`, `skill`, `location`, `type`, `category`, `experience`, `company`, `salaryMin`, `salaryMax`, `sort` |
| `GET` | `/api/jobs/:id` | Public | Job details |
| `GET` | `/api/jobs/mine` | Recruiter/admin | Own jobs (all jobs for admin) |
| `POST` | `/api/jobs` | Recruiter/admin | Create a job |
| `PUT` | `/api/jobs/:id` | Owner recruiter/admin | Update a job |
| `DELETE` | `/api/jobs/:id` | Owner recruiter/admin | Soft-delete a job |
| `POST` | `/api/applications` | Candidate | Apply using multipart field `resume` (PDF/DOC/DOCX, max 5 MB); existing JSON `resumeLink` clients remain supported |
| `GET` | `/api/applications/my` | Candidate | Candidate application history |
| `GET` | `/api/applications/received` | Recruiter/admin | Applications for recruiter-owned jobs / all for admin |
| `GET` | `/api/applications/:id` | Owner candidate, job recruiter, admin | Application details |
| `GET` | `/api/applications/:id/resume` | Authorized application participant | Securely download uploaded resume |
| `PUT` | `/api/applications/:id/status` | Job recruiter/admin | Update status: `pending`, `reviewed`, `shortlisted`, `interview`, `rejected`, `hired` |
| `DELETE` | `/api/applications/:id` | Owning candidate/admin | Withdraw/delete application |
| `GET`, `PUT`, `DELETE` | `/api/users/profile` | Authenticated | Read/update/delete own profile |
| `GET` | `/api/admin/stats` | Admin only | Counts, monthly applications, job categories |
| `GET` | `/api/admin/users` | Admin only | Search/filter platform accounts |
| `PUT` | `/api/admin/users/:id/disable` | Admin only | Disable or re-enable an account |
| `GET` | `/api/notifications` | Authenticated | Recent notifications and unread count |
| `PUT` | `/api/notifications/:id/read` | Authenticated | Mark one notification read |
| `PUT` | `/api/notifications/read-all` | Authenticated | Mark all notifications read |

See [API-DOCUMENTATION.md](./API-DOCUMENTATION.md) and the Postman collection at [postman/DG-Interns-Hub-API.json](./postman/DG-Interns-Hub-API.json) for request examples.

### API contract notes

- Job search retains the existing endpoint/response shape (`page`, `limit`, `total`, `totalPages`, `data`) and adds optional filters and sort values.
- Existing JSON application clients using `resumeLink` continue to work. The UI now uploads a resume file, which is stored privately in `server/uploads/resumes/`; retrieval is authorized through the application resume endpoint.
- Application status adds `interview`; existing `pending`, `reviewed`, `shortlisted`, `rejected`, and `hired` values remain valid.
- Admin stats/user controls and notifications are additive routes. Self-registration still cannot set a privileged role.

## Performance decisions

- `React.memo(JobCard)` avoids rerendering stable job cards when the surrounding listing updates.
- `useMemo` derives dashboard metrics and match scores from fetched data instead of recalculating on every render.
- `useCallback` stabilizes dashboard loaders and retry handlers passed to children/effects.
- `React.lazy`/`Suspense` split page bundles so a visitor does not download every dashboard up front.
- `useDebounce` delays search requests by 400 ms; server-side pagination bounds each listing response.

## Testing and screenshots

Actual test outcomes and environment blockers are recorded in [docs/WEEK10_TEST_RESULTS.md](./docs/WEEK10_TEST_RESULTS.md). The screenshot capture matrix and exact filenames are in [docs/SCREENSHOT-CHECKLIST.md](./docs/SCREENSHOT-CHECKLIST.md). Put genuine captures in `screenshots/`; the repository does not fabricate screenshots.

## Submission materials

- Project report: `docs/Week10-Project-Report.docx`
- Presentation: `docs/Week10-Project-Presentation.pptx`
- Demo walkthrough: [docs/DEMO-VIDEO-SCRIPT.md](./docs/DEMO-VIDEO-SCRIPT.md)
- LinkedIn post: [LINKEDIN-POST.md](./LINKEDIN-POST.md)

The DOCX/PPTX should be updated with actual screenshots and test outcomes after running the seeded app locally.

## Suggested Git history and push

Suggested small commits:

```text
feat(auth): add role-based dashboards and persisted sessions
feat(api): centralize Axios client and extend role-protected endpoints
feat(jobs): add advanced filters sorting and pagination
feat(applications): validate forms and securely upload resumes
feat(dashboards): add analytics notifications and recommendations
docs(submission): add Week 10 report tests and demo materials
```

To publish the completed work:

```powershell
git add .
git commit -m "feat: complete Week 10 job portal upgrade"
git push origin <your-branch>
```
#   W e e k - 1 0 - W e b - D e v e l o p m e n t  
 