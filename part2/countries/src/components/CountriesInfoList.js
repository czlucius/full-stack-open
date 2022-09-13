export const CountriesInfoList = ({countries, filter}) => {
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
                    <li key={index}>{country.name.common}</li>
                    )}
                </ul>
            </div>
        )
    } else if (filtered.length === 1) {
        const country = filtered[0]
        root = (
            <>
                <div>
                    <h3>{country.name.common}</h3>
                </div>
                <div>
                    capital: {country.capital.toString() /* If the country has multiple capitals, will show as comma separated list */}
                    <br/>
                    area: {country.area}
                </div>
                <div>
                    <b>languages:</b>
                    <ul>
                        {Object.values(country.languages).map((language, index) =>
                            <li key={index}>{language}</li>
                        )}
                    </ul>
                </div>
                <div>
                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} height="200"/>
                </div>
            </>
        )
    } else {
        root = (<div>No countries found</div>)
    }

    return root
}