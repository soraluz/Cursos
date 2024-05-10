import { configureStore } from '@reduxjs/toolkit'
import  usuarios  from '../reducers/reducerUsuarios' 
import cursos from '../reducers/reducersCursos'
//redux persist
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import thunk  from 'redux-thunk'


const persistConfig= {
  key: 'root',
  storage,
  whitelist: ['usuariosState','cursosState']
}

const rootReducer = combineReducers({
  usuariosState: usuarios,
  cursosState: cursos
})

const persistedReducer= persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})


/* export const store = configureStore({
  reducer: {
    alumnos : alumnos,
    cursos: cursos

  },
}) */