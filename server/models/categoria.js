const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  descripcion: {
    type: String,
    unique: true,
    required: [true, "La descripcion es obligatoria"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

module.exports = mongoose.model("Categoria", categoriaSchema);
