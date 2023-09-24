interface CsvData {
  rows: Record<string, string>[];
  headers: string[];
}


const arrayIsEmpty = (array: Array<any>): boolean => {
    //If it's not an array, return FALSE.
    if (!Array.isArray(array)) {
        return false;
    }
    //If it is an array, check its length property
    if (array.length === 0) {
        //Return TRUE if the array is empty
        return true;
    }
    //Otherwise, return FALSE.
    return false;
}


const getTextFromFile  = async (file: File): Promise<string> => {
    const text = await file.text();
    return text
  }

const csvTextToHeaderAndRows = (str: string, delimiter = /\s*,\s*/) => {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  var rows = str.slice(str.indexOf("\n") + 1).split("\n");
  rows = rows.map(function (row) {
    const values = row.split(/,(?! )/);
    const el = headers.reduce(function (object: any, header, index){
      object[header] = values[index]; 
      return object;
    }, {});
    return el;
  });
  return {rows, headers};
}

// const createRows2 = (dataCsv: Array<string>) => {
//   let rowsData = dataCsv.reduce(function (acumulador: Array<string>, atual: Object,) {
    
//     for (const [, value] of Object.entries(atual)) {
//       acumulador.push(value)
//     }
//     return acumulador  
//   }, []);
//   return rowsData
// }

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

const createRows = (dataCsv: Array<string>) => {
  const rows = dataCsv.map((item) => {
    let rows = []
    for (const [, value] of Object.entries(item)) {
      rows.push(value)
    }
    return rows
  })
  return rows;
}

function getFileFromEvent<T extends HTMLElement>( event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<T>): File | undefined {
  if (event.currentTarget instanceof HTMLInputElement) {
    return event.currentTarget.files?.[0];
  } else if (event.type === 'drop') {
    return (event as React.DragEvent<T>).dataTransfer.files[0];
  }
}

export { arrayIsEmpty, getTextFromFile , csvTextToHeaderAndRows, getFileFromEvent, createRows, delay } 