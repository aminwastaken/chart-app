import { useForm } from 'react-hook-form'

const DataDisplaySelector = (props) => {
  const { register } = useForm({
    mode: 'onChange',
  })

  return (
    <form>
      <label>Display </label>
      <select
        name="display"
        ref={register}
        onChange={(event) => props.onChange(event.target.value)}
      >
        <option value="Chart">Chart</option>
        <option value="Table">Table</option>
      </select>
    </form>
  )
}

export default DataDisplaySelector
