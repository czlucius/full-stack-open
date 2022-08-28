const Filter = ({searchQuery, searchQueryChanged}) => (<div>
        filter shown with: <input value={searchQuery} onChange={searchQueryChanged}/>
      </div>)

export default Filter