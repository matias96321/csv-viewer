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


const getTextFromFile  = async (file: File) => {
    const text = await file.text();
    return text
  }

const csvToArray = (str: string, delimiter = /\s*,\s*/) => {
  
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  var rows = str.slice(str.indexOf("\n") + 1).split("\n");
 
  rows = rows.map(function (row) {
    
    const values = row.split(/,(?! )/);

    const el = headers.reduce(function (object: any, header, index) {

      object[header] = values[index]; 
      
      return object;
    
    }, {});
    return el;
  });
  return {rows, headers};
}


export { arrayIsEmpty, getTextFromFile , csvToArray} 