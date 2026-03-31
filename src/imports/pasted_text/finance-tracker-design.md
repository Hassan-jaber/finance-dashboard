Design a **mobile-first personal finance tracker app** for a freelance front-end developer who mainly uses the app on a smartphone.

The app should be designed primarily for **quick daily use**, not as a complex accounting system. The main goal is to help the user quickly track:

* personal income
* personal expenses
* monthly financial target

The app will later be built using **React + IndexedDB**, so the design should be realistic for implementation, clean, component-based, and developer-friendly.

## Core product vision

This is a **fast personal money tracker** focused on:

* quick income entry
* quick expense entry
* simple monthly progress tracking
* local-first usage using IndexedDB
* excellent mobile UX
* offline-friendly behavior
* modern dark mode interface

## Important product behavior

* The user’s income is often repetitive and small, especially **5 ILS**
* There must be a **very prominent quick action button for +5 ₪**
* The user should be able to add income or expense in just 1–2 taps
* The app supports **two currencies only: ILS (₪) and EUR (€)**
* Monthly target should be visible in both ILS and EUR
* The app should support exporting **monthly reports as PDF and Excel**
* Since the app uses **IndexedDB**, it should feel like a personal offline-first app stored locally on the device/browser

## Design direction

Create a sleek, premium, modern **mobile-first finance app UI** with:

* dark mode by default
* clean spacing
* rounded cards
* subtle gradients
* soft shadows
* strong visual hierarchy
* touch-friendly buttons
* minimal clutter
* modern typography
* clear financial color system:

  * green for income
  * red for expenses
  * blue for target/progress

## Mobile-first layout priorities

The mobile screen is the main experience. Start with smartphone screens first before desktop adaptation.

### Main Home Screen structure

1. **Top summary section**

   * current month
   * total net balance
   * monthly target
   * progress bar toward target
   * remaining amount to reach target

2. **Quick actions section**
   This is the most important section in the app.
   Include large thumb-friendly buttons such as:

   * +5 ₪
   * +10 ₪
   * Add Expense
   * Add Custom Income

   The **+5 ₪** button must be the most visually important action.

3. **Today summary**

   * today income
   * today expenses
   * today net

4. **Recent transactions**
   Show a clean list of recent entries:

   * type
   * amount
   * currency
   * category
   * date/time

5. **Insights section**
   Keep it lightweight and helpful:

   * total quick-add taps today
   * top spending category this month
   * best income day
   * monthly spending trend

6. **Bottom navigation**
   Use a mobile app style bottom navigation with:

   * Home
   * Transactions
   * Reports
   * Settings

## Additional screens to design

Please design the following screens as part of the system:

### 1. Home Dashboard

Main mobile screen with summary, quick actions, recent activity

### 2. Add Expense Screen / Bottom Sheet

Include:

* amount
* currency selector (₪ / €)
* category
* note
* save button

### 3. Add Income Screen / Bottom Sheet

Include:

* quick add presets
* custom amount
* currency selector
* note
* save button

### 4. Monthly Reports Screen

Include:

* monthly totals
* income vs expenses
* net result
* category breakdown
* export buttons:

  * Export PDF
  * Export Excel

### 5. Monthly Target Settings Screen

Include:

* target in ILS
* target in EUR
* exchange rate or manual conversion helper
* save target button

### 6. Transactions History Screen

Include:

* list view
* filters by type / currency / month
* search
* edit/delete actions

### 7. Settings Screen

Include:

* theme
* default currency
* quick add values
* local data/export options
* IndexedDB/local-first hints in UX copy

## UX guidance

* Make the app feel extremely fast and frictionless
* Use bottom sheets, floating buttons, segmented controls, and clear touch targets
* Avoid oversized empty sections
* Avoid desktop-style dashboards on mobile
* Prioritize one-hand usage
* Make the interface suitable for repeated daily use
* Focus on habit-building and speed

## Implementation-awareness

The app will be built in **React** and store data in **IndexedDB**, so design the interface in a practical way:

* reusable components
* cards
* transaction rows
* charts
* bottom sheets
* dialogs
* buttons
* form inputs
* filter chips

## Optional enhancements

* streak indicator for days with activity
* small celebration animation when monthly target is reached
* offline-ready UX hints
* lightweight charts for weekly and monthly trends
* PWA-friendly feel

## Deliverables

Create:

* mobile-first app screens
* a consistent design system
* reusable components
* dark UI with polished financial dashboard aesthetics
* responsive expansion for tablet/desktop only after mobile is solved

Style inspiration:
A mix of modern fintech app UI, minimal SaaS design, and polished mobile productivity apps.
Think: clean, premium, focused, practical, and fast.
