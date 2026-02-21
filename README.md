# Interactive Product Analytics Dashboard

---

## Source Code

### Backend (Spring Boot – MySQL)
https://github.com/divya7017/analyticsdashboard  

### Frontend (Next.js)
https://github.com/divya7017/studio  

---

## Live Demo

### Frontend (Vercel)
https://studio-theta-ecru.vercel.app/login  

### Backend API (Railway)
https://analyticsdashboard-production-c0d2.up.railway.app  

---

# Project Overview

This is a Full Stack Interactive Product Analytics Dashboard that tracks its own usage.

Every user interaction (filter change, chart click) is recorded using the `/track` endpoint and stored in the database.

The stored data is visualized using:

- **Bar Chart** → Total feature usage  
- **Line Chart** → Time-based trend for selected feature  

The system supports authentication, filtering, aggregation, and persistent user preferences.

---

# Tech Stack

## Backend
- Spring Boot  
- Hibernate / JPA  
- MySQL  
- JWT Authentication  
- REST APIs  
- Railway Deployment  

## Frontend
- Next.js (React)  
- Chart Library  
- Axios  
- Cookie-based filter persistence  
- Vercel Deployment  

---

# Instructions to Run Locally

## Backend Setup

### Clone Repository

```bash
git clone https://github.com/divya7017/analyticsdashboard.git
cd analyticsdashboard
```

### Create MySQL Database

```sql
CREATE DATABASE analytics;
```

### Configure application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/analytics
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true
```

### Run Backend

```bash
mvn clean install
mvn spring-boot:run
```

Backend runs at:
http://localhost:8080

---

## Frontend Setup

```bash
git clone https://github.com/divya7017/studio.git
cd studio
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Run:

```bash
npm run dev
```

Frontend runs at:
http://localhost:3000

---

# API Endpoints

## Authentication
- POST /register  
- POST /login  

## Tracking
- POST /track  

## Analytics
- GET /analytics  

---

# Dummy Data Seeder

To generate dummy analytics data:

GET  
https://analyticsdashboard-production-c0d2.up.railway.app/dummy  

Each call generates random feature_click records distributed across multiple dates.

---

# Architectural Choices

1. Layered architecture (Controller → Service → Repository).  
2. Stateless JWT authentication.  
3. SQL GROUP BY aggregation for performance.  
4. RESTful API with query parameters.  
5. Cookie-based filter persistence.  
6. Separate frontend and backend deployment.  

---

# Scalability Essay – Handling 1 Million Write Events per Minute

The current architecture writes directly to MySQL via the `/track` endpoint. This approach would fail at 1 million write-events per minute due to database write bottlenecks.

To scale:

1. Introduce Kafka between API and database.
2. Publish `/track` events asynchronously.
3. Batch insert events via consumer services.
4. Partition feature_clicks table by date.
5. Use Redis caching for analytics.
6. Add read replicas for heavy queries.
7. Horizontally scale backend instances.

This event-driven architecture enables high-throughput ingestion while maintaining system stability.
