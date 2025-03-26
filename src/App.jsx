import "./App.css";
import React from "react";
import moonIcon from "../public/assets/icon-moon.svg";
import searchIcon from "../public/assets/icon-search.svg";
import locationIcon from "../public/assets/icon-location.svg";
import linkIcon from "../public/assets/icon-website.svg";
import twitterIcon from "../public/assets/icon-twitter.svg";
import companyIcon from "../public/assets/icon-company.svg";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [userSearch, setUserSearch] = useState("octocat");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const response = await fetch(
        `https://api.github.com/users/${userSearch}`
      );
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

  return (
    <div className="main-container flex flex-col items-center justify-center">
      <header className="flex justify-between items-center w-[375px] pt-[31px] px-[24px]">
        <div className="left">
          <h1 className="text-[#222731] font-bold text-[26px]">devfinder</h1>
        </div>
        <div className="right flex items-center gap-[16px] justify-center">
          <p className="text-[#4B6A9B] text-[13px] font-bold">DARK</p>
          <img src={moonIcon} alt="moon icon" />
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
          className="w-[327px] h-[60px] absolute py-[7px] pr-[7px] pl-[45px] shadow-custom bg-input rounded-[15px] text-[13px] text-[#4B6A9B]"
        />
        <div className="top flex">
          <img
            src={searchIcon}
            alt="icon search"
            className="relative top-5 right-24 w-[20px] h-[20px]"
          />
          <button
            type="submit"
            className="relative top-2 left-26 w-[84px] h-[46px] bg-search text-[#fff] rounded-[10px]"
          >
            Search
          </button>
        </div>
      </form>

      <div className="px-[24px] mb-[79px] pt-[32px] pb-[48px] w-[327px] shadow-custom bg-input rounded-[15px] mt-[26px]">
        <div className="first-info flex gap-[19px]">
          <div className="image">
            <img
              className="w-[70px] h-[70px] rounded-[50%]"
              src={user?.avatar_url}
              alt="profile image"
            />
          </div>
          <div className="">
            <p className="text-[#2B3442] text-[16px] font-bold">{user?.name}</p>
            <p className="text-[#0079FF] text-[13px] font-normal">
              @{user?.login}
            </p>
            <p className="text-[#697C9A] text-[13px] font-normal">
              {" "}
              Joined {formatDate(user?.created_at)}
            </p>
          </div>
        </div>

        <div className="lorem-info mt-[33px]">
          <p className="text-[#4B6A9B] text-[13px] font-normal">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
            odio. Quisque volutpat mattis eros.
          </p>
        </div>
        <div className="followers-info flex mt-[23px] w-[279px] bg-followers py-[19px] px-[15px] rounder-[10px] justify-between">
          <div className="repos flex flex-col items-center">
            <p className="text-[#4B6A9B] font-normal text-[11px]">Repos</p>
            <p className="text-[#2B3442] text-[16px] font-bold">
              {user?.public_repos}
            </p>
          </div>
          <div className="repos flex flex-col items-center">
            <p className="text-[#4B6A9B] font-normal text-[11px]">Followers</p>
            <p className="text-[#2B3442] text-[16px] font-bold">
              {user?.followers}
            </p>
          </div>
          <div className="repos flex flex-col items-center">
            <p className="text-[#4B6A9B] font-normal text-[11px]">Following</p>
            <p className="text-[#2B3442] text-[16px] font-bold">
              {user?.following}
            </p>
          </div>
        </div>
        <div className="more-info flex flex-col mt-[24px] gap-[16px]">
          <div className="location flex gap-[19.25px] items-center">
            <img src={locationIcon} alt="location icon" />
            <span className="text-[#4B6A9B] text-[13px] font-normal">
              {user?.location}
            </span>
          </div>
          <div className="location flex gap-[13.01px] items-center">
            <img src={linkIcon} alt="link icon" />
            <span className="text-[#4B6A9B] text-[13px] font-normal">
              {user?.blog}
            </span>
          </div>
          <div className="location flex gap-[13px] items-center">
            <img src={twitterIcon} alt="twitter icon" />
            <span className="text-[#4B6A9B] text-[13px] font-normal">
              {user?.twitter_username || "Not Available"}
            </span>
          </div>
          <div className="location flex gap-[12px] items-center">
            <img src={companyIcon} alt="location icon" />
            <span className="text-[#4B6A9B] text-[13px] font-normal">
              {user?.company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
