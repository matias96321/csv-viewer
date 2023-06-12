import React, {useState} from 'react';
import {arrayIsEmpty, getTextFromFile , csvToArray} from './ultils'
import './App.css';

type objType = {
  [key: string]: number | undefined | Array<any> | string;
}

// type Filess = React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>

function App() {

  const [rows, setRows] = useState<string[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  
  const handlerFiles = async (file: File ) => {

    const text = await getTextFromFile(file)

    const { headers, rows } = csvToArray(text)

    setRows(rows);
    setHeaders(headers)

  }
  

 
  const addTableRow = (data: objType) => {

    let row = []
    
    for (const [, value ] of Object.entries(data)) {
      row.push(value);
    }
    
    return ( 
      <>
        {row.map((item: any, index) => {
          return (
            <td key={index}>{item}</td>
          )
        })}
      </>   
    )
  }

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    event.preventDefault();

    if (!event.target.files) {return}
    
    if (event.target.files[0].type !== 'text/csv'){
      return alert("CSV file only")
    }

    const file = event.target.files[0]

    return handlerFiles(file)

  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const  file  = event.dataTransfer.files[0];
    return handlerFiles(file)
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <div className={arrayIsEmpty(rows) ? 'App-init' : 'App'}> 
      <div className="btn-div">
        <label htmlFor="files" className="drop-container" onDrop={(e) => handleDrop(e)} onDragOver={ (e) => handleDragOver(e)}>
          <span className="drop-title">Drop files here</span>
            or
          <input type="file" id="files" onChange={(event) => fileInputChangeHandler(event)}/>
        </label>  
      </div>
      <div className="table-div">
        <table className="table">
          <thead className='headers'>
            <tr>
              {headers.map(head => <th className='title-headers'>{head}</th>)}
              {rows[0] ? <th className='title-header-empty'></th>: null}
            </tr>
          </thead>
          <tbody>
            {rows.map((item: {}, index: number) => {
              return (
                <tr className='table-row'>
                  <th>{index + 1}</th>
                  {addTableRow(item)}
                </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
