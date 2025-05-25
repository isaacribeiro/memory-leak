# Memory Leak Monitoring Project

This project demonstrates how to monitor memory usage in a NestJS application using Prometheus and Grafana.

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn
- nvm (Node Version Manager)

## Installation

1. Install dependencies:
```bash
cd backend
nvm use
npm install
```

## Running the Application

1. Start Prometheus and Grafana:
```bash
docker-compose up -d
```

2. Start the NestJS application:
```bash
npm run start:dev
```

## Accessing the Monitoring Tools

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001
  - Default credentials:
    - Username: admin
    - Password: admin

## Setting up Grafana

1. Log in to Grafana (http://localhost:3001)

2. Add Prometheus as a data source:
   - Go to Configuration (gear icon) > Data Sources
   - Click "Add data source"
   - Select "Prometheus"
   - Set the URL to: `http://host.docker.internal:9090`
   - Click "Save & Test"

3. Import the Memory Leak Dashboard:
   - Go to Dashboards (four squares icon) > Import
   - Click "Upload JSON file"
   - Select the `grafana/memory_leak_dashboard.json` file
   - Click "Import"

## Dashboard Metrics

The dashboard includes the following metrics:
- Heap Size Used (bytes)
- Heap Size Total (bytes)
- Process Resident Memory (bytes)
- GC Duration (seconds)

## Project Structure

```
.
├── src/
│   ├── metrics/
│   │   └── metrics.module.ts    # Prometheus metrics configuration
│   └── app.module.ts           # Main application module
├── prometheus/
│   └── prometheus.yml         # Prometheus configuration
├── grafana/
│   └── memory_leak_dashboard.json  # Grafana dashboard configuration
├── docker-compose.yml         # Docker services configuration
└── package.json              # Project dependencies
```

## Stopping the Services

To stop all services:
```bash
docker-compose down
```

## Troubleshooting

1. If Prometheus can't reach the application:
   - Ensure the application is running on port 3000
   - Check if `host.docker.internal` is properly resolved in your Docker environment

2. If metrics are not showing in Grafana:
   - Verify Prometheus data source is properly configured
   - Check if the application's `/metrics` endpoint is accessible
   - Ensure the correct instance name is used in the dashboard queries

## Additional Information

- The application exposes metrics at `/metrics` endpoint
- Prometheus scrapes metrics every 15 seconds
- The dashboard refreshes every 30 seconds