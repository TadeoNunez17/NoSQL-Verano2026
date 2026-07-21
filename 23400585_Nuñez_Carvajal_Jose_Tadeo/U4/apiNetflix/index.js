const express=require('express');
const morgan=require('morgan');
const app=express();
const port=3000;
const mongoose=require("mongoose")

app.use(morgan("dev"));
app.use(express.json());

//Servidor netflix
/*
mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix").then(()=>{
    console.log("Conectado correctamente a MongoDB")
}).catch((error)=>{
    console.log("Error al conectar con mongodb: ",error);
});
*/
//servidor prueba
mongoose.connect("mongodb+srv://root:Nc20050417@servidorprueba.czh89ge.mongodb.net/").then(()=>{
    console.log("Conectado correctamente a MongoDB")
}).catch((error)=>{
    console.log("Error al conectar con mongodb: ",error);
});
const peliculaSchema=new mongoose.Schema({
    titulo:{type:String,required:true,trim:true},
    genero:{type:String,required:true,trim:true},
    año:{type:Number,required:true,min:1},
    duracion:{type:Number,required:true,min:1},
    idioma:{type:String,required:true,min:1},
    calificacion:{type:Number,required:true,min:1},
    nc:{type:String,required:true,min:1},
},{
    timestamps:true
});

const serieSchema=new mongoose.Schema({
    titulo:{type:String,required:true,trim:true},
    genero:{type:String,required:true,trim:true},
    año:{type:Number,required:true,min:1},
    temporadas:{type:Number,required:true,min:1},
    episodios:{type:Number,required:true,min:1},
    idioma:{type:String,required:true,min:1},
    calificacion:{type:Number,required:true,min:1},
    nc:{type:String,required:true,min:1},
},{
    timestamps:true
});

const Peliculas=mongoose.model("Peliculas",peliculaSchema,"peliculas");
const Series=mongoose.model("Series",serieSchema,"series");
//Peliculas
app.get("/peliculas", async (req,res)=>{
    try {
        const peliculas=await Peliculas.find();
        res.json(peliculas);
    } catch(error)
    {
        res.status(500).json({
            mensaje:"Error al obtener a las peliculas",
            error:error
        });
    }
});

app.get("/peliculas/:id", async (req,res)=>{
    try{
        const id=req.params.id;
        const pelicula=await Peliculas.findById(id);
        if(!pelicula){
            return res.status(404).json({error:"Pelicula no encontrada"});
        }
        res.json(pelicula);
    }
    catch(error){
        res.status(500).json({
            mensaje:"Error al obtener la pelicula",
            error:error
        });
    }
});

app.post("/peliculas",async (req,res)=>{
    try{
        const {titulo,genero,año,duracion,idioma,calificacion,nc}=req.body;
        if(!titulo||!genero||!año||!duracion||!idioma||!calificacion||!nc){
            return res.status(400).json({
                mensaje:"Faltan datos de la pelicula"
            });
        }
        const nuevaPelicula =new Peliculas({titulo,genero,año,duracion,idioma,calificacion,nc});
        const peliculaGuardada =await nuevaPelicula.save();
        res.json({
            mensaje:"Pelicula registrada correctamente",
            pelicula:peliculaGuardada
        })
    }catch(error){
        res.status(500).json({
            mensaje:"Error agregar pelicula",
            error:error
        });
    }
});

//Series
app.get("/series", async (req,res)=>{
    try {
        const series=await Series.find();
        res.json(series);
    } catch(error)
    {
        res.status(500).json({
            mensaje:"Error al obtener las series",
            error:error
        });
    }
});

app.post("/series",async (req,res)=>{
    try{
        const {titulo,genero,año,temporadas,episodios,idioma,calificacion,nc}=req.body;
        if(!titulo||!genero||!año||!temporadas||!episodios||!idioma||!calificacion||!nc){
            return res.status(400).json({
                mensaje:"Faltan datos de la serie"
            });
        }
        const nuevaSerie =new Series({titulo,genero,año,temporadas,episodios,idioma,calificacion,nc});
        const serieGuardada =await nuevaSerie.save();
        res.json({
            mensaje:"Serie registrada correctamente",
            serie:serieGuardada
        })
    }catch(error){
        res.status(500).json({
            mensaje:"Error agregar serie",
            error:error
        });
    }
});

app.put("/peliculas/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const {titulo,genero,año,duracion,idioma,calificacion,nc}=req.body;
        if(!titulo||!genero||!año||!duracion||!idioma||!calificacion||!nc){
            return res.status(400).json({
                mensaje:"Faltan datos de la pelicula"
            });
        }
        const peliculaActualizada=await Peliculas.findByIdAndUpdate(
            id,{
                titulo,genero,año,duracion,idioma,calificacion,nc
            },{
                new:true,
                runValidators:true
            }
        );
        if(!peliculaActualizada){
            return res.status(404).json({
                mensaje:"Pelicula no encontrada"
            });
        }
        res.json({
            mensaje:"Pelicula actualizada correctamente",
            pelicula:peliculaActualizada
        })
    } catch (error) {
        res.status(500).json({
            mensaje:"Error al actualizar",
            error:error
        });
    }
});

app.delete("/peliculas/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const peliculaEliminada=await Peliculas.findByIdAndDelete(id);
        if(!peliculaEliminada){
            return res.status(404).json({error:"Pelicula no encontrada"});
        }
        res.json({
            mensaje:"Pelicula eliminada correctamente",
            pelicula:peliculaEliminada
        });
    } catch (error) {
        res.status(500).json({
            mensaje:"Error al borrar pelicula",
            error:error
        });
    }
});

app.put("/series/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const {titulo,genero,año,temporadas,episodios,idioma,calificacion,nc}=req.body;
        if(!titulo||!genero||!año||!temporadas||!episodios||!idioma||!calificacion||!nc){
            return res.status(400).json({
                mensaje:"Faltan datos de la serie"
            });
        }
        const serieActualizada=await Series.findByIdAndUpdate(
            id,{
                titulo,genero,año,temporadas,episodios,idioma,calificacion,nc
            },{
                new:true,
                runValidators:true
            }
        );
        if(!serieActualizada){
            return res.status(404).json({
                mensaje:"Serie no encontrada"
            });
        }
        res.json({
            mensaje:"Serie actualizada correctamente",
            serie:serieActualizada
        })
    } catch (error) {
        res.status(500).json({
            mensaje:"Error al actualizar",
            error:error
        });
    }
});

app.delete("/series/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const serieEliminada=await Series.findByIdAndDelete(id);
        if(!serieEliminada){
            return res.status(404).json({error:"Serie no encontrada"});
        }
        res.json({
            mensaje:"Serie eliminada correctamente",
            serie:serieEliminada
        });
    } catch (error) {
        res.status(500).json({
            mensaje:"Error al borrar serie",
            error:error
        });
    }
});


app.listen(port,()=>{
    console.log("Servidor iniciado en http://localhost:"+port);
});



