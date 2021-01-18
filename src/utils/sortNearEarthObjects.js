const compare = (a, b) => {
  const averageA =
    (a.estimated_diameter.kilometers.estimated_diameter_min +
      a.estimated_diameter.kilometers.estimated_diameter_max) /
    2
  const averageB =
    (b.estimated_diameter.kilometers.estimated_diameter_min +
      b.estimated_diameter.kilometers.estimated_diameter_max) /
    2

  if (averageA > averageB) return -1

  if (averageA < averageB) return 1

  return 0
}

const sortNearEarthObjects = (nearEarthObjects) => {
  return nearEarthObjects.sort(compare)
}

export default sortNearEarthObjects
