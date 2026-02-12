---
description: Create a new Next.js API route with validation, error handling, and TypeScript
model: claude-sonnet-4-5
---

Create a new Next.js API route following modern best practices for solo developers.

## Requirements

API Endpoint: $ARGUMENTS

## Agent Definitions

**CRITICAL**: Before implementing the API route, you MUST:

1. **Read Agent Definitions**: Load and review the agent definitions from `.cursor-plugin/plugin.json`
   - Read the `agents` array to understand available specialized agents
   - Identify agent definitions relevant to API development

2. **Identify Relevant Agents**: For API route creation, the following agents are typically relevant:
   - **backend-architect**: For backend system design, data integrity, and fault tolerance
   - **security-engineer**: For authentication, authorization, and security best practices
   - **system-architect**: For scalable architecture and long-term maintainability

3. **Load Agent Definitions**: Read the agent definition files from `.cursor/agents/` directory:
   - `.cursor/agents/backend-architect.md` - Apply backend architecture principles
   - `.cursor/agents/security-engineer.md` - Apply security best practices
   - `.cursor/agents/system-architect.md` - Apply system architecture considerations

4. **Apply Agent Roles**: Use the agent definitions to inform your approach:
   - Incorporate the perspectives, principles, and guidelines from relevant agents
   - Apply agent-specific best practices to the API route implementation
   - Ensure the generated code aligns with the agent's expertise and focus areas

5. **Role Integration**: The agent definitions should shape the role and approach for this command:
   - Combine the command's API creation guidelines with agent-specific expertise
   - Apply agent principles throughout validation, error handling, security, and architecture decisions
   - Ensure the implementation reflects the specialized knowledge from relevant agents

**Note**: The agent definitions provide specialized expertise that enhances the base command instructions. Always consult and apply relevant agent definitions when creating API routes.

## Implementation Guidelines

### 1. **Next.js 15 App Router** (Recommended)
Use Route Handlers in `app/api/` directory with TypeScript

### 2. **Validation**
- Use Zod for runtime type validation
- Validate input early (before DB/API calls)
- Return clear validation error messages

### 3. **Error Handling**
- Global error handling with try/catch
- Consistent error response format
- Appropriate HTTP status codes
- Never expose sensitive error details

### 4. **TypeScript**
- Strict typing for requests/responses
- Shared type definitions
- No `any` types

### 5. **Security**
- Input sanitization
- CORS configuration if needed
- Rate limiting considerations
- Authentication/authorization checks

### 6. **Response Format**
```typescript
// Success
{ data: T, success: true }

// Error
{ error: string, details?: unknown, success: false }
```

## Code Structure

Create a complete API route with:

1. **Route Handler File** - `app/api/[route]/route.ts`
2. **Validation Schema** - Zod schemas for request/response
3. **Type Definitions** - Shared TypeScript types
4. **Error Handler** - Centralized error handling
5. **Example Usage** - Client-side fetch example

## Best Practices to Follow

-  Early validation before expensive operations
-  Proper HTTP status codes (200, 201, 400, 401, 404, 500)
-  Consistent error response format
-  TypeScript strict mode
-  Minimal logic in routes (use services/utils)
-  Environment variable validation
-  Request/response logging for debugging
- L No sensitive data in responses
- L No database queries without validation
- L No inline business logic (extract to services)

Generate production-ready code that I can immediately use in my Next.js project.
