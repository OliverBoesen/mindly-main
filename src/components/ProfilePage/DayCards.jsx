import { useRef, useEffect, useState } from 'react';
import HeltSurMedFarve from "../../assets/HeltSurMedFarve.png";
import LidtSurMedFarve from "../../assets/LidtSurMedFarve.png";
import MellemSurMedFarve from "../../assets/MellemSurMedFarve.png";
import LidtGladMedFarve from "../../assets/LidtGladMedFarve.png";
import HeltGladMedFarve from "../../assets/HeltGladMedFarve.png";

const DayCards = ({ entries, selectedWeek }) => {
  const cardRefs = useRef([]);
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const getMoodIcon = (mood) => {
    const moodIcons = {
      HeltSur: HeltSurMedFarve,
      LidtSur: LidtSurMedFarve,
      MellemSur: MellemSurMedFarve,
      LidtGlad: LidtGladMedFarve,
      HeltGlad: HeltGladMedFarve,
    };
    return moodIcons[mood] || null;
  };

  const formatDate = (date) => ({
    day: date.toLocaleString("default", { weekday: "short" }),
    date: date.getDate(),
  });

  useEffect(() => {
    if (!selectedWeek?.start) return;

    const weekStart = new Date(selectedWeek.start);
    setWeekDates(Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    }));
  }, [selectedWeek?.start]);

  const handleCardClick = (index, entry, date) => {
    if (entry) {
      cardRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedDate(date);
    }
  };

  return (
    <div className="entries">
      <div className="day-cards">
        {weekDates.map((date, index) => {
          const entry = entries.find(
            (e) => new Date(e.date).toDateString() === date.toDateString()
          );
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          return (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={`${entry ? "day-card" : "blank"} ${isSelected ? "selected" : ""}`}
              onClick={() => handleCardClick(index, entry, date)}
            >
              {entry ? (
                <>
                  <img src={getMoodIcon(entry.mood)} alt={entry.mood} />
                  <p>{formatDate(date).date}</p>
                  <p>{formatDate(date).day}</p>
                </>
              ) : (
                <>
                  <div className="blank-icon"></div>
                  <p>{formatDate(date).date}</p>
                  <p>{formatDate(date).day}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayCards;
