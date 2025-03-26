import "./App.css";
import React, { use } from "react";
import moonIcon from "../public/assets/icon-moon.svg";
import searchIcon from "../public/assets/icon-search.svg";
import locationIcon from "../public/assets/icon-location.svg";
import linkIcon from "../public/assets/icon-website.svg";
import twitterIcon from "../public/assets/icon-twitter.svg";
import companyIcon from "../public/assets/icon-company.svg";
import sunIcon from "../public/assets/icon-sun.svg";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [userSearch, setUserSearch] = useState("octocat");
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setErrorMessage(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${userSearch}`
      );
      if (!response.ok) {
        setErrorMessage("no result");
        return;
      }
      const jsonData = await response.json();
      setUser(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);

    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <div className="main-container flex flex-col items-center justify-center">
      <header className="flex justify-between items-center w-[375px] pt-[31px] px-[24px] tb:w-[768px] tb:pt-[140px] tb:px-[98px] dk:w-[1440px] dk:pt-[144px] dk:px-[355px]">
        <div className="left">
          <h1
            className={`${
              darkMode ? "text-[#FFFFFF]" : "text-[#222731]"
            } font-bold text-[26px]`}
          >
            devfinder
          </h1>
        </div>
        <div className="right flex items-center gap-[16px] justify-center">
          <p
            onClick={toggleDarkMode}
            className={`${
              darkMode ? "text-[#FFFFFF]" : "text-[#4B6A9B]"
            } text-[13px] font-bold`}
          >
            {darkMode ? "LIGHT" : "DARK"}
          </p>
          <img
            onClick={toggleDarkMode}
            src={darkMode ? sunIcon : moonIcon}
            alt="moon icon"
          />
        </div>
      </header>

      <form
        onClick={(event) => getUser(event)}
        className="flex flex-col mt-[36px] items-center"
      >
        <input
          onChange={(event) => setUserSearch(event.target.value)}
          type="text"
          name="login"
          placeholder="Search GitHub username…"
          className={`w-[327px] h-[60px] cursor-pointer absolute py-[7px] pr-[7px] pl-[45px] shadow-custom ${
            darkMode ? "bg-input-dark" : "bg-input-light"
          } rounded-[15px] text-[13px] ${
            darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
          } tb:w-[573px] tb:pl-[80px] tb:mt-[45px] dk:w-[730px] `}
        />
        <div className="top flex relative">
          {errorMessage && (
            <p className="text-[#F74646] text-center w-full text-[15px] font-bold absolute mb:right-[-30%] mb:top-[42%] tb:right-[-100%] tb:top-[120%] dk:right-[-160%] dk:top-[125%]">
              {errorMessage}
            </p>
          )}
          <img
            src={searchIcon}
            alt="icon search"
            className="relative top-5 right-24 w-[20px] h-[20px] tb:right-48 tb:w-[24px] tb:h-[24px] tb:top-16 dk:right-68"
          />
          <button
            type="submit"
            className={`relative top-2 left-26 w-[84px] h-[46px] ${
              darkMode ? "bg-search-dark" : "bg-search-light"
            } hover:bg-search-hover text-[#fff] cursor-pointer rounded-[10px] tb:w-[106px] tb:h-[50px] tb:left-54 tb:top-[50px] dk:left-74`}
          >
            Search
          </button>
        </div>
      </form>

      <div
        className={`px-[24px] flex flex-col dk:items-end mb-[79px] pt-[32px] pb-[48px] w-[327px] shadow-custom ${
          darkMode ? "bg-input-dark" : "bg-input-light"
        } rounded-[15px] mt-[26px] tb:w-[573px] tb:mt-[75px] tb:mb-[236px] tb:p-[40px] dk:w-[730px] dk:p-[48px]`}
      >
        <div className="first-info flex gap-[19px] tb:gap-[41px] dk:gap-[37px]">
          <div className="image">
            <img
              className="w-[70px] h-[70px] rounded-[50%] tb:w-[117px] tb:h-[117px]"
              src={user?.avatar_url}
              alt="profile image"
            />
          </div>
          <div className="dk:flex  dk:justify-between dk:w-[480px]">
            <div className="dk:flex dk:flex-col">
              <p
                className={`${
                  darkMode ? "text-[#fff]" : "text-[#2B3442]"
                } text-[16px] font-bold tb:text-[26px]`}
              >
                {user?.name}
              </p>
              <p className="text-[#0079FF] text-[13px] font-normal tb:text-[16px]">
                @{user?.login}
              </p>
            </div>

            <p
              className={`${
                darkMode ? "text-[#fff] " : "text-[#697C9A] "
              }text-[13px] font-normal tb:text-[16px] dk:mt-[10px]`}
            >
              {" "}
              Joined {formatDate(user?.created_at)}
            </p>
          </div>
        </div>

        <div className="lorem-info mt-[33px] tb:mt-[24px] dk:mt-[0px]">
          <p
            className={`${
              darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
            } text-[13px] font-normal tb:text-[16px] dk:w-[490px] `}
          >
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
            odio. Quisque volutpat mattis eros.
          </p>
        </div>
        <div
          className={`followers-info flex mt-[23px] w-[279px] ${
            darkMode ? "bg-followers-dark" : "bg-followers-light"
          } py-[19px] px-[15px] rounded-[10px] justify-between tb:w-[493px] tb:py-[18px] tb:mt-[32px] tb:pl-[32px] tb:pr-[96px]`}
        >
          <div className="repos flex flex-col items-center tb:items-start">
            <p
              className={`${
                darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
              } font-normal text-[11px] tb:text-[13px]`}
            >
              Repos
            </p>
            <p
              className={`${
                darkMode ? "text-[#fff] " : "text-[#2B3442] "
              }text-[16px] font-bold tb:text-[22px]`}
            >
              {user?.public_repos}
            </p>
          </div>
          <div className="repos flex flex-col items-center tb:items-start">
            <p
              className={`${
                darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
              } font-normal text-[11px] tb:text-[13px]`}
            >
              Followers
            </p>
            <p
              className={`${
                darkMode ? "text-[#fff] " : "text-[#2B3442] "
              }text-[16px] font-bold tb:text-[22px]`}
            >
              {user?.followers}
            </p>
          </div>
          <div className="repos flex flex-col items-center tb:items-start">
            <p
              className={`${
                darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
              } font-normal text-[11px] tb:text-[13px]`}
            >
              Following
            </p>
            <p
              className={`${
                darkMode ? "text-[#fff] " : "text-[#2B3442] "
              }text-[16px] font-bold tb:text-[22px]`}
            >
              {user?.following}
            </p>
          </div>
        </div>
        <div className="more-info flex flex-col mt-[24px] gap-[16px] tb:flex-row tb:mt-[30px]">
          <div className="tb:flex tb:flex-col tb:gap-[19px] flex flex-col gap-[16px]">
            <div className="location flex gap-[19.25px] items-center">
              <img src={locationIcon} alt="location icon" />
              <span
                className={`${
                  darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
                } text-[13px] font-normal hover:cursor-pointer hover:underline`}
              >
                {user?.location || "Not Available"}
              </span>
            </div>
            <div className="location flex gap-[13.01px] items-center">
              <img src={linkIcon} alt="link icon" />
              <span
                className={`${
                  darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
                } text-[13px] font-normal hover:cursor-pointer hover:underline`}
              >
                {user?.blog || "Not Available"}
              </span>
            </div>
          </div>
          <div className="tb:flex tb:flex-col tb:gap-[15px] flex flex-col gap-[16px]">
            <div className="location flex gap-[13px] items-center">
              <img src={twitterIcon} alt="twitter icon" />
              <span
                className={`${
                  darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
                } text-[13px] font-normal hover:cursor-pointer hover:underline`}
              >
                {user?.twitter_username || "Not Available"}
              </span>
            </div>
            <div className="location flex gap-[12px] items-center">
              <img src={companyIcon} alt="location icon" />
              <span
                className={`${
                  darkMode ? "text-[#fff]" : "text-[#4B6A9B]"
                } text-[13px] font-normal hover:cursor-pointer hover:underline`}
              >
                {user?.company || "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
