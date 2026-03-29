const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Bird types
const birdTypes = [
  { id: "hen", label: "Hen", icon: "crow" },
  { id: "rooster", label: "Rooster", icon: "crow" },
  { id: "chick", label: "Chick", icon: "kiwi-bird" },
];

// Symptoms organized by body area
const symptomCategories = [
  {
    category: "Behavioral",
    icon: "brain",
    symptoms: [
      { id: "depression", label: "Depression / Listlessness" },
      { id: "excessive-drinking", label: "Excessive Drinking" },
      { id: "not-eating", label: "Loss of Appetite" },
      { id: "isolation", label: "Isolating from Flock" },
      { id: "aggression", label: "Unusual Aggression" },
    ],
  },
  {
    category: "Respiratory",
    icon: "lungs",
    symptoms: [
      { id: "sneezing", label: "Sneezing" },
      { id: "wheezing", label: "Wheezing / Rattling" },
      { id: "nasal-discharge", label: "Nasal Discharge" },
      { id: "open-mouth-breathing", label: "Open-Mouth Breathing" },
      { id: "coughing", label: "Coughing" },
    ],
  },
  {
    category: "Head & Eyes",
    icon: "eye",
    symptoms: [
      { id: "swollen-eyes", label: "Swollen Eyes" },
      { id: "watery-eyes", label: "Watery / Bubbly Eyes" },
      { id: "pale-comb", label: "Pale Comb / Wattles" },
      { id: "blue-comb", label: "Blue / Purple Comb" },
      { id: "swollen-face", label: "Swollen Face or Sinuses" },
    ],
  },
  {
    category: "Feathers & Skin",
    icon: "feather-pointed",
    symptoms: [
      { id: "feather-loss", label: "Feather Loss" },
      { id: "broken-feathers", label: "Broken / Ragged Feathers" },
      { id: "scaly-skin", label: "Scaly or Crusty Skin" },
      { id: "sores", label: "Sores or Lesions" },
      { id: "itching", label: "Excessive Scratching / Itching" },
    ],
  },
  {
    category: "Legs & Feet",
    icon: "shoe-prints",
    symptoms: [
      { id: "limping", label: "Limping" },
      { id: "swollen-feet", label: "Swollen Foot Pad" },
      { id: "scaly-legs", label: "Scaly / Raised Leg Scales" },
      { id: "curled-toes", label: "Curled Toes" },
      { id: "paralysis", label: "Leg Paralysis" },
    ],
  },
  {
    category: "Digestive",
    icon: "poop",
    symptoms: [
      { id: "diarrhea", label: "Diarrhea" },
      { id: "bloody-droppings", label: "Blood in Droppings" },
      { id: "green-droppings", label: "Green / Yellow Droppings" },
      { id: "worms-visible", label: "Worms Visible in Droppings" },
      { id: "swollen-crop", label: "Swollen or Squishy Crop" },
    ],
  },
  {
    category: "Egg-Related",
    icon: "egg",
    symptoms: [
      { id: "drop-in-eggs", label: "Drop in Egg Production" },
      { id: "soft-shells", label: "Soft-Shelled Eggs" },
      { id: "misshapen-eggs", label: "Misshapen Eggs" },
      { id: "egg-bound", label: "Straining to Lay" },
      { id: "swollen-abdomen", label: "Swollen Abdomen" },
    ],
  },
];

// Flat list of all symptom IDs for quick lookup
const allSymptoms = symptomCategories.flatMap((cat) => cat.symptoms);

