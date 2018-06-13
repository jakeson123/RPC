//llamado a Javascrip "strict"

'user strict';
//cargar mongoose y el Schema
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

//definir un nuevo schema
var ImagenesSchema = new Schema({
    titulo: {
        type: String,
        require: "El nombre de la imagen es obligatoria"
    },
    extension: {
        type: String,
        require: "La exension de la imagen es obligatoria"
    },
    ruta:{
        type: String
        //require: "La ruta de la imagen es obligatoria"
    },
    descripcion: {
        type: String,
        require: "La descripcion de la imagen es obligatoria"
    },
    lugar: {
        type: String,
        require: "Nombre del departamento obligatoro"
    },
    tipo: {
        type: String,
        require: "tipo de actividad es obligatora"
    },
    actividades: {
        type: String,
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    telefono: {
        type: Number,
        min: 7
    },
    tipo: {
        type: String
    },
    telefono: {
        type: String
    },
    geolocalizacionX: {
        type: Number,
        require:"Ingrese un lugar, y agregelo a través de la lista"
    },
    geolocalizacionY: {
        type: Number,
        require:"Ingrese un lugar, y agregelo a través de la lista"
    }
}, {
    collection: 'imagenes'
});

mongoose.model('Imagen', ImagenesSchema);

//cargar mongoose y el Schema
/*var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var img_schema= new Schema({
    title:{type: String,required:true}
 });
 var Imagen = mongoose.model("Imagen", img_schema);
 module.exports= Imagen;*/
