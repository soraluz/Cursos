import { useRouter } from "next/router"
import styles from "../styles/Login.module.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "@/redux/reducers/actions"
import RegistroUsuario from "./RegistroUsuario"

export default function Login() {

    const [login, setLogin] = useState({
        correo: "",
        contrasena: "",
        perfil: ""
    })

    const [sesion,setSesion]= useState(true)
    const router = useRouter()
    const dispatch = useDispatch()
    //traemos los usuarios registrados
    const usuarios= useSelector((state)=> state.usuariosState.usuarios)  

    function  hanledClick() {
        //Se busca si los datos de login corresponde a algun usuario
       
        const usuario= usuarios.find((user)=>{
            
            return user.correo == login.correo && user.contrasena == login.contrasena && user.perfil == login.perfil
        } )
            
            if(usuario){
                // Se llena el estado login de redux
                   dispatch(loginUser(usuario))
                    router.push("/")
                    router.reload()
                    
              }else{
                  setSesion(false)
              }
            
    }

    function hanledChanged(e){
       
        setLogin({...login,
            [e.target.name]:e.target.value
        })

    }

    return (
        <div className={`container ${styles.contenedor} mt-3`} >
            <div className={styles.contenedorInterno} >
                <h1>Inicie Sesión</h1>
                <input type="text" name="correo" value={login.correo} onChange={hanledChanged} placeholder="Ingrese su Usuario" className="form-control" />
                <input type="password" name="contrasena" value={login.contrasena} onChange={hanledChanged} placeholder="Ingrese su Contraseña" className="form-control" />
                <select className="form-select" name="perfil" onChange={hanledChanged}>
                    <option selected>Seleccione Perfil</option>
                    <option value="alumno">Estudiante</option>
                    <option value="profesor">Profesor</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={hanledClick} className="btn btn-primary">Iniciar Sesión</button>
               { !sesion ? <p className="text-danger">Datos incorrectos</p> : null } 
                <p type="button" data-bs-toggle="modal" data-bs-target="#staticRegistroUsuario">Registrese</p>
               <RegistroUsuario />
            </div>

        </div>
    )
}

