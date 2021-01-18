import './index.css'

const Table = ({ title, body }) => {
  return (
    <div className="table-wrapper">
      <div className="inner-wrapper">
        <div className="units-row">
          <hr />
          <table>
            <thead>
              <tr>
                <th></th>
                {title.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((tr, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {tr.map((td, index) => (
                      <td key={index}>{td}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
