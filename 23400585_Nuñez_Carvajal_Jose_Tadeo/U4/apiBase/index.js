const express=require('express');
const morgan=require('morgan');
const app=express();
const port=3000;

app.use(morgan("dev"));

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

app.get("/alumnos",(req,res)=>{
    res.json({
        alumno:"Tadeo",
        carrera:"Ingenieria en sistemas",
        semestre:7
    });
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

app.listen(port,()=>{
    console.log("Servidor iniciado en http://localhost:"+port);
});



