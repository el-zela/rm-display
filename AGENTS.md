# Architecture
- Use verified Lovable Cloud Auth sessions for the new church workspace; legacy localStorage roles never authorize access because they are user-editable.
- Store role assignments separately from profiles and enforce module permissions in PostgreSQL RLS and every server function because navigation is not a security boundary.
- Keep financial posting and approval in atomic database functions; never let a record author approve their own pending entry.
- New workspace content lives in TanStack route leaves with reusable components outside the routes directory.