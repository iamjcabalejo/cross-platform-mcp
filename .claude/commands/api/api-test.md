---
platform: claude
description: Test API endpoints with automated test generation
model: claude-sonnet-4-5
---

> **Claude Code**: Use as a slash command or prompt.

Generate comprehensive API tests for the specified endpoint.

## Target

$ARGUMENTS

## Agent Definitions

**CRITICAL**: Before generating API tests, you MUST:

1. **Read Agent Definitions**: Load and review the agent definitions from `.cursor-plugin/plugin.json`
   - Read the `agents` array to understand available specialized agents
   - Identify agent definitions relevant to API testing

2. **Identify Relevant Agents**: For API testing, the following agents are typically relevant:
   - **backend-architect**: For testing backend system reliability, data integrity, fault tolerance, and API design patterns
   - **security-engineer**: For security testing, vulnerability testing, authentication/authorization testing, and security edge cases
   - **performance-engineer**: For performance testing scenarios, response time validation, load testing, and bottleneck identification
   - **system-architect**: For integration testing, system-level testing, and end-to-end API flow validation

3. **Load Agent Definitions**: Read the agent definition files from `.cursor/agents/` directory:
   - `.cursor/agents/backend-architect.md` - Apply backend architecture testing principles
   - `.cursor/agents/security-engineer.md` - Apply security-first testing mindset and vulnerability testing
   - `.cursor/agents/performance-engineer.md` - Apply performance testing and measurement-driven validation
   - `.cursor/agents/system-architect.md` - Apply system architecture testing considerations

4. **Apply Agent Roles**: Use the agent definitions to inform your testing approach:
   - Incorporate the testing perspectives, principles, and guidelines from relevant agents
   - Apply agent-specific testing best practices to the test suite generation
   - Ensure the generated tests align with the agent's expertise and focus areas
   - Include security-focused test cases from security-engineer (SQL injection, XSS, authentication bypass)
   - Include performance-focused test cases from performance-engineer (response times, load testing, concurrent requests)
   - Include reliability-focused test cases from backend-architect (error handling, fault tolerance, data integrity)

5. **Role Integration**: The agent definitions should shape the role and approach for this command:
   - Combine the command's testing guidelines with agent-specific testing expertise
   - Apply agent principles throughout test case design, validation scenarios, and edge case coverage
   - Ensure the test implementation reflects the specialized knowledge from relevant agents
   - Prioritize comprehensive coverage that addresses security, performance, reliability, and system-level concerns

**Note**: The agent definitions provide specialized testing expertise that enhances the base command instructions. Always consult and apply relevant agent definitions when generating API tests, especially security-engineer for comprehensive security testing and backend-architect for reliability-focused test scenarios.

## Test Strategy for Solo Developers

Create practical, maintainable tests using modern tools:

### 1. **Testing Approach**
- Unit tests for validation logic
- Integration tests for full API flow
- Edge case coverage
- Error scenario testing

### 2. **Tools** (choose based on project)
- **Vitest** - Fast, modern (recommended for new projects)
- **Jest** - Established, widely used
- **Supertest** - HTTP assertions
- **MSW** - API mocking

### 3. **Test Coverage**

**Happy Paths**
- Valid inputs return expected results
- Proper status codes
- Correct response structure

**Error Paths**
- Invalid input validation
- Authentication failures
- Rate limiting
- Server errors
- Missing required fields

**Edge Cases**
- Empty requests
- Malformed JSON
- Large payloads
- Special characters
- SQL injection attempts
- XSS attempts

### 4. **Test Structure**

```typescript
describe('API Endpoint', () => {
  describe('Success Cases', () => {
    it('should handle valid request', () => {})
    it('should return correct status code', () => {})
  })

  describe('Validation', () => {
    it('should reject invalid input', () => {})
    it('should validate required fields', () => {})
  })

  describe('Error Handling', () => {
    it('should handle server errors', () => {})
    it('should return proper error format', () => {})
  })
})
```

### 5. **What to Generate**

1. **Test File** - Complete test suite with all scenarios
2. **Mock Data** - Realistic test fixtures
3. **Helper Functions** - Reusable test utilities
4. **Setup/Teardown** - Database/state management
5. **Quick Test Script** - npm script to run tests

## Key Testing Principles

-  Test behavior, not implementation
-  Clear, descriptive test names
-  Arrange-Act-Assert pattern
-  Independent tests (no shared state)
-  Fast execution (<5s for unit tests)
-  Realistic mock data
-  Test error messages
- L Don't test framework internals
- L Don't mock what you don't own
- L Avoid brittle tests

## Additional Scenarios to Cover

1. **Authentication/Authorization**
   - Valid tokens
   - Expired tokens
   - Missing tokens
   - Invalid permissions

2. **Data Validation**
   - Type mismatches
   - Out of range values
   - SQL/NoSQL injection
   - XSS payloads

3. **Rate Limiting**
   - Within limits
   - Exceeding limits
   - Reset behavior

4. **Performance**
   - Response times
   - Large dataset handling
   - Concurrent requests

Generate production-ready tests I can run immediately with `npm test`.
