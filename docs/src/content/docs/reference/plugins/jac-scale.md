---
title: Cloud-Scale Reference
---# jac-scale Reference

jac-scale generates REST endpoints from your Jac walkers and functions. Running `jac start` with this plugin turns every `:pub` or `:priv` walker into an API endpoint backed by FastAPI, with automatic Swagger docs, SQLite persistence, and built-in authentication.

For production, the `--scale` flag automates Docker image builds and Kubernetes deployment -- generating Dockerfiles, manifests, and service configurations from your code. This reference covers server startup options, endpoint generation, authentication, database persistence, Kubernetes deployment, and the CLI flags for each mode.

---

## Installation

```bash
pip install jac-scale
```

---

## Starting a Server

### Basic Server

```bash
jac start app.jac
```

### Server Options

| Option | Description | Default |
|--------|-------------|---------|
| `--port` `-p` | Server port (auto-fallback if in use) | 8000 |
| `--main` `-m` | Treat as `__main__` | false |
| `--faux` `-f` | Print generated API docs only (no server) | false |
| `--dev` `-d` | Enable HMR (Hot Module Replacement) mode | false |
| `--api_port` `-a` | Separate API port for HMR mode (0=same as port) | 0 |
| `--no_client` `-n` | Skip client bundling/serving (API only) | false |
| `--profile` | Configuration profile to load (e.g. prod, staging) | - |
| `--client` | Client build target for dev server (web, desktop, pwa) | - |
| `--scale` | Deploy to a target platform instead of running locally | false |
| `--build` `-b` | Build and push Docker image (with --scale) | false |
| `--experimental` `-e` | Install from repo instead of PyPI (with --scale) | false |
| `--target` | Deployment target (kubernetes, aws, gcp) | kubernetes |
| `--registry` | Image registry (dockerhub, ecr, gcr) | dockerhub |

### Examples

```bash
# Custom port
jac start app.jac --port 3000

# Multiple workers
jac start app.jac --workers 4

# API only -- skip client bundling
jac start app.jac --dev --no_client

# Production
jac start app.jac --host 0.0.0.0 --port 8000 --workers 4
```

---

## API Endpoints

### Automatic Endpoint Generation

Each walker becomes an API endpoint:

```jac
walker get_users {
    can fetch with Root entry {
        report [];
    }
}
```

Becomes: `POST /walker/get_users`

### Request Format

Walker parameters become request body:

```jac
walker search {
    has query: str;
    has limit: int = 10;
}
```

```bash
curl -X POST http://localhost:8000/walker/search \
  -H "Content-Type: application/json" \
  -d '{"query": "hello", "limit": 20}'
```

### Response Format

Walker `report` values become the response.

---

## @restspec Decorator

The `@restspec` decorator customizes how walkers and functions are exposed as REST API endpoints.

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `method` | `HTTPMethod` | `POST` | HTTP method for the endpoint |
| `path` | `str` | `""` (auto-generated) | Custom URL path for the endpoint |
| `protocol` | `APIProtocol` | `APIProtocol.HTTP` | Protocol for the endpoint (`HTTP`, `WEBHOOK`, or `WEBSOCKET`) |
| `broadcast` | `bool` | `False` | Broadcast responses to all connected WebSocket clients (only valid with `WEBSOCKET` protocol) |

> **Note:** `APIProtocol` and `restspec` are builtins and do not require an import statement. `HTTPMethod` must be imported with `import from http { HTTPMethod }`.

### Custom HTTP Method

By default, walkers are exposed as `POST` endpoints. Use `@restspec` to change this:

```jac
import from http { HTTPMethod }

@restspec(method=HTTPMethod.GET)
walker :pub get_users {
    can fetch with Root entry {
        report [];
    }
}
```

This walker is now accessible at `GET /walker/get_users` instead of `POST`.

### Custom Path

Override the auto-generated path:

```jac
@restspec(method=HTTPMethod.GET, path="/custom/users")
walker :pub list_users {
    can fetch with Root entry {
        report [];
    }
}
```

Accessible at `GET /custom/users`.

### Functions

`@restspec` also works on standalone functions:

```jac
@restspec(method=HTTPMethod.GET)
def :pub health_check() -> dict {
    return {"status": "healthy"};
}

@restspec(method=HTTPMethod.GET, path="/custom/status")
def :pub app_status() -> dict {
    return {"status": "running", "version": "1.0.0"};
}
```

### Webhook Mode

