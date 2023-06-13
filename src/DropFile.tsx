import './DropFile.css'
import React, {useState} from 'react'

interface DropFileProps {
    handlerFiles: (file: File) => Promise<void>
}

function DropFile({handlerFiles}: DropFileProps) {
  
  const [fileSelected, fileSelectedSet ] = useState<Boolean>(false)


  const handleFile = (event: React.DragEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement> ) => {
    
    event.preventDefault();
 
    let file: any

    if('files' in event.target){

      file = event.target.files![0]

      handlerFiles(file)
    
    } else if('dataTransfer' in event){
    
      file = event.dataTransfer.files[0]

      handlerFiles(file)
    
    }

    if (file.type !== 'text/csv'){
      return alert("CSV file only")
    }

    fileSelectedSet(true)
    
    return
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const inputFile = () => {
    return <input className='inputFile' type="file" id="files" onChange={(event) => handleFile(event)}/>
  }

  const dropZone = () => {
    return (
      <div className="drop-file">
          <label htmlFor="files" className="drop-container" onDrop={(event) => handleFile(event)} onDragOver={ (event) => handleDragOver(event)}>
              <span className="drop-title">Drop files here</span>
                or
              <input type="file" id="files" onChange={(event) => handleFile(event)}/>
          </label>  
      </div>
    )
  } 


    return (
      <>
        {fileSelected ? inputFile() : dropZone() }
      </>
    )
}

export default DropFile