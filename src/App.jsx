import { useEffect, useState } from "react"
import ScoreBoard from "./components/ScoreBoard"
import apple from './images/apple.PNG'
import avocado from './images/avocado.PNG'
import banana from './images/banana.jpg'
import pear from './images/pear.PNG'
import pineapple from './images/pineapple.jpg'
import greenpear from './images/greenpear.jpg'
import blank from './images/blank.png'

//how big you are gonna make your board
const width = 8

//creating an array of all candy colors
const candyColor = [
  // 'lightcoral',
  // 'violet',
  // 'mediumslateblue',
  // 'mediumaquamarine',
  // 'cyan',
  // 'pink',

  apple,
  avocado,
  banana,
  pear,
  pineapple,
  greenpear
]


const App = () => {
  //setting state for color
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  //setting state for image information
  const [squareBeingDragged, setSqaureBeingDragged] = useState(null)
  const [squareBeingReplaced, setSqaureBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)//setting state for score

  const checkForColumnsOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnsOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      //defining blank
      const isBlank = currentColorArrangement[i] == blank

      //checking if each are the same as the first one
      if (columnsOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        //if the color is the same we shall replace with an empty string
        setScoreDisplay((score) => score + 4)
        columnsOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  //function that checks for row of four
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]// first color we loop around
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = currentColorArrangement[i] == blank

      if (notValid.includes(i)) continue

      //checking if each are the same as the first one
      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        //if the color is the same we shall replace with an empty string
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }
  //function that checks for columns of three
  const checkForColumnsOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnsOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] == blank

      //checking if each are the same as the first one
      if (columnsOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        //if the color is the same we shall replace with an empty string
        columnsOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  //function that checks for row of three
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]// first color we loop around
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] == blank

      if (notValid.includes(i)) continue

      //checking if each are the same as the first one
      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        //if the color is the same we shall replace with an empty string
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  //function that makes square move down after they check that it is empyy
  const moveIntoSqaureBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7] //defining first row
      const isFirstRow = firstRow.includes(i) //confirming first row

      if (isFirstRow && currentColorArrangement[i] === blank) { //checking if it is first row and has empty squares
        let randomNumber = Math.floor(Math.random() * candyColor.length)
        currentColorArrangement[i] = candyColor[randomNumber]
      }


      if ((currentColorArrangement[i + width]) === blank) { // if the one we are at is empty 
        currentColorArrangement[i + width] = currentColorArrangement[i]// the we shall change it to the one that is above
        currentColorArrangement[i] = blank
      }
    }
  }

  console.log(scoreDisplay)

  //USE THIS TO PICK OUT ID OF THE SQUARE WE ARE GRABBING
  const dragStart = (e) => {
    // console.log(e.target)
    // console.log('drag start')
    setSqaureBeingDragged(e.target)
  }
  const dragDrop = (e) => {
    // console.log(e.target)
    // console.log('drag drop')
    setSqaureBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    // console.log(e.target)
    // console.log('drag end')
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')// changes the color of sqaure being replaced with the sqaure being dragged 
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')// changes the color of squre being dragged with the sqaure being replaced 

    // console.log('squareBeingDraggedId',squareBeingDraggedId)
    // console.log('squareBeingReplacedId ',squareBeingReplacedId )

    //defining valid moves
    // setting conditions for when a color should change 
    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]
    const validMove = validMoves.includes(squareBeingReplacedId) //if the numbers above include the id of the squarebeingreplaced then it is a valid move

    const isAColumnOfFour = checkForColumnsOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnsOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSqaureBeingDragged(null)
      setSqaureBeingReplaced(null)
    } else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')// change it back
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')// change it back
      setCurrentColorArrangement([...currentColorArrangement])
    }
  }

  //function that creates board 
  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColor[Math.floor(Math.random() * candyColor.length)] //obtain a random color by obtaining random color
      randomColorArrangement.push(randomColor)
    }
    // console.log(randomColorArrangement)
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  //creating a use effect that checks ever 1000milsec
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnsOfFour()
      checkForRowOfFour()
      checkForColumnsOfThree()
      checkForRowOfThree()
      moveIntoSqaureBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)

  }, [checkForColumnsOfFour, checkForRowOfFour, checkForColumnsOfThree, checkForRowOfThree, moveIntoSqaureBelow, currentColorArrangement])

  // console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index: number) => (
          <img
            key={index}
            // style={{ backgroundColor: candyColor }}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragEnter={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragLeave={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
}

export default App;
