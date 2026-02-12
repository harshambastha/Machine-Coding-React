import Autocomplete from './Autocomplete';
import AutocompleteWithChips from './AutocompleteWithChips';
import './Autocomplete.css';

const AutocompleteDemo = () => {
  return (
    <div className="autocomplete-demo-container">
      <div className="demo-section">
        <h2>Simple Autocomplete</h2>
        <p>Basic search with dropdown suggestions</p>
        <Autocomplete />
      </div>
      <div className="demo-section">
        <h2>Autocomplete with Chips</h2>
        <p>Search with multi-select and chip display</p>
        <AutocompleteWithChips />
      </div>
    </div>
  );
};

export default AutocompleteDemo;
