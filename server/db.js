const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté ✅");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Serveur lancé 🚀");
    });
  })
  .catch(err => console.error("Erreur Mongo :", err));
