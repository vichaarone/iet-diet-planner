# IET — your everyday table

A personal Indian-food planner with weekly/monthly goals, simple recipe swaps, a generated grocery checklist, receipt-based budget tracking, and weight/waist/protein/workout check-ins.

## Run

```sh
python3 server.py
```

Open http://localhost:8765 on your laptop. On your phone, open `http://YOUR-LAPTOP-WIFI-IP:8765` on the same trusted Wi-Fi. Enter the private access code printed in the terminal; it is also stored in `.data/access-code.txt`. The laptop and server must remain running. macOS may ask to allow local network access. Guest/student Wi-Fi can block connections between devices.

No packages, build step, paid API or account needed. Python 3.10+ is sufficient. This is a private LAN app, not an internet deployment: do not forward the port publicly. Remote hosting would require HTTPS and an appropriate production server. HTTP on the local network is unencrypted.

## Use

- **Settings:** enter the milk volume for your shake. Oats default to 100 g, peanut butter to 25 g, plus one banana. Milk defaults to 7.5 g protein / 51 kcal per 100 ml, from the manufacturer’s current 0.1% carton; confirm your own carton. Missing milk volume is explicitly flagged and omitted from totals.
- **Meal plan:** choose a week/day, swap between 20 meal options, and open complete recipes with equipment, ingredient quantities, seasoning amounts, numbered cooking steps, timings and make-ahead notes. All quantities are raw/dry except where labelled otherwise. Nutrition is approximate and reflects the plan, not actual consumption.
- **Groceries:** ingredients sum across the selected week. Check off what is ready, add extras and record receipts. Illustrative ingredient costs are not live prices or pack prices; the calendar-month budget uses actual logged spending.
- **Overview / Progress:** create goals for the current Monday-start week or calendar month. Gym/prep/protein goals count daily check-ins; manual goals support check-offs. Each date has one check-in, and the Edit button updates it. Dates are fixed when editing an existing entry; a new check-in cannot silently overwrite an existing date. Blank metrics are not zero. Workout/prep tracking supports one session per day.
- **Both devices:** updates save to the shared SQLite database and refresh when the browser regains focus. Simultaneous edits to the same record use the last successful save. Unrelated records are never overwritten as a whole-state snapshot.

The current meal template is a starting point, not a guarantee of any calorie deficit or a nutritionally complete prescription. Targets remain editable. Your usual large shake is included as a meal, not added on top of a complete breakfast.

## Data

Personal data and credentials stay in `.data/` (excluded from git). Use Settings → Download data backup for a readable JSON export. For a complete restorable backup, stop the server and copy the entire `.data` directory; restore that directory before restarting. Do not share the access-code file. To rotate the code, stop the server, replace its contents with a new random value, and restart; existing cookies then expire effectively.

## Check

```sh
node test_core.mjs
node test_recipe_view.mjs
python3 -m unittest test_server.py
```

The server test uses a temporary database and local ephemeral port. It checks authentication, cross-origin rejection, validation, independent-device reads and persisted records. Node checks cover nutrition, grocery aggregation/swaps, calendar boundaries, goals and weight averages. No test libraries required.

## Sources

- Milk label: https://www.schwarzwaldmilch.de/produkt/protein-linie/frische-protein-milch-09-1l-packung/
- Rice storage: https://www.nhs.uk/live-well/eat-well/food-types/starchy-foods-and-carbohydrates/
- Protein context: https://www.dge.de/wissenschaft/stellungnahmen-und-positionspapiere/positionen/proteinzufuhr-im-sport/

Other ingredient nutrition and all prices are explicitly approximate planning values. No external trackers, fonts or analytics.
