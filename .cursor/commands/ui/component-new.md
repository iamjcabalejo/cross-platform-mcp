---
description: Create a new React component with TypeScript and modern best practices
model: claude-sonnet-4-5
---

Generate a new React component following 2025 best practices.

## Component Specification

$ARGUMENTS

## Agent Definitions

**CRITICAL**: Before implementing the React component, you MUST:

1. **Read Agent Definitions**: Load and review the agent definitions from `.cursor-plugin/plugin.json`
   - Read the `agents` array to understand available specialized agents
   - Identify agent definitions relevant to React component development

2. **Identify Relevant Agents**: For React component creation, the following agents are typically relevant:
   - **frontend-architect**: For frontend architecture, React/Next.js patterns, component design, and UI/UX best practices (PRIMARY AGENT)
   - **refactoring-expert**: For code quality, SOLID principles, maintainability, and component structure
   - **performance-engineer**: For component performance optimization, bundle size, rendering optimization, and user experience
   - **technical-writer**: For component documentation, prop descriptions, and Storybook story creation (if applicable)
   - **security-engineer**: For security considerations in components (input validation, XSS prevention, accessibility)

3. **Load Agent Definitions**: Read the agent definition files from `.cursor/agents/` directory:
   - `.cursor/agents/frontend-architect.md` - Apply frontend architecture principles, React patterns, and component design best practices (REQUIRED)
   - `.cursor/agents/refactoring-expert.md` - Apply code quality and maintainability principles
   - `.cursor/agents/performance-engineer.md` - Apply performance optimization strategies for React components
   - `.cursor/agents/technical-writer.md` - Apply documentation and clarity principles (if generating Storybook stories)
   - `.cursor/agents/security-engineer.md` - Apply security best practices for component input handling and accessibility

4. **Apply Agent Roles**: Use the agent definitions to inform your component implementation:
   - Incorporate the perspectives, principles, and guidelines from relevant agents
   - Apply agent-specific best practices to the component creation process
   - Ensure the generated component aligns with the agent's expertise and focus areas
   - Balance React/Next.js patterns with agent-specific architectural considerations

5. **Role Integration**: The agent definitions should shape the role and approach for this command:
   - Combine the command's React component guidelines with agent-specific expertise
   - Apply agent principles throughout component design, TypeScript typing, styling, accessibility, and performance decisions
   - Ensure the implementation reflects the specialized knowledge from relevant agents
   - Leverage frontend-architect's expertise for React 19 patterns, Next.js App Router considerations, and modern component architecture

**Note**: The agent definitions provide specialized expertise that enhances the base command instructions. Always consult and apply relevant agent definitions when creating React components to ensure production-ready, accessible, performant, and maintainable implementations.

## Modern React + TypeScript Standards

### 1. **Function Components Only**
- Use function components (not class components)
- React 19 patterns
- Server Components where appropriate (Next.js)

### 2. **TypeScript Best Practices**
- Strict typing (`strict: true`)
- Interface for props
- Proper TypeScript utility types (ComponentProps, ReactNode, etc.)
- NO `any` types
- Explicit return types for complex components

### 3. **Component Patterns**

**Client Components** (interactive, use hooks)
```typescript
'use client'
import { useState } from 'react'

interface Props {
  // typed props
}

export function Component({ }: Props) {
  // implementation
}
```

**Server Components** (default in Next.js App Router)
```typescript
interface Props {
  // typed props
}

export async function Component({ }: Props) {
  // can fetch data directly
}
```

### 4. **State Management**
- `useState` for local state
- `useReducer` for complex state
- Zustand for global state
- React Context for theme/auth

### 5. **Performance**
- Lazy loading with `React.lazy()`
- Code splitting
- `use memo()` for expensive computations
- `useCallback()` for callback functions

### 6. **Styling Approach** (choose based on project)
- **Tailwind CSS** - Utility-first (recommended)
- **CSS Modules** - Scoped styles
- **Styled Components** - CSS-in-JS

## What to Generate

1. **Component File** - Main component with TypeScript
2. **Props Interface** - Fully typed props
3. **Styles** - Tailwind classes or CSS module
4. **Example Usage** - How to import and use
5. **Storybook Story** (optional) - Component documentation

## Code Quality Standards

**Structure**
-  Feature-based folder organization
-  Co-locate related files
-  Barrel exports (index.ts)
-  Clear file naming conventions

**TypeScript**
-  Explicit prop types via interface
-  Proper generics where needed
-  Utility types (Pick, Omit, Partial)
-  Discriminated unions for variants

**Props**
-  Required vs optional props
-  Default values where appropriate
-  Destructure in function signature
-  Props spread carefully

**Accessibility**
-  Semantic HTML
-  ARIA labels where needed
-  Keyboard navigation
-  Screen reader friendly

**Best Practices**
-  Single Responsibility Principle
-  Composition over inheritance
-  Extract complex logic to hooks
-  Keep components small (<200 lines)

## Component Types to Consider

**Presentational Components**
- Pure UI rendering
- No business logic
- Receive data via props
- Easy to test

**Container Components**
- Data fetching
- Business logic
- State management
- Pass data to presentational components

**Compound Components**
- Related components working together
- Shared context
- Flexible API
- Example: `<Select><Select.Trigger/><Select.Content/></Select>`

## React 19 Features to Use

- **use()** API for reading promises/context
- **useActionState()** for form state
- **useFormStatus()** for form pending state
- **useOptimistic()** for optimistic UI updates
- **Server Actions** for mutations

Generate production-ready, accessible, and performant React components following Next.js 15 and React 19 patterns.
