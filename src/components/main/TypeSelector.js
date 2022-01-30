/**
 * @param {array} types
 * @param {int} selectedType
 * @param {function} handleTypeChange
 * @returns {JSX.Element}
 * @constructor
 */
const TypeSelector = ({types, selectedType, handleTypeChange}) => {
  return (
    <form
      className="form form--type"
      onSubmit={(e) => {e.preventDefault()}}
    >
      <label className="form__label">Vrsta testa:</label>
      <select
        className="type-selector form__input form__input--wide"
        value={selectedType}
        onChange={(e) => handleTypeChange(parseInt(e.target.value))}
      >
        {types.map(type => {
          return <option
            value={type}
            key={type}
          >Do {type}</option>
        })}
      </select>
    </form>
  )
}

export default TypeSelector;