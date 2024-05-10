import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import styles from '@/styles/RegistroCurso.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { agregarCurso } from '@/redux/reducers/actions'

export default function InscripcionCurso() {
  
  const [input, setInput] = useState({
    nombre: ''
  })

  const [errors, setErrors] = useState({})
  const dispatch =useDispatch()

  const {cursos}= useSelector(state => state.cursosState)


  function validate(input) {
        
    let errors = {}
    let expLetras = /^[A-Za-z\sÀ-ÿ\u00f1\u00d1]+$/
   
    if (!input.nombre) {
      errors.nombre = 'Curso es requerido'
    } else if (!expLetras.test(input.nombre)) {
      errors.nombre = 'Curso es invalido'
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

  function handleSubmit(id) {
 
   //Añadir curso a alumno

   dispatch(agregarCurso(id))
  
   //  router.reload()
    
}


  return (
    <div className={`modal fade ${styles.contenedor}`} id='staticInscripcionCurso' data-bs-backdrop='static'>
      <div className={`modal-dialog modal-dialog-centered`}>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Seleccione Cursos</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            
              <input
                name='nombre'
                type='text'
                className={`form-control ${styles.input}`}
                placeholder='buscar curso'
                value={input.nombre}
                onChange={handleChange}
                autoFocus
              ></input>
              {errors.nombre ? <p className={styles.error}>{errors.nombre}</p> : null}
              
              <div>
                { cursos?.map((curso)=> {
                    return <div className='row' key={curso.id_curso}>
                    <p className='col-3'>{ curso.nombre } </p>
                    <p className='col-3'>{ curso.nivel }</p>  
                    <p className='col-3'>{ curso.id_profesor } </p>
                    <button className='col-3' onClick={()=>handleSubmit( curso.id_curso )}>Añadir</button>
                    </div>
                })}
              </div>

           
          </div>
          <div className='modal-footer'></div>
        </div>
      </div>
    </div>
  )
}