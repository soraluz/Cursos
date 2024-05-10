
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usuarios: [],
  login:{}
}

export const usuariosReducer = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    registerUsuario: (state,action) => {
      state.usuarios = [...state.usuarios, action.payload ]
    },
    inscribirCurso: ( state, action) => {
      const alumno= state.usuarios.filter((alumno)=> alumno.id_usuario == state.login.id_usuario)
      alumno[0].cursos.push(action.payload)
      state.login.cursos.push(action.payload)
     
    },
    loginUsuario: (state, action) => {
      state.login = action.payload
    },
    resetState: (state) => {      
      state.alumnos = []
      }
    }
})

export const { registerUsuario, inscribirCurso, loginUsuario, resetState } = usuariosReducer.actions
//export const selectValue = (state) => state.counter.value;

export default usuariosReducer.reducer