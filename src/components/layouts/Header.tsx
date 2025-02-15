import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@store/store";
import style from "@styles/Layouts/Header.module.css";

function Header() {
  const { user } = useUserStore((state) => state);
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      await fetch("https://222.121.46.20:80/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      sessionStorage.removeItem("user");
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      alert("로그아웃 완료");
      navigate("/main");
      window.location.reload();
    }
  };
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <a className={style.title} href="/main">
          <img src="/images/MainLogo.svg" alt="MainLogo" />
        </a>
        {user && user?.accessToken ? (
          <div className={style.link_wrapper}>
            <Link to={`/minihome/${user?.nickname}`} className={style.link}>
              MINIHOME
            </Link>
            <Link to={"/explore"} className={style.link}>
              EXPLORE
            </Link>
            <Link to={"/gacha"} className={style.link}>
              GACHA
            </Link>
            <Link to={"/market"} className={style.link}>
              MARKET
            </Link>
            <button onClick={handleLogout} className={style.link}>
              LOGOUT
            </button>
          </div>
        ) : (
          <div className={style.link_wrapper}>
            <Link to={"/login"} className={style.link}>
              LOGIN
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Header;
