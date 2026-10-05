# IET — your everyday table

A private, local-first Indian-food planner with weekly/monthly goals, simple recipe swaps, a generated grocery checklist, receipt-based budget tracking, and weight/waist/protein/workout check-ins.

## Run

It is a static installable PWA. Open the hosted app in any modern browser, or serve the `public/` directory locally:

```sh
python3 -m http.server 8765 --directory public
```

Then open http://localhost:8765. For a phone, host the `public/` directory on any static host or use a local server reachable from that device. No Python backend, account, database or network connection is required after the files load.

Use the browser’s “Add to Home Screen” or “Install” action to use it like an app. Each browser/device has its own independent planner data.

The `public/` folder can be deployed directly with GitHub Pages or any static host. The app does not require a backend.

## Use

- **Settings:** enter the milk volume for your shake. Oats default to 100 g, peanut butter to 25 g, plus one banana. Milk defaults to 7.5 g protein / 51 kcal per 100 ml, from the manufacturer’s current 0.1% carton; confirm your own carton. Missing milk volume is explicitly flagged and omitted from totals.
- **Meal plan:** choose a week/day, swap between 20 meal options, and open complete recipes with equipment, ingredient quantities, seasoning amounts, numbered cooking steps, timings and make-ahead notes. All quantities are raw/dry except where labelled otherwise. Nutrition is approximate and reflects the plan, not actual consumption.
- **Groceries:** ingredients sum across the selected week. Check off what is ready, add extras and record receipts. Illustrative ingredient costs are not live prices or pack prices; the calendar-month budget uses actual logged spending.
- **Overview / Progress:** create goals for the current Monday-start week or calendar month. Gym/prep/protein goals count daily check-ins; manual goals support check-offs. Each date has one check-in, and the Edit button updates it. Dates are fixed when editing an existing entry; a new check-in cannot silently overwrite an existing date. Blank metrics are not zero. Workout/prep tracking supports one session per day.
- **Privacy:** data stays in that browser’s local storage. There is no login, server database or automatic sync. Two devices remain separate unless you manually export a backup from one and import it on the other.

The current meal template is a starting point, not a guarantee of any calorie deficit or a nutritionally complete prescription. Targets remain editable. Your usual large shake is included as a meal, not added on top of a complete breakfast.

## Data

Use Settings → Download data backup for a JSON copy of the current device’s planner. Use Import backup to restore or manually move that data to another device. Clearing browser storage, using a different browser, or uninstalling the PWA can remove local data, so keep backups you care about.

## Check

```sh
node test_core.mjs
node test_recipe_view.mjs
```

The checks cover nutrition, grocery aggregation/swaps, calendar boundaries, goals, weight averages and rendering complete recipe methods. No test libraries are required.

## Sources

- Milk label: https://www.schwarzwaldmilch.de/produkt/protein-linie/frische-protein-milch-09-1l-packung/
- Rice storage: https://www.nhs.uk/live-well/eat-well/food-types/starchy-foods-and-carbohydrates/
- Protein context: https://www.dge.de/wissenschaft/stellungnahmen-und-positionspapiere/positionen/proteinzufuhr-im-sport/

Other ingredient nutrition and all prices are explicitly approximate planning values. No external trackers, fonts or analytics.
