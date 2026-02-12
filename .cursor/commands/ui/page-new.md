---
description: Create a new Next.js page with App Router best practices
model: claude-sonnet-4-5
---

Generate a new Next.js 15 page following modern App Router patterns.

## Page Specification

$ARGUMENTS

## Agent Definitions

**CRITICAL**: Before implementing the Next.js page, you MUST:

1. **Read Agent Definitions**: Load and review the agent definitions from `.cursor/agents/` directory
   - Read the agent definition files to understand available specialized agents
   - Identify agent definitions relevant to Next.js page development

2. **Identify Relevant Agents**: For Next.js page creation, the following agents are typically relevant:
   - **frontend-architect**: For Next.js App Router patterns, page architecture, routing, metadata, and UI/UX best practices (PRIMARY AGENT)
   - **performance-engineer**: For page performance optimization, Core Web Vitals, loading strategies, and bundle optimization
   - **technical-writer**: For SEO metadata, Open Graph tags, structured data, and page documentation
   - **security-engineer**: For security considerations in pages (input validation, XSS prevention, authentication patterns)
   - **refactoring-expert**: For code quality, maintainability, and page structure following SOLID principles

3. **Load Agent Definitions**: Read the agent definition files from `.cursor/agents/` directory:
   - `.cursor/agents/frontend-architect.md` - Apply Next.js App Router patterns, routing, metadata, and page architecture best practices (REQUIRED)
   - `.cursor/agents/performance-engineer.md` - Apply performance optimization strategies for page loading, Core Web Vitals, and bundle size
   - `.cursor/agents/technical-writer.md` - Apply SEO and metadata best practices for discoverability
   - `.cursor/agents/security-engineer.md` - Apply security best practices for page-level security considerations
   - `.cursor/agents/refactoring-expert.md` - Apply code quality and maintainability principles

4. **Apply Agent Roles**: Use the agent definitions to inform your page implementation:
   - Incorporate the perspectives, principles, and guidelines from relevant agents
   - Apply agent-specific best practices to the page creation process
   - Ensure the generated page aligns with the agent's expertise and focus areas
   - Balance Next.js patterns with agent-specific architectural considerations

5. **Role Integration**: The agent definitions should shape the role and approach for this command:
   - Combine the command's Next.js page guidelines with agent-specific expertise
   - Apply agent principles throughout page design, metadata, data fetching, error handling, and performance decisions
   - Ensure the implementation reflects the specialized knowledge from relevant agents
   - Leverage frontend-architect's expertise for Next.js 15 App Router patterns, Server/Client Components, and modern page architecture

**Note**: The agent definitions provide specialized expertise that enhances the base command instructions. Always consult and apply relevant agent definitions when creating Next.js pages to ensure production-ready, accessible, performant, SEO-optimized, and maintainable implementations.

## Next.js 15 App Router Standards

### 1. **File Structure**
```
app/
  [route]/
    page.tsx          # Main page component
    layout.tsx        # Layout (optional)
    loading.tsx       # Loading UI
    error.tsx         # Error UI
    not-found.tsx     # 404 UI
```

### 2. **Server Components by Default**
- Fetch data directly in components
- No need for getServerSideProps/getStaticProps
- Async components supported
- Better performance

### 3. **Metadata**
```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
  openGraph: { /* OG tags */ }
}
```

### 4. **Data Fetching Patterns**

**Server Component** (preferred)
```typescript
async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

**Client Component** (when needed)
```typescript
'use client'
function Page() {
  const { data } = useSWR('/api/data')
  return <div>{data}</div>
}
```

## What to Generate

1. **Page Component** - `app/[route]/page.tsx`
2. **TypeScript Types** - Props and data types
3. **Loading State** - `loading.tsx`
4. **Error Boundary** - `error.tsx`
5. **Metadata** - SEO and OG tags
6. **Example Data Fetching** - Server or client patterns

## Page Patterns

**Static Page** (default)
- Pre-rendered at build time
- Best for marketing pages, blogs
- Fast performance

**Dynamic Page** (revalidation)
```typescript
export const revalidate = 60 // Revalidate every 60 seconds
```

**Dynamic Route** (`[slug]`)
```typescript
export async function generateStaticParams() {
  // Generate paths at build time
}
```

**Streaming** (with Suspense)
```typescript
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

## Best Practices

**Structure**
- Server Components for data fetching
- Client Components only when needed ('use client')
- Streaming with Suspense for slow data
- Parallel data fetching
- Proper TypeScript typing

**Performance**
- Image optimization (next/image)
- Font optimization (next/font)
- Lazy loading below the fold
- Code splitting automatically
- Prefetch links (default behavior)

**SEO**
- Metadata for every page
- Semantic HTML
- Open Graph tags
- Structured data (JSON-LD)
- Alt text for images

**Error Handling**
- error.tsx for runtime errors
- not-found.tsx for 404s
- Graceful degradation
- User-friendly error messages

**Accessibility**
- Semantic HTML5 elements
- ARIA labels
- Keyboard navigation
- Focus management

## When to Use Client Components

Use `'use client'` when you need:
- Event listeners (onClick, onChange, etc.)
- State hooks (useState, useReducer)
- Effect hooks (useEffect, useLayoutEffect)
- Browser-only APIs (localStorage, window)
- Custom hooks that use above

Otherwise, use Server Components (default).

## Styling Integration

Choose based on project:
- **Tailwind CSS** - Utility classes (recommended)
- **CSS Modules** - Scoped styles
- **Styled Components** - CSS-in-JS (requires 'use client')

Generate a complete, production-ready Next.js page with proper TypeScript types, error handling, and SEO optimization.
