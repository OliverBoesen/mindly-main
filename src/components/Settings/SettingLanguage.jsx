import { useState, useEffect } from "react";
import USA from "../../assets/USAFlag.png";
import DK from "../../assets/DanmarkFlag.png";
import GER from "../../assets/TysklandFlag.png";
import SPA from "../../assets/SpanienFlag.png";
import FRA from "../../assets/FrankrigFlag.png";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Load selected language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Save the selected language to localStorage
    localStorage.setItem("selectedLanguage", language);
    // Here you can add additional logic for translating the app
  };

  const handleConfirmClick = () => {
    setErrorMessage("This function is a work in progress, come back later."); // Set error message
    setTimeout(() => {
      setErrorMessage(""); // Clear the message after 3 seconds
    }, 3000);
  };

  return (
    <div>
      <div className="language-overskrift">
        <h1>Language</h1>
        <p>What language do you want displayed?</p>
      </div>
      <div className="language-container">
        <div
          className="language-card"
          onClick={() => handleLanguageChange("English")}
        >
          <img src={USA} alt="USA Flag" />
          <p>English</p>
          <input
            type="checkbox"
            checked={selectedLanguage === "English"}
            readOnly
          />
        </div>
        <div
          className="language-card"
          onClick={() => handleLanguageChange("Danish")}
        >
          <img src={DK} alt="Danish Flag" />
          <p>Danish</p>
          <input
            type="checkbox"
            checked={selectedLanguage === "Danish"}
            readOnly
          />
        </div>
        <div
          className="language-card"
          onClick={() => handleLanguageChange("German")}
        >
          <img src={GER} alt="German Flag" />
          <p>Deutsch</p>
          <input
            type="checkbox"
            checked={selectedLanguage === "German"}
            readOnly
          />
        </div>
        <div
          className="language-card"
          onClick={() => handleLanguageChange("Spanish")}
        >
          <img src={SPA} alt="Spanish Flag" />
          <p>Spanish</p>
          <input
            type="checkbox"
            checked={selectedLanguage === "Spanish"}
            readOnly
          />
        </div>
        <div
          className="language-card"
          onClick={() => handleLanguageChange("French")}
        >
          <img src={FRA} alt="French Flag" />
          <p>French</p>
          <input
            type="checkbox"
            checked={selectedLanguage === "French"}
            readOnly
          />
        </div>
      </div>
      <div className="language-confirm-button">
        <button onClick={handleConfirmClick}>Confirm</button>{" "}
        {/* Changed to a button */}
      </div>
      {errorMessage && <div className="lang-error-message">{errorMessage}</div>}{" "}
      {/* Display error message */}
    </div>
  );
};

export default LanguageSelector;
