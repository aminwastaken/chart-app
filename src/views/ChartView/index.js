import loadData from '../../utils/loadData'
import { useAsync } from 'react-async'
import { useState, useEffect } from 'react'
import BarChart from '../../components/BarChart'
import sortNearEarthObjects from '../../utils/sortNearEarthObjects'
import LoadingScreen from '../../components/LoadingScreen'
import PlanetSelector from '../../components/PlanetSelector'
import Table from '../../components/Table'
import DataDisplaySelector from '../../components/dataDisplaySelector'
import { CSVLink, CSVDownload } from 'react-csv'

const ChartView = () => {
  const { data, error, isLoading } = useAsync({ promiseFn: loadData }) // getting json data from async function
  const [output, setOutput] = useState('') // the output displayed on the page
  const [planet, setPlanet] = useState('All')
  const [display, setDisplay] = useState('Chart')
  const title = ['NEO Name', 'Min estimated Diameter', 'Max estimated Diameter']

  useEffect(() => {
    if (isLoading) setOutput(<LoadingScreen title="getting data" />) // this loading screen is displayed as long as the data is not ready
    if (error) setOutput(<h1>Something went wrong</h1>) // the error page the user gets when the requests fails
    if (data) {
      let nearEarthObjects = []
      sortNearEarthObjects(data.near_earth_objects) // sorting near earth object by average diameter

      if (planet !== 'All') {
        // if the user chooses a specific planet, the data gets filtered before calling the chart
        data.near_earth_objects.forEach((near_earth_object) => {
          for (
            let i = 0;
            i < near_earth_object.close_approach_data.length;
            i++
          ) {
            if (
              near_earth_object.close_approach_data[i].orbiting_body === planet
            ) {
              nearEarthObjects.push(near_earth_object)
              break
            }
          }
        })
      } else nearEarthObjects = data.near_earth_objects

      let chartBody = nearEarthObjects.map((item) => [
        item.name,
        item.estimated_diameter.kilometers.estimated_diameter_min,
        item.estimated_diameter.kilometers.estimated_diameter_max,
      ])
      setOutput([
        <PlanetSelector onChange={(value) => setPlanet(value)} />,
        <DataDisplaySelector onChange={(value) => setDisplay(value)} />,
        <CSVLink data={[title].concat(chartBody)}>Download CSV file</CSVLink>,
      ])
      if (display === 'Table') {
        setOutput((output) => (
          <>
            {output}
            <Table title={title} body={chartBody} />
          </>
        ))
      } else if (display === 'Chart') {
        setOutput((output) => (
          <>
            {output}
            <BarChart
              header={title}
              body={chartBody}
              vTitle="NEO Name"
              hTitle="Min estimated Diameter"
            />
          </>
        ))
      }
    }
  }, [
    display, // can be chart or table
    planet, // filtering data based on the planet
    data, // the useEffect function gets called whenever 'data', error' and 'isLoading' are updated
    error,
    isLoading,
  ])

  return output
}

export default ChartView
