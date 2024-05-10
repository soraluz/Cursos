import { useParams } from "next/navigation"
import { Evaluaciones } from "@/components/PublicData"
import { useDispatch, useSelector } from "react-redux"

export default function Cursos_Alumno(){
    const dispatch= useDispatch()
    //traemos los cursos
    const {cursos}= useSelector((state)=> state.cursosState)
    
    //salvamos el id de params
    const id_curso= useParams().curso
    //Seleccionamos el curso de dicho id
    const curso= cursos.find((curso)=> curso.id_curso == id_curso)
    //traemos los usuarios de redux
    const {usuarios}= useSelector((state)=> state.usuariosState)
    console.log("todos los usuarios", usuarios)
    //Filtramos los alumnos
    let alumnos_curso=usuarios.filter((user)=>{
        return user.cursos.includes(id_curso)  && user.perfil == "alumno"
    })
    
    return(
        <div className="contenedor mt-5">
            <h1>Alumnos Inscritos en el curso {curso.nombre} </h1>
            <br />
            <div className="row">
                    <p className="col-4">Nombres</p>
                    <p className="col-4">Apellidos</p>
                    <p className="col-4">Nota</p>
                    <hr />
            </div>
            {  
               alumnos_curso.map((user)=>{
                    return (<div className="row" key={user.id_usuario}>
                        <p className="col-4">{user.nombres}</p>
                        <p className="col-4">{user.apellidos}</p>
                        <p className="col-4">{
                            Evaluaciones.filter((e)=> {
                                console.log(e)
                                return e.id_curso ==id_curso && e.id_usuario == user.id_usuario
                            }).map((e)=> e.nota)
                        }</p>
                        <hr/>
                        </div>
                        ) 
                }) 
           
                    
}
        </div>
    )
}