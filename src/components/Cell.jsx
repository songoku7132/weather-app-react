import React from "react";
import '../styles/Cell.css'

const Cell = ({Id, data}) => {
    const getWeekDay = (datec) => {
        const days = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[datec.getDay()];
      };

    const gone = new Date(data.forecastday[Id].date);
    const weekDay = getWeekDay(gone);

    return (
        <div className='cell' id={Id}>
            <p className="week-day">{weekDay}</p>
            <p className="week-temp">{data.forecastday[Id].day.maxtemp_c}°C - {data.forecastday[Id].day.mintemp_c}°C</p>
            <img src={data.forecastday[Id].day.condition.icon} alt="" className="week-img"></img>
        </div>
    )
}

export default Cell;


