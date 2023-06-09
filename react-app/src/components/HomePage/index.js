import { useEffect, useState } from "react";
import AllPosts from "../PostPageAll";
import AllProfiles from "../ProfPageAll";
import "./HomePage.css";

import { useSelector } from "react-redux";

function HomePage() {
  const [selected, setSelected] = useState("option1");

  const sessionUser = useSelector((state) => state.session.user);

  const handleChange = (e) => {
    e.preventDefault();
    if (selected === "option1") {
      setSelected("option2");
    } else {
      setSelected("option1");
    }
  };

  return (
    <div id="homePage">
      <form id="selectForm">
        <div></div>
        <div className="radioBtns">
          <div className="radio2">
            <label>
              <input
                className="radio3"
                type="radio"
                value="option1"
                checked={selected === "option1"}
                onChange={handleChange}
              />
              <img
                className="radio"
                src="https://i.imgur.com/2iSoM4U.png"
              ></img>
            </label>
          </div>
          <div className="radio2">
            <label>
              <input
                className="radio3"
                type="radio"
                value="option2"
                checked={selected === "option2"}
                onChange={handleChange}
              />
              <img
                className="radio"
                src="https://i.imgur.com/SWNKMlS.png"
              ></img>
            </label>
          </div>
        </div>
        <div></div>
      </form>
      {selected === "option1" && <AllPosts />}
      {selected === "option2" && <AllProfiles />}
    </div>
  );
}

export default HomePage;
