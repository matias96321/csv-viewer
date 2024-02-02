import React, {useRef, useState} from 'react';
import {arrayIsEmpty, csvTextToHeaderAndRows, createRows, delay, getTextFromFile } from './ultils'
import './App.css';
import DropFile from './DropFile';
import Table from './Table';
import Loader from './Loader';
import ScrollButton from './ScrollButton'
function App() {
  
  const [rows, setRows] = useState<string[][]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const csvTextToData = async (text: string ) => {
    const { headers, rows } =  csvTextToHeaderAndRows(text);
    setRows(createRows(rows));
    setHeaders(headers);
  }

  const handleFile = async (file: File ) => {
    try {
      setIsLoading(true)
      await delay(2000);
      const text = await getTextFromFile(file);
      setIsLoading(false);
      return csvTextToData(text)
    } catch (error) {
      setIsLoading(false);
    }
  }
  
  // if (isLoading) {
  //   return <div className='App-init'><Loader /></div>
  // }


  

  const initAcess = () => {
    return <><DropFile handleFile={handleFile}/></>
  }

  // if (isLoading) return <><div className='App-init'><Loader /></div></>
  

  return (
  //   <>
  //     {initAcess()}
  //     <div hidden={isLoading}>
  //       <DropFile handleFile={handleFile}/>
  //       <Table csv={{rows, headers}}/>
  //       <ScrollButton/>
  //     </div>  
  //   </>

    <>
      <div className={ arrayIsEmpty(rows) ? 'App-init' : 'App' }>
        {isLoading && <div className={'App-init'}><Loader /></div>} 
        <div hidden={isLoading}>
          <DropFile handleFile={handleFile}/>
          <Table csv={{rows, headers}}/>
          <ScrollButton/>
        </div>  
      </div>
    </>
  );
}

export default App;