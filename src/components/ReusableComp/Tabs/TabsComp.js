import React, { useState, useEffect } from "react";

const TabsComp = ({ Tabs, type }) => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || 0
  );
  const [subordinateTab, setSubordinateTab] = useState(
    localStorage.getItem("subordinateTab") || 0
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("subordinateTab", subordinateTab);
  }, [subordinateTab]);

  const handleTabClick = (index) => {
    if (type === "main") {
      setActiveTab(index);
    } else {
      setSubordinateTab(index);
    }
  };

  return (
    <div className="m-auto bg-dark">
      <div className="row my-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header p-2">
              <ul className="nav nav-pills">
                {Array.isArray(Tabs) &&
                  Tabs.map((item, ind) => {
                    return (
                      <li key={ind} className="nav-item">
                        <a
                          className={`nav-link ${
                            type === "main"
                              ? ind === parseInt(activeTab) && "active"
                              : ind === parseInt(subordinateTab) && "active"
                          }`}
                          href={`#${item.id}`}
                          onClick={() => handleTabClick(ind)}
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                {Array.isArray(Tabs) &&
                  Tabs.map((item, ind) => {
                    return (
                      <div
                        key={ind}
                        className={`tab-pane ${
                          type === "main"
                            ? ind === parseInt(activeTab) && "active"
                            : ind === parseInt(subordinateTab) && "active"
                        } `}
                        id={item.id}
                      >
                        {item.comp}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsComp;
