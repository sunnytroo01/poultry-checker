const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Tell Express where to find our HTML templates and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Our poultry data - each bird with its safe cooking temp and tips
const poultry = [
  {
    id: "chicken",
    name: "Chicken",
    icon: "drumstick-bite",
    safeTempF: 165,
    safeTempC: 74,
    color: "#e67e22",
    tips: [
      "Juices should run clear, not pink",
      "Let it rest 3 minutes after cooking",
      "Thaw in the fridge, never on the counter",
    ],
  },
  {
    id: "turkey",
    name: "Turkey",
    icon: "feather-pointed",
    safeTempF: 165,
    safeTempC: 74,
    color: "#8e44ad",
    tips: [
      "Allow 24 hours of thaw time per 5 lbs",
      "Stuff the turkey right before cooking, not ahead of time",
      "Use a meat thermometer in the thickest part of the thigh",
    ],
  },
  {
    id: "duck",
    name: "Duck",
    icon: "water",
    safeTempF: 165,
    safeTempC: 74,
    color: "#2980b9",
    tips: [
      "Score the skin to render fat properly",
      "Duck breast can be served medium-rare (130F) unlike chicken",
      "Save the rendered fat for cooking potatoes",
    ],
  },
  {
    id: "quail",
    name: "Quail",
    icon: "egg",
    safeTempF: 165,
    safeTempC: 74,
    color: "#27ae60",
    tips: [
      "Small size means it cooks fast - watch closely",
      "Great for grilling or roasting whole",
      "Brine for 1 hour for juicier results",
    ],
  },
];

// When someone visits the homepage, show them the poultry checker
app.get("/", (req, res) => {
  res.render("index", { poultry });
});

// When someone clicks a specific bird, send back its data
app.get("/check/:id", (req, res) => {
  const bird = poultry.find((b) => b.id === req.params.id);
  if (!bird) {
    return res.status(404).json({ error: "Bird not found" });
  }
  res.json(bird);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Poultry Checker is running at http://localhost:${PORT}`);
});
