# CLAUDE.md - agents Repository

## Project Overview

The **agents repository** stores **AI agent definitions** as MDX files with Zod schema validation via Velite, enabling bidirectional synchronization with the PostgreSQL database.

**Purpose**: Define and manage AI agent entities as version-controlled MDX files that sync automatically to the database.

**Position**: 📝 **Content Layer** - Content source that syncs to db layer

## Schema

The Velite schema for agents includes:

### Required Fields
- **title** (string): Agent name
- **description** (string): What the agent does

### Optional Fields
- **role** (string): Agent role/purpose
- **capabilities** (array): Agent capabilities
- **tools** (array): Available tools/functions
- **model** (string): LLM model to use
- **systemPrompt** (string): System prompt
- **temperature** (number): Model temperature
- **maxTokens** (number): Max response tokens
- **voice** (object): Voice configuration (for voice agents)
- **metadata**: Namespace and visibility
- **tags** (array): Categorization tags

## MDX File Example

```mdx
---
title: Customer Support Agent
description: Handles customer support inquiries via chat and voice
role: support
capabilities:
  - answer-questions
  - lookup-orders
  - create-tickets
  - escalate-issues
tools:
  - search-knowledge-base
  - get-order-status
  - create-support-ticket
model: claude-3-5-sonnet-20241022
systemPrompt: You are a helpful customer support agent...
temperature: 0.7
maxTokens: 1000
metadata:
  ns: agents
  visibility: public
tags:
  - support
  - customer-service
---

# Customer Support Agent

AI-powered customer support agent that handles common inquiries and escalates complex issues.

## Capabilities

- Answer FAQs using knowledge base
- Look up order status
- Create support tickets
- Escalate to human agents when needed
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Build and validate all MDX files
pnpm build

# Watch mode for development
pnpm dev

# Type check
pnpm check-types
```

## Examples

See **[examples/](../examples/)** for working TypeScript + MDX agent examples:

- **sales-agent.mdx** - Lead qualification agent with BANT scoring
- **support-agent.mdx** - Customer support with knowledge base and escalation

These examples demonstrate:
- ✅ Full TypeScript intellisense in MDX files
- ✅ Agent definitions with functions and capabilities
- ✅ Complete documentation with usage examples
- ✅ Integration with workflows and functions

Run examples: `pnpm --filter examples dev`

## Related Documentation

- **Parent**: [Root CLAUDE.md](../CLAUDE.md) - Multi-repo management
- **Database**: [db/CLAUDE.md](../db/CLAUDE.md) - Database schema and sync
- **API**: [api/CLAUDE.md](../api/CLAUDE.md) - Webhook handler
- **Functions**: [functions/CLAUDE.md](../functions/CLAUDE.md) - Agent tools
- **Workers**: [workers/CLAUDE.md](../workers/CLAUDE.md) - Agent runtime

---

**Last Updated**: 2025-10-03
**Maintained By**: Claude Code
**Repository**: https://github.com/dot-do/agents
