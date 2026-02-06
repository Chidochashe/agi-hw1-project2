# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A task management single-page app built with React + TypeScript + Vite. No backend — all data persisted to browser localStorage.

## Commands

- `npm run dev` — Start dev server (Vite, hot reload)
- `npm run build` — Production build (runs `tsc -b && vite build`)
- `npx tsc --noEmit` — Type-check without emitting
- `npm run preview` — Preview production build locally

## Architecture

**Data flow:** `App` owns filter state and passes it down. `useTasks` hook owns the task array with CRUD operations and localStorage sync. `TaskList` receives both and filters at render time via `filterTasks()`.

**Key files:**
- `src/types/task.ts` — `Task` interface, `FilterState` type, `defaultFilters`
- `src/hooks/useTasks.ts` — Custom hook: CRUD operations + localStorage persistence (key: `task-manager-tasks`)
- `src/utils/filterTasks.ts` — Pure filtering/sorting logic (AND logic across all filters; sort: incomplete first → priority high→low → due date earliest first)
- `src/App.tsx` — Root component, owns modal and filter state, wires everything together

**Components** (`src/components/`): `Header`, `FilterBar`, `TaskList`, `TaskItem`, `TaskModal` — each with co-located CSS Module (`.module.css`).

## Conventions

- CSS Modules for all component styling (no global styles except `index.css` reset)
- Priority levels: `'low' | 'medium' | 'high'`
- Dates stored as ISO strings (`YYYY-MM-DD` for dueDate, full ISO for timestamps)
- Task IDs via `crypto.randomUUID()`
- Use `useCallback` for all handler functions returned from hooks or passed as props
- Use `useMemo` for derived/computed data (e.g., filtered task lists)
- Use `toSorted()` instead of `.sort()` to avoid mutating arrays

## Accessibility Requirements

- Modals must have `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap (Tab cycling), and Escape key to close
- Interactive non-button elements (clickable divs) must have `role="button"`, `tabIndex={0}`, and `onKeyDown` for Enter/Space
- All form inputs need either a wrapping `<label>` or `aria-label`
- Checkboxes need descriptive `aria-label` attributes
- Elements revealed on hover must also be visible via `:focus-within`

## localStorage Patterns

- Skip writing on initial mount (use a `useRef` guard) to avoid overwriting potentially recoverable data
- Validate data shape on load with a type guard — don't trust `JSON.parse` output blindly
- Wrap `localStorage.setItem` in try/catch to handle `QuotaExceededError`
