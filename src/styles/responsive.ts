import { moderateScale, scale, verticalScale } from "react-native-size-matters"

// Diseño responsivo 

//Escala
export const rS = (size : number) => {
    return scale(size)
}
// Escala vertical
export const rV = (size : number)  => {
    return verticalScale(size)
}
//Escala moderada: recomendada para padding, tamos de letra, etc
export const rMS = (size : number , factor? : number) =>{
    return moderateScale(size ,factor)
}