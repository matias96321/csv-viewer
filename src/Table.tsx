import './Table.css'

interface TableData {
    csv?: {
        rows: Array<string[]>;
        headers: Array<string>;
    }
    default?: { }
}

interface dataCsv {
    rows: Array<string[]>,
    headers: string[]
}


function Table(propsTable: TableData){

    const renderTableCsv = (dataCsv: dataCsv) => {

        const { rows, headers } = dataCsv

        const renderTableBody = (rows: Array<string[]>) => {
            const renderTableCell = (row: Array<string>) => {
              return <>{ row.map((cell: string, index: number) => <td key={index}>{cell}</td> )}</>
            }
            const renderTableRow = (rows: Array<string[]>) => {
              return <>{rows.map((row: Array<string>, index: number) => <tr className='table-row' key={index}><th>{index + 1}</th> {renderTableCell(row)}</tr>)}</>  
            }
            return <>{renderTableRow(rows)}</>
        }

        const renderHeader = (headers: Array<string>) => {
            return headers.map(head => <th className='title-headers'>{head}</th>)
        }

        return (
            <div className="table-div">
                <table className="table">
                    <thead className='headers'>
                        <tr>
                            {rows[0] ? <th className='title-header-empty'>#</th>: null}
                            {renderHeader(headers)}
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableBody(rows)}
                    </tbody>
                </table>
            </div>
        )
    }

    // const renderTableDefault = (dataTable: Object) => {
    //     return ( 
    //         <></>
    //     )
    // }

    if (propsTable.csv) 
    return <>{renderTableCsv(propsTable.csv)}</>

    // if (propsTable.default) 
    // return <>{renderTableDefault(propsTable.default)}</>

    return null
}

export default Table