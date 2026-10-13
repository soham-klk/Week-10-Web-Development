# LinkedIn Post Draft — DG Interns Hub Week 8

---

🚀 **Week 8 Complete: REST API Development & Advanced Backend Engineering | DG Interns Hub**

Excited to share what I built this week as part of my Web Development Internship at **@DG Interns Hub**!

For Week 8, I upgraded our existing **DG Interns Hub** job & internship portal with a production-ready backend — without touching the existing Week 7 frontend UI.

---

### 🔧 What I Built

**Backend Architecture (Node.js + Express + MongoDB)**
- Modular folder structure: config / controllers / models / routes / middleware / validators / utils
- 3 Mongoose models: User, Job, Application — with proper validation, indexes, and relationships
- 16 REST API endpoints across Auth, Users, Jobs, and Applications

**Authentication & Authorization**
- JWT-based login with 7-day token expiry
- Bcrypt password hashing (salt factor 12)
- Role-based access control: candidate, recruiter, admin
- Admin role cannot be self-assigned — prevents privilege escalation

**Advanced Job API**
- Full-text search across title, company, skills, location
- Combined filters: work type + location + skill + category
- Pagination with metadata (page, limit, total, totalPages)
- Sorting: newest, oldest, deadline

**API Security (12 Practices)**
- Helmet security headers
- Strict CORS origin allowlist
- Global rate limiting (200 req/15min) + auth-specific (20 req/15min)
- 10kb request body size limit
- Input validation with express-validator
- Regex injection protection (user input escaped before regex)
- Mass assignment prevention via whitelisting

**Centralized Error Handling**
- Handles Mongoose validation, bad ObjectId, duplicate keys, JWT errors, malformed JSON
- Never exposes stack traces or internal details in production

**Postman Testing**
- Full collection with 30+ requests
- Automated test assertions for status codes and response structure
- Tests for auth, CRUD, security, and edge cases

**Frontend Integration**
- Created `src/services/api.js` — a typed fetch wrapper
- Jobs page connects to backend with graceful fallback to static data
- Application modal submits to backend API when authenticated
- Real pagination controls added

---

### 📚 Learning Outcomes

✅ How to design a secure, scalable REST API from scratch  
✅ JWT authentication flow and stateless session management  
✅ Role-based access control patterns  
✅ MongoDB schema design with compound indexes  
✅ Defense-in-depth security for web APIs  
✅ How to connect a React frontend to a real backend without redesigning the UI

---

### 🛠 Tech Stack
`Node.js` `Express.js` `MongoDB` `Mongoose` `JWT` `bcryptjs` `Helmet` `CORS` `express-rate-limit` `express-validator` `React` `Vite`

---

This week was a massive leap from frontend-only development to building production-grade backend systems. Grateful to the **@DG Interns Hub** team for the structured internship program!

#WebDevelopment #BackendDevelopment #RESTAPI #NodeJS #MongoDB #ExpressJS #JWT #Internship #DGInternsHub #SoftwareEngineering #FullStack #Week8

---

*Draft — Do not publish automatically. Tag @DG Interns Hub when posting.*
