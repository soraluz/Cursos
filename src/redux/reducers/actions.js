import { registerUsuario, loginUsuario, inscribirCurso  } from './reducerUsuarios'
import { registerCurso } from './reducersCursos'

export const createUsuario= (input)=> (dispatch)=>{
    input.id_usuario=uuid.v1()
    dispatch(registerUsuario(input))
    return input
}

export const agregarCurso= (id)=> (dispatch)=>{
    
    dispatch(inscribirCurso(id))
}

export const loginUser = (login)=> (dispatch)=>{
   // const usuario= Usuarios.find((user)=> user.correo == login.correo && user.contrasena == login.contrasena && user.perfil == login.perfil)
    //console.log(usuario)    
    dispatch(loginUsuario(login))
}

export const createCurso= (input)=> (dispatch)=>{
    input.id_curso=uuid.v1()
    dispatch(registerCurso(input))
}