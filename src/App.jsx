import { useEffect, useState, useRef} from 'react';
import './styles/App.css'
import arrLeft from './img/arrow-left.png'
import arrRight from './img/arrow-right.png'
import Cell from './components/Cell';

const App = () => {
  const [town, setTown] = useState('Dubai');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    showWeather(town);
  }, [town]);

  useEffect(() => {
    containerRef.current = document.querySelector('#for-con1')
  }, []);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === 'Enter' && event.target ===searchInputRef.current) {
        document.querySelector('.search-btn').click();
      }
    };

    document.addEventListener('keydown', handleEnterKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEnterKeyPress);
    };
  }, []);

  const myGallery = [
    { slide: 0 },
    { slide: -290 },
    { slide: -580 },
    { slide: -870 },
    { slide: -1160 },
    { slide: -1450 },
    { slide: -1740 },
    { slide: -2030 },
  ];

  const rightSlide = () => {
    if (slideIndex < 7) {
      setSlideIndex(slideIndex + 1);
      const num = myGallery[slideIndex + 1].slide;
      containerRef.current.style.transform = `translateX(${num}px)`;
    }
  }
  
  const leftSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
      const num = myGallery[slideIndex - 1].slide;
      containerRef.current.style.transform = `translateX(${num}px)`
    }
  }

  const getWeekDay = (datec) => {
    const days = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[datec.getDay()];
  };

  const handleSearchClick = () => {
    const inputValue = document.querySelector('.search').value;
    setTown(inputValue);
  }

  const showWeather = async (town) => {
    try {
      setLoading(true);

      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=880b340e19134025adb60047231705&q=${town}&days=3`, {
        mode: 'cors'
      });

      const data = await response.json();
      setWeatherData(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const renderWeatherInfo = () => {
    if(loading) {
      return <div>Loading...</div>;
    } else if (Object.keys(weatherData).length === 0) {
      return <div>No data available.</div>
    } else {
      const { current, location, forecast } = weatherData;
      const gone = new Date(location.localtime);
      const weekDay = getWeekDay(gone);
      const numDays = forecast.forecastday.length;

      return (
        <div className='container'>
          <div className='current'>
            <div className='left-current'>
          <div className='left-row'>
            <p className='condition'>{current.condition.text}</p>
          </div>
          <div className='left-row'>
            <p className='city-name'>{location.name}</p>
          </div>
          <div className='left-row'>
            <p className='date'>{weekDay} {location.localtime} pm</p>
          </div>
          <div className='left-row'>
            <p className='temp'>{current.temp_c} °C</p>
          </div>
          <div className='left-row'>
            <img className='condition-img' src={current.condition.icon.substr(21)} alt=''/>
          </div>
          <div className='left-row'>
            <div className='search-box'>
              <input 
              type='text' 
              className='search' 
              placeholder='Search Location...'
              ref={searchInputRef}
              ></input>
              <div 
              className='search-btn'
              onClick={handleSearchClick}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                }
              }}
              role='button'
              tabIndex={0}
              ></div>
            </div>
          </div>
            </div>
            <div className='right-current'>
            <div className='right-row'>
              <img src='' alt='' className='right-img one'/>
              <div className='right-box'>
                <p className='right-title'>Feels Like</p>
                <p className='feels-like'>{current.feelslike_c} °C</p>
              </div>
            </div>
            <div className='right-row'>
              <img src='' alt='' className='right-img two'/>
                <div className='right-box'>
                  <p className='right-title'>Humidity</p>
                  <p className='humidity'>{current.humidity} %</p>
                </div>
            </div>
            <div className='right-row'>
              <img src="" alt="" className="right-img three"/>
                <div className="right-box">
                  <p className="right-title">Chance of Rain</p>
                  <p className="chance-of-rain">{forecast.forecastday[0].day.daily_chance_of_rain} %</p>
                </div>
            </div>
            <div className='right-row'>
              <img src="" alt="" className="right-img fourth"/>
                <div className="right-box">
                  <p className="right-title">Wind Speed</p>
                  <p className="wind-speed">{forecast.forecastday[0].day.maxwind_kph} km/h</p>
                </div>
            </div>
            </div>
          </div>
          <div className='main-cont'>
            <div className='left-btn' id='l-btn1' onClick={leftSlide}>
              <img src={arrLeft} alt='' className='btn-left'/>
            </div>
            <div className='forecast'>
              <div className='forecast-container' id='for-cont1' ref={containerRef}>
                {Array.from({length: numDays - 1 }, (_, index) => (
                  <Cell
                  key={index}
                  Id={index + 1}
                  data={forecast}
                  />
                ))}
              </div>
            </div>
            <div className='right-btn' id='r-btn1' onClick={rightSlide}>
              <img src={arrRight} alt='' className='btn-right'/>
            </div>
          </div>
        </div>
      )
    }
  }

  return (   
    <>
      {renderWeatherInfo()}   
    </>
  )
}

export default App




