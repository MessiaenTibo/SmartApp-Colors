import IColor from "../models/IColor"
import colorData from "../assets/colorData"

export default () => {
    const getRandomColor = (oldColor?: IColor):IColor => {
        const generatedColor = colorData[Math.floor(Math.random() * colorData.length)]
        if (generatedColor === oldColor) return getRandomColor(generatedColor)
    return generatedColor
    }
    return { getRandomColor }
}