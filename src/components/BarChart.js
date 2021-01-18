import Chart from 'react-google-charts'

const BarChart = ({ header, body, vTitle, hTitle }) => {
  const data = [header].concat(body)
  const chartHeight = data.length * 90 + 'px'
  return (
    <Chart
      width={'1400px'}
      height={chartHeight}
      chartType="BarChart"
      loader={<div>Loading Chart ...</div>}
      data={data}
      options={{
        vAxis: { title: vTitle },
        hAxis: { title: hTitle, minValue: 0 },
        legend: 'top',
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  )
}

export default BarChart
