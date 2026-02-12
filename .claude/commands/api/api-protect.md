---
platform: claude
description: Add authentication, authorization, and security to API endpoints
model: claude-sonnet-4-5
---

> **Claude Code**: Use as a slash command or prompt.

Add comprehensive security, authentication, and authorization to the specified API route.

## Target API Route

$ARGUMENTS

## Agent Definitions

**CRITICAL**: Before implementing security and authentication, you MUST:

1. **Read Agent Definitions**: Load and review the agent definitions from `.cursor-plugin/plugin.json`
   - Read the `agents` array to understand available specialized agents
   - Identify agent definitions relevant to security and API protection

2. **Identify Relevant Agents**: For API security and protection, the following agents are typically relevant:
   - **security-engineer**: For authentication, authorization, vulnerability assessment, and security best practices
   - **backend-architect**: For backend system design, data integrity, and secure API architecture
   - **system-architect**: For scalable security architecture and long-term maintainability

3. **Load Agent Definitions**: Read the agent definition files from `.cursor/agents/` directory:
   - `.cursor/agents/security-engineer.md` - Apply security-first mindset and zero-trust principles
   - `.cursor/agents/backend-architect.md` - Apply backend architecture principles for secure APIs
   - `.cursor/agents/system-architect.md` - Apply system architecture considerations for security

4. **Apply Agent Roles**: Use the agent definitions to inform your security approach:
   - Incorporate the security perspectives, principles, and guidelines from relevant agents
   - Apply agent-specific security best practices to the API protection implementation
   - Ensure the generated code aligns with the agent's security expertise and focus areas
   - Follow zero-trust principles and defense-in-depth strategies from security-engineer
   - Consider threat modeling and attack vector analysis when implementing protections

5. **Role Integration**: The agent definitions should shape the role and approach for this command:
   - Combine the command's security guidelines with agent-specific security expertise
   - Apply agent principles throughout authentication, authorization, validation, and security decisions
   - Ensure the implementation reflects the specialized security knowledge from relevant agents
   - Prioritize security-first mindset and comprehensive threat protection

**Note**: The agent definitions provide specialized security expertise that enhances the base command instructions. Always consult and apply relevant agent definitions when securing API routes, especially the security-engineer agent for comprehensive security implementation.

## Security Layers to Implement

###1. **Authentication** (Who are you?)
- Verify user identity
- Token validation (JWT, session, API keys)
- Handle expired/invalid tokens

### 2. **Authorization** (What can you do?)
- Role-based access control (RBAC)
- Resource-level permissions
- Check user ownership

### 3. **Input Validation**
- Sanitize all inputs
- SQL/NoSQL injection prevention
- XSS prevention
- Type validation with Zod

### 4. **Rate Limiting**
- Prevent abuse
- Per-user/IP limits
- Sliding window algorithm

### 5. **CORS** (if needed)
- Whitelist allowed origins
- Proper headers
- Credentials handling

## Implementation Approach

### For Supabase Projects:
```typescript
// Use Supabase Auth + RLS
- getUser() from server-side client
- RLS policies for data access
- Service role key for admin operations
```

### For NextAuth.js Projects:
```typescript
// Use NextAuth sessions
- getServerSession() in route handlers
- Protect with middleware
- Role checking logic
```

### For Custom Auth:
```typescript
// JWT validation
- Verify tokens
- Decode and validate claims
- Check expiration
```

## Security Checklist

**Authentication**
-  Verify authentication tokens
-  Handle missing/invalid tokens (401)
-  Check token expiration
-  Secure token storage recommendations

**Authorization**
-  Check user roles/permissions (403)
-  Verify resource ownership
-  Implement least privilege principle
-  Log authorization failures

**Input Validation**
-  Validate all inputs with Zod
-  Sanitize SQL/NoSQL inputs
-  Escape special characters
-  Limit payload sizes

**Rate Limiting**
-  Per-user limits
-  Per-IP limits
-  Clear error messages (429)
-  Retry-After headers

**CORS**
-  Whitelist specific origins
-  Handle preflight requests
-  Secure credentials
-  Appropriate headers

**Error Handling**
-  Don't expose stack traces
-  Generic error messages
-  Log detailed errors server-side
-  Consistent error format

**Logging & Monitoring**
-  Log authentication attempts
-  Log authorization failures
-  Track suspicious activity
-  Monitor rate limit hits

## What to Generate

1. **Protected Route Handler** - Secured version of the API route
2. **Middleware/Utilities** - Reusable auth helpers
3. **Type Definitions** - User, permissions, roles
4. **Error Responses** - Standardized auth errors
5. **Usage Examples** - Client-side integration

## Common Patterns for Solo Developers

**Pattern 1: Simple Token Auth**
```typescript
// For internal tools, admin panels
const token = request.headers.get('authorization')
if (token !== process.env.ADMIN_TOKEN) {
  return new Response('Unauthorized', { status: 401 })
}
```

**Pattern 2: User-based Auth**
```typescript
// For user-facing apps
const user = await getCurrentUser(request)
if (!user) {
  return new Response('Unauthorized', { status: 401 })
}
```

**Pattern 3: Role-based Auth**
```typescript
// For apps with different user types
const user = await getCurrentUser(request)
if (!user || !hasRole(user, 'admin')) {
  return new Response('Forbidden', { status: 403 })
}
```

Generate production-ready, secure code that follows the principle of least privilege.
