const express=require('express');
const morgan=require('morgan');
const app=express();
const port=3000;
const mongoose=require("mongoose")

app.use(morgan("dev"));
app.use(express.json());
//Servidor local Host
/*
mongoose.connect("mongodb://localhost:27017/escuelas").then(()=>{
    console.log("Conectado correctamente a MongoDB")
}).catch((error)=>{
    console.log("Error al conectar con mongodb: ",error);
});

const alumnoSchema=new mongoose.Schema({
    nombre:{type:String,required:true,trim:true},
    carrera:{type:String,required:true,trim:true},
    semestre:{type:Number,required:true,min:1}
},{
    timestamps:true
});
const Alumnos=mongoose.model("Alumno",alumnoSchema,"alumnos");

app.get("/",(req,res)=>{
    res.send("Hola mundo");
});

app.get("/Mensaje",(req,res)=>{
    res.send("Mensaje desde Express");
}   );

app.get("/pagina",(req,res)=>{
    const nombre="Tadeo"
    res.send(`
        <style>
        .p1{
            color:red;
            background:lightblue;
        }
        </style>
        <h1>Mi pagina web</h1>
        <p class="p1">Creada con express </p>
        <p">Hola ${nombre}</p>
    `);
});

app.get("/materias",(req,res)=>{
    res.json([{
        nombre:"NoSQl",
        hora:"8:00-11:00"
    },{
        nombre:"SP",
        hora:"13:00-15:00"
    },{
        nombre:"PW",
        hora:"14:00-16:00"
    }
    ])
});

app.get("/mensaje/:nombre",(req,res)=>{
    res.send(`Hola ${req.params.nombre}`);
});

app.get("/suma/:a/:b",(req,res)=>{
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);
    res.send(`La suma es: ${a+b}`);
});

app.get("/multiplicacion/:a/:b",(req,res)=>{
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);
    res.send(`La multiplicacion es: ${a*b}`);
});

app.get("/aleatorio",(req,res)=>{ 
    const numero=Math.floor(Math.random()*100)+1;
    res.send(`El numero aleatorio es: ${numero}`);
});

app.get("/alumnos", async (req,res)=>{
    try {
        const alumnos=await Alumnos.find();
        res.json(alumnos);
    } catch(error)
    {
        res.status(500).json({
            mensaje:"Error al obtener a los alumnos",
            error:error
        });
    }
});

app.get("/alumnos/:id", async (req,res)=>{
    try{
        const id=req.params.id;
        const alumno=await Alumnos.findById(id);
        if(!alumno){
            return res.status(404).json({error:"Alumno no encontrado"});
        }
        res.json(alumno);
    }
    catch(error){
        res.status(500).json({
            mensaje:"Error al obtener a los alumnos",
            error:error
        });
    }
});
app.post("/alumnos",async (req,res)=>{
    try{
        const {nombre,carrera,semestre}=req.body;
        if(!nombre||!carrera||!semestre){
            return res.status(400).json({
                mensaje:"Faltan datos del alumno"
            });
        }
        const nuevoAluno =new Alumnos({nombre,carrera,semestre});
        const alumnoGuardado =await nuevoAluno.save();
        res.json({
            mensaje:"Alumno registrado correctamente",
            Alumno:alumnoGuardado
        })
    }catch(error){
        res.status(500).json({
            mensaje:"Error agregar alumnos",
            error:error
        });
    }
});

app.put("/alumnos/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const {nombre,carrera,semestre}=req.body;
        if(!nombre||!carrera||!semestre){
            return res.status(400).json({
                mensaje:"Faltan datos del alumno"
            });
        }
        const alumnoActualizado=await Alumnos.findByIdAndUpdate(
            id,{
                nombre,carrera,semestre
            },{
                new:true,
                runValidators:true
            }
        );
        if(!alumnoActualizado){
            return res.status(404).json({
                mensaje:"Alumno no encontrado"
            });
        }
        res.json({
            mensaje:"Alumno actualizado correctamente",
            alumno:alumnoActualizado
        })
    } catch (error) {
        res.status(500).json({
            mensaje:"Error al actualizar",
            error:error
        });
    }
});

app.delete("/alumnos/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const alumnoEliminado=await Alumnos.findByIdAndDelete(id);
        if(!alumnoEliminado){
            return res.status(404).json({error:"Alumno no encontrado"});
        }
        res.json({
            mensaje:"Alumno eliminado correctamente",
            alumno:alumnoEliminado
        });
    } catch (error) {
        res.status(500).json({
            mensaje:"Error al borrar alumno",
            error:error
        });
    }
});
*/
//Servidor netflix
/*
mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix").then(()=>{
    console.log("Conectado correctamente a MongoDB")
}).catch((error)=>{
    console.log("Error al conectar con mongodb: ",error);
});
*/
//servidor netflix
mongoose.connect("mongodb://grupo:grupo@ac-g89jfcg-shard-00-00.ygegryf.mongodb.net:27017,ac-g89jfcg-shard-00-01.ygegryf.mongodb.net:27017,ac-g89jfcg-shard-00-02.ygegryf.mongodb.net:27017/?replicaSet=atlas-q8azcb-shard-0&authSource=admin").then(()=>{
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



