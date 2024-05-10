
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cursos: []
}

export const cursosReducer = createSlice({
  name: 'cursos',
  initialState,
  reducers: {
    registerCurso: (state,action) => {
      state.cursos = [...state.cursos, action.payload ]
    },
    resetCursos:(state, action) => {
      state.cursos= []
    }
  },
})

export const { registerCurso, resetCursos } = cursosReducer.actions
//export const selectValue = (state) => state.counter.value;

export default cursosReducer.reducer