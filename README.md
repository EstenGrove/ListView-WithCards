# Advantage Tracker (ListView w/ Daily ADL Category Cards)

The following repo is the WIP build for the "Daily Cards" view that was discussed in the recent ALA meeting (12-16-2019).

---

## NEW FEATURES (additions discussed on 12-16-2019)

#### **Add Daily Category Cards View**

- [ ] _Enable:_ Add new "Category Cards" view
- [x] _Enable:_ Create <DailyCategoryCard/> component
  - [x] Each card covers a single ADL category
  - [x] Each card has a "task summary" panel for the category
  - [x] Each card routes to the current ListView for more detailed task tracking
  - [x] Each card should be collapsible/expandable (consider UI jank)

#### **Sub-Task Tracking**

- [ ] _Enable:_ Adding "sub-task" tracking for each task record
  - Only "SHOW" sub-tasks on task records that require it
- [ ] _Enable:_ Each task record will contain 3 checkboxes for "sub-tasks"
  - [ ] AM
  - [ ] PM
  - [ ] NOC
  - [ ] MARK ALL COMPLETED
- [ ] Change the "sub-task" labels on **Meals** to:
  - [ ] BREAKFAST
  - [ ] LUNCH
  - [ ] DINNER
- [ ] _Enable:_ Each "sub-task" will allow it's own "details" entry:
  - [ ] _Enable:_ Notes
  - [ ] _Enable:_ Signature
  - [ ] _Enable:_ Timestamp
  - [ ] _Enable:_ Follow Up Date/Time

#### **Multi-Notes Feature**

- [ ] _Enable:_ Adding multiple notes per task record.

---

## Additional Considerations & Potential Changes

The following are NOT pending feature updates, but "POSSIBLE" additions to implement.

- [ ] _Enable:_ Consider creating a more universal <TaskDetails/> component
  - Each <TaskDetails/> component contains:
    - [ ] _Enable:_ Any notes added for each sub-task
      - Inlcluding "sub-notes"
    - [ ] _Enable:_ Contains a timestamp for when each sub-task was marked "COMPLETED"
    - [ ] _Enable:_ Adding an "EXTRA NOTES" section that's specific to adding note entries per ADL Category.
