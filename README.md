# EZD
⭐ Easy deployment and manager deploy version ⭐

### A typical top-level directory layout
    .
    ├── backup                   # All file or data needs backup
    ├── db                       # Init database
    ├── deployment               # deployment service
    ├── gateway                  # gateway for microservice
    ├── nginx                    # nginx service
    ├── project                  # project service
    ├── react-app                # Application
    ├── storage (removed)        # Storage Service
    ├── team                     # Team service
    ├── .env.example
    ├── .gitignore
    ├── docker-compose.yml
    ├── docker-compose.prod.yml
    └── README.md

### Deployment for production
```sh
docker compose -f docker-compose.prod.yml up [service] -d
```
re-building
```sh
docker compose -f docker-compose.prod.yml up [service] -d --build
```