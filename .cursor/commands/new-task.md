---
description: Analyze task complexity and create actionable implementation plan
model: claude-sonnet-4-5
---

Analyze the following task and create a clear, actionable implementation plan.

## Task

$ARGUMENTS

## Agent Definitions

**IMPORTANT**: Before analyzing the task and creating the implementation plan, identify and use the correct agent definitions based on the task's requirements.

1. **Identify Relevant Agents**: Analyze the task description to determine which agent(s) are relevant:
   - Backend/API tasks → `backend-architect`
   - Frontend/UI tasks → `frontend-architect`
   - System architecture → `system-architect`
   - Security concerns → `security-engineer`
   - Performance needs → `performance-engineer`
   - Research/learning → `tech-stack-researcher` or `learning-guide`
   - Documentation → `technical-writer`
   - Requirements analysis → `requirements-analyst`
   - Refactoring needs → `refactoring-expert`

2. **Read Agent Definitions**: Load the relevant agent definition files from `.cursor/agents/` directory:
   - Read the agent's frontmatter (name, description, category)
   - Review triggers, behavioral mindset, focus areas, and key actions
   - Understand the agent's boundaries and outputs

3. **Apply Agent Perspective**: Incorporate the agent's perspective into the task analysis:
   - Use the agent's behavioral mindset when analyzing requirements
   - Apply the agent's focus areas to complexity assessment
   - Follow the agent's key actions in the implementation steps
   - Respect the agent's boundaries (what it will/will not do)

4. **Multi-Agent Analysis**: If the task spans multiple domains:
   - Identify all relevant agents
   - Read definitions for each
   - Plan how their perspectives integrate
   - Clearly separate concerns in the implementation plan

**Example**: For a task requiring both API and UI work, use both `backend-architect` and `frontend-architect` definitions to ensure comprehensive analysis from both perspectives.

## Analysis Framework

### 1. **Task Breakdown**
- Understand requirements
- Identify dependencies
- List affected files/components
- Estimate complexity (Small/Medium/Large)

### 2. **Time Estimation**
- **Small**: 1-2 hours (simple bug fix, minor feature)
- **Medium**: Half day to 1 day (new component, API endpoint)
- **Large**: 2-5 days (complex feature, multiple integrations)
- **Very Large**: 1+ week (major refactor, new subsystem)

### 3. **Risk Assessment**
Identify potential blockers:
- Unknown dependencies
- API limitations
- Data migration needs
- Breaking changes
- Third-party service issues

### 4. **Implementation Steps**

Create sequential, logical steps:
1. Setup/preparation
2. Backend changes
3. Frontend changes
4. Testing
5. Documentation
6. Deployment

### 5. **Success Criteria**

Define "done":
- Feature works as specified
- Tests pass
- No regressions
- Code reviewed
- Documented

## Output Format

### Task Analysis
- **Type**: [Bug Fix / Feature / Refactor / Infrastructure]
- **Complexity**: [Small / Medium / Large / Very Large]
- **Estimated Time**: X hours/days
- **Priority**: [High / Medium / Low]

### Implementation Plan

**Phase 1: [Name]** (Time estimate)
- [ ] Step 1
- [ ] Step 2

**Phase 2: [Name]** (Time estimate)
- [ ] Step 3
- [ ] Step 4

### Files to Modify/Create
```
app/page.tsx (modify)
components/NewComponent.tsx (create)
lib/utils.ts (modify)
```

### Dependencies
```bash
npm install package-name
```

### Testing Strategy
- Unit tests for X
- Integration tests for Y
- Manual testing steps

### Potential Issues
- Issue 1 and mitigation
- Issue 2 and mitigation

### Next Steps
1. Start with Phase 1, Step 1
2. Test incrementally
3. Commit often

Provide a clear, solo-developer-friendly plan that breaks down complex tasks into manageable steps.
