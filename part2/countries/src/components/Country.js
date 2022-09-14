import {OpenWeatherInfo} from "./Weather";

export const Country = ({country}) => (
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
        <div>
            <OpenWeatherInfo city={country.capital[0]} countryCode={country.cca2}/>
        </div>
    </>
)