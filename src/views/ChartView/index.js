import loadData from '../../utils/loadData'
import { useAsync } from 'react-async'
import { useState, useEffect } from 'react'
import BarChart from '../../components/BarChart'
import sortNearEarthObjects from '../../utils/sortNearEarthObjects'

const ChartView = () => {
  const { data, error, isLoading } = useAsync({ promiseFn: loadData }) // getting json data from async function
  const [output, setOutput] = useState(<h1>Welcome page</h1>) // the output displayed on the page
  const chartTitle = [
    'City',
    'Min estimated Diameter',
    'Max estimated Diameter',
  ]
  useEffect(
    () => {
      if (isLoading) setOutput(<h1>Loading screen</h1>) // this loading screen is displayed as long as the data is not ready
      if (error) setOutput(<h1>Something went wrong</h1>) // the error page the user gets when the requests fails
      if (data) {
        console.log(data.near_earth_objects)
        console.log(sortNearEarthObjects(data.near_earth_objects))
        let chartBody = data.near_earth_objects.map((item) => [
          item.name,
          item.estimated_diameter.kilometers.estimated_diameter_min,
          item.estimated_diameter.kilometers.estimated_diameter_max,
        ])
        console.log([chartTitle].concat(chartBody))
        setOutput(
          <>
            <h1>{data.near_earth_objects[0].name}</h1>
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
