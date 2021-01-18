import loadData from '../../utils/loadData'
import { useAsync } from 'react-async'
import { useState, useEffect } from 'react'
import BarChart from '../../components/BarChart'
import sortNearEarthObjects from '../../utils/sortNearEarthObjects'

const ChartView = () => {
  const { data, error, isLoading } = useAsync({ promiseFn: loadData }) // getting json data from async function
  const [output, setOutput] = useState('') // the output displayed on the page
  const chartTitle = [
    'City',
    'Min estimated Diameter',
    'Max estimated Diameter',
  ]
  useEffect(
    () => {
      if (isLoading) setOutput(<p>Getting data from the API ...</p>) // this loading screen is displayed as long as the data is not ready
      if (error) setOutput(<h1>Something went wrong</h1>) // the error page the user gets when the requests fails
      if (data) {
        sortNearEarthObjects(data.near_earth_objects) // sorting near earth object by average diameter
        let chartBody = data.near_earth_objects.map((item) => [
          item.name,
          item.estimated_diameter.kilometers.estimated_diameter_min,
          item.estimated_diameter.kilometers.estimated_diameter_max,
        ])

        console.log([chartTitle].concat(chartBody))
        setOutput(
          <>
            <BarChart
              header={chartTitle}
              body={chartBody}
              vTitle="NEO Name"
              hTitle="Min estimated Diameter"
            />
          </>
        )
      }
    },
    [data], // the useEffect function gets called whenever 'data', error' and 'isLoading' are updated
    [error],
    [isLoading]
  )

  return output
}

export default ChartView
