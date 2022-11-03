const mongoose = require('mongoose');
// appel du modul pour utiliser les variable d'environnement
const dotenv = require('dotenv');
const result  = dotenv.config();

const jesaispas = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}`
const jesais = 'mongodb+srv://cl:finOpc@cluster1.imdqg.mongodb.net/opcProjet-7'
// connection à la base de donnée
// mongodb+srv://cl:<password>@cluster1.imdqg.mongodb.net/test
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}`,
{ useNewUrlParser: true,
  useUnifiedTopology: true, 
 })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log(`Connexion à MongoDB échouée !   :${jesais},    ${`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}` } `));
  
  
module.exports = mongoose; 