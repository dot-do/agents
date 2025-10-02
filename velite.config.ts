import { defineConfig, defineCollection, s } from 'velite'

const agents = defineCollection({
  name: 'Agent',
  pattern: 'agents/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    role: s.string().optional(),
    capabilities: s.array(s.string()).default([]),
    tools: s.array(s.string()).default([]),
    model: s.string().optional(),
    systemPrompt: s.string().optional(),
    metadata: s.object({
      ns: s.string().default('agent'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({ ...data, url: `/agents/${data.slug}` }))
})

export default defineConfig({
  root: '.',
  output: { data: '.velite', assets: 'public/static', base: '/static/', name: '[name]-[hash:6].[ext]', clean: true },
  collections: { agents },
  mdx: { rehypePlugins: [], remarkPlugins: [] }
})
