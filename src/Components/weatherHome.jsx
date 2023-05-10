import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherDetails, setWeatherList } from '../Redux/weatherReducerSlice';
const WeatherHome = () => {
    // let [weatherList, setWeatherList] = useState([]);
    // let [weatherDetails, setWeatherDetails] = useState(null);
    const currentDate = new Date().toDateString();
    let dispatch = useDispatch()
    let { weatherList, weatherDetails } = useSelector((state) => state.weather);
    console.log(weatherList);
    console.log(weatherDetails);
    let getWeatherDetails = async (event) => {
        let value = event.target.value;
        if (event.keyCode === 13 && value !== "") {

            let isFound = weatherList.find((Details) => {
                return Details.name.toLowerCase() === value.toLowerCase();
            });
            if (isFound) {
                setWeatherDetails(isFound);
                return false;
            }
            let city = value;
            let API_KEY = '9afa0cd5d82b879a1423158ba7c8eba7'
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&units=imperial`;
            let responce = await fetch(url)
            let data = await responce.json()
            switch (Number(data.cod)) {
                case 404:
                    alert("City Not Found")
                    dispatch(setWeatherDetails(null));
                    break;
                case 200:
                    dispatch(setWeatherDetails(data))
                    dispatch(setWeatherList([...weatherList, { ...data }]));
                    break;
                default:
                    alert("Somthing went wrong")
                    dispatch(setWeatherDetails(null));
                    break;
            }
        }
    };
    useEffect(() => {
        // getWeatherDetails();
    }, [])

    return (
        <div className='container'>
                 <div>
                    <div className="main">
                    <input className="maincityname" type="text" placeholder="Enter City Name"  onKeyUp={getWeatherDetails} />
         {
             weatherDetails?( <div>
                        <div className="divmainLogo">
                            <img className="mainLogo" src={'https://openweathermap.org/img/w/' + weatherDetails.weather[0].icon + '.png'} alt="" />
                        </div>
                        <h3 className="main°C">{Math.round( weatherDetails.main.temp)}°C</h3>
                        <h3 className="weatherStatus">{weatherDetails.weather[0].main}</h3>
                        <h5 className="maindate">Today -{currentDate} </h5>
                        <h3 className="mainLocaton"><span><i className="bi bi-geo-alt-fill"></i></span>{weatherDetails.name} ({weatherDetails.sys.country})</h3>
                    </div>) : null}
                    </div>
                    <div className="cities-div">
                    {weatherList.map((cityDetails,index)=>{
                        return(
                            <div className="city" key={index}>
                            <h4>{cityDetails.name}</h4>
                            <img className="citylogo" src={'https://openweathermap.org/img/w/' + cityDetails.weather[0].icon + '.png'} alt="" />
                            <h5 className="cityinline" >{Math.round(cityDetails.main.temp_min)}°C</h5><h6 className="cityinline">{Math.round(cityDetails.main.temp_max)}°C</h6>
                        </div>
                            );
                            })}
                    </div>

                </div>
                    {
             weatherDetails?(
                    <div className="data">
                        <h2 className="highlights">Today's Highlights</h2>
                        <div className="info1">
                            <h4>Wind Status</h4>
                            <h2 className="infoStatus">{weatherDetails.wind.speed}mph</h2>
                        </div>
                        <div className="info1">
                            <h4>Humidity</h4>
                            <h2 className="infoStatus">{weatherDetails.main.humidity}mph</h2>

                        </div>
                        <div className="info1">
                            <h4>Visibility</h4>
                            <h2 className="infoStatus">{weatherDetails.visibility}</h2>

                        </div>
                        <div className="info1">
                            <h4>Air Pressuer</h4>
                            <h2 className="infoStatus">{weatherDetails.main.pressure} mb</h2>

                        </div>
                    </div>) : null}

        </div> 




    )
}
export default WeatherHome;