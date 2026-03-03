# Review Checklists

## Spec PR Checklist

- [ ] Frontmatter fields are complete and valid.
- [ ] Required sections are present and specific.
- [ ] Status transition is valid.
- [ ] `links.json` references a real prototype route and flow config.

## Design System PR Checklist

- [ ] No hardcoded style values where token variables should be used.
- [ ] Component API uses kebab-case attributes and `rr-*` events.
- [ ] Storybook stories exist for changed components.
- [ ] Token/theme artifacts are regenerated when raw sources changed.

## Prototype PR Checklist

- [ ] Flow route exists and maps to matching `spec_id`.
- [ ] Core happy-path and one failure-path are represented.
- [ ] Prototype route remains accessible from app navigation.