// Conditions database
const conditions = [
  {
    name: "Mycoplasma (CRD)",
    severity: "moderate",
    icon: "lungs",
    matches: [
      "sneezing", "wheezing", "nasal-discharge", "swollen-eyes",
      "watery-eyes", "open-mouth-breathing", "depression", "not-eating",
    ],
    description:
      "Chronic Respiratory Disease caused by Mycoplasma bacteria. One of the most common poultry illnesses. Spreads through airborne droplets and can be passed from hen to egg.",
    action: [
      "Isolate sick birds from the rest of the flock",
      "Antibiotics like Tylosin or Denagard may help (consult a vet)",
      "Improve ventilation in the coop",
      "Infected birds remain carriers for life",
    ],
    affectedBirds: ["hen", "rooster", "chick"],
  },
  {
    name: "Infectious Coryza",
    severity: "moderate",
    icon: "head-side-virus",
    matches: [
      "sneezing", "nasal-discharge", "swollen-face", "swollen-eyes",
      "wheezing", "not-eating", "drop-in-eggs", "depression",
    ],
    description:
      "A bacterial infection causing severe swelling of the face and sinuses. Has a distinct foul smell. Spreads fast through the flock.",
    action: [
      "The foul smell from the nostrils is a strong indicator",
      "Antibiotics (sulfa drugs or erythromycin) from a vet",
      "Recovered birds remain carriers - do not add new birds to the flock",
      "Disinfect all waterers and feeders",
    ],
    affectedBirds: ["hen", "rooster"],
  },
  {
    name: "Mites or Lice",
    severity: "mild",
    icon: "bugs",
    matches: [
      "feather-loss", "itching", "pale-comb", "depression",
      "not-eating", "broken-feathers", "sores", "drop-in-eggs",
    ],
    description:
      "External parasites that feed on blood, skin, or feathers. Red mites hide in coop crevices during the day and feed at night. Lice live on the bird full-time.",
    action: [
      "Check under wings and around the vent area at night",
      "Apply poultry dust or permethrin spray to birds",
      "Deep-clean the coop - spray all crevices and roost bars",
      "Repeat treatment in 10 days to catch newly hatched parasites",
    ],
    affectedBirds: ["hen", "rooster", "chick"],
  },
  {
    name: "Scaly Leg Mites",
    severity: "mild",
    icon: "bugs",
    matches: [
      "scaly-legs", "limping", "itching", "depression",
    ],
    description:
      "Tiny mites that burrow under the leg scales, causing them to lift and become crusty. Very uncomfortable for the bird but very treatable.",
    action: [
      "Soak legs in warm soapy water to soften the crust",
      "Coat legs in petroleum jelly or a mix of oil and sulfur",
      "Repeat every few days for 2-3 weeks",
      "Treat all birds in the flock - it spreads easily",
    ],
    affectedBirds: ["hen", "rooster", "chick"],
  },
  {
    name: "Bumblefoot",
    severity: "moderate",
    icon: "hand-dots",
    matches: [
      "limping", "swollen-feet", "depression", "not-eating",
    ],
    description:
      "A staph infection on the foot pad, usually from a cut or rough landing. Shows as a dark scab or swelling on the bottom of the foot.",
    action: [
      "Look for a dark scab or lump on the bottom of the foot",
      "Soak in warm Epsom salt water for 15 minutes",
      "A vet can remove the infection kernel if needed",
      "Add softer bedding and lower roost bars to prevent recurrence",
    ],
    affectedBirds: ["hen", "rooster"],
  },
  {
    name: "Coccidiosis",
    severity: "serious",
    icon: "virus",
    matches: [
      "bloody-droppings", "diarrhea", "depression", "not-eating",
      "pale-comb", "isolation",
    ],
    description:
      "A parasitic disease of the intestines. Especially dangerous for chicks. The parasite thrives in wet, warm bedding. Bloody droppings are the classic sign.",
    action: [
      "Treat with Corid (Amprolium) in the water immediately",
      "Keep bedding clean and DRY - moisture is the enemy",
      "Separate sick birds from healthy ones",
      "Young chicks should be on medicated feed as prevention",
    ],
    affectedBirds: ["hen", "rooster", "chick"],
  },
  {
    name: "Egg Binding",
    severity: "serious",
    icon: "egg",
    matches: [
      "egg-bound", "swollen-abdomen", "depression", "not-eating",
      "isolation",
    ],
    description:
      "A hen has an egg stuck inside her. This is an EMERGENCY. Without treatment, it can be fatal within 24-48 hours.",
    action: [
      "Act fast - this is time-sensitive",
      "Give a warm bath (100-102F) for 15-20 minutes to relax muscles",
      "Apply lubricant (KY jelly) around the vent",
      "If the egg doesn't pass within a few hours, rush to a vet",
    ],
    affectedBirds: ["hen"],
  },
  {
    name: "Marek's Disease",
    severity: "serious",
    icon: "triangle-exclamation",
    matches: [
      "paralysis", "limping", "depression", "swollen-eyes",
      "pale-comb", "drop-in-eggs", "not-eating", "green-droppings",
    ],
    description:
      "A highly contagious viral disease that attacks the nervous system. Causes tumors and paralysis. There is no cure, but there IS a vaccine.",
    action: [
      "There is no treatment - see a vet for confirmed diagnosis",
      "Isolate the bird and keep comfortable",
      "The virus lives in feather dander for months",
      "Vaccinate ALL future chicks at day 1 of life to prevent it",
    ],
    affectedBirds: ["hen", "rooster", "chick"],
  },
  {
    name: "Infectious Bronchitis",
    severity: "serious",
    icon: "virus",
    matches: [
      "sneezing", "coughing", "wheezing", "watery-eyes",
      "nasal-discharge", "drop-in-eggs", "misshapen-eggs", "soft-shells",
    ],
    description:
      "A highly contagious viral respiratory disease. Can permanently damage the oviduct in young hens, affecting egg quality for life.",
    action: [
      "No cure - supportive care only",
      "Keep birds warm and reduce stress",
      "Add electrolytes and vitamins to water",
      "Vaccinate future flocks to prevent it",
    ],
    affectedBirds: ["hen", "rooster", "chick"],
  },
  {
    name: "Sour Crop",
    severity: "moderate",
    icon: "flask",
    matches: [
      "swollen-crop", "not-eating", "depression", "diarrhea",
    ],
    description:
      "A yeast (Candida) infection in the crop. The crop feels squishy like a water balloon and may have a sour or foul smell when you open the beak.",
    action: [
      "Withhold food for 12 hours (water is okay)",
      "Gently massage the crop to encourage emptying",
      "Antifungal treatment like Nystatin from a vet",
      "Add apple cider vinegar to water (1 tbsp per gallon) as prevention",
    ],
    affectedBirds: ["hen", "rooster", "chick"],
  },
  {
    name: "Worms (Internal Parasites)",
    severity: "moderate",
    icon: "worm",
    matches: [
      "worms-visible", "diarrhea", "not-eating", "pale-comb",
      "depression", "drop-in-eggs",
    ],
    description:
      "Roundworms, tapeworms, or other internal parasites. Very common in free-range flocks. Worms steal nutrition and weaken the bird over time.",
    action: [
      "Deworm with Fenbendazole (SafeGuard) or Albendazole",
      "Treat ALL birds in the flock, not just the sick ones",
      "Follow up with a second dose in 10-14 days",
      "Rotate pasture if possible and keep feeders off the ground",
    ],
    affectedBirds: ["hen", "rooster", "chick"],
  },
  {
    name: "Molting (Normal)",
    severity: "normal",
    icon: "feather-pointed",
    matches: [
      "feather-loss", "drop-in-eggs", "not-eating", "depression",
      "broken-feathers",
    ],
    description:
      "Completely normal! Chickens shed and regrow feathers once a year, usually in the fall. They look rough but it's a healthy process.",
    action: [
      "No treatment needed - this is natural",
      "Boost protein intake (mealworms, sunflower seeds, scrambled eggs)",
      "Avoid handling them - new pin feathers are very sensitive",
      "Egg production returns once new feathers grow in (4-8 weeks)",
    ],
    affectedBirds: ["hen", "rooster"],
  },
];

// Homepage
app.get("/", (req, res) => {
  res.render("index", { birdTypes, symptomCategories });
});

// Check symptoms endpoint
app.post("/check", (req, res) => {
  const selected = req.body.symptoms || [];
  const birdType = req.body.birdType || "hen";

  if (selected.length === 0) {
    return res.json({ results: [] });
  }

  const results = conditions
    .filter((c) => c.affectedBirds.includes(birdType))
    .map((condition) => {
      const matchedSymptoms = condition.matches.filter((s) =>
        selected.includes(s)
      );
      const score = matchedSymptoms.length / condition.matches.length;
      const matchedLabels = matchedSymptoms.map(
        (id) => allSymptoms.find((s) => s.id === id)?.label || id
      );
      return {
        ...condition,
        matchedCount: matchedSymptoms.length,
        totalSymptoms: condition.matches.length,
        matchedLabels,
        percentage: Math.round(score * 100),
      };
    })
    .filter((c) => c.matchedCount >= 2)
    .sort((a, b) => b.percentage - a.percentage);

  res.json({ results });
});

app.listen(PORT, () => {
  console.log(
    `Poultry Symptom Checker is running at http://localhost:${PORT}`
  );
});
