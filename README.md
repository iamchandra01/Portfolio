<h1 align="center">Hi 👋, I'm Chandra Pratp Singh</h1>
<h3 align="center">A passionate frontend developer from India</h3>

- 🌱 I’m currently learning **Frontend**

- 👨‍💻 All of my projects are available at [https://www.linkedin.com/in/chandra-pratap-singh-a21019346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app](https://www.linkedin.com/in/chandra-pratap-singh-a21019346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

- 💬 Ask me about **HTML,CSS,JavaScript**

- 📫 How to reach me **chandrasingh73682@gmail.com**

- ⚡ Fun fact **I think I am funny**

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://twitter.com/iamchandra_01" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="iamchandra_01" height="30" width="40" /></a>
<a href="https://linkedin.com/in/chandra-pratap-singh-a21019346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="chandra-pratap-singh-a21019346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> </p>

<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=iamchandra01&show_icons=true&locale=en&layout=compact" alt="iamchandra01" /></p>

<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=iamchandra01&show_icons=true&locale=en" alt="iamchandra01" /></p>

<p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=iamchandra01&" alt="iamchandra01" /></p>

---

## Scalable Architecture Design (1 Million Users)

This section proposes a production-ready architecture for scaling to **1 million users** with strong maintainability and performance.

### 1) Architecture Style: Clean Architecture + Modular Services

Use **Clean Architecture** principles in each service:

- **Domain layer**: business rules, entities, value objects.
- **Application layer**: use cases, orchestration, DTOs.
- **Interface layer**: controllers, REST/GraphQL handlers, event consumers.
- **Infrastructure layer**: database adapters, cache clients, message broker, third-party integrations.

Use **modular coding** by splitting the platform into bounded contexts:

- `identity-service` (auth, user profiles)
- `content-service` (posts/projects/media metadata)
- `engagement-service` (likes, comments, follows)
- `notification-service` (email/push/in-app)
- `search-service` (indexing + querying)
- `analytics-service` (events and dashboards)
- `api-gateway` (single entrypoint + routing + rate limiting)

Each module/service owns its data and communicates via APIs or events.

### 2) High-Level System Components

1. **Client Layer**
   - Web app + mobile app.
   - CDN for static assets and image optimization.

2. **Edge Layer**
   - DNS + CDN + WAF.
   - DDoS protection and TLS termination.

3. **Gateway Layer**
   - API Gateway for authentication, authorization, rate limits, request routing, and request shaping.

4. **Service Layer**
   - Stateless microservices deployed in containers (Kubernetes/ECS).
   - Horizontal auto-scaling based on CPU, memory, and request rate.

5. **Data Layer**
   - Relational DB for transactional data (PostgreSQL/MySQL) with read replicas.
   - NoSQL store for high-volume activity feeds (DynamoDB/Cassandra/MongoDB).
   - Redis for caching sessions, hot data, and rate limiter counters.
   - Search index (OpenSearch/Elasticsearch).

6. **Async Layer**
   - Message broker/stream (Kafka/RabbitMQ/SQS+SNS) for eventual consistency and background jobs.

7. **Observability + Ops Layer**
   - Metrics (Prometheus/Grafana), logs (ELK/OpenSearch), tracing (OpenTelemetry/Jaeger).
   - CI/CD pipeline with blue-green or canary deployments.

### 3) Request Flow (Example)

1. User request enters CDN/WAF.
2. API Gateway validates JWT and rate limits.
3. Request routed to domain service.
4. Service checks Redis cache first.
5. On cache miss, fetches from DB/read replica.
6. Response returned and cached with TTL.
7. Side effects (notifications, analytics, indexing) emitted as async events.

### 4) Performance Optimization Strategy

- **Caching strategy**
  - CDN cache for static resources.
  - Redis cache for user profiles, feed pages, feature flags.
  - Cache-aside + TTL + background refresh to reduce DB load.

- **Database performance**
  - Proper indexing, query plans, pagination (cursor-based), and connection pooling.
  - Read/write separation and partitioning/sharding for growth.
  - Archive cold data to cheaper storage.

- **API performance**
  - Response compression (gzip/brotli), HTTP/2 or HTTP/3.
  - Field selection (GraphQL or selective REST response objects).
  - Idempotency keys for write endpoints.

- **Async processing**
  - Offload expensive tasks: emails, report generation, image/video processing, indexing.
  - Retry policies, dead-letter queues, and idempotent consumers.

- **Frontend performance**
  - Lazy loading, code splitting, image optimization, prefetching critical routes.
  - Server-side rendering or static generation where applicable.

### 5) Reliability, Security, and Scalability Controls

- **Reliability**
  - Multi-AZ deployment, health checks, auto-healing, circuit breakers, timeouts.
  - Graceful degradation for non-critical features.

- **Security**
  - OAuth2/OIDC + JWT.
  - RBAC/ABAC authorization.
  - Encryption in transit (TLS) and at rest.
  - Secret management via Vault/Secrets Manager.

- **Scalability**
  - Stateless services for horizontal scaling.
  - Event-driven architecture for burst smoothing.
  - Capacity planning with SLO/SLI driven autoscaling.

### 6) Suggested Codebase Structure (Modular + Clean)

```text
/src
  /services
    /identity-service
      /domain
      /application
      /interfaces
      /infrastructure
    /content-service
      /domain
      /application
      /interfaces
      /infrastructure
    /engagement-service
      /domain
      /application
      /interfaces
      /infrastructure
  /shared
    /kernel        # common abstractions and utilities
    /observability # logging, metrics, tracing adapters
    /security      # auth middleware, policy checks
```

### 7) Non-Functional Targets (for 1M users)

- Availability: **99.9%+**
- p95 API latency: **< 250 ms** for read operations
- Error rate: **< 0.5%**
- Recovery: automated failover + runbooks for incident response

### 8) Rollout Plan

1. Start with modular monolith using clean architecture boundaries.
2. Extract high-traffic modules into services (identity, content, engagement).
3. Add message-driven workflows and distributed observability.
4. Scale with read replicas, caching, and autoscaling policies.
5. Introduce advanced partitioning/sharding based on growth metrics.
