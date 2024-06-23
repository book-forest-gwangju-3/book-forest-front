import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MypageHeader = () => {
  const urls = useSelector((state) => state.page.urls);
  const pages = useSelector((state) => state.page.pages);
  const navigate = useNavigate();

  const handleClick = (now) => {
    navigate(urls[now]);
  }

  const navClass = `pt-10 pb-9 text-xl`
  const noActive = `mr-9 cursor-pointer select-none text-color-18`
  const active = `mr-9 cursor-pointer select-none underline-after`
  
  return (
    <nav className={navClass}>
      <span className={(pages[0]) ? active : noActive} onClick={() => handleClick(0)}>책밭</span>
      <span className={(pages[1]) ? active : noActive} onClick={() => handleClick(1)}>나의 독후감</span>
    </nav>
  )
}

export default MypageHeader