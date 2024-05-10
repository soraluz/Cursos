/* import { useSelector } from "react-redux"



export default function login (req,res){  
 

    const {correo,contrasena, perfil}=req.body   

    const usuario= Usuarios.find((user)=> user.correo == correo && user.contrasena == contrasena && user.perfil == perfil)
               
        if(usuario){
          console.log("Usuario filtrado",usuario)
          return res.status(200).json(usuario)
        }else{
          return res.status(400).json({
            message:"No se encontro los datos del Usuario"
          })
        }  
      
} */