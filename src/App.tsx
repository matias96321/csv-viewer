import React, {useState, useEffect } from 'react';
import {arrayIsEmpty, getTextFromFile , csvToArray} from './ultils'
import './App.css';
import DropFile from './DropFile';

type objType = {
  [key: string]: number | undefined | Array<any> | string;
}

// type Filess = React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>

function App() {

  const [rows, setRows] = useState<string[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  
  const handlerFiles = async (file: File ) => {

    const text = await getTextFromFile(file);

    const { headers, rows } = csvToArray(text);

    setRows(rows);

    setHeaders(headers);

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

  return (
    <div className={arrayIsEmpty(rows) ? 'App-init' : 'App'}> 
      <DropFile handlerFiles={handlerFiles} />
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
