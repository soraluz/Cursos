import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import styles from '@/styles/RegistroUsuario.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUsuario } from '@/redux/reducers/actions'

export default function RegistroUsuario() {
  const router = useRouter()
  const [input, setInput] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    contrasena: '',
    perfil: '',
    cursos:[]
  })
  const [errors, setErrors] = useState({})
  const dispatch =useDispatch()


  function validate(input) {
        
    let errors = {}
    let expLetras = /^[A-Za-z\sÀ-ÿ\u00f1\u00d1]+$/
    let email =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let telefono = /^[0-9]{9}$/
    let password = /^[a-zA-Z0-9_\-]{6,18}$/

    if (!input.nombres) {
      errors.nombres = 'Nombres es requerido'
    } else if (!expLetras.test(input.nombres)) {
      errors.nombres = 'Nombre es invalido'
    }

    if (!input.apellidos) {
      errors.apellidos = 'Apellidos es requerido'
    } else if (!expLetras.test(input.apellidos)) {
      errors.apellidos = 'Apellido es invalido'
    }

    if (!input.telefono) {
      errors.telefono = 'Celular es requerido'
    } else if (!telefono.test(input.telefono)) {
      errors.telefono = 'Celular es invalido'
    }

    if (!input.correo) {
      errors.correo = 'Correo es requerido'
    } else if (!email.test(input.correo)) {
      errors.correo = 'Correo es invalido'
    }

    if (!input.contrasena) {
      errors.contrasena = 'contraseña es requerido'
    } else if (!password.test(input.contrasena)) {
      errors.contrasena = 'Requiere contraseña de longitud minima 6'
    }
   
    if (input.perfil !== 'alumno' && input.perfil !== 'profesor' && input.perfil !== 'admin' ) {
      errors.perfil = 'Perfil no existe'
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

  async function handleSubmit(e) {
    e.preventDefault()
   
   const result= dispatch(createUsuario(input))
   window.localStorage.setItem('LOGIN', JSON.stringify(result))    
  
   router.push('/') 
   router.reload()
    
}

  return (
    <div className={`modal fade ${styles.contenedor}`} id='staticRegistroUsuario' data-bs-backdrop='static'>
      <div className={`modal-dialog modal-dialog-centered`}>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Registro de Usuario</h5>
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
                name='nombres'
                type='text'
                className={`form-control ${styles.input}`}
                placeholder='Nombres'
                value={input.nombres}
                onChange={handleChange}
                autoFocus
              ></input>
              {errors.nombres ? <p className={styles.error}>{errors.nombres}</p> : null}
              <input
                type='text'
                name='apellidos'
                className={`form-control ${styles.input}`}
                placeholder='Apellidos'
                value={input.apellidos}
                onChange={handleChange}
              ></input>
              {errors.apellidos ? <p className={styles.error}>{errors.apellidos}</p> : null}
              <input
                type='text'
                name='telefono'
                className={`form-control ${styles.input}`}
                placeholder='Celular'
                value={input.telefono}
                onChange={handleChange}
              ></input>
              {errors.telefono ? <p className={styles.error}>{errors.telefono}</p> : null}
              <input
                type='email'
                name='correo'
                className={`form-control ${styles.input}`}
                placeholder='Correo electrónico'
                value={input.correo}
                autoComplete="username"
                onChange={handleChange}
              ></input>
              {errors.correo ? <p className={styles.error}>{errors.correo}</p> : null}
              <div className={styles.password}>
              <input
                type='password'
                name='contrasena'
                id='contrasena'
                className={`form-control ${styles.input}`}
                placeholder='Contraseña'
                value={input.contrasena}
                onChange={handleChange}
                autoComplete="new-password"
              ></input>
               
              </div>
              {errors.contrasena ? <p className={styles.error}>{errors.contrasena}</p> : null}
              <div className={styles.password}>
              
            <select name='perfil' className='form-select' onChange={handleChange} >
                <option selected>Seleccione un perfil</option>
                <option value="alumno">Alumno</option>
                <option value="profesor">Profesor</option>
                <option value="admin">Admin</option>
              </select>
              
              </div>
              {errors.perfil ? <p className={styles.error}>{errors.perfil}</p> : null}

              <button
                id='boton'
                type='submit'
                className='btn btn-primary my-2 p-3'
                data-bs-dismiss='modal'
                disabled={Object.keys(errors).length ? true : false}
              >
                Registrarme
              </button>

            </form>
          </div>
          <div className='modal-footer'></div>
        </div>
      </div>
    </div>
  )
}
