# Putong OJ

[![Node.JS](https://img.shields.io/badge/node-%3E=18-417e38.svg)](https://nodejs.org/)
[![Test Status](https://img.shields.io/github/actions/workflow/status/net-escape/ptoj-backend/ci.yml?label=test)](https://github.com/net-escape/ptoj-backend/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/net-escape/ptoj-backend/main)](https://app.codecov.io/github/net-escape/ptoj-backend)
[![GitHub License](https://img.shields.io/github/license/net-escape/ptoj-backend)](https://github.com/net-escape/ptoj-backend/blob/main/LICENSE)

Putong OJ is an online judge system designed for competitive programming and algorithmic problem-solving. A live instance is available at [acm.cjlu.edu.cn](https://acm.cjlu.edu.cn/).

## Features ✨

- **One-Click Deployment** – Easily deploy with Docker.
- **Modern Web Interface** – Built as a single-page application (SPA) using Vue.js.
- **Scalable Architecture** – Backed by Koa.js, MongoDB, and Redis for optimal performance.
- **Multiple Testcases Support** – Run and evaluate submissions with multiple testcases.
- **Flexible Judging System** – Supports various programming languages.
- **Real-Time Status Updates** – Monitor submissions and results dynamically.
- **Contest Mode** – Conduct coding contests with live rankings and scoreboard.
- **Submission History** – Track past submissions with insights.
- **Code Execution Sandbox** – Secure environment to prevent malicious execution.
- **RESTful API Support** – Extend functionality with API integrations.
- *And much more...*

## Getting Started 🚀

### Prerequisites

Before proceeding, ensure that you have the following installed:
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### Build and Run

#### Build Docker Image

Run the following command to build the Docker image:

```bash
docker build -t ptoj-app .
```

#### Run the Application

Replace `<YOUR_MONGODB_URL>` and `<YOUR_REDIS_URL>` with your actual database connection URLs:

```bash
docker run -d --name ptoj-app \
    -p 3000:3000 \
    -e NODE_ENV=production \
    -e dbURL=<YOUR_MONGODB_URL> \
    -e redisURL=<YOUR_REDIS_URL> \
    ptoj-app
```

This will start the application on port `3000`.

### Persistent Data Storage

To retain data across container restarts, mount the following volumes:

```plaintext
/app/data
/app/logs
/app/public/uploads
```

### Setting Up the Judger

To configure the judging system, refer to [ptoj-judger](https://github.com/net-escape/ptoj-judger).

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
