---
description: Refactor and clean up code following best practices
model: claude-sonnet-4-5
---

Clean up and refactor the following code to improve readability, maintainability, and follow best practices.

## Agent Definitions

**CRITICAL**: Before cleaning up and refactoring code, you MUST:

1. **Read Agent Definitions**: Load and review the agent definitions from `.cursor-plugin/plugin.json`
   - Read the `agents` array to understand available specialized agents
   - Identify agent definitions relevant to code cleanup and refactoring

2. **Identify Relevant Agents**: For code cleanup, the following agents are typically relevant:
   - **refactoring-expert**: For systematic refactoring, SOLID principles, complexity reduction, and technical debt elimination (PRIMARY AGENT)
   - **backend-architect**: For backend code cleanup, API design improvements, and data integrity considerations
   - **frontend-architect**: For frontend code cleanup, React/Next.js best practices, and UI component improvements
   - **system-architect**: For system-level code improvements, architecture patterns, and long-term maintainability
   - **security-engineer**: For security-related code improvements, vulnerability fixes, and security best practices
   - **performance-engineer**: For performance-related code improvements and optimization opportunities

3. **Load Agent Definitions**: Read the agent definition files from `.cursor/agents/` directory:
   - `.cursor/agents/refactoring-expert.md` - Apply refactoring principles, SOLID patterns, and complexity reduction techniques (REQUIRED)
   - `.cursor/agents/backend-architect.md` - Apply backend architecture principles if cleaning backend code
   - `.cursor/agents/frontend-architect.md` - Apply frontend architecture principles if cleaning frontend code
   - `.cursor/agents/system-architect.md` - Apply system architecture considerations for system-level improvements
   - `.cursor/agents/security-engineer.md` - Apply security best practices if security issues are identified
   - `.cursor/agents/performance-engineer.md` - Apply performance optimization principles if performance issues are found

4. **Apply Agent Roles**: Use the agent definitions to inform your cleanup approach:
   - Incorporate the perspectives, principles, and guidelines from relevant agents
   - Apply agent-specific best practices to the code cleanup process
   - Ensure the refactored code aligns with the agent's expertise and focus areas
   - Use refactoring-expert's systematic approach for safe, incremental improvements
   - Apply SOLID principles and design patterns from refactoring-expert
   - Consider security, performance, and architecture perspectives from specialized agents

5. **Role Integration**: The agent definitions should shape the role and approach for this command:
   - Combine the command's cleanup guidelines with agent-specific expertise
   - Apply agent principles throughout code analysis, refactoring decisions, and quality improvements
   - Ensure the cleaned code reflects the specialized knowledge from relevant agents
   - Prioritize refactoring-expert's focus on safe transformations, behavior preservation, and measurable quality improvements

**Note**: The agent definitions provide specialized expertise that enhances the base command instructions. Always consult and apply relevant agent definitions when cleaning up code, with refactoring-expert as the primary guide for systematic refactoring and quality improvement.

## Code to Clean

$ARGUMENTS

## Cleanup Checklist for Solo Developers

### 1. **Code Smells to Fix**

**Naming**
-  Descriptive variable/function names
-  Consistent naming conventions (camelCase, PascalCase)
-  Avoid abbreviations unless obvious
-  Boolean names start with is/has/can

**Functions**
-  Single responsibility per function
-  Keep functions small (<50 lines)
-  Reduce parameters (max 3-4)
-  Extract complex logic
-  Avoid side effects where possible

**DRY (Don't Repeat Yourself)**
-  Extract repeated code to utilities
-  Create reusable components
-  Use TypeScript generics for type reuse
-  Centralize constants/configuration

**Complexity**
-  Reduce nested if statements
-  Replace complex conditions with functions
-  Use early returns
-  Simplify boolean logic

**TypeScript**
-  Remove `any` types
-  Add proper type annotations
-  Use interfaces for object shapes
-  Leverage utility types (Pick, Omit, Partial)

### 2. **Modern Patterns to Apply**

**JavaScript/TypeScript**
```typescript
// Use optional chaining
const value = obj?.prop?.nested

// Use nullish coalescing
const result = value ?? defaultValue

// Use destructuring
const { name, email } = user

// Use template literals
const message = `Hello, ${name}!`

// Use array methods
const filtered = arr.filter(x => x.active)
```

**React**
```typescript
// Extract custom hooks
const useUserData = () => {
  // logic here
}

// Use proper TypeScript types
interface Props {
  user: User
  onUpdate: (user: User) => void
}

// Avoid prop drilling with composition
<Provider value={data}>
  <Component />
</Provider>
```

### 3. **Refactoring Techniques**

**Extract Function**
```typescript
// Before
const process = () => {
  // 50 lines of code
}

// After
const validate = () => { /* ... */ }
const transform = () => { /* ... */ }
const save = () => { /* ... */ }

const process = () => {
  validate()
  const data = transform()
  save(data)
}
```

**Replace Conditional with Polymorphism**
```typescript
// Before
if (type === 'A') return processA()
if (type === 'B') return processB()

// After
const processors = {
  A: processA,
  B: processB
}
return processors[type]()
```

**Introduce Parameter Object**
```typescript
// Before
function create(name, email, age, address)

// After
interface UserData {
  name: string
  email: string
  age: number
  address: string
}
function create(userData: UserData)
```

### 4. **Common Cleanup Tasks**

**Remove Dead Code**
- Unused imports
- Unreachable code
- Commented out code
- Unused variables

**Improve Error Handling**
```typescript
// Before
try { doSomething() } catch (e) { console.log(e) }

// After
try {
  doSomething()
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation
  } else {
    logger.error('Unexpected error', { error })
    throw error
  }
}
```

**Consistent Formatting**
- Proper indentation
- Consistent quotes
- Line length (<100 characters)
- Organized imports

**Better Comments**
- Remove obvious comments
- Add why, not what
- Document complex logic
- Update outdated comments

### 5. **Next.js/React Specific**

**Server vs Client Components**
```typescript
// Move state to client component
'use client'
function Interactive() {
  const [state, setState] = useState()
}

// Keep data fetching in server component
async function Page() {
  const data = await fetchData()
}
```

**Proper Data Fetching**
```typescript
// Use SWR/React Query for client
const { data } = useSWR('/api/user')

// Use direct fetch in server components
const data = await fetch('/api/user').then(r => r.json())
```

## Output Format

1. **Issues Found** - List of code smells and problems
2. **Cleaned Code** - Refactored version
3. **Explanations** - What changed and why
4. **Before/After Comparison** - Side-by-side if helpful
5. **Further Improvements** - Optional enhancements

Focus on practical improvements that make code more maintainable without over-engineering. Balance clean code with pragmatism.