See the [Webhooks](#webhooks) section below.

---

## Authentication

### User Registration

```bash
curl -X POST http://localhost:8000/user/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secret"}'
```

### User Login

```bash
curl -X POST http://localhost:8000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secret"}'
```

Returns:

```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

### Authenticated Requests

```bash
curl -X POST http://localhost:8000/walker/my_walker \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### JWT Configuration

Configure JWT authentication via environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT signing | `supersecretkey` |
| `JWT_ALGORITHM` | JWT algorithm | `HS256` |
| `JWT_EXP_DELTA_DAYS` | Token expiration in days | `7` |

### SSO (Single Sign-On)

jac-scale supports SSO with external identity providers. Currently supported: Google.

**Configuration:**

| Variable | Description |
|----------|-------------|
| `SSO_HOST` | SSO callback host URL (default: `http://localhost:8000/sso`) |
| `SSO_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `SSO_GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

**SSO Endpoints:**

| Method | Path | Description |
|--------|------|-------------|
| GET | `/sso/{platform}/login` | Redirect to provider login page |
| GET | `/sso/{platform}/register` | Redirect to provider registration |
| GET | `/sso/{platform}/login/callback` | OAuth callback handler |

**Example:**

```bash
# Redirect user to Google login
curl http://localhost:8000/sso/google/login
```

---

## Admin Portal

jac-scale includes a built-in admin portal for managing users, roles, and SSO configurations.

### Accessing the Admin Portal

Navigate to `http://localhost:8000/admin` to access the admin dashboard. On first server start, an admin user is automatically bootstrapped.

### Configuration

```toml
[plugins.scale.admin]
enabled = true
username = "admin"
session_expiry_hours = 24
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | bool | `true` | Enable/disable admin portal |
| `username` | string | `"admin"` | Admin username |
| `session_expiry_hours` | int | `24` | Admin session duration in hours |
| `require_password_reset` | bool | `true` | Force admin to change the default password on first login |

**Environment Variables:**

| Variable | Description |
|----------|-------------|
| `ADMIN_USERNAME` | Admin username (overrides jac.toml) |
| `ADMIN_EMAIL` | Admin email (overrides jac.toml) |
| `ADMIN_DEFAULT_PASSWORD` | Initial password (overrides jac.toml) |

### User Roles

| Role | Value | Description |
|------|-------|-------------|
| `ADMIN` | `admin` | Full administrative access |
| `MODERATOR` | `moderator` | Limited administrative access |
| `USER` | `user` | Standard user access |

### Admin API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/admin/login` | Admin authentication |
| GET | `/admin/users` | List all users |
| GET | `/admin/users/{username}` | Get user details |
| POST | `/admin/users` | Create a new user |
| PUT | `/admin/users/{username}` | Update user role/settings |
| DELETE | `/admin/users/{username}` | Delete a user |
| POST | `/admin/users/{username}/force-password-reset` | Force password reset |
| GET | `/admin/sso/providers` | List SSO providers |
| GET | `/admin/sso/users/{username}/accounts` | Get user's SSO accounts |

---

```

Displays a table with:

- **Component health** - Jaseci App, Redis, MongoDB, Prometheus, Grafana
- **Pod readiness** - `ready/total` replica count per component
- **Service URLs** - application endpoint and Grafana URL

Status values:

| Value | Meaning |
|-------|---------|
| `Running` | All pods ready |
| `Degraded` | Some pods ready, others not |
| `Pending` | Pods are starting up |
| `Restarting` | One or more pods are crash-looping |
| `Failed` | No pods are running |
| `Not Deployed` | Component was never provisioned |

---

### Resource Tagging

All Kubernetes resources created by jac-scale are labeled `managed: jac-scale` for easy auditing:

```bash
# List all jac-scale managed resources across all namespaces
kubectl get all -l managed=jac-scale -A
```

Tagged resource types: Deployments, StatefulSets, Services, ConfigMaps, Secrets, PersistentVolumeClaims, HorizontalPodAutoscalers.

---

### Remove Deployment

```bash
jac destroy app.jac
```

!!! warning
    You will be prompted to confirm with `y` before deletion proceeds. The command deletes the entire namespace and **all** its resources - including persistent volumes and database data.

Removes:

- Application Deployment and pods
- Redis and MongoDB StatefulSets
- PersistentVolumeClaims (data is lost)
- Services, ConfigMaps, Secrets, and HPA

---

## Health Checks

### Health Endpoint

Create a health walker:

```jac
walker health {
    can check with Root entry {
        report {"status": "healthy"};
    }
}
```

Access at: `POST /walker/health`

### Readiness Check

```jac
walker ready {
    can check with Root entry {
        db_ok = check_database();
        cache_ok = check_cache();

        if db_ok and cache_ok {
            report {"status": "ready"};
        } else {
            report {
                "status": "not_ready",
                "db": db_ok,
                "cache": cache_ok
            };
        }
    }
}
```

---

## Builtins

### Root Access

```jac
with entry {
    # Get all roots in memory/database
    roots = allroots();
}
```

### Memory Commit

```jac
with entry {
    # Commit memory to database
    commit();
}
```

---

## CLI Commands

| Command | Description |
|---------|-------------|
| `jac start app.jac` | Start local API server |
| `jac start app.jac --scale` | Deploy to Kubernetes |
| `jac start app.jac --scale --build` | Build image and deploy |
| `jac start app.jac --scale --target kubernetes` | Explicit deployment target (default) |
| `jac status app.jac` | Show live deployment status |
| `jac status app.jac --target kubernetes` | Status for a specific target |
| `jac destroy app.jac` | Remove Kubernetes deployment (prompts for confirmation) |
| `jac destroy app.jac --target kubernetes` | Destroy a specific target |

---

## API Documentation

When server is running:

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`
- **OpenAPI JSON:** `http://localhost:8000/openapi.json`

---

## Prometheus Metrics

jac-scale provides built-in Prometheus metrics collection for monitoring HTTP requests and walker execution. When enabled, a `/metrics` endpoint is automatically registered for Prometheus to scrape.

### Configuration

Configure metrics in `jac.toml`:

```toml
[plugins.scale.metrics]
enabled = true                  # Enable metrics collection and /metrics endpoint
endpoint = "/metrics"           # Prometheus scrape endpoint path
namespace = "myapp"             # Metrics namespace prefix
walker_metrics = true           # Enable per-walker execution timing
histogram_buckets = [0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1.0, 2.5, 5.0, 10.0]
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | bool | `false` | Enable Prometheus metrics collection and `/metrics` endpoint |
| `endpoint` | string | `"/metrics"` | Path for the Prometheus scrape endpoint |
| `namespace` | string | `"jac_scale"` | Metrics namespace prefix |
| `walker_metrics` | bool | `false` | Enable walker execution timing metrics |
| `histogram_buckets` | list | `[0.005, ..., 10.0]` | Histogram bucket boundaries in seconds |

> **Note:** If `namespace` is not set, it is derived from the Kubernetes namespace config (sanitized) or defaults to `"jac_scale"`.

### Exposed Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `{namespace}_http_requests_total` | Counter | `method`, `path`, `status_code` | Total HTTP requests processed |
| `{namespace}_http_request_duration_seconds` | Histogram | `method`, `path` | HTTP request latency in seconds |
| `{namespace}_http_requests_in_progress` | Gauge | -- | Concurrent HTTP requests |
| `{namespace}_walker_duration_seconds` | Histogram | `walker_name`, `success` | Walker execution duration (only when `walker_metrics=true`) |

### Authentication

The `/metrics` endpoint requires admin authentication. Include the admin token in the `Authorization` header:

```bash
# Scrape metrics (admin token required)
curl -H "Authorization: Bearer <admin_token>" http://localhost:8000/metrics
```

Unauthenticated requests receive a 403 Forbidden response. This protects sensitive server performance data from unauthorized access.

### Admin Metrics Dashboard

The admin portal includes a monitoring page that displays metrics in a visual dashboard. Access it at `/admin` and navigate to the Monitoring section.

Additionally, the `/admin/metrics` endpoint returns parsed metrics as structured JSON:

```bash
curl -H "Authorization: Bearer <admin_token>" http://localhost:8000/admin/metrics
```

Response format:

```json
{
  "status": "success",
  "data": {
    "metrics": [
      {
        "name": "jac_scale_http_requests_total",
        "type": "counter",
        "help": "Total HTTP requests processed",
        "values": [
          {"labels": {"method": "GET", "path": "/", "status_code": "200"}, "value": 42}
        ]
      }
    ],
    "summary": {
      "total_requests": 156,
      "avg_latency_ms": 45.2,
      "error_rate_percent": 0.5,
      "active_requests": 2
    }
  }
}
```

The admin dashboard monitoring page displays:

- HTTP traffic breakdown by method and status code
- Request latency statistics
- Active requests gauge
- System metrics (GC collections, memory usage, CPU time, file descriptors)

Requests to the metrics endpoint itself are excluded from tracking.

---

## Kubernetes Secrets

Manage sensitive environment variables securely in Kubernetes deployments using the `[plugins.scale.secrets]` section.

### Configuration

```toml
[plugins.scale.secrets]
OPENAI_API_KEY = "${OPENAI_API_KEY}"
DATABASE_PASSWORD = "${DB_PASS}"
STATIC_VALUE = "hardcoded-value"
```

Values using `${ENV_VAR}` syntax are resolved from the local environment at deploy time. The resolved key-value pairs are created as a proper Kubernetes Secret (`{app_name}-secrets`) and injected into pods via `envFrom.secretRef`.

### How It Works

1. At `jac start app.jac --scale`, environment variable references (`${...}`) are resolved
2. A Kubernetes `Opaque` Secret named `{app_name}-secrets` is created (or updated if it already exists)
3. The Secret is attached to the deployment pod spec via `envFrom.secretRef`
4. All keys become environment variables inside the container
5. On `jac destroy`, the Secret is automatically cleaned up

### Example

```toml
# jac.toml
[plugins.scale.secrets]
OPENAI_API_KEY = "${OPENAI_API_KEY}"
MONGO_PASSWORD = "${MONGO_PASSWORD}"
JWT_SECRET = "${JWT_SECRET}"
```

```bash
# Set local env vars, then deploy
export OPENAI_API_KEY="sk-..."
export MONGO_PASSWORD="secret123"
export JWT_SECRET="my-jwt-key"

jac start app.jac --scale --build
```

This eliminates the need for manual `kubectl create secret` commands after deployment.

---

## Related Resources

- [Local API Server Tutorial](/tutorials/production/local/)
- [Kubernetes Deployment Tutorial](/tutorials/production/kubernetes/)
- [Backend Integration Tutorial](/tutorials/fullstack/backend/)
