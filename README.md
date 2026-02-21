Interactive Product Analytics Dashboard
1. Source Code
Backend (Spring Boot)
https://github.com/divya7017/analyticsdashboard
Frontend (Next.js)
https://github.com/divya7017/studio

2. Live Demo
Frontend (Vercel):
https://studio-theta-ecru.vercel.app/login
Backend API (Railway/Render):
https://analyticsdashboard-production-c0d2.up.railway.app

4. Documentation
Project Overview
This is a Full Stack Interactive Product Analytics Dashboard that tracks its own usage.
Every user interaction (filter change, chart click) is recorded using the /track endpoint and stored in the database. The stored data is then visualized using:
Bar Chart → Total feature usage
Line Chart → Time-based trend for selected feature
The system supports authentication, filtering, aggregation, and persistent user preferences.

Tech Stack
1.Backend
2.Spring Boot
3.Hibernate
4. MySQL
5.JWT Authentication
6.REST APIs

Frontend
1.Next.js (React)
2.Chart library
3.Axios
4.Cookie-based filter persistence

Instructions to Run Locally
Backend Setup

Clone repository:

git clone https://github.com/divya7017/analyticsdashboard.git
cd analyticsdashboard

Configure database in application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/analytics
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

Run application:

mvn clean install
mvn spring-boot:run

Backend runs on:

http://localhost:8080

Frontend Setup

Clone frontend repository.

Install dependencies:

npm install

Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:8080

Run:

npm run dev

Frontend runs on:

http://localhost:3000

Architectural Choices

1.Layered architecture (Controller → Service → Repository) ensures separation of concerns.
2.JWT authentication provides stateless security.
3.Aggregation queries use SQL GROUP BY for performance.
4.RESTful design with query parameters for filtering.
5.Cookie persistence improves user experience without extra server load.
6.Frontend and backend are deployed separately for independent scaling.

Dummy Data Seeder
To generate dummy analytics data:
Endpoint:
GET https://analyticsdashboard-production-c0d2.up.railway.app/dummy
This endpoint:
Creates 1000 random feature_click records
Distributes timestamps across multiple dates
Simulates realistic usage patterns
You can call this endpoint multiple times to generate additional batches of 200 records.
This ensures the dashboard does not appear empty.
