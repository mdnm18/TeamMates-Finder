# CodeHive
A web platform for SRMIST students to find teammates for projects, hackathons, and competitive programming.


```
CodeHive/
├── .git/
├── client/                 <-- Your React + Vite Frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/         # Reusable UI (Cards, Modals)
│   │   ├── pages/              # Route-level views (Profile, Dashboard)
│   │   ├── redux/              # State management slices
│   │   ├── services/           # Axios interceptors, Socket instance
│   │   └── index.css           # Tailwind injection & print media queries
│   ├── Dockerfile              # Multi-stage Nginx build
│   └── vite.config.js          # Build configuration & proxy
├── server/                     # Node.js Backend
│   ├── config/                 # Firebase & DB configuration
│   ├── controllers/            # Core business logic
│   ├── models/                 # Sequelize MySQL Schemas
│   ├── routes/                 # Express API endpoints
│   ├── services/               # Socket.io Notification Engine
│   └── Dockerfile              # Node.js environment build
├── nginx/                      # Reverse Proxy Configuration
│   └── nginx.conf              # Upstream routing rules
├── docker-compose.yml          # Container orchestration
└── .github/workflows/          # CI/CD Pipeline definitions
```

---

## 11. Future Enhancements & Contributing

### **Roadmap**
*   [ ] **Redis Caching**: Implement AWS ElastiCache to store high-frequency read queries (like the Global Feed) to reduce RDS load.
*   [ ] **Kafka Message Queue**: Decouple the real-time notification engine using Apache Kafka for extreme scalability during university-wide hackathons.
*   [ ] **Algorithmic Matchmaking AI**: Integrate a small Python/FastAPI microservice to run Cosine Similarity algorithms on user skills to automate partner recommendations.

### **Contributing**
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
*Architected and developed with ❤️ for the student developer community.*
