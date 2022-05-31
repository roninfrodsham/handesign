import React, { useState, useEffect } from "react";

export interface HeaderProps {
  pages: Array<any>;
  categories: Array<any>;
}

function Header({ pages, categories }: HeaderProps) {
  const [toggle, setToggle] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showCompany, setShowCompany] = useState(false);

  useEffect(() => {
    if (toggle) {
      document.body.classList.add("fixed");
    } else {
      document.body.classList.remove("fixed");
    }
  }, [toggle]);

  return (
    <>
      <header className="header-spacing">
        <div className="outer-container">
          <div className="container pr">
            <div className="nav-toggle" onClick={() => setToggle(true)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <a href="/" className="logo" title="Hetherington Newman Homepage"></a>
          </div>
        </div>
      </header>
      <div className={`overlay header-spacing ${toggle ? "show" : ""}`}>
        <div className="outer-container">
          <div className="container pr">
            <div className="close" onClick={() => setToggle(false)}>
              <span></span>
              <span></span>
            </div>
            <a href="/" className="logo logo-overlay" title="Hetherington Newman Homepage"></a>
            <h3 className="toggleSection" onClick={() => setShowProjects(!showProjects)}>Projects</h3>
            <ul className={`navigation ${showProjects ? "show" : ""}`}>
              {categories.map((category, index) => {
                return <li key={`category-${index}`}><a href={`/projects/${category.attributes.Slug}`}>{category.attributes.Title}</a></li>
              })}
            </ul>
            <h3 className="toggleSection" onClick={() => setShowCompany(!showCompany)}>Our Company</h3>
            <ul className={`navigation ${showCompany ? "show" : ""}`}>
              {pages.map((page, index) => {
                return <li key={`page-${index}`}><a href={`/company/${page.attributes.Slug}`}>{page.attributes.Title}</a></li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export { Header }