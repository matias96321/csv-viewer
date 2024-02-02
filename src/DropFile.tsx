import './DropFile.css'
import React, {MutableRefObject, useRef, useState} from 'react'
import {getFileFromEvent, getTextFromFile, delay} from './ultils'
interface DropFileProps {
  handleFile: (file: File) => void
}

function DropFile({handleFile}: DropFileProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [fileSelected, fileSelectedSet ] = useState<Boolean>(false)
  const [file, setFile] = useState<File>();

  const handleEvent = (event: React.DragEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement> ) => {

    event.preventDefault(); 

    let file = getFileFromEvent(event);
    
    if (file && file.type === 'text/csv' ) {
      setFile(file)
      handleFile(file)
      fileSelectedSet(true)
    
    } else {
      alert("CSV file only") 
      return (event as React.ChangeEvent<HTMLInputElement>).target.value = ''
    }

  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const inputFile = () => {
    if (file !== undefined) {
      return  <>
        <div className="file-data">
          <div className='file-name'>{file.name}</div>
          <button className="cssbuttons-io-button" onClick={handleButtonClick}>
            <svg className="svgIcon" viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path></svg>
            {/* <span>upload csv file</span> */}
          </button>
          <input type="file" id="file" onChange={(event) => handleEvent(event)} ref={fileInputRef}/>
        </div>
        </>
    }
  }

  const dropZone = () => {
    return (
      <div className="drop-file">
          <label htmlFor="files" className="drop-container" onDrop={(event) => handleEvent(event)} onDragOver={ (event) => handleDragOver(event)}>
              <span className="drop-title">Drop files here</span>
                or
              <input className='inputFile' type="file" id="files" onChange={(event) => handleEvent(event)}/>
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