const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// ─── Bird types ───
const birdTypes = [
  { id: "hen", label: "Hen" },
  { id: "rooster", label: "Rooster" },
  { id: "chick", label: "Chick" },
];

// ─── Symptoms grouped by body area ───
// Each symptom has: id, label, bodyArea, and which bird types it applies to
const symptoms = [
  // Abdomen
  { id: "abdomen-enlarged", label: "Abdomen, Enlarged", bodyArea: "abdomen", birds: ["hen", "rooster", "chick"] },

  // Behavior
  { id: "behavior-depressed", label: "Depressed / Lethargic", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-drinking", label: "Drinking excessively", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-head-shaking", label: "Head shaking", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-huddling", label: "Huddling", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-nestbox", label: "Excessive nestbox sitting", bodyArea: "behavior", birds: ["hen"] },
  { id: "behavior-pica", label: "Pica (eating non-food items)", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-reduced-appetite", label: "Reduced appetite", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-roosting-early", label: "Roosting early", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-scratching", label: "Scratching excessively", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-straining", label: "Straining to defecate", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-weakness", label: "Weakness", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-yawning", label: "Yawning", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },
  { id: "behavior-perch-change", label: "Change in perch location", bodyArea: "behavior", birds: ["hen", "rooster"] },

  // Body
  { id: "body-bleeding", label: "Bleeding", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "body-lump", label: "Lump or mass", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "body-seizures", label: "Seizures", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "body-stunted", label: "Stunted or reduced growth", bodyArea: "body", birds: ["chick"] },
  { id: "body-weight-gain", label: "Weight gain", bodyArea: "body", birds: ["hen", "rooster"] },

  // Breathing
  { id: "breathing-rales", label: "Abnormal breathing sounds (rales)", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "breathing-gasping", label: "Gaping, gasping, difficulty breathing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "breathing-panting", label: "Panting", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },

  // Comb
  { id: "comb-black-spots", label: "Comb, Black spots", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "comb-blackening", label: "Comb, Blackening", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "comb-pale", label: "Comb, Pale", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "comb-powdery", label: "Comb, Powdery white", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "comb-purple", label: "Comb, Purple / dark red (cyanosis)", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "comb-shriveled", label: "Comb, Shriveled", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "comb-swelling", label: "Comb, Swelling", bodyArea: "head", birds: ["hen", "rooster"] },

  // Crop
  { id: "crop-delayed", label: "Crop, Delayed emptying", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "crop-enlarged", label: "Crop, Enlarged", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },

  // Swallowing
  { id: "difficulty-swallowing", label: "Difficulty swallowing", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // Droppings
  { id: "droppings-blood", label: "Droppings, Blood present", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-dark", label: "Droppings, Dark or black", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-green", label: "Droppings, Greenish color", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-mucus", label: "Droppings, Mucus present", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-reduced", label: "Droppings, Reduced (constipation)", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-undigested", label: "Droppings, Undigested food", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-watery", label: "Droppings, Watery (diarrhea)", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-rice", label: "Droppings, White rice-like segments", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-worms", label: "Droppings, Worm(s) present", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "droppings-yellow", label: "Droppings, Yellowish", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },

  // Ear
  { id: "ear-discharge", label: "Ear, Discharge", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // Egg shells
  { id: "egg-shell-blood", label: "Egg shell(s), Blood-stained", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-mended", label: "Egg shell(s), Broken & mended", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-calcium", label: "Egg shell(s), Calcium deposits", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-misshapen", label: "Egg shell(s), Misshapen", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-pale", label: "Egg shell(s), Pale color", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-rough", label: "Egg shell(s), Roughened", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-thin", label: "Egg shell(s), Thin / soft / shell-less", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-banded", label: "Egg shell(s), White banded", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-yolk-stain", label: "Egg shell(s), Yolk stained", bodyArea: "reproductive", birds: ["hen"] },

  // Eggs
  { id: "egg-blood-spot", label: "Egg(s), Blood spot in yolk", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-hatchability", label: "Egg(s), Decreased hatchability", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-discolored-yolk", label: "Egg(s), Discolored yolk", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-double-yolk", label: "Egg(s), Double yolk", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-not-laying", label: "Egg(s), Not laying", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-reduced", label: "Egg(s), Reduced number", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-watery-whites", label: "Egg(s), Watery whites", bodyArea: "reproductive", birds: ["hen"] },

  // Eyes
  { id: "eye-abnormal-pupil", label: "Eye(s), Abnormal pupil or color", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-blindness", label: "Eye(s), Blindness", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-closed", label: "Eye(s), Closed or partially closed", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-cloudy", label: "Eye(s), Cloudy", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-discharge", label: "Eye(s), Discharge", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-enlargement", label: "Eye(s), Enlargement", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // Face
  { id: "face-lump", label: "Face, Lump or mass", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "face-swelling", label: "Face, Swelling", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // Feathers
  { id: "feathers-color-change", label: "Feathers, Color changes", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-dull", label: "Feathers, Dull and/or broken", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-molts", label: "Feathers, Frequent or incomplete molts", bodyArea: "skin", birds: ["hen", "rooster"] },
  { id: "feathers-insects", label: "Feathers, Insects or eggs visible", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-loss", label: "Feathers, Loss of", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-ruffled", label: "Feathers, Ruffled", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },

  // Foot
  { id: "foot-mass", label: "Foot, Mass or ulcer-like lesion", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "foot-swelling", label: "Foot, Swelling", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },

  // Gait
  { id: "gait-circling", label: "Gait, Circling", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-ataxia", label: "Gait, Incoordinated (ataxia)", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-lameness", label: "Gait, Lameness", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-reluctance", label: "Gait, Reluctance to stand or walk", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-backwards", label: "Gait, Walking backwards", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },

  // Head
  { id: "head-tilt", label: "Head tilt", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // Legs
  { id: "legs-deformed", label: "Leg(s), Deformed", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "legs-swelling", label: "Leg(s), Swelling", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "legs-paralysis", label: "Legs, Paralysis", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "legs-paresis", label: "Legs, Paresis (partial paralysis)", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },

  // Mouth
  { id: "mouth-odor", label: "Mouth, Odor", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "mouth-lesions", label: "Mouth, Oral lesions or abnormalities", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "mouth-regurgitation", label: "Mouth, Regurgitation", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // Nares
  { id: "nares-discharge", label: "Nares (nostril), Discharge", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // Neck
  { id: "neck-limp", label: "Neck, Held down (limp neck)", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "neck-lump", label: "Neck, Lump or mass", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "neck-tremors", label: "Neck, Rapid tremors", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "neck-wry", label: "Neck, Wry (torticollis, twisted)", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // Posture
  { id: "posture-penguin", label: "Posture, Upright penguin-like", bodyArea: "body", birds: ["hen"] },

  // Rigid
  { id: "rigid-lifeless", label: "Rigid, lifeless body, cold to touch", bodyArea: "body", birds: ["hen", "rooster", "chick"] },

  // Skin
  { id: "skin-green", label: "Skin, Greenish discoloration", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "skin-lesions", label: "Skin, Lesions", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "skin-reddening", label: "Skin, Reddening", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "skin-scaly", label: "Skin, Scaly or excessively dry", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },

  // Sound
  { id: "sound-coughing", label: "Coughing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-gurgling", label: "Gurgling", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-hoarse-crow", label: "Hoarse crowing", bodyArea: "respiratory", birds: ["rooster"] },
  { id: "sound-reduced-crow", label: "Reduced crowing", bodyArea: "respiratory", birds: ["rooster"] },
  { id: "sound-sneezing", label: "Sneezing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-weak-voice", label: "Weak, hoarse, or altered pitch", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-wheezing", label: "Wheezing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },

  // Sudden death
  { id: "sudden-death", label: "Sudden death", bodyArea: "body", birds: ["hen", "rooster", "chick"] },

  // Tires easily
  { id: "tires-easily", label: "Tires easily", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },

  // Toes
  { id: "toes-blackening", label: "Toe(s), Blackening", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "toes-curled", label: "Toe(s), Curled", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },

  // Unconscious
  { id: "unconscious", label: "Unconscious", bodyArea: "body", birds: ["hen", "rooster", "chick"] },

  // Vent
  { id: "vent-pasty", label: "Vent, Pasty butt", bodyArea: "reproductive", birds: ["hen", "rooster", "chick"] },
  { id: "vent-protruding", label: "Vent, Protruding", bodyArea: "reproductive", birds: ["hen", "rooster"] },

  // Wattles
  { id: "wattles-swelling", label: "Wattles, Swelling", bodyArea: "head", birds: ["hen", "rooster"] },

  // Weight
  { id: "weight-gain", label: "Weight gain", bodyArea: "body", birds: ["hen", "rooster"] },
  { id: "weight-loss", label: "Weight loss", bodyArea: "body", birds: ["hen", "rooster", "chick"] },

  // Wings
  { id: "wings-drooping", label: "Wing(s), Drooping", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "wings-lump", label: "Wing, Lump or mass", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
];

// Body areas for filtering
const bodyAreas = [
  { id: "all", label: "All Symptoms" },
  { id: "head", label: "Head, Eyes & Ears" },
  { id: "respiratory", label: "Respiratory" },
  { id: "digestive", label: "Crop & Digestive" },
  { id: "skin", label: "Feathers & Skin" },
  { id: "legs", label: "Legs & Feet" },
  { id: "reproductive", label: "Reproductive & Eggs" },
  { id: "body", label: "Body & General" },
  { id: "behavior", label: "Behavior" },
];

// ─── Conditions database ───
const conditions = [
  {
    name: "Avian Mycoplasmosis (CRD)",
    category: "Infectious",
    matches: ["breathing-rales", "sound-sneezing", "sound-wheezing", "sound-coughing", "sound-gurgling", "nares-discharge", "eye-discharge", "eye-closed", "face-swelling", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "breathing-gasping"],
    description: "Chronic Respiratory Disease caused by Mycoplasma gallisepticum. One of the most common poultry respiratory infections. Spreads via airborne droplets and can be transmitted from hen to egg.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Infectious Coryza",
    category: "Infectious",
    matches: ["sound-sneezing", "nares-discharge", "face-swelling", "eye-discharge", "eye-closed", "sound-wheezing", "behavior-reduced-appetite", "egg-reduced", "behavior-depressed", "mouth-odor", "wattles-swelling", "ear-discharge"],
    description: "Bacterial infection (Avibacterium paragallinarum) causing severe facial swelling and foul-smelling nasal discharge. Spreads rapidly through the flock.",
    birds: ["hen", "rooster"],
  },
  {
    name: "Infectious Bronchitis",
    category: "Infectious",
    matches: ["sound-sneezing", "sound-coughing", "sound-wheezing", "breathing-rales", "breathing-gasping", "eye-discharge", "nares-discharge", "egg-reduced", "egg-shell-misshapen", "egg-shell-thin", "egg-watery-whites", "egg-shell-rough", "behavior-depressed", "behavior-huddling"],
    description: "Highly contagious viral respiratory disease. Can permanently damage the oviduct in young hens, affecting egg quality for life. Spreads extremely quickly through airborne particles.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Infectious Laryngotracheitis",
    category: "Infectious",
    matches: ["breathing-gasping", "sound-coughing", "breathing-rales", "sound-wheezing", "eye-discharge", "eye-closed", "nares-discharge", "behavior-depressed", "droppings-blood", "neck-limp", "sudden-death"],
    description: "A herpesvirus infection of the upper respiratory tract. Characterized by severe difficulty breathing, bloody mucus, and high mortality in acute form.",
    birds: ["hen", "rooster"],
  },
  {
    name: "Newcastle Disease",
    category: "Infectious",
    matches: ["breathing-gasping", "sound-coughing", "sound-sneezing", "nares-discharge", "droppings-green", "droppings-watery", "behavior-depressed", "egg-reduced", "egg-shell-misshapen", "egg-shell-thin", "neck-wry", "legs-paralysis", "wings-drooping", "gait-circling", "body-seizures", "sudden-death"],
    description: "Highly contagious and often fatal viral disease. Affects respiratory, nervous, and digestive systems. A reportable disease in many countries.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Avian Influenza",
    category: "Infectious",
    matches: ["sudden-death", "comb-purple", "wattles-swelling", "face-swelling", "eye-discharge", "nares-discharge", "breathing-gasping", "sound-coughing", "droppings-green", "egg-reduced", "egg-not-laying", "behavior-depressed", "behavior-reduced-appetite", "legs-swelling", "skin-reddening", "comb-blackening"],
    description: "A serious viral disease caused by Type A influenza viruses. Highly pathogenic strains can cause rapid death with near 100% flock mortality. A reportable disease.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Fowl Pox",
    category: "Infectious",
    matches: ["skin-lesions", "comb-black-spots", "mouth-lesions", "breathing-gasping", "difficulty-swallowing", "eye-closed", "eye-discharge", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "face-lump"],
    description: "A slow-spreading viral disease with two forms: dry pox (scab-like lesions on comb, wattles, face) and wet pox (plaques in mouth and throat that can obstruct breathing).",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Marek's Disease",
    category: "Infectious",
    matches: ["legs-paralysis", "legs-paresis", "gait-lameness", "gait-ataxia", "wings-drooping", "eye-abnormal-pupil", "eye-blindness", "eye-cloudy", "skin-lesions", "body-lump", "feathers-loss", "behavior-depressed", "behavior-reduced-appetite", "weight-loss", "comb-pale", "egg-reduced", "neck-wry"],
    description: "A highly contagious herpesvirus disease that affects the nervous system and causes tumors. Most common cause of death in backyard flocks. No cure exists, but a vaccine given at day 1 of life is effective.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Fowl Cholera",
    category: "Infectious",
    matches: ["sudden-death", "comb-purple", "comb-blackening", "behavior-depressed", "behavior-reduced-appetite", "droppings-green", "droppings-yellow", "nares-discharge", "breathing-rales", "sound-coughing", "wattles-swelling", "gait-lameness", "legs-swelling", "face-swelling", "egg-reduced"],
    description: "Caused by Pasteurella multocida. Acute form causes sudden death with few prior symptoms. Chronic form causes localized infections in joints, wattles, sinuses.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Coccidiosis",
    category: "Parasitic",
    matches: ["droppings-blood", "droppings-watery", "droppings-mucus", "behavior-depressed", "behavior-reduced-appetite", "behavior-huddling", "comb-pale", "feathers-ruffled", "weight-loss", "body-stunted", "behavior-drinking"],
    description: "A parasitic disease caused by Eimeria protozoa that damage the intestinal lining. Especially dangerous for chicks. The parasites thrive in warm, wet bedding. Bloody droppings are a hallmark sign.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Roundworm Infection (Ascaridia)",
    category: "Parasitic",
    matches: ["droppings-worms", "droppings-watery", "behavior-reduced-appetite", "weight-loss", "comb-pale", "behavior-depressed", "egg-reduced", "body-stunted", "droppings-undigested"],
    description: "Large roundworms (Ascaridia galli) are the most common internal parasite in chickens. Heavy infestations block the intestine and rob nutrients.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Tapeworm Infection",
    category: "Parasitic",
    matches: ["droppings-rice", "droppings-watery", "weight-loss", "behavior-reduced-appetite", "behavior-depressed", "comb-pale", "egg-reduced", "feathers-ruffled"],
    description: "Cestode parasites acquired by eating infected insects (beetles, flies, slugs). White rice-like segments visible in droppings are a clear indicator.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Cecal Worms",
    category: "Parasitic",
    matches: ["droppings-watery", "weight-loss", "behavior-reduced-appetite", "behavior-depressed", "comb-pale", "body-stunted"],
    description: "Heterakis gallinarum parasites live in the ceca. While not usually harmful on their own, they carry the organism that causes Blackhead Disease.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Capillariasis (Threadworms)",
    category: "Parasitic",
    matches: ["droppings-watery", "droppings-mucus", "weight-loss", "behavior-reduced-appetite", "behavior-depressed", "comb-pale", "crop-enlarged", "difficulty-swallowing", "mouth-lesions"],
    description: "Capillaria worms infect the crop, esophagus, or intestines. Can cause severe thickening of the crop lining and difficulty swallowing.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Gapeworm Infection",
    category: "Parasitic",
    matches: ["breathing-gasping", "behavior-yawning", "sound-gurgling", "behavior-depressed", "behavior-reduced-appetite", "neck-limp", "weight-loss"],
    description: "Syngamus trachea worms attach to the trachea causing a characteristic gaping/gasping motion. Birds stretch their necks and open their beaks trying to breathe.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Red Mite Infestation",
    category: "Parasitic",
    matches: ["feathers-loss", "behavior-scratching", "comb-pale", "behavior-depressed", "behavior-reduced-appetite", "feathers-dull", "skin-reddening", "egg-reduced", "behavior-roosting-early", "behavior-perch-change", "feathers-insects"],
    description: "Dermanyssus gallinae mites hide in coop crevices during the day and feed on blood at night. Can cause anemia and even death in severe infestations.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Northern Fowl Mite",
    category: "Parasitic",
    matches: ["feathers-insects", "feathers-loss", "behavior-scratching", "comb-pale", "skin-reddening", "skin-scaly", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "vent-pasty"],
    description: "Ornithonyssus sylviarum lives on the bird full-time, especially around the vent area. Dark scabby buildup around the vent is a telltale sign.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Scaly Leg Mite Infestation",
    category: "Parasitic",
    matches: ["skin-scaly", "gait-lameness", "foot-swelling", "legs-swelling", "behavior-scratching", "behavior-depressed", "toes-blackening"],
    description: "Knemidocoptes mutans mites burrow under the leg scales, causing them to lift, thicken, and crust over. Very uncomfortable but very treatable.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Lice Infestation",
    category: "Parasitic",
    matches: ["feathers-insects", "behavior-scratching", "feathers-loss", "feathers-dull", "skin-reddening", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "weight-loss"],
    description: "Poultry lice are flat, straw-colored insects that live on the bird and feed on skin and feather debris. Look for clusters of white eggs at the base of feathers.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Depluming Mites",
    category: "Parasitic",
    matches: ["feathers-loss", "feathers-dull", "behavior-scratching", "skin-reddening", "skin-lesions", "behavior-depressed"],
    description: "Knemidocoptes laevis mites burrow into the feather follicles causing intense itching. Birds pull out their own feathers trying to relieve the irritation.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Bumblefoot",
    category: "Infectious",
    matches: ["gait-lameness", "foot-swelling", "foot-mass", "behavior-depressed", "behavior-reduced-appetite", "gait-reluctance"],
    description: "A staphylococcus infection of the foot pad, usually from a cut, splinter, or hard landing. Shows as a dark scab or swollen lump on the bottom of the foot.",
    birds: ["hen", "rooster"],
  },
  {
    name: "Egg Binding",
    category: "Reproductive",
    matches: ["abdomen-enlarged", "behavior-depressed", "behavior-reduced-appetite", "behavior-nestbox", "behavior-straining", "egg-not-laying", "vent-protruding", "gait-reluctance", "posture-penguin", "behavior-weakness", "droppings-reduced"],
    description: "A hen has an egg stuck in the oviduct. This is an EMERGENCY. Without treatment it can be fatal within 24-48 hours due to pressure on organs and infection risk.",
    birds: ["hen"],
  },
  {
    name: "Egg Yolk Peritonitis",
    category: "Reproductive",
    matches: ["abdomen-enlarged", "behavior-depressed", "behavior-reduced-appetite", "egg-not-laying", "posture-penguin", "behavior-weakness", "droppings-green", "weight-loss", "gait-reluctance"],
    description: "Egg yolk material leaks into the abdominal cavity causing inflammation and infection. A very serious condition requiring veterinary attention.",
    birds: ["hen"],
  },
  {
    name: "Sour Crop (Crop Stasis)",
    category: "Digestive",
    matches: ["crop-enlarged", "crop-delayed", "mouth-odor", "behavior-reduced-appetite", "behavior-depressed", "droppings-watery", "mouth-regurgitation", "weight-loss"],
    description: "A yeast (Candida) infection in the crop. The crop feels squishy like a water balloon and produces a foul, sour smell. Often follows antibiotic treatment.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Crop Impaction",
    category: "Digestive",
    matches: ["crop-enlarged", "crop-delayed", "behavior-reduced-appetite", "behavior-depressed", "weight-loss", "droppings-reduced", "behavior-straining"],
    description: "The crop becomes blocked with long grass, straw, or other material and cannot empty. The crop feels hard and firm like a baseball, unlike the squishy feel of sour crop.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Necrotic Enteritis",
    category: "Infectious",
    matches: ["sudden-death", "droppings-dark", "droppings-blood", "behavior-depressed", "behavior-reduced-appetite", "feathers-ruffled", "behavior-huddling", "weight-loss"],
    description: "Caused by Clostridium perfringens toxins damaging the intestinal lining. Often occurs after coccidiosis or a sudden feed change. Can cause rapid death.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Blackhead Disease (Histomoniasis)",
    category: "Parasitic",
    matches: ["droppings-yellow", "droppings-green", "comb-blackening", "comb-purple", "behavior-depressed", "behavior-reduced-appetite", "behavior-huddling", "feathers-ruffled", "weight-loss", "sudden-death"],
    description: "Caused by the protozoan Histomonas meleagridis, often transmitted via cecal worm eggs. Causes liver necrosis and cecal inflammation. The darkened head gives it its common name.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Molting (Normal)",
    category: "Normal",
    matches: ["feathers-loss", "feathers-dull", "feathers-molts", "egg-not-laying", "egg-reduced", "behavior-reduced-appetite", "behavior-depressed", "comb-shriveled", "comb-pale"],
    description: "Completely normal. Chickens shed and regrow their feathers annually, usually in fall. They look rough and egg production drops, but this is a healthy natural process lasting 4-8 weeks.",
    birds: ["hen", "rooster"],
  },
  {
    name: "Broodiness (Normal)",
    category: "Normal",
    matches: ["behavior-nestbox", "behavior-reduced-appetite", "feathers-loss", "behavior-depressed", "egg-not-laying", "behavior-scratching"],
    description: "A hormonal state where a hen wants to sit on and hatch eggs. She will refuse to leave the nest, puff up, and growl if disturbed. Normal behavior but can be broken if no hatching is desired.",
    birds: ["hen"],
  },
  {
    name: "Heat Stress",
    category: "Environmental",
    matches: ["breathing-panting", "wings-drooping", "behavior-depressed", "behavior-drinking", "egg-reduced", "egg-shell-thin", "comb-pale", "behavior-reduced-appetite", "droppings-watery", "sudden-death", "unconscious"],
    description: "Chickens cannot sweat. When temperatures exceed 85F (30C), they pant and spread their wings to cool down. Severe heat stress can be fatal. Provide shade, ventilation, and cool water.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Frostbite",
    category: "Environmental",
    matches: ["comb-black-spots", "comb-blackening", "comb-swelling", "wattles-swelling", "toes-blackening", "gait-lameness", "behavior-depressed"],
    description: "Tissue damage from freezing, most commonly affecting combs, wattles, and toes. Large single combs are most vulnerable. Good ventilation (not drafts) reduces moisture that causes frostbite.",
    birds: ["hen", "rooster"],
  },
  {
    name: "Vitamin A Deficiency",
    category: "Nutritional",
    matches: ["eye-discharge", "eye-closed", "eye-cloudy", "nares-discharge", "mouth-lesions", "breathing-rales", "behavior-reduced-appetite", "body-stunted", "egg-reduced", "egg-blood-spot", "behavior-weakness"],
    description: "Causes pale, cheesy plaques in the mouth, eyes, and nasal passages. Also reduces disease resistance. Provide dark leafy greens, carrots, or sweet potatoes.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Vitamin D Deficiency / Rickets",
    category: "Nutritional",
    matches: ["egg-shell-thin", "egg-shell-rough", "legs-deformed", "gait-lameness", "gait-reluctance", "body-stunted", "behavior-weakness", "toes-curled", "behavior-reduced-appetite"],
    description: "Causes soft bones, thin egg shells, and leg deformities. Birds kept indoors without UV light or without proper feed supplementation are most at risk.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Vitamin E / Selenium Deficiency",
    category: "Nutritional",
    matches: ["neck-wry", "gait-ataxia", "legs-paralysis", "body-seizures", "behavior-depressed", "behavior-weakness", "neck-tremors", "head-tilt"],
    description: "Causes wry neck (torticollis), crazy chick disease (encephalomalacia), and white muscle disease. Vitamin E + selenium supplementation usually resolves symptoms.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Fatty Liver Disease",
    category: "Nutritional",
    matches: ["abdomen-enlarged", "weight-gain", "body-weight-gain", "comb-pale", "behavior-depressed", "sudden-death", "egg-reduced", "behavior-reduced-appetite"],
    description: "Excess fat accumulates in the liver, which can rupture and cause sudden death. Common in hens fed too many treats/scratch grains and not enough balanced feed.",
    birds: ["hen"],
  },
  {
    name: "Avian Encephalomyelitis",
    category: "Infectious",
    matches: ["neck-tremors", "gait-ataxia", "legs-paralysis", "body-seizures", "behavior-depressed", "gait-reluctance", "head-tilt", "eye-cloudy", "eye-blindness", "egg-reduced"],
    description: "A viral disease causing tremors and incoordination, especially in chicks. Also known as 'epidemic tremor.' Affected chicks sit on their hocks and tremble.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Botulism",
    category: "Toxic",
    matches: ["legs-paralysis", "neck-limp", "wings-drooping", "behavior-weakness", "behavior-depressed", "eye-closed", "breathing-gasping", "sudden-death", "gait-reluctance"],
    description: "Caused by Clostridium botulinum toxin, usually from eating maggots on decaying carcasses or stagnant water. Causes progressive flaccid paralysis starting from the legs up.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Lead Poisoning",
    category: "Toxic",
    matches: ["droppings-green", "behavior-depressed", "behavior-weakness", "gait-ataxia", "wings-drooping", "weight-loss", "legs-paralysis", "body-seizures", "behavior-drinking", "eye-blindness"],
    description: "Ingestion of lead paint chips, fishing weights, or old batteries. Causes neurological and digestive symptoms. Remove the lead source and seek veterinary treatment.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Vent Gleet",
    category: "Infectious",
    matches: ["vent-pasty", "vent-protruding", "feathers-loss", "skin-reddening", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "mouth-odor"],
    description: "A fungal or bacterial infection of the cloaca/vent area. Causes a foul-smelling, whitish discharge and crusty buildup around the vent.",
    birds: ["hen", "rooster"],
  },
  {
    name: "Cloacal Prolapse",
    category: "Reproductive",
    matches: ["vent-protruding", "body-bleeding", "behavior-depressed", "behavior-straining", "egg-not-laying", "behavior-reduced-appetite"],
    description: "The inner tissue of the cloaca pushes out through the vent. Often caused by laying oversized eggs, obesity, or calcium deficiency. Requires immediate attention to prevent pecking by flockmates.",
    birds: ["hen"],
  },
  {
    name: "Salpingitis",
    category: "Reproductive",
    matches: ["abdomen-enlarged", "egg-not-laying", "egg-shell-misshapen", "behavior-depressed", "behavior-reduced-appetite", "posture-penguin", "weight-loss"],
    description: "Inflammation and infection of the oviduct. Can lead to the production of lash eggs (rubbery masses of pus and debris). Often caused by E. coli or Mycoplasma.",
    birds: ["hen"],
  },
  {
    name: "Ascites Syndrome (Water Belly)",
    category: "Cardiovascular",
    matches: ["abdomen-enlarged", "breathing-gasping", "comb-purple", "behavior-depressed", "behavior-reduced-appetite", "gait-reluctance", "behavior-weakness"],
    description: "Fluid accumulates in the abdominal cavity due to heart or liver failure. The abdomen feels like a water balloon. Most common in fast-growing meat breeds.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Avian Tuberculosis",
    category: "Infectious",
    matches: ["weight-loss", "behavior-depressed", "behavior-reduced-appetite", "comb-pale", "comb-shriveled", "gait-lameness", "droppings-green", "droppings-yellow", "feathers-ruffled", "abdomen-enlarged"],
    description: "A chronic bacterial disease (Mycobacterium avium) that causes progressive wasting. Birds slowly lose weight over weeks despite eating. There is no effective treatment.",
    birds: ["hen", "rooster"],
  },
  {
    name: "Erysipelas",
    category: "Infectious",
    matches: ["sudden-death", "face-swelling", "comb-purple", "skin-reddening", "behavior-depressed", "behavior-reduced-appetite", "droppings-green", "gait-lameness"],
    description: "Caused by Erysipelothrix rhusiopathiae. More common in free-range flocks. Causes sudden death, skin reddening, and swollen purplish face. Can infect humans through open wounds.",
    birds: ["hen", "rooster"],
  },
  {
    name: "Egg Drop Syndrome",
    category: "Infectious",
    matches: ["egg-reduced", "egg-shell-thin", "egg-shell-pale", "egg-shell-rough", "egg-shell-misshapen", "egg-watery-whites", "egg-discolored-yolk", "droppings-watery", "droppings-green"],
    description: "A viral disease (adenovirus) that causes sudden drops in egg production and poor shell quality. Birds usually appear healthy otherwise. No treatment; production may partially recover.",
    birds: ["hen"],
  },
  {
    name: "Infectious Bursal Disease (Gumboro)",
    category: "Infectious",
    matches: ["behavior-depressed", "behavior-huddling", "behavior-reduced-appetite", "feathers-ruffled", "droppings-watery", "droppings-mucus", "vent-pasty", "behavior-weakness", "body-stunted", "sudden-death"],
    description: "A viral disease targeting the immune system of young birds (3-6 weeks). Destroys the bursa of Fabricius, leaving birds immunocompromised for life.",
    birds: ["chick"],
  },
  {
    name: "Wry Neck (Torticollis)",
    category: "Neurological",
    matches: ["neck-wry", "head-tilt", "gait-circling", "gait-ataxia", "behavior-depressed", "behavior-reduced-appetite", "neck-tremors"],
    description: "The head and neck twist to one side or backwards. Can be caused by vitamin E/selenium deficiency, Marek's disease, head trauma, or ear infections. Often treatable with vitamin supplementation.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Curly Toe Paralysis",
    category: "Nutritional",
    matches: ["toes-curled", "gait-lameness", "gait-reluctance", "behavior-weakness", "body-stunted"],
    description: "Caused by riboflavin (vitamin B2) deficiency. Toes curl inward and the chick walks on the sides of its feet. Early treatment with B vitamins can reverse the condition.",
    birds: ["chick"],
  },
  {
    name: "Splay Leg (Spraddle Leg)",
    category: "Musculoskeletal",
    matches: ["legs-deformed", "gait-reluctance", "gait-ataxia", "behavior-weakness"],
    description: "One or both legs splay outward, preventing the chick from standing properly. Usually caused by slippery brooder surfaces. Treatable with a hobble brace if caught early.",
    birds: ["chick"],
  },
  {
    name: "Slipped Tendon (Perosis)",
    category: "Nutritional",
    matches: ["gait-lameness", "legs-deformed", "legs-swelling", "gait-reluctance", "body-stunted"],
    description: "The Achilles tendon slips out of the groove at the hock joint, causing the leg to twist outward. Caused by manganese or choline deficiency.",
    birds: ["chick"],
  },
  {
    name: "Favus (Ringworm)",
    category: "Infectious",
    matches: ["comb-powdery", "skin-scaly", "skin-lesions", "feathers-loss", "comb-swelling"],
    description: "A fungal infection (Microsporum gallinae) that causes white powdery or crusty patches on the comb, wattles, and skin. Can spread to humans.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Aspergillosis",
    category: "Infectious",
    matches: ["breathing-gasping", "breathing-rales", "behavior-depressed", "behavior-reduced-appetite", "eye-discharge", "eye-cloudy", "weight-loss", "comb-purple", "sudden-death"],
    description: "A fungal infection (Aspergillus) of the respiratory tract, often from moldy bedding or feed. Causes plaques in the air sacs and lungs. Extremely difficult to treat once established.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Canker (Trichomoniasis)",
    category: "Parasitic",
    matches: ["mouth-lesions", "difficulty-swallowing", "mouth-odor", "crop-enlarged", "behavior-reduced-appetite", "weight-loss", "behavior-depressed", "nares-discharge"],
    description: "Caused by Trichomonas gallinae protozoa. Creates yellowish, cheesy plaques in the mouth, throat, and crop that can block eating and breathing.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Flystrike (Myiasis)",
    category: "Parasitic",
    matches: ["skin-lesions", "body-bleeding", "behavior-depressed", "behavior-reduced-appetite", "vent-pasty", "feathers-loss", "mouth-odor", "behavior-weakness"],
    description: "Flies lay eggs on dirty or wounded skin, and the hatching maggots eat into the flesh. Most common around the vent area. An emergency requiring immediate maggot removal and wound care.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Staphylococcosis",
    category: "Infectious",
    matches: ["gait-lameness", "legs-swelling", "foot-swelling", "foot-mass", "wings-lump", "behavior-depressed", "behavior-reduced-appetite", "body-bleeding", "skin-lesions"],
    description: "Staphylococcus aureus infection. Can cause bumblefoot, arthritis, septicemia, or skin infections. Usually enters through wounds or broken skin.",
    birds: ["hen", "rooster", "chick"],
  },
  {
    name: "Sudden Death Syndrome",
    category: "Cardiovascular",
    matches: ["sudden-death", "rigid-lifeless"],
    description: "Apparently healthy birds die suddenly, often found on their backs. Most common in fast-growing meat breeds. Related to cardiac arrhythmia from rapid growth.",
    birds: ["hen", "rooster", "chick"],
  },
];

// ─── Routes ───

app.get("/", (req, res) => {
  res.render("index", { birdTypes, bodyAreas, symptoms });
});

app.post("/check", (req, res) => {
  const selected = req.body.symptoms || [];
  const birdType = req.body.birdType || "hen";

  if (selected.length === 0) {
    return res.json({ results: [] });
  }

  const results = conditions
    .filter((c) => c.birds.includes(birdType))
    .map((condition) => {
      const matchedIds = condition.matches.filter((s) => selected.includes(s));
      const matchedLabels = matchedIds.map((id) => {
        const sym = symptoms.find((s) => s.id === id);
        return sym ? sym.label : id;
      });
      const score = matchedIds.length / condition.matches.length;
      return {
        name: condition.name,
        category: condition.category,
        description: condition.description,
        matchedCount: matchedIds.length,
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
  console.log(`CluckMD is running at http://localhost:${PORT}`);
});
