import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({ // esto vendria siendo lo mismo que hacer las tablas en sql //plano
    title: {
        type: String, 
        required: true, 
    }, 
    description: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    },{timestamps:true})
    
    const ArticleModel = mongoose.model('Article', ArticleSchema); //es el que con base en el esquema, va a usar esa estructura para llenar los datos //arquitecto
    export default ArticleModel;
    //