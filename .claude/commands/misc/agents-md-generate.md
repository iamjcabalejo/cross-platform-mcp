---
platform: claude
description: Generate AGENTS.md file with project coding patterns, structure, and standards
model: claude-sonnet-4-5
---

> **Claude Code**: Use as a slash command or prompt.

Generate a comprehensive AGENTS.md file that documents the project's coding patterns, file structure, naming conventions, style patterns, tech stack, and best practices. This file is optimized for AI agents to understand and follow project conventions.

## ⚠️ CRITICAL SECURITY REQUIREMENTS

**CODE PRIVACY & SECURITY**

1. **NO CODE FORWARDING**: Never forward, share, or transmit actual source code to external services, APIs, or third parties. All analysis must be performed locally within the Cursor environment.

2. **PATTERN EXTRACTION ONLY**: Extract only patterns, conventions, metadata, and structural information:
   - File/directory naming patterns (not file contents)
   - Code structure patterns (not actual code)
   - Configuration metadata (package.json, tsconfig.json - structure only)
   - Style conventions (indentation, quotes, etc.)
   - Tech stack information (library names and versions from package.json)

3. **NO CODE SNIPPETS IN OUTPUT**: The generated AGENTS.md must contain:
   - ✅ Guidelines and rules
   - ✅ Pattern descriptions
   - ✅ Naming conventions
   - ✅ Style rules
   - ❌ NO actual code snippets
   - ❌ NO sensitive data
   - ❌ NO business logic

4. **LOCAL ANALYSIS ONLY**: 
   - Read files locally to identify patterns
   - Extract metadata from configuration files
   - Analyze structure without exposing content
   - Generate guidelines based on observed patterns

5. **CLIENT CODE PROTECTION**: The client's codebase is confidential and proprietary. Only abstract patterns and conventions should be documented, never actual implementation details or code.

## Analysis Requirements

### 1. **Project Structure Analysis**

Examine the entire codebase to determine:

**Directory Structure**
- Identify root directories and their purposes
- Map component/module organization patterns
- Document feature-based vs. type-based organization
- Note any special directories (hooks, utils, types, etc.)

**File Organization Patterns**
- How files are grouped (by feature, by type, by domain)
- Naming patterns for directories
- Special file conventions (index files, barrel exports, etc.)

### 2. **Coding Patterns**

Analyze code to identify:

**Architectural Patterns**
- Component composition patterns (atomic design, feature-based, etc.)
- State management approach (Context, Zustand, Redux, etc.)
- Data fetching patterns (Server Components, Client Components, API routes)
- Error handling strategies
- Loading state patterns

**Code Organization Patterns**
- How functions/classes are structured
- Import/export patterns
- Module boundaries and dependencies
- Separation of concerns approach

**Design Patterns**
- Singleton, Factory, Observer patterns (if used)
- Custom hooks patterns
- Higher-order components or render props
- Composition patterns

### 3. **Naming Conventions**

Document naming patterns for:

**Files and Directories**
- File naming: kebab-case, camelCase, PascalCase, snake_case
- Directory naming conventions
- Special file names (index, layout, page, etc.)

**Code Elements**
- Variables: camelCase, snake_case, etc.
- Functions: naming patterns and prefixes
- Components: PascalCase conventions
- Constants: UPPER_SNAKE_CASE or other
- Types/Interfaces: PascalCase with prefixes/suffixes
- Enums: naming conventions

**API/Route Naming**
- API route naming patterns
- Endpoint naming conventions
- Query parameter naming

### 4. **Style Patterns**

Identify style guidelines:

**Code Style**
- Indentation (spaces/tabs, count)
- Line length preferences
- Semicolon usage
- Quote style (single/double)
- Trailing commas
- Arrow function preferences

**Formatting Rules**
- Import ordering
- Object/array formatting
- Function parameter formatting
- JSX formatting preferences

**Linting/Formatting Tools**
- ESLint configuration patterns
- Prettier configuration (if used)
- TypeScript strictness level

### 5. **Tech Stack Identification**

Determine the complete technology stack:

**Framework & Runtime**
- Framework (Next.js, React, Vue, etc.) and version
- Runtime (Node.js, Edge, etc.)
- Build tool (Webpack, Vite, Turbopack, etc.)

**Language & Type System**
- Primary language (TypeScript, JavaScript)
- TypeScript version and configuration
- Type checking strictness

**Styling**
- CSS framework (Tailwind, CSS Modules, styled-components, etc.)
- CSS preprocessor (Sass, Less, etc.)
- Design system or component library

