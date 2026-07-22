const express=require('express');
const morgan=require('morgan');
const app=express();
const port=3000;
const mongoose=require("mongoose")

app.use(morgan("dev"));
app.use(express.json());
//Servidor local Host

mongoose.connect("mongodb://localhost:27017/escuelas").then(()=>{
    console.log("Conectado correctamente a MongoDB")
}).catch((error)=>{
    console.log("Error al conectar con mongodb: ",error);
});

const alumnoSchema=new mongoose.Schema({
    nombre:{type:String,required:true,trim:true},
    carrera:{type:mongoose.Schema.type.ObjectId,ref:"Carrera",required:true},
    semestre:{type:Number,required:true,min:1}
},{
    timestamps:true
});
const carreraSchema=mongoose.Schema({
    nombre:{type:String,required:true,trim:true},
    clave:{type:String,required:true,trim:true}
},{
    timestamps:true
});
const Alumnos=mongoose.model("Alumno",alumnoSchema,"alumnos");
const Carrera=mongoose.model("Carrera",carreraSchema,"carrera");
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

app.listen(port,()=>{
    console.log("Servidor iniciado en http://localhost:"+port);
});



