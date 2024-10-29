import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myImage from "../assets/HomeScreen.png";
import MindlyCard from "../components/ProfilePage/MindlyCard";
import MenuBar from "../components/Navigation/MenuBar";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, query, orderByChild, limitToLast, get } from "firebase/database";

const Home = () => {
  const quotes = [
    "Even the smallest step forward is still a step in the right direction.",
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "The journey of a thousand miles begins with one step.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Don't watch the clock; do what it does. Keep going.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Dream big and dare to fail.",
    "Opportunities don't happen, you create them.",
    "Your time is limited, so don't waste it living someone else's life.",
  ];

  const [quote, setQuote] = useState("");
  const [username, setUsername] = useState("");
  const [latestMindly, setLatestMindly] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUsername(user.displayName || "");

      const fetchLatestMindly = async () => {
        const db = getDatabase();
        const mindlysRef = ref(db, `users/${user.uid}/mindlys`);
        const latestMindlyQuery = query(mindlysRef, orderByChild("date"), limitToLast(1));

        try {
          const snapshot = await get(latestMindlyQuery);
          if (snapshot.exists()) {
            const mindlyData = snapshot.val();
            const mindlyId = Object.keys(mindlyData)[0];
            setLatestMindly({ id: mindlyId, ...mindlyData[mindlyId] });
          }
        } catch (error) {
          console.error("Error fetching latest mindly:", error);
        }
      };

      fetchLatestMindly();
    }

    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    const quoteIndex = dayOfYear % quotes.length;
    setQuote(quotes[quoteIndex]);
  }, []);

  const handleAddMindly = () => {
    navigate("/create-mindly");
  };

  return (
    <>
      <div className="home-page-container">
        <div className="home-container">
          <h1>Hi, {username}</h1>
          <img
            src={myImage}
            alt="A descriptive text about the image"
            className="home-image"
          />
          <h2>Quote of the Day</h2>
          <p>{quote}</p>
          <a className="cta_red" onClick={handleAddMindly}>
            Add Today&apos;s Mindly
          </a>
        </div>
        <div className="homepage-box">
          <div className="latest-mindly-section">
            <h3>Latest Mindly</h3>
          </div>
          {latestMindly ? (
            <MindlyCard
              selectedEntry={latestMindly}
              onUpdate={() => navigate(`/mindly/${latestMindly.id}`)}
            />
          ) : (
            <p>No Mindlys created yet.</p>
          )}
        </div>
        <MenuBar />
      </div>
    </>
  );
};

export default Home;
