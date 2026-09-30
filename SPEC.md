# IET — personal food and fitness planner

## Goal
Make an Indian student’s diet easier to follow with two cooking sessions per week, a €200/month grocery budget, and goals that support fat loss and beginner strength training.

## Scope
Responsive browser app: overview, weekly meals and variations, groceries, progress and settings. Editable monthly/weekly goals, weight/waist and workout logs, shopping quantities derived from seven-day meal assignments, grocery purchase tracking, and a shake calculator. No yoghurt. Chicken, eggs, tofu, soya and lentils supported. Shake: 100 g oats, 25 g peanut butter, banana, milk protein 7.5 g/100 ml; milk volume and label calories must be supplied, never guessed as confirmed facts.

Local shared server with SQLite is sufficient for phone/laptop use on the same Wi-Fi. External hosting remains a separate deployment step. Persist records on server, use individual record updates, refresh on focus, and do not overwrite other devices’ unrelated records. One private access code, session cookies and same-origin writes. No external dependencies required.

## Verifier
Run stdlib unit/integration checks for validation, persistence, authentication, grocery aggregation, periods and shake calculations. Exercise login, goals, meal swap, grocery purchase, progress log and reload in browser. Inspect desktop and phone-width layout. Confirm production files contain no example progress masquerading as real history.

## Data and estimates
Earlier conversational targets (2,100 kcal, 130 g protein) are editable starting estimates, not medical prescriptions. Nutrition and ingredient prices are labelled estimates; milk protein is user-supplied. Recipes supply ingredient weights and simple steps. Actual expenses determine budget progress. Calendar month and ISO Monday-start week boundaries must use local calendar dates.