**Backend & Database**
- Backend framework (if applicable)
- Database (PostgreSQL, MySQL, MongoDB, Supabase, etc.)
- ORM/Query builder (Prisma, Drizzle, etc.)

**State Management & Data Fetching**
- State management library
- Data fetching library (React Query, SWR, etc.)
- API client library

**Testing**
- Testing framework (Jest, Vitest, etc.)
- Testing library (React Testing Library, etc.)
- E2E testing (Playwright, Cypress, etc.)

**Development Tools**
- Package manager (npm, pnpm, yarn)
- Version control (Git)
- CI/CD tools
- Code quality tools

**Third-Party Services**
- Authentication providers
- Payment processors
- Analytics tools
- Other integrations

### 6. **Best Practices & Standards**

Document project-specific best practices:

**Code Quality Standards**
- Type safety requirements
- Error handling patterns
- Testing requirements
- Performance considerations

**Security Practices**
- Authentication/authorization patterns
- Data validation approaches
- Security headers and practices

**Performance Standards**
- Optimization patterns
- Caching strategies
- Bundle size considerations
- Image optimization approaches

**Accessibility Standards**
- ARIA usage patterns
- Keyboard navigation requirements
- Screen reader considerations

**Documentation Standards**
- Code comment requirements
- README structure
- API documentation format

## Analysis Process

### Step 1: Project Discovery

```bash
# Examine project structure
- Read package.json for dependencies and scripts
- Check configuration files (tsconfig.json, next.config.js, etc.)
- Review .gitignore for project structure hints
- Examine root directory structure
```

### Step 2: Code Pattern Analysis

```bash
# Analyze code patterns (LOCAL ONLY - NO CODE TRANSMISSION)
- Sample file STRUCTURES from different directories (read structure, not content)
- Identify naming patterns from file names only
- Extract organization patterns from directory structure
- Analyze import/export patterns from import statements (structure only)
- Configuration files for tooling patterns (metadata extraction only)
```

**SECURITY NOTE**: When analyzing files, extract only structural patterns (naming, organization, imports). Do not include actual code logic, business rules, or sensitive implementation details in any analysis or output.

### Step 3: Style Analysis

```bash
# Identify style patterns
- Check for .eslintrc, .prettierrc, or similar
- Analyze existing code formatting
- Review import statements
- Check comment styles
```

### Step 4: Tech Stack Extraction

```bash
# Extract tech stack
- Parse package.json dependencies
- Check framework-specific files
- Identify build configuration
- Review environment variable usage
```

## AGENTS.md Output Format

The generated AGENTS.md should be:

1. **Concise**: No redundant information, direct and to the point
2. **Non-Contradictory**: All rules must be consistent and not conflict
3. **Agent-Optimized**: Structured for maximum AI agent compliance
4. **Actionable**: Clear, specific rules that can be followed programmatically

### Required Sections

```markdown
# Project Guidelines for AI Agents

## Tech Stack
[Clear list of technologies with versions]

## File Structure
[Directory organization with clear rules]

## Naming Conventions
[Specific naming rules for all code elements]

## Coding Patterns
[Architectural and code organization patterns]

## Style Guide
[Code formatting and style rules]

## Best Practices
[Project-specific standards and requirements]

## Code Update and Suggestion Best Practices
[Guidelines for AI agents when updating or suggesting code]

## Critical Rules
[Non-negotiable rules that must always be followed]
```

## Generation Instructions

**⚠️ REMINDER**: All analysis is LOCAL ONLY. Extract patterns and conventions, NOT actual code. Never forward code to external services.

1. **If Project is Established**:
   - Perform comprehensive LOCAL codebase analysis (structure and patterns only)
   - Extract naming and organizational patterns from file/directory structure
   - Document conventions observed (naming, style, structure)
   - Identify inconsistencies and document the preferred approach
   - **DO NOT** include actual code, business logic, or sensitive data in analysis
   - **ALWAYS** include the "Code Update and Suggestion Best Practices" section (standard content, not analyzed)

2. **If Project is New**:
   - Analyze configuration files
   - Infer patterns from framework defaults
   - Suggest best practices based on tech stack
   - Document recommended patterns
   - **ALWAYS** include the "Code Update and Suggestion Best Practices" section (standard content, not analyzed)

3. **Agent Optimization**:
   - Use imperative language ("Use X", "Always Y", "Never Z")
   - Avoid ambiguous language
   - Provide examples for clarity
   - Structure rules hierarchically (general → specific)
   - Mark critical rules prominently

4. **Consistency Checks**:
   - Ensure all naming conventions are consistent
   - Verify style rules don't conflict
   - Check that patterns align with tech stack capabilities
   - Validate against framework best practices

