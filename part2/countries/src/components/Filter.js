export const Filter = ({query, onQueryChanged}) => (
    <div>
        find countries: <input value={query} onChange={onQueryChanged}/>
    </div>
)