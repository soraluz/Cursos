import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import styles from '@/styles/RegistroCurso.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCurso } from '@/redux/reducers/actions'

export default function RegistroCurso() {
  const router = useRouter()
  const [input, setInput] = useState({
    nombre: '',
    nivel: '',
    id_profesor: ''
  })
  const [errors, setErrors] = useState({})
  const dispatch =useDispatch()
  const { usuarios }= useSelector((state)=> state.usuariosState)
  const profesores= usuarios.filter((user)=> user.perfil == "profesor"
  )

  function validate(input) {
        
    let errors = {}
    let expLetras = /^[A-Za-z\sÀ-ÿ\u00f1\u00d1]+$/
   
    if (!input.nombre) {
      errors.nombre = 'Nombre es requerido'
    } else if (!expLetras.test(input.nombre)) {
      errors.nombre = 'Nombre es invalido'
    }

    if (!input.id_profesor) {
      errors.id_profesor = 'Nombre de profesor es requerido'
    } 

    if (!input.nivel) {
      errors.nivel = 'Nivel es requerido'
    } else if(input.nivel != "basico" && input.nivel != "intermedio" && input.nivel != "avanzado") {
        errors.nivel= 'Nivel seleccionado es incorrecto'
    }
    return errors
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
   
   const result= dispatch(createCurso(input))   
  
   //  router.reload()
    
}


  return (
    <div className={`modal fade ${styles.contenedor}`} id='staticRegistroCurso' data-bs-backdrop='static'>
      <div className={`modal-dialog modal-dialog-centered`}>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Registro de Cursos</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                name='nombre'
                type='text'
                className={`form-control ${styles.input}`}
                placeholder='Nombre de curso'
                value={input.nombre}
                onChange={handleChange}
                autoFocus
              ></input>
              {errors.nombre ? <p className={styles.error}>{errors.nombre}</p> : null}
              
             {/*  //Lista los profesores inscritos */}
              <select name='id_profesor' className='form-select mb-3' onChange={handleChange} >

                <option selected>Seleccione un profesor</option>
                { profesores.map((profesor)=> {
                  return(
                    <option value={profesor.id_usuario}>{profesor.nombres} {profesor.apellidos}</option>
                  )
                })}           
                
              </select>

              {errors.id_profesor ? <p className={styles.error}>{errors.id_profesor}</p> : null}
            
              <select name='nivel' className='form-select' onChange={handleChange} >
                <option selected>Seleccione un nivel</option>
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>

              {errors.nivel ? <p className={styles.error}>{errors.nivel}</p> : null}             

              <button
                id='boton'
                type='submit'
                className='btn btn-primary my-2 p-3'
                data-bs-dismiss='modal'
                disabled={Object.keys(errors).length ? true : false}
              >
                Añadir Curso
              </button>

            </form>
          </div>
          <div className='modal-footer'></div>
        </div>
      </div>
    </div>
  )
}
