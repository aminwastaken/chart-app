import Chart from 'react-google-charts'
import LoadingScreen from '../LoadingScreen'

const BarChart = ({ header, body, vTitle, hTitle }) => {
  const data = [header].concat(body)
  const chartHeight = data.length * 50 + 'px'
  return (
    <Chart
      width={'1400px'}
      height={chartHeight}
      chartArea={{ width: '100%', height: '100%' }}
      chartType="BarChart"
      loader={<LoadingScreen title="building chart" />}
      data={data}
      options={{
        colors: ['#4384F3', '#D84537'],
        vAxis: { title: vTitle },
        hAxis: { title: hTitle, minValue: 0 },
        legend: 'top',
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  )
}

export default BarChart
