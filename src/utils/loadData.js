//fetching data from the server and returning a json response
const loadData = async () =>
  await fetch(
    'http://www.neowsapp.com/rest/v1/neo/browse?page=0&size=20&api_key=DEMO_KEY'
  )
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json())

export default loadData
