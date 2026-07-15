# Graph Report - .  (2026-07-15)

## Corpus Check
- Large corpus: 412 files ╖ ~45,163,688 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 105 nodes · 211 edges · 1 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- 12M Inventory Tracking App

## God Nodes (most connected - your core abstractions)
1. `renderAll()` - 11 edges
2. `loadOperatorData()` - 10 edges
3. `filterByWarehouse()` - 10 edges
4. `renderDashboard()` - 10 edges
5. `render12M()` - 9 edges
6. `refreshCurrentScreen()` - 8 edges
7. `renderActivity()` - 8 edges
8. `showScreen()` - 8 edges
9. `saveConfig()` - 7 edges
10. `monthsUntilExpiry()` - 7 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (1 total, 0 thin omitted)

### Community 0 - "12M Inventory Tracking App"
Cohesion: 0.00
Nodes (89): adminLogin(), PRODUCTS, DEFAULT_CONFIG, getAgiCode(), setAgiCode(), loadConfig(), saveConfig(), CONFIG (+81 more)

## Knowledge Gaps
- **19 isolated node(s):** `PRODUCTS`, `DEFAULT_CONFIG`, `CONFIG`, `selectedWarehouses`, `MONTHS` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `PRODUCTS`, `DEFAULT_CONFIG`, `CONFIG` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `12M Inventory Tracking App` be split into smaller, more focused modules?**
  _Cohesion score 0.038644688644688646 - nodes in this community are weakly interconnected._