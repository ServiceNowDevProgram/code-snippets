# Advanced REST API Integration with Retry Logic

This folder contains advanced Script Include examples demonstrating robust REST API integration patterns with retry logic, circuit breaker pattern, rate limiting, and comprehensive error handling.

## Overview

Production-grade REST API integrations require more than basic HTTP calls. This example demonstrates:
- **Exponential backoff retry logic** for transient failures
- **Circuit breaker pattern** to prevent cascading failures
- **Rate limiting** to respect API quotas
- **Request/response logging** for debugging and auditing
- **OAuth 2.0 authentication** with token caching
- **Comprehensive error handling** with custom exceptions
- **Response caching** to reduce API calls

## Script Descriptions

- **RESTIntegrationHandler.js**: Main Script Include with complete integration framework including retry logic, circuit breaker, and rate limiting.
- **RESTIntegrationExample.js**: Example usage showing how to implement specific API integrations using the handler.
- **RESTIntegrationUtils.js**: Utility functions for common REST operations like authentication, response parsing, and error handling.

## Key Features

### 1. Exponential Backoff Retry Logic
Automatically retries failed requests with increasing delays:
```javascript
// Retry delays: 1s, 2s, 4s, 8s, 16s
maxRetries: 5
initialDelay: 1000ms
backoffMultiplier: 2
```

### 2. Circuit Breaker Pattern
Prevents overwhelming failing services:
- **Closed**: Normal operation, requests pass through
- **Open**: Service failing, requests fail fast
- **Half-Open**: Testing if service recovered

### 3. Rate Limiting
Respects API rate limits:
- Token bucket algorithm
- Configurable requests per second
- Automatic throttling

### 4. OAuth 2.0 Support
Handles authentication automatically:
- Token acquisition and refresh
- Secure credential storage
- Automatic retry on 401 errors

## Use Cases

- **External API Integration**: Integrate with third-party services (Slack, Teams, Jira, etc.)
- **Microservices Communication**: Call internal microservices with resilience
- **Data Synchronization**: Sync data between ServiceNow and external systems
- **Webhook Handlers**: Make reliable outbound webhook calls
- **Enterprise Service Bus**: Connect to ESB/API Gateway

## Configuration

Create a system property for each integration:
```javascript
// System Properties
x_company.api.base_url = https://api.example.com
x_company.api.client_id = your_client_id
x_company.api.client_secret = [encrypted]
x_company.api.max_retries = 5
x_company.api.rate_limit = 100 // requests per minute
```

## Error Handling

The framework provides detailed error information:
- HTTP status codes
- Error messages from API
- Retry attempts made
- Circuit breaker state
- Request/response logs

## Performance Considerations

- **Connection Pooling**: Reuses HTTP connections
- **Response Caching**: Caches GET responses with TTL
- **Async Operations**: Supports async calls for long-running operations
- **Timeout Configuration**: Configurable timeouts per endpoint

## Security Best Practices

- Store credentials in encrypted system properties
- Use OAuth 2.0 or API keys (never hardcode)
- Log requests but sanitize sensitive data
- Implement IP whitelisting where possible
- Use HTTPS only
- Validate SSL certificates

## Monitoring and Alerting

The framework logs metrics for monitoring:
- Request count and success rate
- Average response time
- Retry count
- Circuit breaker state changes
- Rate limit violations

## Testing

Include unit tests for:
- Successful API calls
- Retry logic on transient failures
- Circuit breaker state transitions
- Rate limiting behavior
- Authentication token refresh
- Error handling

## Related Patterns

- **RESTMessageV2**: ServiceNow's built-in REST client
- **GlideHTTPRequest**: Lower-level HTTP client
- **Outbound REST Messages**: Configuration-based REST calls
- **MID Server**: For on-premise API calls

## Additional Resources

- ServiceNow REST API Documentation
- Circuit Breaker Pattern
- OAuth 2.0 Specification
- Rate Limiting Algorithms
