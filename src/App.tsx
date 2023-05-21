import React, {useState} from 'react';

import './App.css';

type objType = {
  [key: string]: number | undefined | Array<any> | string;
}

function App() {
  const [csv, setCsv] = useState<string[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  
  const showFile = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) {return}
    
    if (event.target.files[0].type !== 'text/csv'){
      return alert("CSV file only")
    }

    event.preventDefault()

    const reader = new FileReader()

    reader.onload = async (e) => { 
      if (!e.target) {return}

      const csvText = (e.target.result) as string

      let csvArray = csvToArray(csvText)

      setCsv(csvArray);
    };
    
    reader.readAsText(event.target.files[0])
  }
  
  const csvToArray = (str: string, delimiter = /\s*,\s*/) => {
    
    let headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    setHeaders(headers)

    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const arr = rows.map(function (row) {
      
      const values = row.split(/,(?! )/);

      const el = headers.reduce(function (object: any, header, index) {

        object[header] = values[index]; 
        
        return object;
      
      }, {});
      return el;
    });
    return arr;
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
    <div className="App">
      <div className="btn-div" >
        <input type="file" onChange={(event) => showFile(event)} />
      </div>
      <div className="table-div">
        <table className="table">
          <thead className='headers'>
            <tr>
              {csv[0] ? <th className='title-header-empty'></th>: null}
              {headers.map(head => <th className='title-headers'>{head}</th>)}
            </tr>
          </thead>
          <tbody>
            {csv.map((item: {}, index: number) => {
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
