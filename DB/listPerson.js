const Person = require('./models/Person')

const obtener = async() => {
   const personas = await Person.find({})
   console.log(personas);
}

module.exports = obtener;
