export const Filter = ({query, queryChangedEventHook}) => (
    <div>
        find countries: <input value={query} onChange={queryChangedEventHook}/>
    </div>
)