# Agents Repository

**AI Agent Definitions as Code** - MDX files with Zod validation, synced to PostgreSQL

## Overview

This repository contains **33 production AI agent definitions** organized into three categories:

```
agents/
├── named/           # 7 named persona agents (Amy, Alex, Morgan, Riley, Jordan, Taylor, Sam)
├── roles/           # 8 C-suite role agents (CTO, CFO, COO, CSO, CCO, CISO, CMO, CLO)
└── specialized/     # 18 specialized function agents (Support, Sales, Development, etc.)
```

**Technology Stack:**
- **MDX** - Markdown + JSX for agent definitions
- **Velite** - Build-time validation with Zod schemas
- **Zod** - Type-safe schema validation
- **PostgreSQL** - Persistent storage via [repo.do](https://repo.do) GitHub App

## Repository Structure

### Named Agents (`named/`)

Persona-based agents with distinct personalities and communication styles:

| Agent | Role | Voice | Capabilities |
|-------|------|-------|--------------|
| **Amy** | Customer Success Manager | rachel (ElevenLabs) | Customer support, retention, onboarding |
| **Alex** | Technical Support Engineer | adam (ElevenLabs) | Technical troubleshooting, documentation, escalation |
| **Morgan** | Product Manager | charlotte (ElevenLabs) | Product strategy, roadmap, user research |
| **Riley** | Marketing Specialist | emily (ElevenLabs) | Content marketing, campaigns, analytics |
| **Jordan** | Strategic Business Advisor | antoni (ElevenLabs) | Business strategy, competition, market analysis |
| **Taylor** | Operations Coordinator | sam (ElevenLabs) | Workflow optimization, resource allocation, coordination |
| **Sam** | Financial Analyst | josh (ElevenLabs) | Financial analysis, forecasting, budgeting |

### Role-Based Agents (`roles/`)

C-suite executive agents for organizational leadership:

| Agent | Position | Domain |
|-------|----------|--------|
| **CTO** | Chief Technology Officer | Technology strategy, architecture, engineering |
| **CFO** | Chief Financial Officer | Finance, budgeting, financial planning |
| **COO** | Chief Operating Officer | Operations, processes, efficiency |
| **CSO** | Chief Strategy Officer | Strategic planning, market analysis, growth |
| **CCO** | Chief Compliance Officer | Compliance, risk, regulatory |
| **CISO** | Chief Information Security Officer | Security, privacy, threat management |
| **CMO** | Chief Marketing Officer | Marketing, brand, customer acquisition |
| **CLO** | Chief Legal Officer | Legal, contracts, risk mitigation |

### Specialized Agents (`specialized/`)

Task-specific agents for operational functions:

**Development & Engineering (5)**
- `bugTriager.mdx` - Triages bug reports and prioritizes issues
- `codeReviewer.mdx` - Reviews code for quality, security, and best practices
- `documentationWriter.mdx` - Writes technical documentation
- `securityAuditor.mdx` - Audits code and systems for security vulnerabilities
- `testGenerator.mdx` - Generates unit and integration tests

**Business & Finance (3)**
- `contentWriter.mdx` - Creates marketing content and blog posts
- `financialAdvisor.mdx` - Provides financial planning and investment advice
- `taxAdvisor.mdx` - Tax planning and compliance guidance

**Customer Operations (3)**
- `salesAgent.mdx` - Lead qualification and sales support
- `supportAgent.mdx` - Customer support and issue resolution
- `rentalAgent.mdx` - Property rental inquiries and management

**Healthcare & Pharmacy (2)**
- `medicalTriager.mdx` - Triages medical symptoms and advises on urgency
- `pharmacyChecker.mdx` - Checks drug interactions and dosage

**Legal & Compliance (2)**
- `contractReviewer.mdx` - Reviews contracts for risks and terms
- `legalResearcher.mdx` - Legal research and case law analysis

**E-commerce & Logistics (3)**
- `inventoryClerk.mdx` - Manages inventory levels and restocking
- `orderProcessor.mdx` - Processes and fulfills customer orders
- `shippingCoordinator.mdx` - Coordinates shipping and logistics

## Agent Schema

All agent MDX files follow this structure:

```mdx
---
title: Agent Name
description: What the agent does
role: agent-role
capabilities:
  - capability-1
  - capability-2
tools:
  - tool-1
  - tool-2
model: claude-3-5-sonnet-20241022
systemPrompt: |
  You are an AI agent that...
temperature: 0.7
maxTokens: 1000
voice:
  provider: elevenlabs
  voiceId: rachel
  stability: 0.5
  similarityBoost: 0.75
metadata:
  ns: agent
  visibility: public
tags:
  - category
  - function
---

# Agent Name

Agent documentation and implementation details...
```

### Required Fields
- `title` - Agent display name
- `description` - Brief description of agent purpose

### Optional Fields
- `role` - Agent role/category
- `capabilities` - Array of agent capabilities
- `tools` - Array of available tools/functions
- `model` - LLM model (default: claude-3-5-sonnet-20241022)
- `systemPrompt` - Custom system prompt
- `temperature` - Model temperature (0.0-1.0)
- `maxTokens` - Max response tokens
- `voice` - Voice configuration for voice agents
- `metadata` - Namespace and visibility settings
- `tags` - Categorization tags

## Voice Configuration

Named agents support voice interactions via VAPI + ElevenLabs:

```typescript
voice: {
  provider: 'elevenlabs',
  voiceId: 'rachel',     // ElevenLabs voice ID
  stability: 0.5,        // 0.0-1.0 (higher = more stable)
  similarityBoost: 0.75, // 0.0-1.0 (higher = more similar to training)
  speakingRate: 1.0      // 0.5-2.0 (speaking speed multiplier)
}
```

**Available ElevenLabs Voices:**
- `rachel` - Female, professional, warm
- `adam` - Male, deep, authoritative
- `charlotte` - Female, friendly, conversational
- `emily` - Female, energetic, enthusiastic
- `antoni` - Male, confident, articulate
- `sam` - Male/Non-binary, neutral, versatile
- `josh` - Male, friendly, approachable

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build and validate all agent MDX files
pnpm build

# Watch mode for development
pnpm dev

# Type checking
pnpm check-types
```

### Creating New Agents

1. **Choose category:** named, roles, or specialized
2. **Create MDX file:**
   ```bash
   # Named agent
   touch named/newAgent.do.mdx

   # Role-based agent
   touch roles/cxo.do.mdx

   # Specialized agent
   touch specialized/newAgent.mdx
   ```

3. **Add agent definition** with required frontmatter and content

4. **Build and validate:**
   ```bash
   pnpm build
   ```

5. **Commit and push** - Triggers automatic sync to database via repo.do webhook

### Naming Conventions

- **Named agents:** `camelCase.do.mdx` (e.g., `amy.do.mdx`, `jordan.do.mdx`)
- **Role agents:** `role.do.mdx` (e.g., `cto.do.mdx`, `cfo.do.mdx`)
- **Specialized agents:** `camelCase.mdx` (e.g., `salesAgent.mdx`, `supportAgent.mdx`)

## Database Synchronization

Agent MDX files automatically sync to PostgreSQL via the **repo.do** GitHub App webhook:

**Workflow:**
1. Commit and push MDX file changes
2. GitHub webhook triggers repo.do
3. Velite validates MDX against Zod schema
4. Valid agents inserted/updated in `things` table
5. Invalid agents logged as errors

**Database Schema:**
```sql
CREATE TABLE things (
  ulid TEXT PRIMARY KEY,
  ns TEXT NOT NULL,           -- 'agent'
  id TEXT NOT NULL,           -- agent filename (without .mdx)
  type TEXT NOT NULL,         -- 'Agent'
  data JSONB NOT NULL,        -- full agent metadata
  content TEXT,               -- MDX content
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  UNIQUE(ns, id)
);
```

**Query agents:**
```sql
-- All agents
SELECT * FROM things WHERE ns = 'agent' AND type = 'Agent';

-- Named agents
SELECT * FROM things WHERE ns = 'agent' AND id LIKE '%.do';

-- Specialized agents
SELECT * FROM things WHERE ns = 'agent' AND id NOT LIKE '%.do' AND id NOT LIKE 'c_o.do';
```

## Related Repositories

- **[examples/](../examples/)** - Business-as-Code examples using agents
- **[functions/](../functions/)** - Function definitions (agent tools)
- **[workflows/](../workflows/)** - Workflow orchestration using agents
- **[sdk/](../sdk/)** - TypeScript SDKs for named agents (amy.do, alex.do, etc.)
- **[workers/](../workers/)** - Agent runtime and execution services
- **[db/](../db/)** - Database schema and migrations

## SDK Packages

Each named agent has a corresponding TypeScript SDK package:

```bash
# Install agent SDK
pnpm add amy.do alex.do morgan.do riley.do jordan.do taylor.do sam.do

# Use in code
import { createClient } from 'amy.do'

const amy = createClient({ apiKey: process.env.AMY_API_KEY })
const response = await amy.chat({ message: 'How can I improve customer retention?' })
```

See [sdk/README.md](../sdk/README.md) for full SDK documentation.

## Testing

```bash
# Run all tests
pnpm test

# Test specific agent
pnpm test named/amy.do.mdx

# Integration tests
pnpm test:integration
```

## Contributing

1. Create feature branch: `git checkout -b feature/add-new-agent`
2. Add/modify agent MDX files
3. Run `pnpm build` to validate
4. Commit changes: `git commit -m "feat: Add new agent"`
5. Push and create PR: `git push origin feature/add-new-agent`

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Developer guidelines and architecture
- **[Root CLAUDE.md](../CLAUDE.md)** - Multi-repo project management
- **[examples/agents/README.md](../examples/agents/README.md)** - Usage examples

---

**Total Agents:** 33 (7 named + 8 roles + 18 specialized)
**Last Updated:** 2025-10-04
**Repository:** https://github.com/dot-do/agents
