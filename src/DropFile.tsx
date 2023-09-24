import './DropFile.css'
import React, {useState} from 'react'
import {getFileFromEvent, getTextFromFile, delay} from './ultils'
import Loader from './Loader'
interface DropFileProps {
  handleFile: (file: File) => void
}

function DropFile({handleFile}: DropFileProps) {

  const [fileSelected, fileSelectedSet ] = useState<Boolean>(false)
  // const [isLoading, setIsLoading] = useState(false);

  const handleEvent = (event: React.DragEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement> ) => {

    event.preventDefault();

    fileSelectedSet(true)

    let file = getFileFromEvent(event);

    if (file && file.type === 'text/csv' ) {
      return handleFile(file)
    } else {
      alert("CSV file only") 
      return (event as React.ChangeEvent<HTMLInputElement>).target.value = ''
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const inputFile = () => {
    return <input className='inputFile' type="file" id="files" onChange={(event) => handleEvent(event)}/>
  }

  const dropZone = () => {
    return (
      <div className="drop-file">
          <label htmlFor="files" className="drop-container" onDrop={(event) => handleEvent(event)} onDragOver={ (event) => handleDragOver(event)}>
              <span className="drop-title">Drop files here</span>
                or
              <input type="file" id="files" onChange={(event) => handleEvent(event)}/>
          </label>  
      </div>
    )
  } 
  
    return (
      <>
        {fileSelected ? inputFile() : dropZone()}
      </>
    )
}

export default DropFile