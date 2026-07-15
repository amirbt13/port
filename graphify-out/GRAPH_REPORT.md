# Graph Report - .  (2026-07-15)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 273 nodes · 469 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6757a467`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 14

## God Nodes (most connected - your core abstractions)
1. `cn()` - 27 edges
2. `compilerOptions` - 17 edges
3. `IProject` - 13 edges
4. `paths` - 10 edges
5. `updateProjectAction()` - 8 edges
6. `updateSettingsAction()` - 8 edges
7. `getProjectById()` - 7 edges
8. `getSettings()` - 7 edges
9. `IProjectImage` - 7 edges
10. `tailwind` - 6 edges

## Surprising Connections (you probably didn't know these)
- `SettingsForm()` --indirect_call--> `updateSettingsAction()`  [INFERRED]
  src/app/admin/_components/SettingsForm.tsx → src/app/admin/actions.ts
- `Button()` --calls--> `cn()`  [EXTRACTED]
  public/components/ui/button.tsx → public/lib/utils.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  public/components/ui/card.tsx → public/lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  public/components/ui/card.tsx → public/lib/utils.ts
- `Carousel()` --calls--> `cn()`  [EXTRACTED]
  public/components/ui/carousel.tsx → public/lib/utils.ts

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (21): ActionState, Action, ProjectFormProps, SettingsForm(), SettingsPage(), AboutMePageProps, HomePage(), Props (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (29): buildProjectInput(), createProjectAction(), deleteProjectAction(), maybeUpload(), projectSchema, requireAdmin(), revalidatePublic(), settingsSchema (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (20): metadata, FooterLayout(), BurgerMenu(), HeaderLayout(), HeaderLogo(), LogoProps, ThemeToggle(), SwitchComponent() (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (25): Button(), buttonVariants, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem() (+17 more)

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (19): Avatar(), AvatarFallback(), AvatarImage(), Badge(), badgeVariants, Card(), CardAction(), CardContent() (+11 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (19): public/*, src/app/*, src/app/api/*, src/components/*, src/lib/*, src/providers/*, src/redux/*, src/types/* (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (7): signOutAction(), authenticate(), LoginPage(), credentialsSchema, { handlers, auth, signIn, signOut }, { auth: middleware }, config

### Community 9 - "Community 9"
Cohesion: 0.31
Nodes (9): contentType(), main(), migrateProjects(), migrateSettings(), OldProject, PUBLIC, ROOT, supabase (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

## Knowledge Gaps
- **90 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+85 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 4` to `Community 3`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `IProject` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `Community 5` to `Community 6`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09176788124156546 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13513513513513514 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09047619047619047 - nodes in this community are weakly interconnected._