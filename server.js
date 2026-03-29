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
const symptoms = [
  // ── Abdomen ──
  { id: "abdomen-enlarged", label: "Abdomen, Enlarged", bodyArea: "abdomen", birds: ["hen", "rooster", "chick"] },

  // ── Behavior ──
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
  { id: "tires-easily", label: "Tires easily", bodyArea: "behavior", birds: ["hen", "rooster", "chick"] },

  // ── Body / General ──
  { id: "body-bleeding", label: "Bleeding", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "body-lump", label: "Lump or mass", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "body-seizures", label: "Seizures", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "body-stunted", label: "Stunted or reduced growth", bodyArea: "body", birds: ["chick"] },
  { id: "body-weight-gain", label: "Weight gain", bodyArea: "body", birds: ["hen", "rooster"] },
  { id: "sudden-death", label: "Sudden death", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "rigid-lifeless", label: "Rigid, lifeless body, cold to touch", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "weight-loss", label: "Weight loss", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "unconscious", label: "Unconscious", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "wings-drooping", label: "Wing(s), Drooping", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "wings-lump", label: "Wing, Lump or mass", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "back-arched", label: "Back, Arched or hunched posture", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "breast-blister", label: "Breast, Blister or lesion", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "keel-deformed", label: "Keel bone, Deformed or injured", bodyArea: "body", birds: ["hen", "rooster", "chick"] },
  { id: "posture-penguin", label: "Posture, Upright penguin-like", bodyArea: "body", birds: ["hen"] },

  // ── Breathing / Respiratory ──
  { id: "breathing-rales", label: "Abnormal breathing sounds (rales)", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "breathing-gasping", label: "Gaping, gasping, difficulty breathing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "breathing-panting", label: "Panting", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "tail-bobbing", label: "Tail bobbing while breathing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-coughing", label: "Coughing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-gurgling", label: "Gurgling", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-hoarse-crow", label: "Hoarse crowing", bodyArea: "respiratory", birds: ["rooster"] },
  { id: "sound-reduced-crow", label: "Reduced crowing", bodyArea: "respiratory", birds: ["rooster"] },
  { id: "sound-sneezing", label: "Sneezing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-weak-voice", label: "Weak, hoarse, or altered pitch", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },
  { id: "sound-wheezing", label: "Wheezing", bodyArea: "respiratory", birds: ["hen", "rooster", "chick"] },

  // ── Head, Comb, Face, Eyes, Ears, Mouth, Neck ──
  { id: "comb-black-spots", label: "Comb, Black spots", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "comb-blackening", label: "Comb, Blackening", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "comb-pale", label: "Comb, Pale", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "comb-powdery", label: "Comb, Powdery white", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "comb-purple", label: "Comb, Purple / dark red (cyanosis)", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "comb-shriveled", label: "Comb, Shriveled", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "comb-swelling", label: "Comb, Swelling", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "difficulty-swallowing", label: "Difficulty swallowing", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "ear-discharge", label: "Ear, Discharge", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-abnormal-pupil", label: "Eye(s), Abnormal pupil or color", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-blindness", label: "Eye(s), Blindness", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-closed", label: "Eye(s), Closed or partially closed", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-cloudy", label: "Eye(s), Cloudy", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-discharge", label: "Eye(s), Discharge", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "eye-enlargement", label: "Eye(s), Enlargement", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "face-lump", label: "Face, Lump or mass", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "face-swelling", label: "Face, Swelling", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "head-tilt", label: "Head tilt", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "mouth-odor", label: "Mouth, Odor", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "mouth-lesions", label: "Mouth, Oral lesions or abnormalities", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "mouth-regurgitation", label: "Mouth, Regurgitation", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "nares-discharge", label: "Nares (nostril), Discharge", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "neck-limp", label: "Neck, Held down (limp neck)", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "neck-lump", label: "Neck, Lump or mass", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "neck-tremors", label: "Neck, Rapid tremors", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "neck-wry", label: "Neck, Wry (torticollis, twisted)", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "wattles-swelling", label: "Wattles, Swelling", bodyArea: "head", birds: ["hen", "rooster"] },
  { id: "beak-deformed", label: "Beak, Deformity (crossed, overgrown)", bodyArea: "head", birds: ["hen", "rooster", "chick"] },
  { id: "beak-injury", label: "Beak, Injury or damage", bodyArea: "head", birds: ["hen", "rooster", "chick"] },

  // ── Crop & Digestive ──
  { id: "crop-delayed", label: "Crop, Delayed emptying", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
  { id: "crop-enlarged", label: "Crop, Enlarged", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },
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
  { id: "droppings-white", label: "Droppings, White / chalky", bodyArea: "digestive", birds: ["hen", "rooster", "chick"] },

  // ── Feathers & Skin ──
  { id: "feathers-color-change", label: "Feathers, Color changes", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-dull", label: "Feathers, Dull and/or broken", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-molts", label: "Feathers, Frequent or incomplete molts", bodyArea: "skin", birds: ["hen", "rooster"] },
  { id: "feathers-insects", label: "Feathers, Insects or eggs visible", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-loss", label: "Feathers, Loss of", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-ruffled", label: "Feathers, Ruffled", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "feathers-pecked", label: "Feathers, Pecked by flock mates", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "skin-green", label: "Skin, Greenish discoloration", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "skin-lesions", label: "Skin, Lesions", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "skin-reddening", label: "Skin, Reddening", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },
  { id: "skin-scaly", label: "Skin, Scaly or excessively dry", bodyArea: "skin", birds: ["hen", "rooster", "chick"] },

  // ── Legs & Feet ──
  { id: "foot-mass", label: "Foot, Mass or ulcer-like lesion", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "foot-swelling", label: "Foot, Swelling", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-circling", label: "Gait, Circling", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-ataxia", label: "Gait, Incoordinated (ataxia)", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-lameness", label: "Gait, Lameness", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-reluctance", label: "Gait, Reluctance to stand or walk", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "gait-backwards", label: "Gait, Walking backwards", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "legs-deformed", label: "Leg(s), Deformed", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "legs-swelling", label: "Leg(s), Swelling", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "legs-paralysis", label: "Legs, Paralysis", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "legs-paresis", label: "Legs, Paresis (partial paralysis)", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "toes-blackening", label: "Toe(s), Blackening", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "toes-curled", label: "Toe(s), Curled", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "joint-swelling", label: "Joint(s), Swelling", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "hock-swollen", label: "Hock(s), Swollen or red", bodyArea: "legs", birds: ["hen", "rooster", "chick"] },
  { id: "spur-issue", label: "Spur(s), Overgrown or injured", bodyArea: "legs", birds: ["rooster"] },

  // ── Reproductive & Eggs ──
  { id: "egg-shell-blood", label: "Egg shell(s), Blood-stained", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-mended", label: "Egg shell(s), Broken & mended", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-calcium", label: "Egg shell(s), Calcium deposits", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-misshapen", label: "Egg shell(s), Misshapen", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-pale", label: "Egg shell(s), Pale color", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-rough", label: "Egg shell(s), Roughened", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-thin", label: "Egg shell(s), Thin / soft / shell-less", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-banded", label: "Egg shell(s), White banded", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-shell-yolk-stain", label: "Egg shell(s), Yolk stained", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-blood-spot", label: "Egg(s), Blood spot in yolk", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-hatchability", label: "Egg(s), Decreased hatchability", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-discolored-yolk", label: "Egg(s), Discolored yolk", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-double-yolk", label: "Egg(s), Double yolk", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-not-laying", label: "Egg(s), Not laying", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-reduced", label: "Egg(s), Reduced number", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-watery-whites", label: "Egg(s), Watery whites", bodyArea: "reproductive", birds: ["hen"] },
  { id: "egg-lash", label: "Egg(s), Lash egg (abnormal mass)", bodyArea: "reproductive", birds: ["hen"] },
  { id: "vent-pasty", label: "Vent, Pasty butt", bodyArea: "reproductive", birds: ["hen", "rooster", "chick"] },
  { id: "vent-protruding", label: "Vent, Protruding", bodyArea: "reproductive", birds: ["hen", "rooster"] },
  { id: "vent-bleeding", label: "Vent, Bleeding", bodyArea: "reproductive", birds: ["hen", "rooster", "chick"] },
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
  { id: "abdomen", label: "Abdomen" },
  { id: "body", label: "Body & General" },
  { id: "behavior", label: "Behavior" },
];

// ═══════════════════════════════════════════════════════════════
// CONDITIONS DATABASE - 150+ conditions with symptom mappings
// ═══════════════════════════════════════════════════════════════
const conditions = [

  // ────────────────────────────────────────────
  // INFECTIOUS - RESPIRATORY
  // ────────────────────────────────────────────
  { name: "Avian Mycoplasmosis (CRD)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["breathing-rales", "sound-sneezing", "sound-wheezing", "sound-coughing", "sound-gurgling", "nares-discharge", "eye-discharge", "eye-closed", "face-swelling", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "breathing-gasping", "body-stunted"],
    description: "Chronic Respiratory Disease caused by Mycoplasma gallisepticum. One of the most common poultry respiratory infections. Spreads via airborne droplets and from hen to egg. Sticky nasal exudate, foamy eyes, and swollen sinuses are hallmarks." },

  { name: "Infectious Synovitis (M. synoviae)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["gait-lameness", "joint-swelling", "hock-swollen", "breast-blister", "behavior-depressed", "behavior-reduced-appetite", "weight-loss", "droppings-green", "breathing-rales", "feathers-ruffled"],
    description: "Caused by Mycoplasma synoviae. Affects joints and tendon sheaths causing lameness, swollen hocks, and breast blisters. Can also cause mild respiratory disease. Birds sit on their hocks and are reluctant to move." },

  { name: "Infectious Coryza", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["sound-sneezing", "nares-discharge", "face-swelling", "eye-discharge", "eye-closed", "sound-wheezing", "behavior-reduced-appetite", "egg-reduced", "behavior-depressed", "mouth-odor", "wattles-swelling", "ear-discharge"],
    description: "Bacterial infection (Avibacterium paragallinarum) causing severe facial swelling and foul-smelling nasal discharge. Eyelids may stick together. Spreads rapidly; recovered birds remain carriers." },

  { name: "Infectious Bronchitis", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["sound-sneezing", "sound-coughing", "sound-wheezing", "breathing-rales", "breathing-gasping", "eye-discharge", "nares-discharge", "egg-reduced", "egg-shell-misshapen", "egg-shell-thin", "egg-watery-whites", "egg-shell-rough", "behavior-depressed", "behavior-huddling", "tail-bobbing"],
    description: "Highly contagious coronavirus affecting the respiratory tract. Can permanently damage the oviduct in young hens, causing lifelong poor egg quality. Spreads extremely fast through airborne particles." },

  { name: "Infectious Laryngotracheitis (ILT)", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["breathing-gasping", "sound-coughing", "breathing-rales", "sound-wheezing", "eye-discharge", "eye-closed", "nares-discharge", "behavior-depressed", "droppings-blood", "neck-limp", "sudden-death", "behavior-head-shaking", "sound-weak-voice"],
    description: "Herpesvirus infection of the upper respiratory tract. Birds pump their heads trying to breathe, often coughing up bloody mucus. Severe form has high mortality. Vaccinated birds can become carriers." },

  { name: "Newcastle Disease", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["breathing-gasping", "sound-coughing", "sound-sneezing", "nares-discharge", "droppings-green", "droppings-watery", "behavior-depressed", "egg-reduced", "egg-shell-misshapen", "egg-shell-thin", "neck-wry", "legs-paralysis", "wings-drooping", "gait-circling", "body-seizures", "sudden-death", "head-tilt"],
    description: "Highly contagious and often fatal paramyxovirus. Affects respiratory, nervous, and digestive systems. Causes head twisting, paralysis, and green diarrhea. A reportable disease with near 100% mortality in virulent form." },

  { name: "Avian Influenza", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["sudden-death", "comb-purple", "wattles-swelling", "face-swelling", "eye-discharge", "nares-discharge", "breathing-gasping", "sound-coughing", "droppings-green", "egg-reduced", "egg-not-laying", "behavior-depressed", "behavior-reduced-appetite", "legs-swelling", "skin-reddening", "comb-blackening", "comb-swelling"],
    description: "Serious Type A influenza virus. Highly pathogenic strains cause rapid death with near 100% flock mortality. Causes purple/black discoloration of comb and wattles, facial edema, hemorrhages on legs. A reportable disease." },

  { name: "Swollen Head Syndrome", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["face-swelling", "eye-discharge", "eye-closed", "neck-wry", "behavior-depressed", "egg-reduced", "sound-sneezing", "nares-discharge", "wattles-swelling", "gait-ataxia"],
    description: "Caused by avian metapneumovirus, often with secondary E. coli. Starts with watery eyes and sneezing, then dramatic swelling spreads across the head, around eyes, and down to jaw and wattles. Disorientation and neck twisting may follow." },

  { name: "Aspergillosis (Brooder Pneumonia)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["breathing-gasping", "breathing-rales", "behavior-depressed", "behavior-reduced-appetite", "eye-discharge", "eye-cloudy", "weight-loss", "comb-purple", "sudden-death", "body-seizures", "tail-bobbing"],
    description: "Fungal infection (Aspergillus) of the respiratory tract from moldy bedding or feed. Forms plaques in lungs and air sacs. Notably, birds gasp but may NOT have audible rales. Extremely difficult to treat once established." },

  { name: "Ornithobacteriosis (ORT)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["breathing-rales", "sound-sneezing", "sound-coughing", "nares-discharge", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "sudden-death", "face-swelling"],
    description: "Caused by Ornithobacterium rhinotracheale. Respiratory infection that causes air sacculitis and pneumonia. Often occurs with other respiratory pathogens. Can cause sudden death in acute outbreaks." },

  // ────────────────────────────────────────────
  // INFECTIOUS - SYSTEMIC / VIRAL
  // ────────────────────────────────────────────
  { name: "Marek's Disease", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["legs-paralysis", "legs-paresis", "gait-lameness", "gait-ataxia", "wings-drooping", "eye-abnormal-pupil", "eye-blindness", "eye-cloudy", "skin-lesions", "body-lump", "feathers-loss", "behavior-depressed", "behavior-reduced-appetite", "weight-loss", "comb-pale", "egg-reduced", "neck-wry", "droppings-green"],
    description: "Highly contagious herpesvirus causing tumors and paralysis. Most common cause of death in unvaccinated backyard flocks. Causes irregular gray iris, paralysis of legs/wings, and internal tumors. No cure, but day-1 vaccination is effective." },

  { name: "Avian Leukosis (Lymphoid Leucosis)", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["abdomen-enlarged", "comb-pale", "comb-shriveled", "weight-loss", "behavior-depressed", "behavior-reduced-appetite", "droppings-green", "egg-reduced", "body-lump"],
    description: "Retrovirus causing lymphoid tumors primarily in the liver, spleen, and bursa. Birds become progressively weaker and emaciated with a distended abdomen. Comb regresses and becomes pale. Often confused with Marek's Disease." },

  { name: "Fowl Pox", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["skin-lesions", "comb-black-spots", "mouth-lesions", "breathing-gasping", "difficulty-swallowing", "eye-closed", "eye-discharge", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "face-lump", "body-stunted"],
    description: "Slow-spreading poxvirus with two forms: dry pox (wart-like scabs on comb, wattles, face) and wet pox (yellow plaques in mouth/throat that can block breathing). Spread by mosquitoes and through wounds." },

  { name: "Fowl Cholera", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["sudden-death", "comb-purple", "comb-blackening", "behavior-depressed", "behavior-reduced-appetite", "droppings-green", "droppings-yellow", "nares-discharge", "breathing-rales", "sound-coughing", "wattles-swelling", "gait-lameness", "legs-swelling", "face-swelling", "egg-reduced", "joint-swelling", "mouth-regurgitation", "neck-wry"],
    description: "Caused by Pasteurella multocida. Acute form kills rapidly with few warning signs. Chronic form causes localized infections in joints, wattles, sinuses, and foot pads. Mortality can reach 100% in unvaccinated flocks." },

  { name: "Infectious Bursal Disease (Gumboro)", category: "Infectious", birds: ["chick"],
    matches: ["behavior-depressed", "behavior-huddling", "behavior-reduced-appetite", "feathers-ruffled", "droppings-watery", "droppings-mucus", "vent-pasty", "behavior-weakness", "body-stunted", "sudden-death", "droppings-white", "back-arched", "neck-tremors"],
    description: "Viral disease targeting the bursa of Fabricius in young birds (3-6 weeks). Destroys the immune system, leaving birds permanently immunocompromised. Birds sit hunched, have white watery diarrhea, and tremble." },

  { name: "Avian Encephalomyelitis (Epidemic Tremor)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["neck-tremors", "gait-ataxia", "legs-paralysis", "body-seizures", "behavior-depressed", "gait-reluctance", "head-tilt", "eye-cloudy", "eye-blindness", "egg-reduced", "egg-hatchability"],
    description: "Viral disease causing tremors and incoordination, especially in chicks 1-3 weeks old. Chicks sit on their hocks and tremble. Affected chicks have a dull expression. Adults show only a transient drop in egg production. Can cause cataracts later." },

  { name: "Egg Drop Syndrome", category: "Infectious", birds: ["hen"],
    matches: ["egg-reduced", "egg-shell-thin", "egg-shell-pale", "egg-shell-rough", "egg-shell-misshapen", "egg-watery-whites", "egg-discolored-yolk", "droppings-watery", "droppings-green", "egg-not-laying"],
    description: "Adenovirus causing sudden drops in egg production and thin, soft, or shell-less eggs. Birds usually appear healthy otherwise. No treatment available; production may partially recover over 4-8 weeks." },

  { name: "Chicken Infectious Anemia (CIA)", category: "Infectious", birds: ["chick"],
    matches: ["comb-pale", "behavior-depressed", "behavior-reduced-appetite", "weight-loss", "feathers-ruffled", "body-stunted", "skin-lesions", "droppings-watery", "behavior-weakness"],
    description: "Circovirus causing severe anemia and immunosuppression in chicks 2-4 weeks old. Pale bone marrow, pale comb, and increased susceptibility to secondary infections. Can cause gangrenous dermatitis as a secondary condition." },

  { name: "Infectious Tenosynovitis (Viral Arthritis)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["gait-lameness", "joint-swelling", "hock-swollen", "gait-reluctance", "behavior-depressed", "wings-drooping", "egg-reduced"],
    description: "Reovirus infection causing swelling of the hock joints and tendon sheaths. Birds sit on their hocks and are reluctant to move. In severe cases the Achilles tendon can rupture. Also known as 'helicopter disease' due to wing feather protrusion." },

  { name: "Inclusion Body Hepatitis", category: "Infectious", birds: ["chick"],
    matches: ["sudden-death", "behavior-depressed", "comb-pale", "skin-yellow", "droppings-yellow", "behavior-reduced-appetite", "weight-loss"],
    description: "Adenovirus causing sudden death in broiler chicks 3-7 weeks old, often preceded by immunosuppression from CIA or IBD. Liver is swollen, pale, and friable with hemorrhages." },

  { name: "Reticuloendotheliosis", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["body-stunted", "feathers-ruffled", "behavior-depressed", "weight-loss", "body-lump", "comb-pale", "gait-lameness"],
    description: "Retrovirus causing runting syndrome in chicks (stunting, abnormal feathering) and lymphoid tumors in older birds. Similar to Marek's but tumors occur in different organs. Immunosuppressive." },

  { name: "Avian Nephritis", category: "Infectious", birds: ["chick"],
    matches: ["behavior-depressed", "behavior-reduced-appetite", "droppings-watery", "droppings-white", "weight-loss", "body-stunted", "behavior-huddling"],
    description: "Virus causing kidney inflammation in young chicks. Causes watery, white droppings from kidney damage, dehydration, and poor growth. Often subclinical but can increase mortality during stress." },

  // ────────────────────────────────────────────
  // INFECTIOUS - BACTERIAL (SYSTEMIC)
  // ────────────────────────────────────────────
  { name: "Colibacillosis (E. coli)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-depressed", "feathers-ruffled", "breathing-rales", "sound-coughing", "droppings-watery", "sudden-death", "behavior-reduced-appetite", "weight-loss", "joint-swelling", "abdomen-enlarged"],
    description: "E. coli infections cause a wide range of diseases: air sacculitis, peritonitis, septicemia, salpingitis, and omphalitis. Often secondary to viral respiratory infections or mycoplasma. One of the most common causes of death in poultry worldwide." },

  { name: "Pullorum Disease", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-huddling", "behavior-depressed", "droppings-white", "droppings-watery", "vent-pasty", "behavior-reduced-appetite", "breathing-gasping", "behavior-weakness", "body-stunted", "sudden-death", "comb-pale"],
    description: "Caused by Salmonella pullorum. Primarily kills chicks with chalky white diarrhea and pasted vents. Chicks huddle near heat, are droopy, and gasp. Adults may carry without symptoms. A reportable disease in many areas." },

  { name: "Fowl Typhoid", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["sudden-death", "behavior-depressed", "droppings-green", "droppings-yellow", "vent-pasty", "behavior-reduced-appetite", "behavior-drinking", "comb-pale", "comb-shriveled", "egg-reduced"],
    description: "Caused by Salmonella gallinarum. Similar to Pullorum but affects all ages. Causes sudden mortality, green-yellow diarrhea, pale anemic combs. Liver becomes enlarged and greenish-bronze colored. A reportable disease." },

  { name: "Salmonellosis (Paratyphoid)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-depressed", "behavior-huddling", "droppings-watery", "wings-drooping", "gait-ataxia", "neck-tremors", "behavior-reduced-appetite", "body-stunted", "vent-pasty", "eye-blindness"],
    description: "Various Salmonella species causing disease especially in young birds. Chicks huddle near heat, have drooping wings, and may show nervous signs. Important zoonotic disease - can spread to humans through eggs and meat." },

  { name: "Avian Tuberculosis", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["weight-loss", "behavior-depressed", "behavior-reduced-appetite", "comb-pale", "comb-shriveled", "gait-lameness", "droppings-green", "droppings-yellow", "feathers-ruffled", "abdomen-enlarged", "breast-blister"],
    description: "Chronic bacterial disease (Mycobacterium avium) causing slow progressive wasting over weeks to months. Birds eat but steadily lose weight. Internal organs develop granulomas. No effective treatment; infected birds should be culled." },

  { name: "Erysipelas", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["sudden-death", "face-swelling", "comb-purple", "skin-reddening", "behavior-depressed", "behavior-reduced-appetite", "droppings-green", "gait-lameness", "joint-swelling", "behavior-weakness"],
    description: "Caused by Erysipelothrix rhusiopathiae. More common in free-range flocks. Causes sudden death, purplish skin discoloration, and swollen joints. Can infect humans through open wounds - zoonotic." },

  { name: "Staphylococcosis", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["gait-lameness", "legs-swelling", "foot-swelling", "foot-mass", "wings-lump", "behavior-depressed", "behavior-reduced-appetite", "body-bleeding", "skin-lesions", "joint-swelling", "breast-blister"],
    description: "Staphylococcus aureus causing bumblefoot, septic arthritis, septicemia, breast blisters, and skin infections. Usually enters through wounds, scratches, or broken skin. Common secondary invader." },

  { name: "Avian Chlamydiosis (Ornithosis)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["nares-discharge", "eye-discharge", "breathing-rales", "droppings-green", "droppings-yellow", "behavior-depressed", "behavior-reduced-appetite", "weight-loss", "feathers-ruffled"],
    description: "Caused by Chlamydia psittaci. Causes nasal/eye discharge, green-yellow diarrhea, and respiratory signs. Important zoonotic disease - can infect humans causing flu-like illness (psittacosis). Treatable with tetracycline antibiotics." },

  { name: "Gangrenous Dermatitis", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["skin-lesions", "skin-reddening", "skin-green", "feathers-loss", "behavior-depressed", "sudden-death", "behavior-reduced-appetite", "body-bleeding"],
    description: "Clostridial skin infection causing dark, gas-filled, gangrenous areas on the skin, usually legs, breast, or wings. Often follows immunosuppression from IBD, CIA, or Marek's. Rapid onset with high mortality." },

  { name: "Listeriosis", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-depressed", "behavior-reduced-appetite", "droppings-watery", "droppings-green", "neck-wry", "gait-ataxia", "legs-paralysis", "sudden-death"],
    description: "Caused by Listeria monocytogenes. Can cause septicemia with sudden death, or nervous signs with head twisting and incoordination. Often from contaminated silage or feed. Zoonotic concern." },

  { name: "Streptococcal Infection", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-depressed", "behavior-reduced-appetite", "comb-purple", "sudden-death", "gait-lameness", "joint-swelling", "droppings-watery"],
    description: "Various Streptococcus species causing acute septicemia with sudden death, or chronic arthritis with lameness and swollen joints. Can also cause endocarditis (heart valve infection)." },

  { name: "Necrotic Enteritis", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["sudden-death", "droppings-dark", "droppings-blood", "behavior-depressed", "behavior-reduced-appetite", "feathers-ruffled", "behavior-huddling", "weight-loss"],
    description: "Caused by Clostridium perfringens toxins damaging the intestinal lining. Often follows coccidiosis or sudden feed changes. Dark, foul-smelling droppings. Can cause rapid death in acute cases." },

  { name: "Ulcerative Enteritis (Quail Disease)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-depressed", "behavior-reduced-appetite", "droppings-watery", "droppings-white", "feathers-ruffled", "weight-loss", "sudden-death", "back-arched", "eye-closed"],
    description: "Caused by Clostridium colinum. Birds sit humped up with eyes closed and ruffled feathers. Watery white droppings. Button-like ulcers form in the intestines and cecal lining. Can follow coccidiosis." },

  { name: "Spotty Liver Disease", category: "Infectious", birds: ["hen"],
    matches: ["sudden-death", "egg-reduced", "behavior-depressed", "comb-pale", "droppings-watery"],
    description: "Caused by Campylobacter hepaticus. Primarily affects free-range laying hens. Causes sudden death and drops in egg production. Liver has characteristic gray-white spots. Often triggered by stress." },

  { name: "Avian Intestinal Spirochetosis", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["droppings-watery", "droppings-mucus", "egg-reduced", "weight-loss", "behavior-reduced-appetite", "vent-pasty"],
    description: "Caused by Brachyspira bacteria. Causes chronic wet droppings, reduced egg production, and slow weight loss. Feces are often foamy or mucoid. Common in free-range and organic flocks." },

  // ────────────────────────────────────────────
  // INFECTIOUS - SKIN / LOCAL
  // ────────────────────────────────────────────
  { name: "Bumblefoot (Pododermatitis)", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["gait-lameness", "foot-swelling", "foot-mass", "behavior-depressed", "behavior-reduced-appetite", "gait-reluctance"],
    description: "Staphylococcus infection of the foot pad from cuts, splinters, or hard landings. Shows as a dark scab or swollen lump on the bottom of the foot. Needs surgical debridement in advanced cases. Lower roost bars and softer bedding help prevent it." },

  { name: "Vent Gleet (Cloacitis)", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["vent-pasty", "vent-protruding", "feathers-loss", "skin-reddening", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "mouth-odor"],
    description: "Fungal or bacterial infection of the cloaca/vent area causing foul-smelling whitish discharge, redness, and crusty buildup around the vent. Feathers around vent become matted and lost." },

  { name: "Favus (Ringworm)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["comb-powdery", "skin-scaly", "skin-lesions", "feathers-loss", "comb-swelling"],
    description: "Fungal infection (Microsporum gallinae) causing white powdery or crusty patches on comb, wattles, and skin. Can spread to humans (zoonotic). Treat with antifungal agents." },

  { name: "Comb Infections", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["comb-swelling", "comb-black-spots", "comb-blackening", "skin-lesions", "behavior-depressed"],
    description: "Bacterial or fungal infections of the comb tissue, often from pecking injuries, frostbite damage, or fighting wounds. Comb becomes swollen, hot, and may develop black necrotic areas." },

  { name: "Sinus Infection (Sinusitis)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["face-swelling", "eye-discharge", "nares-discharge", "sound-sneezing", "behavior-reduced-appetite", "behavior-depressed", "mouth-odor"],
    description: "Bacterial infection of the infraorbital sinuses causing one-sided or bilateral swelling below the eyes. Often secondary to Mycoplasma, Coryza, or viral respiratory infections. May need sinus flushing and antibiotics." },

  { name: "Conjunctivitis", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["eye-discharge", "eye-closed", "face-swelling", "behavior-depressed", "behavior-head-shaking"],
    description: "Inflammation of the eye membranes from bacterial, viral, or environmental causes (ammonia, dust). Eyes become red, swollen, watery, and may seal shut. Often accompanies respiratory infections." },

  { name: "Candidiasis (Thrush)", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["crop-enlarged", "crop-delayed", "mouth-lesions", "mouth-odor", "difficulty-swallowing", "behavior-reduced-appetite", "behavior-depressed", "weight-loss"],
    description: "Yeast infection (Candida albicans) causing white cheesy plaques in the mouth, crop, and esophagus. The crop may feel thickened. Often follows antibiotic treatment which disrupts normal gut flora." },

  { name: "Ear Infections", category: "Infectious", birds: ["hen", "rooster", "chick"],
    matches: ["ear-discharge", "head-tilt", "gait-ataxia", "gait-circling", "behavior-depressed", "behavior-reduced-appetite", "behavior-head-shaking"],
    description: "Bacterial infection of the middle or inner ear, often secondary to respiratory infections. Causes head tilt, circling, and loss of balance as the vestibular system is affected." },

  { name: "Omphalitis (Yolk Sac Infection)", category: "Infectious", birds: ["chick"],
    matches: ["abdomen-enlarged", "behavior-depressed", "behavior-reduced-appetite", "droppings-watery", "vent-pasty", "body-stunted", "sudden-death", "behavior-huddling", "behavior-weakness"],
    description: "Bacterial infection of the unhealed navel in newly hatched chicks. Abdomen is swollen, soft, and may have a foul odor. Caused by contaminated incubators or dirty hatching conditions. High mortality in first week." },

  { name: "Uropygial Gland Infection", category: "Infectious", birds: ["hen", "rooster"],
    matches: ["body-lump", "feathers-loss", "behavior-depressed", "feathers-dull"],
    description: "Infection or impaction of the preen gland (oil gland) at the base of the tail. Becomes swollen, hard, or abscessed. The bird cannot properly oil its feathers, leading to dull, dry plumage." },

  // ────────────────────────────────────────────
  // PARASITIC - INTERNAL
  // ────────────────────────────────────────────
  { name: "Coccidiosis", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["droppings-blood", "droppings-watery", "droppings-mucus", "behavior-depressed", "behavior-reduced-appetite", "behavior-huddling", "comb-pale", "feathers-ruffled", "weight-loss", "body-stunted", "behavior-drinking"],
    description: "Parasitic disease caused by Eimeria protozoa that damage the intestinal lining. Especially deadly for chicks. Bloody droppings are the hallmark of cecal coccidiosis (E. tenella). The parasites thrive in warm, wet bedding." },

  { name: "Roundworm Infection (Ascaridia)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["droppings-worms", "droppings-watery", "behavior-reduced-appetite", "weight-loss", "comb-pale", "behavior-depressed", "egg-reduced", "body-stunted", "droppings-undigested"],
    description: "Large roundworms (Ascaridia galli) are the most common internal parasite in chickens. Heavy loads block the intestine and steal nutrients. Worms up to 3 inches long may be visible in droppings." },

  { name: "Tapeworm Infection", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["droppings-rice", "droppings-watery", "weight-loss", "behavior-reduced-appetite", "behavior-depressed", "comb-pale", "egg-reduced", "feathers-ruffled"],
    description: "Cestode parasites acquired by eating infected beetles, flies, or slugs. White rice-like segments (proglottids) in droppings are the telltale sign. Require an intermediate host to complete their lifecycle." },

  { name: "Cecal Worms (Heterakis)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["droppings-watery", "weight-loss", "behavior-reduced-appetite", "behavior-depressed", "comb-pale", "body-stunted"],
    description: "Heterakis gallinarum parasites living in the ceca. Mild direct harm, but critically important because they carry the protozoan that causes Blackhead Disease (Histomoniasis). Keep chickens and turkeys separate." },

  { name: "Capillariasis (Threadworms)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["droppings-watery", "droppings-mucus", "weight-loss", "behavior-reduced-appetite", "behavior-depressed", "comb-pale", "crop-enlarged", "difficulty-swallowing", "mouth-lesions"],
    description: "Capillaria worms infect the crop, esophagus, or intestines depending on species. Crop capillariasis causes severe thickening of the crop lining. One of the most damaging worm parasites in poultry." },

  { name: "Gapeworm Infection (Syngamus)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["breathing-gasping", "behavior-yawning", "sound-gurgling", "behavior-depressed", "behavior-reduced-appetite", "neck-limp", "weight-loss", "behavior-head-shaking"],
    description: "Y-shaped Syngamus trachea worms attach to the trachea, causing a characteristic gaping/gasping motion. Birds stretch their necks and open beaks trying to breathe. Acquired from eating earthworms, slugs, or snails." },

  { name: "Eye Worm Infection (Oxyspirura)", category: "Parasitic", birds: ["hen", "rooster"],
    matches: ["eye-discharge", "eye-closed", "eye-cloudy", "behavior-scratching", "behavior-head-shaking", "behavior-depressed"],
    description: "Oxyspirura mansoni worms live under the nictitating membrane (third eyelid). Causes excessive tearing, scratching at the eyes, and cloudy corneas. Birds acquire them by eating infected Surinam cockroaches." },

  { name: "Blackhead Disease (Histomoniasis)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["droppings-yellow", "droppings-green", "comb-blackening", "comb-purple", "behavior-depressed", "behavior-reduced-appetite", "behavior-huddling", "feathers-ruffled", "weight-loss", "sudden-death"],
    description: "Caused by the protozoan Histomonas meleagridis, transmitted via cecal worm eggs. Causes liver necrosis (circular bullseye lesions) and cecal inflammation. Darkened head gives it its common name. Devastating to turkeys." },

  { name: "Cryptosporidiosis", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["breathing-rales", "sound-coughing", "sound-sneezing", "droppings-watery", "behavior-depressed", "behavior-reduced-appetite", "body-stunted"],
    description: "Cryptosporidium protozoa infecting the respiratory and/or intestinal tract. Respiratory form causes sneezing and coughing. Intestinal form causes watery diarrhea. Most severe in immunosuppressed or young birds." },

  { name: "Canker (Trichomoniasis)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["mouth-lesions", "difficulty-swallowing", "mouth-odor", "crop-enlarged", "behavior-reduced-appetite", "weight-loss", "behavior-depressed", "nares-discharge"],
    description: "Caused by Trichomonas gallinae protozoa. Creates yellowish cheesy plaques in mouth, throat, and crop. Can completely block eating and breathing if severe. Transmitted through contaminated water or direct contact." },

  // ────────────────────────────────────────────
  // PARASITIC - EXTERNAL
  // ────────────────────────────────────────────
  { name: "Red Mite Infestation (Dermanyssus)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["feathers-loss", "behavior-scratching", "comb-pale", "behavior-depressed", "behavior-reduced-appetite", "feathers-dull", "skin-reddening", "egg-reduced", "behavior-roosting-early", "behavior-perch-change", "feathers-insects"],
    description: "Red mites hide in coop crevices during the day and feed on blood at night. A heavy infestation can drain enough blood to cause anemia and death. Birds become reluctant to enter the coop at night." },

  { name: "Northern Fowl Mite (Ornithonyssus)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["feathers-insects", "feathers-loss", "behavior-scratching", "comb-pale", "skin-reddening", "skin-scaly", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "vent-pasty"],
    description: "Lives on the bird full-time, especially around the vent. Dark scabby buildup around vent and tail base is diagnostic. Population can explode rapidly. Causes anemia, irritation, and egg production drops." },

  { name: "Scaly Leg Mite (Knemidocoptes)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["skin-scaly", "gait-lameness", "foot-swelling", "legs-swelling", "behavior-scratching", "behavior-depressed", "toes-blackening"],
    description: "Knemidocoptes mutans mites burrow under leg scales, causing them to lift, thicken, and crust over. Legs look lumpy and deformed. Very treatable by coating legs with petroleum jelly or oil to suffocate the mites." },

  { name: "Lice Infestation", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["feathers-insects", "behavior-scratching", "feathers-loss", "feathers-dull", "skin-reddening", "behavior-depressed", "behavior-reduced-appetite", "egg-reduced", "weight-loss"],
    description: "Flat, straw-colored insects living on the bird feeding on skin debris and feathers. Look for white egg clusters at feather bases, especially around the vent, under wings, and on the head. Multiple species exist." },

  { name: "Depluming Mites (Knemidocoptes laevis)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["feathers-loss", "feathers-dull", "behavior-scratching", "skin-reddening", "skin-lesions", "behavior-depressed"],
    description: "Mites burrow into feather follicles causing intense itching. Birds pull out their own feathers trying to relieve the irritation. Feather loss is typically on the back, breast, and thighs." },

  { name: "Air Sac Mites (Cytodites)", category: "Parasitic", birds: ["hen", "rooster"],
    matches: ["breathing-rales", "breathing-gasping", "sound-coughing", "behavior-depressed", "weight-loss", "egg-reduced"],
    description: "Tiny mites (Cytodites nudus) living inside the air sacs, trachea, and bronchi. Causes chronic respiratory signs. Often found incidentally. Can weaken birds and reduce egg production over time." },

  { name: "Flea Infestation", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-scratching", "feathers-loss", "comb-pale", "skin-reddening", "behavior-depressed", "egg-reduced", "skin-lesions"],
    description: "The sticktight flea (Echidnophaga gallinacea) attaches firmly to the comb, wattles, and face. Unlike mammal fleas, they embed in the skin and don't jump off. Heavy infestations cause anemia and ulceration." },

  { name: "Fowl Tick Infestation", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["comb-pale", "behavior-depressed", "behavior-reduced-appetite", "weight-loss", "egg-reduced", "behavior-weakness", "feathers-ruffled"],
    description: "Argas persicus (fowl tick/blue bug) hides in coop cracks during the day and feeds on blood at night, similar to red mites. Heavy infestations cause anemia, weakness, and death. Can transmit Borrelia and other pathogens." },

  { name: "Tropical Fowl Mite", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["feathers-insects", "behavior-scratching", "comb-pale", "skin-reddening", "behavior-depressed", "feathers-loss"],
    description: "Ornithonyssus bursa lives on the bird similar to Northern Fowl Mite but primarily in tropical/subtropical climates. Causes irritation, anemia, and reduced productivity. Look for mites around the vent and breast." },

  { name: "Flystrike (Myiasis)", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["skin-lesions", "body-bleeding", "behavior-depressed", "behavior-reduced-appetite", "vent-pasty", "feathers-loss", "mouth-odor", "behavior-weakness", "vent-bleeding"],
    description: "Flies lay eggs on dirty or wounded skin, and hatching maggots eat into the flesh. Most common around the vent, under wings, or on wounds. An emergency requiring immediate maggot removal and wound treatment." },

  { name: "Tick Paralysis", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["legs-paralysis", "wings-drooping", "behavior-weakness", "behavior-depressed", "gait-ataxia", "neck-limp"],
    description: "Neurotoxin from certain tick species causes ascending flaccid paralysis starting from the legs. Removing the tick usually results in rapid recovery within 24-48 hours. Check the head and neck area for embedded ticks." },

  { name: "Leucocytozoonosis", category: "Parasitic", birds: ["hen", "rooster", "chick"],
    matches: ["comb-pale", "behavior-depressed", "behavior-reduced-appetite", "breathing-gasping", "droppings-green", "sudden-death", "behavior-weakness"],
    description: "Blood parasite (Leucocytozoon) transmitted by black flies (Simulium). Causes severe anemia, enlarged liver and spleen, green droppings, and sudden death. Most common near streams where black flies breed." },

  // ────────────────────────────────────────────
  // REPRODUCTIVE
  // ────────────────────────────────────────────
  { name: "Egg Binding", category: "Reproductive", birds: ["hen"],
    matches: ["abdomen-enlarged", "behavior-depressed", "behavior-reduced-appetite", "behavior-nestbox", "behavior-straining", "egg-not-laying", "vent-protruding", "gait-reluctance", "posture-penguin", "behavior-weakness", "droppings-reduced"],
    description: "A hen has an egg stuck in the oviduct. EMERGENCY - can be fatal within 24-48 hours. Warm baths (100-102F), calcium supplementation, and lubrication may help. If the egg doesn't pass in hours, see a vet immediately." },

  { name: "Egg Yolk Peritonitis", category: "Reproductive", birds: ["hen"],
    matches: ["abdomen-enlarged", "behavior-depressed", "behavior-reduced-appetite", "egg-not-laying", "posture-penguin", "behavior-weakness", "droppings-green", "weight-loss", "gait-reluctance"],
    description: "Egg yolk material leaks into the abdominal cavity causing inflammation and bacterial infection. Abdomen becomes swollen and firm. The hen walks with a penguin-like waddle. A very serious condition requiring veterinary attention." },

  { name: "Cloacal Prolapse", category: "Reproductive", birds: ["hen"],
    matches: ["vent-protruding", "body-bleeding", "behavior-depressed", "behavior-straining", "egg-not-laying", "behavior-reduced-appetite", "vent-bleeding"],
    description: "Inner tissue of the cloaca pushes out through the vent. Caused by laying oversized eggs, obesity, or calcium deficiency. Must be addressed immediately as other birds will peck at the exposed tissue." },

  { name: "Salpingitis", category: "Reproductive", birds: ["hen"],
    matches: ["abdomen-enlarged", "egg-not-laying", "egg-shell-misshapen", "behavior-depressed", "behavior-reduced-appetite", "posture-penguin", "weight-loss", "egg-lash"],
    description: "Inflammation and infection of the oviduct, often from E. coli or Mycoplasma. Can produce lash eggs - rubbery masses of pus, tissue, and debris that look like a deformed egg. Chronic cases reduce the bird's lifespan." },

  { name: "Internal Laying", category: "Reproductive", birds: ["hen"],
    matches: ["abdomen-enlarged", "egg-not-laying", "behavior-depressed", "weight-loss", "posture-penguin", "gait-reluctance", "behavior-reduced-appetite"],
    description: "Eggs are released into the abdominal cavity instead of the oviduct. Yolk material accumulates causing a swollen, fluid-filled abdomen. Often leads to egg yolk peritonitis. Common in older or obese hens." },

  { name: "Oviduct Impaction", category: "Reproductive", birds: ["hen"],
    matches: ["abdomen-enlarged", "egg-not-laying", "behavior-straining", "behavior-depressed", "behavior-reduced-appetite", "posture-penguin"],
    description: "The oviduct becomes blocked with solidified egg material, often multiple hardened masses. The hen strains to lay but cannot. Abdomen becomes increasingly distended. May require surgical intervention." },

  { name: "Ovarian Cysts", category: "Reproductive", birds: ["hen"],
    matches: ["abdomen-enlarged", "egg-reduced", "egg-not-laying", "behavior-depressed", "behavior-reduced-appetite", "weight-loss"],
    description: "Fluid-filled cysts develop on the ovary, interfering with normal egg production. Causes progressive abdominal enlargement. Some cysts are benign, others may indicate tumors. Common in older laying hens." },

  { name: "Ovarian Tumors", category: "Reproductive", birds: ["hen"],
    matches: ["abdomen-enlarged", "egg-not-laying", "weight-loss", "behavior-depressed", "behavior-reduced-appetite", "comb-pale", "droppings-green", "posture-penguin"],
    description: "Tumors of the ovary, often adenocarcinomas. Common in older laying hens. Causes progressive weight loss and abdominal swelling. Tumors can spread to other organs. No practical treatment." },

  { name: "Vent Pecking", category: "Behavioral", birds: ["hen", "rooster", "chick"],
    matches: ["vent-bleeding", "vent-protruding", "body-bleeding", "feathers-loss", "feathers-pecked", "behavior-depressed", "behavior-reduced-appetite"],
    description: "Flock mates peck at the vent area, causing tissue damage and bleeding. Can escalate to cannibalism. Triggered by prolapse, bloody vent from laying, overcrowding, nutritional deficiencies, or excessive light." },

  { name: "Immature / Defective Shell Gland", category: "Reproductive", birds: ["hen"],
    matches: ["egg-shell-thin", "egg-shell-rough", "egg-shell-misshapen", "egg-shell-pale", "egg-shell-calcium", "egg-watery-whites", "egg-reduced"],
    description: "The shell gland fails to deposit adequate calcium on eggs, producing consistently thin, rough, or misshapen shells. Can be from IB damage to the oviduct in young birds, calcium deficiency, or genetic factors." },

  // ────────────────────────────────────────────
  // DIGESTIVE
  // ────────────────────────────────────────────
  { name: "Sour Crop (Crop Stasis)", category: "Digestive", birds: ["hen", "rooster", "chick"],
    matches: ["crop-enlarged", "crop-delayed", "mouth-odor", "behavior-reduced-appetite", "behavior-depressed", "droppings-watery", "mouth-regurgitation", "weight-loss"],
    description: "Yeast (Candida) infection in the crop. The crop feels squishy like a water balloon and produces a foul sour smell from the beak. Often follows antibiotic treatment. Nystatin is the standard treatment." },

  { name: "Crop Impaction", category: "Digestive", birds: ["hen", "rooster", "chick"],
    matches: ["crop-enlarged", "crop-delayed", "behavior-reduced-appetite", "behavior-depressed", "weight-loss", "droppings-reduced", "behavior-straining"],
    description: "The crop becomes blocked with long grass, straw, string, or rubber bands. The crop feels hard and firm like a baseball (unlike squishy sour crop). May need massage, oil treatment, or surgical removal." },

  { name: "Pendulous Crop", category: "Digestive", birds: ["hen", "rooster"],
    matches: ["crop-enlarged", "crop-delayed", "behavior-reduced-appetite", "weight-loss", "behavior-depressed"],
    description: "The crop muscles lose tone and the crop hangs low, swinging when the bird walks. Food sits in the crop too long and may ferment. Can develop secondary sour crop. Often from repeated crop impaction or overeating." },

  { name: "Foreign Body Ingestion", category: "Digestive", birds: ["hen", "rooster", "chick"],
    matches: ["crop-enlarged", "behavior-reduced-appetite", "behavior-depressed", "behavior-straining", "droppings-reduced", "weight-loss"],
    description: "Birds swallow hardware (nails, wire, staples), string, rubber bands, or other indigestible objects. Can cause crop impaction, gizzard blockage, or perforation of the digestive tract. Hardware disease can be fatal." },

  // ────────────────────────────────────────────
  // NUTRITIONAL
  // ────────────────────────────────────────────
  { name: "Vitamin A Deficiency", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["eye-discharge", "eye-closed", "eye-cloudy", "nares-discharge", "mouth-lesions", "breathing-rales", "behavior-reduced-appetite", "body-stunted", "egg-reduced", "egg-blood-spot", "behavior-weakness"],
    description: "Causes pale cheesy plaques in mouth, eyes, and nasal passages. Reduces disease resistance. Birds become more susceptible to respiratory infections. Provide dark leafy greens, carrots, or sweet potatoes." },

  { name: "Vitamin D Deficiency / Rickets", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["egg-shell-thin", "egg-shell-rough", "legs-deformed", "gait-lameness", "gait-reluctance", "body-stunted", "behavior-weakness", "toes-curled", "behavior-reduced-appetite", "keel-deformed"],
    description: "Causes soft, rubbery bones, thin eggshells, and leg deformities. Birds kept indoors without UV light or inadequate feed are most at risk. Chicks develop rickets with bowed legs and soft beaks." },

  { name: "Vitamin E / Selenium Deficiency", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["neck-wry", "gait-ataxia", "legs-paralysis", "body-seizures", "behavior-depressed", "behavior-weakness", "neck-tremors", "head-tilt", "gait-circling"],
    description: "Causes three syndromes: crazy chick disease (encephalomalacia - head twisting, ataxia), exudative diathesis (fluid under skin), and white muscle disease (muscular dystrophy). Vitamin E + selenium supplementation usually resolves symptoms." },

  { name: "Fatty Liver Hemorrhagic Syndrome", category: "Nutritional", birds: ["hen"],
    matches: ["abdomen-enlarged", "body-weight-gain", "comb-pale", "behavior-depressed", "sudden-death", "egg-reduced", "behavior-reduced-appetite"],
    description: "Excess fat in the liver which can rupture and cause fatal internal bleeding. Common in caged or confined hens fed high-energy diets with too many treats. Sudden death in an apparently healthy, fat hen is typical." },

  { name: "Biotin Deficiency (Vitamin B7)", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["foot-mass", "skin-lesions", "skin-scaly", "gait-lameness", "feathers-dull", "feathers-loss", "body-stunted", "egg-hatchability"],
    description: "Causes dermatitis on the feet and around the beak and eyes. Foot pads crack and bleed. Feathers become brittle. In chicks, causes perosis-like leg deformities. Reduced hatchability in breeders." },

  { name: "Thiamine Deficiency (Vitamin B1)", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["neck-wry", "gait-ataxia", "legs-paralysis", "behavior-depressed", "behavior-reduced-appetite", "body-seizures", "head-tilt", "neck-limp"],
    description: "Causes polyneuritis - stargazing posture (head thrown back), progressive paralysis, and convulsions. Can occur from feeding raw fish (contains thiaminase) or moldy feed that destroys thiamine." },

  { name: "Vitamin K Deficiency", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["body-bleeding", "comb-pale", "behavior-depressed", "behavior-weakness", "skin-reddening"],
    description: "Causes hemorrhaging because blood cannot clot properly. Subcutaneous bruising, blood in droppings, and prolonged bleeding from wounds. Can occur from feeding moldy sweet clover or anticoagulant exposure." },

  { name: "Vitamin B12 Deficiency", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["body-stunted", "behavior-reduced-appetite", "comb-pale", "gait-ataxia", "feathers-ruffled", "egg-hatchability"],
    description: "Causes poor growth, anemia, poor feathering, and reduced hatchability. Chicks may show perosis-like symptoms. Most common in all-vegetable diets without supplementation." },

  { name: "Niacin Deficiency (Vitamin B3)", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["gait-lameness", "hock-swollen", "legs-deformed", "mouth-lesions", "behavior-reduced-appetite", "feathers-ruffled", "body-stunted", "droppings-watery"],
    description: "Causes enlarged hock joints, bowed legs, and inflammation of the mouth and tongue. Growth is severely retarded. Common in diets based on corn without proper supplementation." },

  { name: "Folic Acid Deficiency", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["comb-pale", "body-stunted", "feathers-color-change", "feathers-ruffled", "gait-lameness", "toes-curled", "egg-hatchability", "behavior-weakness"],
    description: "Causes anemia (pale comb), poor growth, poor feathering with color changes, and cervical paralysis in chicks. Reduced hatchability with late embryonic death. Beak may become depigmented." },

  { name: "Zinc Deficiency", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["body-stunted", "feathers-ruffled", "feathers-loss", "skin-scaly", "hock-swollen", "gait-lameness", "egg-hatchability", "behavior-reduced-appetite"],
    description: "Causes poor growth, poor feathering, enlarged hock joints, and shortened long bones. Skin becomes thickened and scaly. Reduced hatchability. Often caused by high calcium interfering with zinc absorption." },

  { name: "Phosphorus Deficiency", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["egg-shell-thin", "behavior-reduced-appetite", "body-stunted", "gait-lameness", "behavior-weakness", "legs-deformed", "behavior-pica"],
    description: "Causes rickets-like bone disorders, thin eggshells, and poor growth. Birds may eat litter or other non-food items (pica) trying to satisfy the deficiency. Often occurs with vitamin D deficiency." },

  { name: "Calcium Deficiency (Hypocalcemia)", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["egg-shell-thin", "egg-shell-rough", "legs-paralysis", "behavior-weakness", "body-seizures", "behavior-depressed", "egg-reduced", "gait-lameness", "legs-deformed"],
    description: "Laying hens need enormous calcium for eggshells. Deficiency causes thin shells, bone weakness, cage layer fatigue (paralysis), and seizures. Provide oyster shell free-choice separate from feed." },

  { name: "Avian Goiter (Iodine Deficiency)", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["neck-lump", "breathing-gasping", "difficulty-swallowing", "behavior-reduced-appetite", "egg-reduced", "body-stunted"],
    description: "Thyroid glands enlarge forming visible lumps on the neck. Enlarged thyroids can compress the trachea causing breathing difficulty. Caused by iodine-deficient diets or goitrogenic substances in feed." },

  { name: "Avian Osteoporosis (Cage Layer Fatigue)", category: "Nutritional", birds: ["hen"],
    matches: ["legs-paralysis", "gait-lameness", "gait-reluctance", "keel-deformed", "behavior-weakness", "egg-shell-thin", "behavior-depressed"],
    description: "Progressive bone loss in high-producing laying hens. Bones become so fragile they fracture easily. Hens may become paralyzed in the cage. Caused by sustained calcium drain for eggshell production without adequate replacement." },

  { name: "Manganese Deficiency", category: "Nutritional", birds: ["hen", "rooster", "chick"],
    matches: ["legs-deformed", "hock-swollen", "gait-lameness", "body-stunted", "egg-shell-thin", "egg-hatchability", "toes-curled"],
    description: "Causes perosis (slipped tendon) - the Achilles tendon slips out of the hock groove causing the leg to twist outward. Eggshells become thin. Chick embryos develop shortened limbs and parrot beak." },

  { name: "Curly Toe Paralysis (Riboflavin/B2 Deficiency)", category: "Nutritional", birds: ["chick"],
    matches: ["toes-curled", "gait-lameness", "gait-reluctance", "behavior-weakness", "body-stunted"],
    description: "Toes curl inward and the chick walks on the sides of its feet. Caused by riboflavin (vitamin B2) deficiency. If caught early, B vitamin supplementation can reverse the condition. Permanent if untreated." },

  { name: "Slipped Tendon (Perosis)", category: "Nutritional", birds: ["chick"],
    matches: ["gait-lameness", "legs-deformed", "legs-swelling", "hock-swollen", "gait-reluctance", "body-stunted"],
    description: "The Achilles tendon slips out of the groove at the hock joint, causing the leg to twist outward. Caused by manganese, choline, or zinc deficiency. Cannot be corrected once established." },

  // ────────────────────────────────────────────
  // TOXIC
  // ────────────────────────────────────────────
  { name: "Botulism (Limberneck)", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["legs-paralysis", "neck-limp", "wings-drooping", "behavior-weakness", "behavior-depressed", "eye-closed", "breathing-gasping", "sudden-death", "gait-reluctance", "difficulty-swallowing"],
    description: "Clostridium botulinum toxin causes progressive flaccid paralysis. Classic 'limberneck' - the neck goes completely limp. Paralysis starts from legs and works upward. From eating maggots on carcasses or stagnant water." },

  { name: "Lead Poisoning", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["droppings-green", "behavior-depressed", "behavior-weakness", "gait-ataxia", "wings-drooping", "weight-loss", "legs-paralysis", "body-seizures", "behavior-drinking", "eye-blindness"],
    description: "From ingesting lead paint chips, fishing weights, buckshot, or old batteries. Causes nervous and digestive signs. Remove the lead source immediately. Chelation therapy from a vet may help." },

  { name: "Aflatoxicosis", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-reduced-appetite", "behavior-depressed", "weight-loss", "egg-reduced", "droppings-watery", "comb-pale", "feathers-ruffled", "body-stunted", "sudden-death"],
    description: "Poisoning from aflatoxins produced by Aspergillus molds in corn, peanuts, and other grains. Damages the liver and immune system. Chronic exposure causes poor growth and immunosuppression. Discard all moldy feed." },

  { name: "Ammonia Toxicity", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["eye-discharge", "eye-closed", "eye-cloudy", "breathing-rales", "sound-sneezing", "sound-coughing", "behavior-reduced-appetite", "egg-reduced"],
    description: "From buildup of ammonia gas in poorly ventilated coops with wet litter. Burns the eyes, nasal passages, and respiratory tract. If you can smell ammonia at bird level, levels are too high. Clean bedding and improve ventilation." },

  { name: "Teflon (PTFE) Poisoning", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["sudden-death", "breathing-gasping", "behavior-weakness", "unconscious"],
    description: "Polytetrafluoroethylene fumes from overheated nonstick cookware are extremely toxic to birds. Causes acute death within minutes to hours from pulmonary hemorrhage and edema. Never use nonstick pans near birds." },

  { name: "Organophosphate / Carbamate Poisoning", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["body-seizures", "droppings-watery", "breathing-gasping", "behavior-weakness", "behavior-depressed", "gait-ataxia", "sudden-death", "neck-tremors", "legs-paralysis"],
    description: "From accidental exposure to insecticide sprays, dips, or treated areas. Inhibits acetylcholinesterase causing excessive salivation, diarrhea, tremors, and seizures. Atropine is the antidote. Keep birds away from treated areas." },

  { name: "Rodenticide (Rat Poison) Toxicity", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["body-bleeding", "comb-pale", "behavior-weakness", "behavior-depressed", "sudden-death", "droppings-blood", "vent-bleeding"],
    description: "Anticoagulant rodenticides (warfarin, brodifacoum) cause internal and external hemorrhaging. Birds bleed from any wound and internally. Vitamin K1 is the antidote. Use bird-safe rodent control methods." },

  { name: "Salt / Sodium Toxicosis", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-drinking", "droppings-watery", "behavior-depressed", "behavior-weakness", "gait-ataxia", "legs-paralysis", "sudden-death", "breathing-gasping"],
    description: "From drinking salt water, eating road salt, or excess salt in feed. Causes extreme thirst, watery droppings, wet vent, leg weakness, and death. Provide plenty of fresh clean water immediately." },

  { name: "Zinc Poisoning", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-reduced-appetite", "weight-loss", "behavior-depressed", "droppings-green", "gait-lameness", "egg-reduced"],
    description: "From ingesting galvanized metal (zinc-coated hardware), pennies, or zinc-coated feeders/waterers. Causes anemia, weight loss, kidney damage, and green droppings. Remove the zinc source." },

  { name: "Mycotoxicosis (General)", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-reduced-appetite", "egg-reduced", "mouth-lesions", "droppings-watery", "weight-loss", "behavior-depressed", "comb-pale", "feathers-ruffled"],
    description: "Poisoning from various fungal toxins in moldy feed including ochratoxin, trichothecenes, and zearalenone. Causes mouth ulcers, immunosuppression, kidney and liver damage. Always discard moldy or suspicious feed." },

  { name: "Ergotism", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["toes-blackening", "comb-blackening", "gait-lameness", "behavior-reduced-appetite", "droppings-watery", "body-seizures", "behavior-depressed"],
    description: "From eating grain contaminated with ergot fungus (Claviceps). Causes vasoconstriction leading to gangrene of combs, wattles, and toes (they turn black and fall off). Also causes nervous signs." },

  { name: "Cyanide Poisoning", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["sudden-death", "breathing-gasping", "body-seizures", "behavior-weakness", "gait-ataxia"],
    description: "From eating cherry, apple, or peach pits/leaves, or certain plants containing cyanogenic glycosides. Cyanide blocks cellular oxygen use. Rapid onset of gasping, convulsions, and death. Cherry laurel and flax seeds are common sources." },

  { name: "Oleander Poisoning", category: "Toxic", birds: ["hen", "rooster", "chick"],
    matches: ["sudden-death", "droppings-watery", "droppings-blood", "behavior-depressed", "body-seizures", "behavior-weakness"],
    description: "All parts of the oleander plant are extremely toxic, containing cardiac glycosides. Even small amounts can cause sudden death from cardiac arrest. Remove all oleander from areas accessible to birds." },

  // ────────────────────────────────────────────
  // CARDIOVASCULAR
  // ────────────────────────────────────────────
  { name: "Ascites Syndrome (Water Belly)", category: "Cardiovascular", birds: ["hen", "rooster", "chick"],
    matches: ["abdomen-enlarged", "breathing-gasping", "comb-purple", "behavior-depressed", "behavior-reduced-appetite", "gait-reluctance", "behavior-weakness"],
    description: "Fluid accumulates in the abdominal cavity from right-sided heart failure. Abdomen feels like a water balloon. Most common in fast-growing meat breeds at high altitude. Slow growth rate and good ventilation help prevent it." },

  { name: "Sudden Death Syndrome (Flip-over)", category: "Cardiovascular", birds: ["hen", "rooster", "chick"],
    matches: ["sudden-death", "rigid-lifeless"],
    description: "Apparently healthy birds die suddenly, often found on their backs with legs up. Related to cardiac arrhythmia from rapid growth. Most common in fast-growing broiler breeds. No warning signs - birds are dead within seconds." },

  { name: "Dilated Cardiomyopathy (Round Heart Disease)", category: "Cardiovascular", birds: ["hen", "rooster", "chick"],
    matches: ["sudden-death", "behavior-depressed", "breathing-gasping", "abdomen-enlarged", "comb-purple", "tires-easily"],
    description: "The heart chambers enlarge and the heart muscle weakens, unable to pump blood effectively. Causes exercise intolerance, fluid buildup, and sudden death. Can be caused by selenium deficiency or genetic factors." },

  // ────────────────────────────────────────────
  // ENVIRONMENTAL
  // ────────────────────────────────────────────
  { name: "Heat Stress / Heat Stroke", category: "Environmental", birds: ["hen", "rooster", "chick"],
    matches: ["breathing-panting", "wings-drooping", "behavior-depressed", "behavior-drinking", "egg-reduced", "egg-shell-thin", "comb-pale", "behavior-reduced-appetite", "droppings-watery", "sudden-death", "unconscious"],
    description: "Chickens cannot sweat. Above 85F (30C) they pant and spread wings to cool down. Severe heat stress causes collapse and death. Provide shade, ventilation, cold water, and electrolytes. Mist systems help in dry climates." },

  { name: "Frostbite", category: "Environmental", birds: ["hen", "rooster"],
    matches: ["comb-black-spots", "comb-blackening", "comb-swelling", "wattles-swelling", "toes-blackening", "gait-lameness", "behavior-depressed"],
    description: "Tissue damage from freezing, most commonly affecting combs, wattles, and toes. Large single combs are most vulnerable. Good ventilation (not drafts) reduces moisture that causes frostbite. Apply petroleum jelly to combs in cold weather." },

  { name: "Hypothermia", category: "Environmental", birds: ["hen", "rooster", "chick"],
    matches: ["behavior-huddling", "behavior-depressed", "behavior-weakness", "rigid-lifeless", "behavior-reduced-appetite", "feathers-ruffled", "unconscious"],
    description: "Body temperature drops dangerously low, especially in chicks without adequate heat. Birds huddle, become lethargic, and stop eating. Warm them gradually - sudden warming can cause shock. Ensure proper brooder temperature for chicks." },

  // ────────────────────────────────────────────
  // MUSCULOSKELETAL
  // ────────────────────────────────────────────
  { name: "Splay Leg (Spraddle Leg)", category: "Musculoskeletal", birds: ["chick"],
    matches: ["legs-deformed", "gait-reluctance", "gait-ataxia", "behavior-weakness"],
    description: "One or both legs splay outward, preventing the chick from standing. Usually from slippery brooder surfaces in the first days of life. Treatable with a hobble brace (bandaid between legs) if caught within the first few days." },

  { name: "Arthritis", category: "Musculoskeletal", birds: ["hen", "rooster"],
    matches: ["gait-lameness", "joint-swelling", "hock-swollen", "gait-reluctance", "behavior-depressed", "behavior-reduced-appetite"],
    description: "Joint inflammation from bacterial infection (Staphylococcus, Mycoplasma), viral causes (reovirus), or age-related degeneration. Affected joints are swollen, warm, and painful. Birds are reluctant to move and may sit on their hocks." },

  { name: "Fractures", category: "Musculoskeletal", birds: ["hen", "rooster", "chick"],
    matches: ["gait-lameness", "wings-drooping", "behavior-depressed", "gait-reluctance", "body-bleeding", "legs-deformed"],
    description: "Broken bones from falls, predator attacks, rough handling, or calcium deficiency weakening the bones. Leg fractures cause severe lameness, wing fractures cause drooping. Small birds can heal with splinting and rest." },

  { name: "Kinky-back (Spondylolisthesis)", category: "Musculoskeletal", birds: ["chick"],
    matches: ["back-arched", "gait-reluctance", "gait-lameness", "legs-paralysis", "behavior-depressed", "body-stunted"],
    description: "A deformity of the thoracic vertebrae causing the backbone to pinch the spinal cord. Birds sit back on their hocks and cannot stand. Most common in fast-growing broiler breeds. There is no treatment." },

  { name: "Keel Bone Injury / Deformity", category: "Musculoskeletal", birds: ["hen", "rooster"],
    matches: ["keel-deformed", "breast-blister", "behavior-depressed", "gait-lameness"],
    description: "Fractures or deformities of the keel (breastbone), very common in laying hens. Caused by impacts with perches, other birds, or cage structures. Can affect up to 80% of hens in some flocks. Breast blisters may develop over deformities." },

  { name: "Tibial Dyschondroplasia", category: "Musculoskeletal", birds: ["chick"],
    matches: ["gait-lameness", "legs-deformed", "gait-reluctance", "body-stunted", "behavior-depressed"],
    description: "Abnormal cartilage plug forms in the growth plate of the tibia, weakening the bone. Common in fast-growing birds. Can cause bowing of the legs and spontaneous fractures. Related to rapid growth and nutritional factors." },

  { name: "Osteomyelitis", category: "Musculoskeletal", birds: ["hen", "rooster", "chick"],
    matches: ["gait-lameness", "legs-swelling", "joint-swelling", "behavior-depressed", "behavior-reduced-appetite", "behavior-weakness"],
    description: "Bacterial infection of the bone, often from hematogenous spread (through the blood) from another infection site. Causes swelling, heat, and pain at the affected bone. Requires prolonged antibiotic treatment." },

  { name: "Valgus-Varus Deformity (Twisted Legs)", category: "Musculoskeletal", birds: ["chick"],
    matches: ["legs-deformed", "gait-lameness", "gait-reluctance", "body-stunted"],
    description: "Legs angle inward (valgus) or outward (varus) at the hock joint. Common in fast-growing broilers. Caused by rapid growth, genetics, slippery surfaces, or nutritional factors. Cannot be corrected once established." },

  // ────────────────────────────────────────────
  // TUMORS / CANCER
  // ────────────────────────────────────────────
  { name: "Squamous Cell Carcinoma", category: "Tumors", birds: ["hen", "rooster"],
    matches: ["skin-lesions", "body-lump", "face-lump", "mouth-lesions", "behavior-depressed", "weight-loss"],
    description: "Malignant skin tumor most common on the head, face, and feet. Appears as a raised, ulcerated mass. Can occur in the mouth or around the eyes. Surgical removal is possible if caught early." },

  { name: "Lipomas / Liposarcomas", category: "Tumors", birds: ["hen", "rooster"],
    matches: ["body-lump", "wings-lump", "abdomen-enlarged", "weight-loss", "behavior-depressed"],
    description: "Lipomas are benign fatty tumors, liposarcomas are their malignant form. Appear as soft, movable lumps under the skin. More common in obese or older birds. Lipomas are harmless unless they impede movement." },

  { name: "Testicular Tumors", category: "Tumors", birds: ["rooster"],
    matches: ["abdomen-enlarged", "behavior-depressed", "weight-loss", "feathers-color-change", "sound-reduced-crow"],
    description: "Tumors of the testes causing abdominal enlargement and feminization - the rooster may develop hen-like plumage and stop crowing. Sertoli cell tumors produce estrogen causing these changes." },

  // ────────────────────────────────────────────
  // TRAUMATIC / INJURIES
  // ────────────────────────────────────────────
  { name: "Predator Attack Injuries", category: "Traumatic", birds: ["hen", "rooster", "chick"],
    matches: ["body-bleeding", "skin-lesions", "feathers-loss", "behavior-depressed", "behavior-weakness", "wings-drooping", "gait-lameness", "vent-bleeding"],
    description: "Injuries from dogs, hawks, raccoons, foxes, or other predators. May include puncture wounds, lacerations, feather loss, and broken bones. Clean wounds, apply antibiotic ointment, and isolate in a warm quiet space for recovery." },

  { name: "Beak Injuries", category: "Traumatic", birds: ["hen", "rooster", "chick"],
    matches: ["beak-injury", "body-bleeding", "behavior-reduced-appetite", "difficulty-swallowing", "behavior-depressed"],
    description: "Cracked, broken, or partially torn beaks from impacts, fighting, or getting caught in wire. Upper beak injuries are more serious as the blood supply is close. Minor cracks may heal, severe breaks may need veterinary care." },

  { name: "Beak Deformities (Scissors Beak / Cross Beak)", category: "Musculoskeletal", birds: ["hen", "rooster", "chick"],
    matches: ["beak-deformed", "behavior-reduced-appetite", "weight-loss", "body-stunted"],
    description: "The upper and lower beak don't align properly, crossing to one side. Can be genetic or from injury. Mild cases can eat normally with deep feed dishes. Severe cases struggle to eat and may need regular beak trimming." },

  { name: "Eye Injuries", category: "Traumatic", birds: ["hen", "rooster", "chick"],
    matches: ["eye-closed", "eye-discharge", "eye-cloudy", "body-bleeding", "behavior-depressed"],
    description: "From pecking, fighting, scratches, or foreign objects. The eye may be swollen shut, cloudy, or bleeding. Minor injuries may heal with antibiotic eye drops. Severe injuries can cause permanent blindness in that eye." },

  { name: "Broken Blood Feathers", category: "Traumatic", birds: ["hen", "rooster", "chick"],
    matches: ["body-bleeding", "wings-drooping", "feathers-dull", "behavior-depressed"],
    description: "A new growing feather (blood feather) is broken, causing continuous bleeding from the feather shaft. Can be life-threatening if not stopped. The broken feather shaft must be pulled out completely with pliers to stop bleeding." },

  { name: "Pecking Injuries / Cannibalism", category: "Behavioral", birds: ["hen", "rooster", "chick"],
    matches: ["feathers-pecked", "feathers-loss", "body-bleeding", "skin-lesions", "vent-bleeding", "behavior-depressed", "behavior-reduced-appetite"],
    description: "Aggressive feather pecking and cannibalism from overcrowding, boredom, nutritional deficiency, or excessive light. Can escalate from feather pulling to skin wounds to death. Address root cause: reduce density, add enrichment, check nutrition." },

  { name: "Rooster Mating Injuries", category: "Traumatic", birds: ["hen"],
    matches: ["feathers-loss", "skin-lesions", "skin-reddening", "body-bleeding", "back-arched", "behavior-depressed"],
    description: "Feather loss and skin damage on the hen's back and head from repeated mating. An aggressive or heavy rooster can cause severe wounds. Hen saddles (protective vests) can help. Maintain proper rooster-to-hen ratio (1:8-10)." },

  { name: "Spur Injuries", category: "Traumatic", birds: ["hen", "rooster"],
    matches: ["spur-issue", "body-bleeding", "skin-lesions", "gait-lameness", "behavior-depressed"],
    description: "Overgrown rooster spurs can curl into the leg causing self-injury. Spurs can also inflict deep puncture wounds on hens or handlers during mating or aggression. Spurs can be trimmed, filed, or have the sheath removed." },

  // ────────────────────────────────────────────
  // OTHER / MISCELLANEOUS
  // ────────────────────────────────────────────
  { name: "Gout (Visceral and Articular)", category: "Metabolic", birds: ["hen", "rooster", "chick"],
    matches: ["joint-swelling", "gait-lameness", "gait-reluctance", "behavior-depressed", "behavior-reduced-appetite", "droppings-white", "sudden-death", "foot-swelling"],
    description: "Uric acid crystals deposit in joints (articular gout) or on internal organs (visceral gout) due to kidney failure. Joint gout causes painful swollen joints with white chalky deposits. Often from high-protein diets, dehydration, or kidney damage." },

  { name: "Hernia", category: "Musculoskeletal", birds: ["hen", "rooster"],
    matches: ["abdomen-enlarged", "body-lump", "behavior-depressed", "egg-reduced"],
    description: "Abdominal muscles separate allowing internal organs to bulge under the skin. Most common in heavy-breed laying hens. The abdomen appears distended and a soft mass may be palpable. Rarely life-threatening but irreversible." },

  { name: "Cataracts", category: "Ophthalmologic", birds: ["hen", "rooster", "chick"],
    matches: ["eye-cloudy", "eye-blindness", "gait-ataxia", "behavior-depressed"],
    description: "Clouding of the eye lens causing progressive blindness. Can be from Marek's Disease, avian encephalomyelitis, ammonia exposure, nutritional deficiency, or age. Birds adapt surprisingly well to partial blindness." },

  { name: "Glaucoma", category: "Ophthalmologic", birds: ["hen", "rooster"],
    matches: ["eye-enlargement", "eye-cloudy", "eye-blindness", "behavior-depressed"],
    description: "Increased pressure inside the eye causing the eye to enlarge (buphthalmos). Can be inherited or secondary to infection/inflammation. The enlarged eye is diagnostic. No practical treatment in poultry." },

  { name: "Anemia", category: "Metabolic", birds: ["hen", "rooster", "chick"],
    matches: ["comb-pale", "behavior-depressed", "behavior-weakness", "tires-easily", "behavior-reduced-appetite", "egg-reduced"],
    description: "Reduced red blood cells from many causes: parasites (mites, worms, coccidia), blood loss, infection (CIA, Leucocytozoonosis), or nutritional deficiency (iron, B12, folic acid). Treat the underlying cause." },

  { name: "Severe Feather Pecking", category: "Behavioral", birds: ["hen", "rooster", "chick"],
    matches: ["feathers-pecked", "feathers-loss", "skin-reddening", "skin-lesions", "behavior-depressed", "body-bleeding"],
    description: "A vice behavior where birds obsessively peck and pull feathers from flock mates. Different from normal grooming pecking. Causes stress, skin damage, and can escalate to cannibalism. Address overcrowding, diet, lighting, and boredom." },

  { name: "Breast Blister", category: "Musculoskeletal", birds: ["hen", "rooster"],
    matches: ["breast-blister", "behavior-depressed", "keel-deformed", "gait-lameness"],
    description: "Fluid-filled swelling over the keel bone from pressure sores. Common in heavy birds resting on hard surfaces, or in birds with keel deformities or Mycoplasma synoviae infection. Improve bedding and perch padding." },

  { name: "Epidermoid Cysts", category: "Musculoskeletal", birds: ["hen", "rooster"],
    matches: ["body-lump", "feathers-loss", "skin-lesions"],
    description: "Benign cysts filled with keratinous material, usually found under the skin. Appear as firm, round, movable lumps. Can develop in feather follicles. Surgical removal is curative if they become problematic." },

  { name: "Feather Follicle Cysts", category: "Musculoskeletal", birds: ["hen", "rooster"],
    matches: ["body-lump", "feathers-loss", "skin-lesions", "feathers-dull"],
    description: "A feather grows inward instead of outward, creating a cyst in the follicle that fills with keratinous material. Most common on the wings. The cyst must be surgically opened and the abnormal follicle removed." },

  // ────────────────────────────────────────────
  // NORMAL PROCESSES
  // ────────────────────────────────────────────
  { name: "Molting (Normal)", category: "Normal", birds: ["hen", "rooster"],
    matches: ["feathers-loss", "feathers-dull", "feathers-molts", "egg-not-laying", "egg-reduced", "behavior-reduced-appetite", "behavior-depressed", "comb-shriveled", "comb-pale"],
    description: "Completely normal annual process. Chickens shed and regrow feathers, usually in fall. They look terrible and stop laying eggs. Boost protein (mealworms, sunflower seeds). Avoid handling - new pin feathers are very sensitive." },

  { name: "Broodiness (Normal)", category: "Normal", birds: ["hen"],
    matches: ["behavior-nestbox", "behavior-reduced-appetite", "feathers-loss", "behavior-depressed", "egg-not-laying", "behavior-scratching"],
    description: "Hormonal state where a hen wants to sit on and hatch eggs. She refuses to leave the nest, puffs up, growls, and pecks when disturbed. Normal behavior. Can be 'broken' by placing in a wire-bottom cage for 3-4 days if no hatching desired." },
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
