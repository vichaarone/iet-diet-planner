// Pure calculations shared by the UI and runnable Node checks.
export const iso = (d=new Date()) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const addDays = (day,n) => { const d=new Date(day+'T12:00:00'); d.setDate(d.getDate()+n); return iso(d); };
export const weekStart = day => {const d=new Date(day+'T12:00:00');return addDays(day,-((d.getDay()+6)%7));};
export const inPeriod = (day,start,period) => period==='month' ? day.slice(0,7)===start.slice(0,7) : day>=start&&day<addDays(start,7);
export const money = n => new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(n);
export const ingredients = {
 oats:['Oats / Haferflocken','g',1.6,370,13], milk:['Schwarzwald protein milk','ml',2,51,7.5], pb:['Peanut butter','g',6,600,25], banana:['Bananas','each',.25,105,1.3], berries:['Frozen berries','g',6,45,1], cocoa:['Unsweetened cocoa','g',12,340,20],
 chicken:['Boneless chicken','g',10,110,23], tofu:['Firm tofu','g',5,140,15], soya:['Soya chunks (dry)','g',8,340,50], lentils:['Red lentils (dry)','g',3,350,25], chickpeas:['Chickpeas (drained)','g',3,120,6.5], rice:['Rice (dry)','g',2.5,350,7], veg:['Mixed vegetables','g',2,35,2], spinach:['Frozen spinach','g',2.5,23,3], base:['Onion & tomato','g',2,35,1], oil:['Rapeseed oil','g',3,900,0], eggs:['Eggs','each',.3,75,6.5], bread:['Wholegrain bread','g',3,240,9], apple:['Apples','each',.35,80,.3], chia:['Chia seeds','g',8,490,17], spices:['Ginger, garlic & spices','g',12,200,5], besan:['Besan / chickpea flour','g',4,370,22], wraps:['Wholegrain wraps','g',5,300,9], kidney:['Canned kidney beans (drained)','g',3,110,8], peanuts:['Unsalted roasted peanuts','g',5,600,26], lemon:['Lemons','each',0.5,20,0.5]
};
export const recipes = {
  "shake": {
    "name": "Your everyday shake",
    "tag": "5 min · blender",
    "icon": "◒",
    "slot": "breakfast",
    "items": {
      "oats": 100,
      "milk": 0,
      "pb": 25,
      "banana": 1
    },
    "steps": [
      "Measure the oats, peanut butter and milk amounts shown above. If milk says “Set in Settings”, enter your usual milk volume there first; water can thin the shake but does not replace its protein.",
      "Peel and slice the banana.",
      "Blend the oats alone for 15–20 seconds into a coarse flour. Add the milk, peanut butter and fruit.",
      "Blend for 30–60 seconds. Scrape down the sides with the blender switched off. Add water a little at a time until it pours, then blend again. Optional: a pinch of cardamom or cinnamon.",
      "Pour into a large glass and drink. This is a whole breakfast, so you do not need another breakfast alongside it."
    ],
    "equipment": "Blender, kitchen scale and a large glass",
    "batch": "Pre-portion the dry oats and peanut butter to save time. Blend fresh; refrigerate any prepared shake immediately and use within 24 hours. Shake or stir again before drinking."
  },
  "cocoa": {
    "name": "Chocolate banana shake",
    "tag": "5 min · blender",
    "icon": "◒",
    "slot": "breakfast",
    "items": {
      "oats": 100,
      "milk": 0,
      "pb": 25,
      "banana": 1,
      "cocoa": 5
    },
    "steps": [
      "Measure the oats, peanut butter and milk amounts shown above. If milk says “Set in Settings”, enter your usual milk volume there first; water can thin the shake but does not replace its protein.",
      "Peel and slice the banana.",
      "Blend the oats alone for 15–20 seconds into a coarse flour. Add the milk, peanut butter and fruit and the cocoa powder.",
      "Blend for 30–60 seconds. Scrape down the sides with the blender switched off. Add water a little at a time until it pours, then blend again. Optional: a pinch of cardamom or cinnamon.",
      "Pour into a large glass and drink. This is a whole breakfast, so you do not need another breakfast alongside it."
    ],
    "equipment": "Blender, kitchen scale and a large glass",
    "batch": "Pre-portion the dry oats and peanut butter to save time. Blend fresh; refrigerate any prepared shake immediately and use within 24 hours. Shake or stir again before drinking."
  },
  "berry": {
    "name": "Berry-cardamom shake",
    "tag": "5 min · blender",
    "icon": "◒",
    "slot": "breakfast",
    "items": {
      "oats": 100,
      "milk": 0,
      "pb": 25,
      "berries": 150
    },
    "steps": [
      "Measure the oats, peanut butter and milk amounts shown above. If milk says “Set in Settings”, enter your usual milk volume there first; water can thin the shake but does not replace its protein.",
      "Use the listed berries instead of banana. Follow the pack instructions; if heating is required, heat first and cool completely before blending.",
      "Blend the oats alone for 15–20 seconds into a coarse flour. Add the milk, peanut butter and fruit.",
      "Blend for 30–60 seconds. Scrape down the sides with the blender switched off. Add water a little at a time until it pours, then blend again. Optional: a pinch of cardamom or cinnamon.",
      "Pour into a large glass and drink. This is a whole breakfast, so you do not need another breakfast alongside it."
    ],
    "equipment": "Blender, kitchen scale and a large glass",
    "batch": "Pre-portion the dry oats and peanut butter to save time. Blend fresh; refrigerate any prepared shake immediately and use within 24 hours. Shake or stir again before drinking."
  },
  "eggs": {
    "name": "Masala egg toast",
    "tag": "20 min · one pan",
    "icon": "◓",
    "slot": "breakfast",
    "items": {
      "eggs": 3,
      "bread": 100,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Beat the 3 eggs in a bowl. Turn the heat to medium-low and pour them into the pan. Stir gently for 3–5 minutes until fully set, with no runny egg remaining.",
      "Toast the bread while the eggs cook. Sprinkle garam masala onto the eggs, taste for salt and spoon over the toast."
    ],
    "equipment": "Non-stick frying pan, bowl and toaster",
    "batch": "Prepare the onion-tomato masala ahead and chill promptly. Scramble the eggs fresh for the best texture; breakfast takes about 5 minutes with the base ready.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "chicken": {
    "name": "Chicken masala & rice",
    "tag": "35 min · batch friendly",
    "icon": "◕",
    "slot": "main",
    "items": {
      "chicken": 180,
      "rice": 50,
      "veg": 200,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Rinse the listed dry rice. Put it in a small saucepan with water according to its packet (for white basmati, start with about twice its volume). Bring to a boil, cover and turn to low for 10–12 minutes, then rest off the heat for 5 minutes. Check it is tender; add a splash of water and cook longer if needed.",
      "Cut the chicken into roughly 2 cm pieces on a separate board. Wash hands and utensils after handling raw chicken.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add chicken and stir for 2 minutes. Add 100 ml water, cover and simmer over medium-low heat for 10–12 minutes, stirring occasionally.",
      "Add the mixed vegetables. Cook for another 5–8 minutes until tender and the largest chicken piece reaches 74°C in its centre. Add water if you want more gravy.",
      "Stir in garam masala, taste for salt and serve with the rice. Divide curry and rice evenly if cooking more than one portion."
    ],
    "equipment": "Saucepan, lidded frying pan, separate chicken board and food thermometer",
    "batch": "For batch prep, multiply the ingredients by your number of portions; use a larger pan and allow extra cooking time. Divide into shallow containers. Refrigerate promptly and freeze portions for later in the week. Cool rice within 1 hour; refrigerate for no more than 24 hours or freeze. Reheat a portion once until steaming hot throughout.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "saag": {
    "name": "Chicken saag & rice",
    "tag": "35 min · batch friendly",
    "icon": "◕",
    "slot": "main",
    "items": {
      "chicken": 180,
      "rice": 50,
      "spinach": 200,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Rinse the listed dry rice. Put it in a small saucepan with water according to its packet (for white basmati, start with about twice its volume). Bring to a boil, cover and turn to low for 10–12 minutes, then rest off the heat for 5 minutes. Check it is tender; add a splash of water and cook longer if needed.",
      "Cut chicken into 2 cm pieces using a separate board; clean your hands and utensils afterwards.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add chicken, frozen spinach and 100 ml water. Cover and simmer on medium-low for 15–20 minutes, breaking up the spinach and stirring every few minutes.",
      "Uncover and simmer for 2–3 minutes if watery. Check the largest chicken piece reaches 74°C at the centre; cook longer if needed. Finish with garam masala and serve with rice."
    ],
    "equipment": "Saucepan, lidded pan and food thermometer",
    "batch": "For batch prep, multiply the ingredients by your number of portions; use a larger pan and allow extra cooking time. Divide into shallow containers. Refrigerate promptly and freeze portions for later in the week. Cool rice within 1 hour; refrigerate for no more than 24 hours or freeze. Reheat a portion once until steaming hot throughout.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "tofu": {
    "name": "Tofu bhurji bowl",
    "tag": "25 min · easy prep",
    "icon": "▧",
    "slot": "main",
    "items": {
      "tofu": 250,
      "rice": 40,
      "veg": 200,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Rinse the listed dry rice. Put it in a small saucepan with water according to its packet (for white basmati, start with about twice its volume). Bring to a boil, cover and turn to low for 10–12 minutes, then rest off the heat for 5 minutes. Check it is tender; add a splash of water and cook longer if needed.",
      "Drain tofu and pat dry. Crumble it into bite-size pieces with a fork or clean hands.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add mixed vegetables and 3 tbsp water. Cover for 5–7 minutes, until tender. Add tofu and stir-fry uncovered for 4–5 minutes until hot throughout.",
      "Finish with garam masala, taste for salt and serve over rice. For a drier bhurji, cook another minute uncovered."
    ],
    "equipment": "Saucepan and frying pan",
    "batch": "For batch prep, multiply the ingredients by your number of portions; use a larger pan and allow extra cooking time. Divide into shallow containers. Refrigerate promptly and freeze portions for later in the week. Cool rice within 1 hour; refrigerate for no more than 24 hours or freeze. Reheat a portion once until steaming hot throughout.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "soya": {
    "name": "Soya keema & dal rice",
    "tag": "35 min · batch friendly",
    "icon": "◈",
    "slot": "main",
    "items": {
      "soya": 50,
      "lentils": 30,
      "rice": 40,
      "veg": 200,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Rinse the listed dry rice. Put it in a small saucepan with water according to its packet (for white basmati, start with about twice its volume). Bring to a boil, cover and turn to low for 10–12 minutes, then rest off the heat for 5 minutes. Check it is tender; add a splash of water and cook longer if needed.",
      "Prepare the soya chunks according to the packet, usually soaking or boiling in plenty of hot water for 5–10 minutes. Drain, cool enough to handle and squeeze out excess water. Chop roughly for a keema texture.",
      "Rinse the lentils. Simmer in a small saucepan with 150 ml water for 12–15 minutes until soft; add more water if the pan dries out.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add soya, vegetables and 75 ml water to the masala. Cover and cook for 7–10 minutes until the vegetables are tender.",
      "Stir in cooked lentils and garam masala. Simmer for 2 minutes, adjust salt and water, then serve with rice."
    ],
    "equipment": "Two saucepans, frying pan and sieve",
    "batch": "For batch prep, multiply the ingredients by your number of portions; use a larger pan and allow extra cooking time. Divide into shallow containers. Refrigerate promptly and freeze portions for later in the week. Cool rice within 1 hour; refrigerate for no more than 24 hours or freeze. Reheat a portion once until steaming hot throughout.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "khichdi": {
    "name": "One-pot protein khichdi",
    "tag": "35 min · one pot",
    "icon": "◈",
    "slot": "main",
    "items": {
      "soya": 50,
      "lentils": 60,
      "rice": 50,
      "veg": 250,
      "base": 100,
      "oil": 7,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Prepare soya according to the packet; drain and squeeze when cool enough. Rinse the rice and lentils together in a sieve.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add rice, lentils, soya and vegetables to the pot. Pour in 500 ml water per portion and stir. Bring to a boil, then cover loosely and turn the heat to low.",
      "Simmer for 20–25 minutes, stirring every 5 minutes to stop sticking. Add hot water in 50 ml splashes if it thickens before the grains are soft.",
      "When rice and lentils are soft and the mixture is spoonable, stir in garam masala and adjust salt. Rest for 3 minutes. It thickens as it stands; loosen with a splash of hot water."
    ],
    "equipment": "Large lidded saucepan and sieve",
    "batch": "For batch prep, multiply the ingredients by your number of portions; use a larger pan and allow extra cooking time. Divide into shallow containers. Refrigerate promptly and freeze portions for later in the week. Cool rice within 1 hour; refrigerate for no more than 24 hours or freeze. Reheat a portion once until steaming hot throughout.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "chana": {
    "name": "Chana & tofu masala",
    "tag": "30 min · batch friendly",
    "icon": "▧",
    "slot": "main",
    "items": {
      "chickpeas": 150,
      "tofu": 150,
      "rice": 40,
      "spinach": 150,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Rinse the listed dry rice. Put it in a small saucepan with water according to its packet (for white basmati, start with about twice its volume). Bring to a boil, cover and turn to low for 10–12 minutes, then rest off the heat for 5 minutes. Check it is tender; add a splash of water and cook longer if needed.",
      "Drain and rinse canned chickpeas; weigh after draining. Drain tofu and cut into 2 cm cubes.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add chickpeas, tofu, spinach and 100 ml water. Cover and simmer for 10–12 minutes, stirring until spinach has thawed and everything is steaming hot.",
      "Mash a spoonful of chickpeas against the pan to thicken the sauce. Add garam masala and adjust salt, then serve with rice."
    ],
    "equipment": "Saucepan, lidded pan and sieve",
    "batch": "For batch prep, multiply the ingredients by your number of portions; use a larger pan and allow extra cooking time. Divide into shallow containers. Refrigerate promptly and freeze portions for later in the week. Cool rice within 1 hour; refrigerate for no more than 24 hours or freeze. Reheat a portion once until steaming hot throughout.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "snack": {
    "name": "Eggs, fruit & chia",
    "tag": "20 min · mostly hands-off",
    "icon": "◓",
    "slot": "snack",
    "items": {
      "eggs": 2,
      "apple": 1,
      "chia": 8
    },
    "steps": [
      "Put eggs in a small saucepan and cover with cold water by about 2 cm. Bring to a boil, reduce to a gentle simmer and cook for 10–12 minutes for fully set yolks.",
      "Drain and cool under cold running water. Peel only when ready to eat.",
      "Stir the chia into 200–250 ml water. Leave for 15–20 minutes, stir again and add more water if too thick. Do not swallow a spoonful of dry seeds.",
      "Wash the apple and eat it alongside the eggs. The chia is your usual morning portion, not an extra serving on top of it."
    ],
    "equipment": "Small saucepan and glass",
    "batch": "Boil a few eggs ahead and refrigerate promptly, in their shells. Make the chia drink fresh or refrigerate immediately for the next morning."
  },
  "masala_oats": {
    "name": "Masala oats with eggs",
    "tag": "20 min · one pan",
    "slot": "breakfast",
    "icon": "◓",
    "items": {
      "oats": 60,
      "eggs": 2,
      "veg": 150,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add vegetables and 100 ml water; cover for 5 minutes. Stir in oats and another 200 ml water. Simmer for 4–6 minutes, stirring, until creamy.",
      "Beat the eggs in a bowl. Slowly stir them into the simmering oats. Keep stirring and cook for 3–4 minutes, until the egg is fully cooked and the oats are steaming hot throughout.",
      "Add garam masala and salt to taste. Loosen with hot water if needed. Serve in a bowl."
    ],
    "equipment": "Saucepan and bowl",
    "batch": "Chop the vegetables ahead; cook the oats and eggs fresh. For two portions, double ingredients and start with 550 ml water, adding more as needed.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "chilla": {
    "name": "Besan chilla with tofu",
    "tag": "25 min · two pancakes",
    "slot": "breakfast",
    "icon": "◓",
    "items": {
      "besan": 70,
      "tofu": 100,
      "base": 100,
      "oil": 7,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Mix besan with 110 ml water in a bowl until smooth, adding a little more if needed for a thick but pourable batter. Stir in finely chopped onion, half the ginger and garlic, turmeric, chilli and a pinch of salt.",
      "Crumble tofu. Heat half the oil, add cumin, remaining ginger and garlic, tomato and tofu. Cook on medium for 5–6 minutes until hot and fairly dry. Stir in garam masala; transfer to a plate.",
      "Wipe the non-stick pan and lightly grease with some of the remaining oil. On medium heat, spread half the batter into a thin pancake. Cook 2–3 minutes until the surface sets and edges lift.",
      "Flip and cook for another 2 minutes until no wet batter remains. Repeat with the rest of the batter and oil. Fill each pancake with the tofu mixture and fold."
    ],
    "equipment": "Non-stick pan, mixing bowl and spatula",
    "batch": "Mix the dry besan and ground spices ahead. Make the batter and cook fresh; refrigerate prepared tofu filling promptly and use within 2 days.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "tofu_toast": {
    "name": "Spicy tofu toast",
    "tag": "20 min · one pan",
    "slot": "breakfast",
    "icon": "◓",
    "items": {
      "tofu": 200,
      "bread": 80,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Drain tofu, pat dry and crumble.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Stir in tofu and cook on medium heat for 4–5 minutes until hot and fairly dry. Stir in garam masala and adjust salt.",
      "Toast the bread. Divide the tofu mixture over the slices and serve immediately."
    ],
    "equipment": "Frying pan and toaster",
    "batch": "Make the tofu topping ahead; chill promptly and use within 2 days, reheating until steaming hot. Toast the bread fresh so it stays crisp.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "egg_rice": {
    "name": "Masala egg fried rice",
    "tag": "25 min · pantry friendly",
    "slot": "main",
    "icon": "◈",
    "items": {
      "eggs": 3,
      "rice": 60,
      "veg": 200,
      "base": 100,
      "oil": 7,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Rinse the listed dry rice. Put it in a small saucepan with water according to its packet (for white basmati, start with about twice its volume). Bring to a boil, cover and turn to low for 10–12 minutes, then rest off the heat for 5 minutes. Check it is tender; add a splash of water and cook longer if needed.",
      "Spread freshly cooked rice on a plate for a few minutes while making the eggs. If using stored rice, use only promptly chilled rice from within 24 hours.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add vegetables with 2 tbsp water. Cover for 5–7 minutes until tender, then push them to one side. Beat eggs, pour into the cleared space and scramble until fully set.",
      "Add rice and garam masala. Toss over medium-high heat for 2–3 minutes until hot throughout, breaking up rice gently. Taste for salt and serve."
    ],
    "equipment": "Saucepan and large non-stick pan",
    "batch": "Best freshly cooked. If prepping, keep rice separate, cool within 1 hour and refrigerate up to 24 hours or freeze. Reheat only once until steaming hot.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "chicken_wrap": {
    "name": "Chicken masala wraps",
    "tag": "30 min · two wraps",
    "slot": "main",
    "icon": "◈",
    "items": {
      "chicken": 180,
      "wraps": 100,
      "veg": 150,
      "base": 100,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Slice chicken into thin strips on a separate board. Wash hands and utensils after handling raw chicken.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add chicken, vegetables and 75 ml water. Cover and simmer for 12–15 minutes, stirring occasionally, until vegetables soften and chicken reaches 74°C in the centre.",
      "Uncover and cook off excess liquid for 2–3 minutes so the filling is not watery. Stir in garam masala and adjust salt.",
      "Warm the wraps according to the pack. Divide filling between them, fold in the sides and roll tightly. Serve with any vegetables that do not fit inside."
    ],
    "equipment": "Lidded frying pan and food thermometer",
    "batch": "Cook filling in batches; refrigerate promptly and use within 2 days or freeze later portions. Reheat until steaming hot and assemble with freshly warmed wraps.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "rajma": {
    "name": "Quick rajma & rice",
    "tag": "25 min · canned beans",
    "slot": "main",
    "icon": "◈",
    "items": {
      "kidney": 240,
      "rice": 50,
      "spinach": 150,
      "base": 150,
      "oil": 5,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Rinse the listed dry rice. Put it in a small saucepan with water according to its packet (for white basmati, start with about twice its volume). Bring to a boil, cover and turn to low for 10–12 minutes, then rest off the heat for 5 minutes. Check it is tender; add a splash of water and cook longer if needed.",
      "Drain and rinse canned kidney beans and weigh the drained amount. Use canned, already cooked beans for this quick recipe; dry kidney beans need a different preparation.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add beans, spinach and 150 ml water. Simmer gently for 10–12 minutes until hot throughout and spinach is cooked. Stir occasionally.",
      "Mash 2 tbsp beans into the sauce. Stir in garam masala, simmer 2 more minutes and taste for salt. Serve with rice."
    ],
    "equipment": "Saucepan, frying pan and sieve",
    "batch": "For batch prep, multiply the ingredients by your number of portions; use a larger pan and allow extra cooking time. Divide into shallow containers. Refrigerate promptly and freeze portions for later in the week. Cool rice within 1 hour; refrigerate for no more than 24 hours or freeze. Reheat a portion once until steaming hot throughout.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "soya_pulao": {
    "name": "One-pot soya pulao",
    "tag": "35 min · one pot",
    "slot": "main",
    "icon": "◈",
    "items": {
      "soya": 60,
      "rice": 60,
      "veg": 250,
      "base": 100,
      "oil": 7,
      "spices": 15
    },
    "steps": [
      "Finely chop the onion and tomato: use equal weights of each from the combined amount listed. Grate the ginger and garlic. Cut any large vegetables into small pieces; frozen mixed vegetables can go straight into the pan.",
      "Rinse the rice. Prepare soya according to its packet, then drain and squeeze out the water when cool enough.",
      "Heat the listed oil over medium heat. Add cumin for 20 seconds, then onion for 3–4 minutes. Stir in ginger and garlic for 30 seconds. Add tomato, turmeric and chilli with 2 tbsp water; cook 4–5 minutes until soft. Add splashes of water if it sticks.",
      "Add vegetables and soya and stir for 2 minutes. Add the rice and 180 ml water per portion. Bring to a boil, cover and reduce heat to low.",
      "Cook gently for 15–18 minutes without stirring constantly. Check that rice is tender and the water is absorbed. If still firm, add 2–3 tbsp hot water and cook covered for 3–5 minutes more.",
      "Turn off the heat. Rest covered for 5 minutes, then gently fluff with a fork and add garam masala. Taste for salt and serve."
    ],
    "equipment": "Lidded saucepan and sieve",
    "batch": "For batch prep, multiply the ingredients by your number of portions; use a larger pan and allow extra cooking time. Divide into shallow containers. Refrigerate promptly and freeze portions for later in the week. Cool rice within 1 hour; refrigerate for no more than 24 hours or freeze. Reheat a portion once until steaming hot throughout.",
    "seasoning": "Per portion, the seasoning allowance is about 15 g: 5 g grated ginger, 5 g garlic, ½ tsp cumin, ¼ tsp turmeric, ¼ tsp chilli powder and ¼ tsp garam masala. Add a small pinch of iodised salt to taste. Optional lemon or coriander is extra; add it to your shopping list if wanted."
  },
  "peanut_chaat": {
    "name": "Chickpea & peanut chaat",
    "tag": "10 min · no cooking",
    "slot": "snack",
    "icon": "◓",
    "items": {
      "chickpeas": 120,
      "peanuts": 20,
      "base": 80,
      "lemon": 0.5
    },
    "steps": [
      "Drain and rinse canned chickpeas. Weigh 120 g after draining and put them in a bowl.",
      "Finely chop 40 g onion and 40 g tomato. Add to the chickpeas with the unsalted roasted peanuts.",
      "Squeeze the half lemon over the bowl. Toss, taste and add a small pinch of iodised salt. Optional: a pinch of chilli powder or chaat masala.",
      "Eat straight away, or keep chilled until you are ready to eat."
    ],
    "equipment": "Bowl, knife and sieve",
    "batch": "Keep the chopped vegetables and chickpeas refrigerated separately for up to 2 days. Add peanuts and lemon just before eating so they stay crisp."
  },
  "egg_chaat": {
    "name": "Egg & chickpea chaat",
    "tag": "20 min · prep ahead",
    "slot": "snack",
    "icon": "◓",
    "items": {
      "eggs": 2,
      "chickpeas": 80,
      "base": 80,
      "lemon": 0.5
    },
    "steps": [
      "Cover eggs with cold water in a saucepan. Bring to a boil, reduce to a gentle simmer and cook for 10–12 minutes. Cool under cold running water, then peel and quarter.",
      "Drain and rinse canned chickpeas; weigh the listed amount after draining. Finely chop equal amounts of onion and tomato.",
      "Combine eggs, chickpeas and vegetables. Squeeze over the half lemon and add a small pinch of iodised salt. Optional: chilli or chaat masala to taste.",
      "Toss gently so the egg pieces stay intact and serve."
    ],
    "equipment": "Small saucepan, sieve and bowl",
    "batch": "Boil eggs ahead and chill promptly in their shells. Assemble the chaat fresh; refrigerate any leftovers promptly and use within 24 hours."
  },
  "none": {
    "name": "No meal planned",
    "tag": "",
    "icon": "—",
    "slot": "any",
    "items": {},
    "steps": [
      "Choose a meal to see its ingredients and cooking instructions."
    ]
  }
};
export function recipeItems(id,settings){const items={...recipes[id].items};if('milk' in items){items.milk=settings.milkMl??0;items.oats=settings.oats;items.pb=settings.peanutButter;}return items;}
export function nutrition(id,settings){let kcal=0,protein=0,cost=0;for(const [key,q] of Object.entries(recipeItems(id,settings))){const [,unit,price,cal,p]=ingredients[key];const scale=unit==='each'?q:q/100; kcal+=scale*(key==='milk'?settings.milkCalories:cal);protein+=scale*(key==='milk'?settings.milkProtein:p);cost+=q*price/(unit==='each'?1:1000);}return {kcal,protein,cost,incomplete:'milk' in recipes[id].items&&settings.milkMl===null};}
export function defaultMeal(day,slot){const weekend=[0,6].includes(new Date(day+'T12:00:00').getDay());return {breakfast:'shake',lunch:weekend?'tofu':'chicken',dinner:'soya',snack:'snack'}[slot];}
export function mealFor(state,day,slot){return state.plan[day+':'+slot]?.recipe??defaultMeal(day,slot);}
export function groceries(state,start){const totals={};for(let i=0;i<7;i++)for(const slot of ['breakfast','lunch','dinner','snack'])for(const [key,q] of Object.entries(recipeItems(mealFor(state,addDays(start,i),slot),state.settings.profile))){if(q>0)totals[key]=(totals[key]??0)+q;}return totals;}
export function goalProgress(goal,state){if(goal.metric==='manual')return goal.done;return Object.entries(state.logs).filter(([day,log])=>inPeriod(day,goal.start,goal.period)&&(goal.metric==='protein'?log.protein!==null&&log.protein>=state.settings.profile.protein:log[goal.metric])).length;}
export function weekAverage(logs,end){const values=Object.entries(logs).filter(([d,v])=>d>=addDays(end,-6)&&d<=end&&v.weight!==null).map(([,v])=>v.weight);return values.length?values.reduce((a,b)=>a+b,0)/values.length:null;}
