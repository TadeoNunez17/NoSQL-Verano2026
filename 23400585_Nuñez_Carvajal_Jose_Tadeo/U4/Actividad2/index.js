const express=require("express");
const morgan=require("morgan");
const app=express();
const port=3020;

app.use(morgan("dev"));
//1 - Par o Impar
app.get("/par/:numero",(req,res)=>{
    const numero=parseInt(req.params.numero);
    if(numero%2==0){
        res.send('El numero '+numero+' es par');
    }
    else{
        res.send('El numero '+numero+' es impar');
    }
});
//2.- Mayor de edad
app.get("/edad/:edad",(req,res)=>{
    const edad=parseInt(req.params.edad);
    if(edad>=18){
        res.send(`Eres mayor de edad`);
    }
    else{
        res.send(`Eres menor de edad`);
    }
});
//3.- Caluculadora
app.get("/calculadora/:operacion/:a/:b", (req, res) => {
    const operacion = req.params.operacion;
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    if (operacion === "suma") {
        res.send(`la suma es: ${a + b}`);
    } else if (operacion === "resta") {
        res.send(`la resta es: ${a - b}`);
    } else if (operacion === "multiplicacion") {
        res.send(`la multiplicacion es: ${a * b}`);
    } else if (operacion === "division") {
        res.send(`la division es: ${a / b}`);
    } else {
        res.send("Operación no válida");
    }
});
//4.- Tabla de multiplicar
app.get("/tabla/:numero",(req,res)=>{
    const numero=parseInt(req.params.numero);
    let tabla="";
    for(i=1;i<=10;i++){
        tabla+=`${numero} X ${i}=${numero*i}<br>`
    }
    res.send(tabla)
});
//5.- Calificacion
app.get("/calificacion/:nota",(req,res)=>{
    const nota=req.params.nota;
    if(nota<70){
        res.send(`Calificacion: Reprobado`);
    }else if(nota>=70 && nota<80){
        res.send(`Calificacion: Aprobado`);
    }else if(nota>=80 && nota<90){
        res.send(`Calificacion: Muy bien`);
    }else if(nota>=90){
        res.send(`Calificacion: Excelente`);
    }
}) 
//Puerto
app.listen(port,()=>{
    console.log("Servidor iniciado en http://localhost:"+port);
});