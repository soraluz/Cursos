import { Evaluaciones } from "@/components/PublicData"
import styles from "@/styles/Lista_Cursos.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { loginUser } from "@/redux/reducers/actions"
import { useDispatch, useSelector } from "react-redux"
import RegistroCurso from "@/components/RegistroCurso"
import InscripcionCurso from "@/components/InscripcionCurso"
import { resetCursos } from "@/redux/reducers/reducersCursos"

export default function Lista_Cursos() {

    const [usuario, setUsuario] = useState()
    const router = useRouter()
    const dispatch = useDispatch()
    //Usuario actual
    const user = useSelector((state) => state.usuariosState.login)
    const usuarios= useSelector((state) => state.usuariosState.usuarios)
    const cursos = useSelector((state) => state.cursosState.cursos)

    useEffect(() => {

        setUsuario(user)

    }, [user])

    function hanledCerrar() {
        dispatch(loginUser(null))
        router.push('/')
        router.reload()
    }

    function hanledReset() {
        dispatch(resetCursos())
    }

    return (
        <div className="container">
            <h1>Listado de Cursos</h1>
            <p>Bienvenido {usuario?.perfil} : {usuario?.nombres} {usuario?.apellidos}  </p>
            <button onClick={hanledCerrar} className="btn btn-primary m-3">Cerrar Sesion</button>

            {/*  Si perfil es administrador registra cursos sino se inscribe en un curso*/}
            {usuario?.perfil == 'admin' ? <>
                <button className="btn btn-primary m-3" type="button" data-bs-toggle="modal" data-bs-target="#staticRegistroCurso">Registrar cursos</button>
            </>
                : usuario?.perfil == 'alumno' ? <button className="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#staticInscripcionCurso">Inscribirse en curso</button> : null}
            <RegistroCurso />
            <InscripcionCurso />


            {/*  Cabecera */}
            {usuario?.perfil == "alumno" ? <>
                <div className={` ${styles.cabecera} row`}>
                    <p className="col-3">Nombre</p>
                    <p className="col-3">Nivel</p>
                    <p className="col-3">Profesor</p>
                    <p className="col-3">Nota</p>
                </div>
                {/*  Cursos */}
                {usuario?.cursos?.map((id_curso) => {
                    const curso = cursos.filter((c) => c.id_curso == id_curso)
                    const profesor= usuarios.filter((user)=> user.id_usuario == curso[0]?.id_profesor)
                    // const resultado = Evaluaciones.filter((nota) => nota.id_curso == curso[0].id_curso && nota.id_usuario == usuario.id_usuario)

                    return (
                        <>
                            <div key={curso[0]?.id_curso} className={` ${styles.contenedor} row`} >

                                <>
                                    <p className="col-3">{curso[0]?.nombre}</p>
                                    <p className="col-3">{curso[0]?.nivel}</p>
                                    <p className="col-3">{profesor[0]?.nombres} {profesor[0]?.apellidos}</p>
                                    {/*  <p className="col-3">{resultado[0]?.nota}</p> */}

                                </>
                            </div>
                        </>)
                })
                }
            </> : usuario?.perfil == "profesor" ? <>
                {/*  Cabecera */}
                <div className={` ${styles.cabecera} row`}>
                    <p className="col-6">Nombre</p>
                    <p className="col-6">Nivel</p>
                </div>
                {/*  Cursos */}
                {cursos.filter((curso)=> curso.id_profesor== user.id_usuario)
                .map((curso) => {

                    return (<div className={` ${styles.contenedor} row `} >
                        <p className="col-6"><Link href={`/cursos/${curso?.id_curso}`}> {curso?.nombre}</Link> </p>
                        <p className="col-6">{curso?.nivel} </p>
                    </div>)
                })
                }

            </> : <>
                {/*  Cabecera */}
                <div className={` ${styles.cabecera} row`}>
                    <p className="col-4">Nombre</p>
                    <p className="col-4">Nivel</p>
                    <p className="col-4">Profesor</p>
                </div>
                {/*  Cursos */}
                {cursos.map((curso) => {

                    return (
                        <div className={` ${styles.contenedor} row `} >
                            <p className="col-4"><Link href={`/cursos/${curso?.id_curso}`}> {curso?.nombre}</Link> </p>
                            <p className="col-4">{curso?.nivel} </p>
                            <p className="col-4">{curso?.id_profesor} </p>
                        </div>
                    )
                })}

            </>
            }
            {/* <button onClick={hanledReset} >Resetear Cursos</button> */}
        </div >
    )
}