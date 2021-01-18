import { useForm } from 'react-hook-form'

const PlanetSelector = (props) => {
  const { register } = useForm({
    mode: 'onChange',
  })

  return (
    <form>
      <label>Orbiting body </label>
      <select
        name="planet"
        ref={register}
        onChange={(event) => props.onChange(event.target.value)}
      >
        <option value="All">All</option>
        <option value="Earth">Earth</option>
        <option value="Juptr">Juptr</option>
        <option value="Mars">Mars</option>
        <option value="Merc">Merc</option>
      </select>
    </form>
  )
}

export default PlanetSelector
