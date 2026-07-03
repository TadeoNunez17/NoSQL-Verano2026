Consultas
Dentro de la carpeta con tu nombre en github, crea un archivo llamado U2-Actividad1.md
Haz las consultas y pruebalas en mongoDB Compass y una vez esten correctas, en el archivo md escribelas en
formato de MongoDB shell: db["usuarios"].find()

1. Mostrar todos los libros publicados después del año 2022.
db["libros"].find({año:{$gte:2022}})

2. Mostrar los usuarios cuya edad sea mayor o igual a 21 años.
db["usuarios"].find({edad:{$gte:21}})

3. Mostrar los libros con menos de 350 páginas.
db["libros"].find({paginas:{$lte:350}})

4. Mostrar los usuarios cuya edad sea menor o igual a 20 años.
db["usuarios"].find({edad:{$lte:20}})

5. Mostrar los libros cuya categoría sea diferente de "Programación".
db["libros"].find({categoria:{$ne:"Programacion"}})

6. Mostrar los usuarios que estudien Ingeniería Informática y estén en sexto semestre o superiorMostrar los libros cuya categoría sea Programación o Bases de Datos.
db["usuarios"]ÑÑ.find({ carrera: "Ingeniería Informatica",semestre:{$gte: 6}})

7. Mostrar los préstamos que no han sido devueltos y cuya duración sea mayor a 8 días.
db["libros"].find({categoria:{$in:["Programacion","Bases de Datos"]}})

8. Mostrar los libros cuyo título empiece con la letra M.
db["libros"].find({titulo:/^M/})

9. Mostrar los usuarios cuyo nombre empiece con la letra A.
db["usuarios"].find({ edad:/^A/})

10. Mostrar los libros cuyo título contenga la palabra "Base".
db["libros"].find({titulo:/Base/})

11. Mostrar únicamente el nombre y la carrera de todos los usuarios.
db["usuarios"].find({}, { "nombre": 1, "carrera": 1, "_id": 0 })

12. Mostrar únicamente el título y el autor de todos los libros.
db["libros"].find({}, { "titulo": 1, "autor": 1, "_id": 0 })

13. Mostrar únicamente el usuario y el libro de todos los préstamos.
db["prestamos"].find({}, { "usuario": 1, "libro": 1, "_id": 0 })

14. Mostrar los libros ordenados por año de publicación, del más reciente al más antiguo.
db["libros"].find().sort({año:-1})

15. Mostrar los usuarios ordenados alfabéticamente por nombre.
db["usuarios"].find().sort({nombre:1})

16. Mostrar los préstamos ordenados por la cantidad de días de préstamo, del mayor al menor.
db["usuarios"].find().sort({nombre: 1})

17. Mostrar únicamente el título y el año de los libros publicados a partir de 2022, ordenados del más reciente al más
antiguo.
db["prestamos"].find().sort({diasPrestamo: -1})

18. Mostrar unicamente el titulo y el ano de los libros publicados a partir de 2022, ordenados del más reciente al más antiguo.
db["libros"].find({año:{$gte: 2022}},{titulo: 1,año: 1,_id: 0}).sort({año: -1})

19. Mostrar el nombre y la carrera de los usuarios cuya carrera sea Ingenieria en Sistemas Computacionales o Ingeniería Informática.
db["usuarios"].find({carrera:{$in:["Ingenieria en Sistemas Computacionales","Ingenieria Informatica"]}}, {nombre: 1,carrera: 1,_id: 0})

20. Mostrar los prestamos no devueltos, ordenados por la cantidad de dias de prestamo de mayor a menor, mostrando únicamente el usuario, el libro y los dias de prestamo.
db["prestamos"].find({devuelto: false},{usuario: 1,libro: 1,diasPrestamo: 1,_id: 0}).sort({dias: -1})