const mongoose = require('mongoose');

const getConnection = async () => {
    try {

        const url = "mongodb+srv://stivenzps:tJrXTJlzaXXihP2B@cluster0.uwobg.mongodb.net/ing-web?retryWrites=true&w=majority&appName=Cluster0"
        
   
        await mongoose.connect(url);
        console.log('Conexion Exitosa');

    } catch (error){
        console.log(error);
    }
}
    module.exports = {
        getConnection,
    }


