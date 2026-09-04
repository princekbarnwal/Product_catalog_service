# Product Catalog Service

A REST API for managing a product catalog, built with a focus on high availability, caching, and automated testing/CI — demonstrating backend and data-engineering-adjacent skills (NoSQL, caching, containerized multi-tier deployment, CI/CD).

## Features

- Full CRUD REST API for products (Express + Mongoose)
- **High availability**: MongoDB deployed as a 3-node replica set (`rs0`), with manually tested failover
- **Caching**: Redis with cache-aside pattern on reads, and write-invalidation on POST/PUT/DELETE
- **Containerized**: entire stack (API, MongoDB replica set, Redis) runs via Docker Compose
- **Tested**: Jest + Supertest cover the full CRUD flow end-to-end, with self-cleaning tests
- **CI**: GitHub Actions runs the test suite on every push/PR

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime / Framework | Node.js + Express |
| Database | MongoDB (Mongoose ODM), 3-node replica set |
| Caching | Redis |
| Containerization | Docker + Docker Compose |
| Testing | Jest + Supertest |
| CI | GitHub Actions |

## Getting Started

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `MONGO_URI` | `mongodb://mongo1:27017,mongo2:27017,mongo3:27017/product_catalog_service?replicaSet=rs0` | MongoDB replica set connection string |
| `REDIS_URL` | `redis://redis:6379` | Redis connection string |

The API listens on **port 3000** (fixed, not configurable via env var).

### Run with Docker Compose

```bash
# Clone the repo
git clone https://github.com/princekbarnwal/Product_catalog_service.git
cd Product_catalog_service

# Start the full stack (API + MongoDB replica set + Redis)
docker-compose up
```

The app will be available at `http://localhost:3000`.

> Note: the MongoDB replica set (`rs0`) needs to be initiated (`rs.initiate()`) before the app can connect, unless this is already automated in your `docker-compose.yml` / an init script.

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/products` | List all products (cached in Redis) |
| GET | `/products/:id` | Get a single product by ID |
| POST | `/products` | Create a new product |
| PUT | `/products/:id` | Update a product by ID |
| DELETE | `/products/:id` | Delete a product by ID |

## Running Tests

Tests need to run against the live MongoDB replica set and Redis, so run them inside the app container (not on your host):

```bash
docker exec -it product_catalog_service-app-1 npm test
```

Tests cover the full CRUD flow and clean up after themselves.

## Caching Strategy

Reads check Redis first (cache-aside); on a miss, data is fetched from MongoDB and the cache is populated. Writes (POST/PUT/DELETE) invalidate the relevant cache entries to avoid serving stale data.

## High Availability

MongoDB runs as a 3-node replica set (`rs0`). Failover has been manually tested — killing the primary results in automatic election of a new primary with no application downtime.

## Roadmap

- [ ] JWT-based authentication + role-based access control (reusing Redis for token/session storage) — only authenticated admins can POST/PUT/DELETE; GET remains open

## Author

Prince Kumar Barnwal