## Output Requirements

Generate an AGENTS.md file at the project root that includes:

1. **Tech Stack Section**: Complete list with versions
2. **File Structure Section**: Clear directory organization rules
3. **Naming Conventions Section**: Specific rules for all naming scenarios
4. **Coding Patterns Section**: Architectural patterns and code organization
5. **Style Guide Section**: Formatting and style rules
6. **Best Practices Section**: Project-specific standards
7. **Code Update and Suggestion Best Practices Section**: Standard guidelines for AI agents when updating or suggesting code (detailed content provided in the section below)
8. **Critical Rules Section**: Must-follow rules highlighted

The file should be immediately usable by AI agents to understand and follow project conventions without ambiguity.

## Code Update and Suggestion Best Practices Content

**IMPORTANT**: The "Code Update and Suggestion Best Practices" section (item #7 in Output Requirements above) must be included in every generated AGENTS.md file. This section provides standard guidelines that AI agents should follow when updating or suggesting code. This content is NOT analyzed from the codebase - it is a standard set of best practices that should always be included.

Include the following content in the "Code Update and Suggestion Best Practices" section:

### Code Update Best Practices

**Context Preservation**
- Always read the entire file before making changes to understand full context
- Preserve existing code structure and organization patterns
- Maintain existing comments and documentation unless explicitly updating them
- Keep related code together (don't split related logic unnecessarily)

**Change Scope Management**
- Make minimal, focused changes that address the specific requirement
- Avoid refactoring unrelated code unless explicitly requested
- Preserve existing patterns and conventions even when suggesting improvements
- Don't change working code unless there's a clear reason

**Code Block Updates**
- When updating code blocks using search_replace or similar tools, provide sufficient context (3-5 lines before and after the change)
- Use exact string matching for old_string parameter to ensure unique identification (no partial matches)
- Preserve exact indentation and whitespace from the original code
- Maintain existing formatting style (spaces vs tabs, quote style, etc.)
- Keep line breaks and spacing consistent with the file's style

**Incremental Changes**
- Break large changes into smaller, logical steps when possible
- Make one logical change per edit operation
- Verify each change compiles/validates before proceeding to the next (check for syntax errors, type errors, linting errors)
- Document why changes were made in commit messages or comments

**Error Prevention**
- Verify imports are correct and match project conventions
- Check for breaking changes that might affect other files
- Ensure type safety is maintained (for TypeScript projects)
- Validate that changes don't introduce linting errors
- Consider edge cases and error handling

### Code Suggestion Best Practices

**Context-Aware Suggestions**
- Analyze the codebase structure before suggesting new code
- Follow existing architectural patterns (component structure, state management, etc.)
- Match the project's coding style and conventions
- Use the same libraries and patterns already in use
- Respect the project's file organization structure

**Complete and Usable Code**
- Provide complete, runnable code examples (not pseudocode)
- Include necessary imports and dependencies
- Add proper TypeScript types/interfaces when applicable
- Include error handling and edge cases
- Provide code that follows project linting rules

**Documentation in Suggestions**
- Add JSDoc/TSDoc comments for new functions/methods
- Explain complex logic with inline comments
- Document parameters, return types, and exceptions
- Include usage examples when introducing new patterns
- Note any breaking changes or migration requirements

**Best Practice Alignment**
- Suggest code that follows security best practices
- Consider performance implications
- Ensure accessibility standards are met (for UI code)
- Follow the project's testing patterns
- Align with the project's error handling approach

**Suggestion Format**
- Use clear, descriptive variable and function names
- Structure code for readability and maintainability
- Group related functionality together
- Separate concerns appropriately
- Make code self-documenting where possible

**Validation Before Suggesting**
- Verify suggested code compiles/validates
- Check that suggested patterns match project conventions
- Ensure suggested libraries are compatible with the tech stack
- Confirm suggested approaches align with project architecture
- Validate that suggestions don't conflict with existing patterns

---

> **Claude Code**: Use as a slash command or prompt.

**SECURITY & PRIVACY NOTE**: 

This command performs **LOCAL ANALYSIS ONLY** - no code is forwarded, shared, or transmitted to external services. The analysis extracts only:
- Structural patterns (file organization, naming conventions)
- Configuration metadata (from package.json, tsconfig.json, etc.)
- Style conventions (formatting rules, not code)
- Tech stack information (library names/versions)

The generated AGENTS.md contains **guidelines and rules only** - no actual code snippets, business logic, or sensitive implementation details. All analysis is performed locally within Cursor for maximum code security and client privacy.

For new projects, it will infer patterns from configuration files and suggest best practices based on the detected tech stack without exposing any code.