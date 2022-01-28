import TypeSelectorOption from "./TypeSelectorOption";

const TypeSelector = ({types, selectedType, handleTypeChange}) => {
  return (
    <form
      className="form form--type"
      onSubmit={(e) => {e.preventDefault()}}
    >
      <label className="form__label">Vrsta testa:</label>
      <select
        className={"type-selector form__input form__input--wide"}
        value={selectedType}
        onChange={(e) => handleTypeChange(parseInt(e.target.value))}
      >
        {types.map(type => {
          return <TypeSelectorOption
            type={type}
            key={type}
          />
        })}
      </select>
    </form>
  )
}

export default TypeSelector;