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
      return alert("Somente Arquivos csv")
      }

    event.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      if (!e.target) {return}

      const text = (e.target.result) as string

      let csvArray = csvToArray(text)
      // console.log(csvArray);
      setCsv(csvArray);

      // handleCsv(array)

    };
    
    reader.readAsText(event.target.files[0])
  }

  const csvToArray = (str: string, delimiter = ",") => {
    
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    
    const headersss = str.slice(0, str.indexOf("\n"));

    const resultadoArquivoCSV  = headersss.split(/\s*,\s*/)

    setHeaders(resultadoArquivoCSV)
    
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
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

  const rowToColum = (data: objType) => {

    let dataA = []
    
    for (const [key, value ]  of Object.entries(data)) {
      dataA.push(value);
    }

    return ( 
      <>
        {dataA.map((item: any) => {
          return (
            <td>{item}</td>
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
              let result = rowToColum(item)
              return (
                <tr className='table-row'>
                  <th>{index}</th>
                  {result}
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
