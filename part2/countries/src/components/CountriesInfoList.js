import {Country} from "./Country";

export const CountriesInfoList = ({countries, filter, setFilter}) => {
    console.log("received ctys = ", countries)
    const filtered = countries.filter(country => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))

    let root
    if (filtered.length > 10) {
        root = (<div>Too many matches, specify another filter</div>)
    }
    else if (filtered.length > 1) {
        root = (
            <div>
                <ul>
                    {filtered.map((country, index) =>
                         // We can just use the index as we know that this list is unlikely to change (at least in the duration which the webpage is loaded)
                        <li key={index}>{country.name.common}
                            <button onClick={() => {setFilter(country.name.common)}}>show</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    } else if (filtered.length === 1) {
        const country = filtered[0]
        root = <Country country={country}/>
    } else {
        root = (<div>No countries found</div>)
    }

    return root
}