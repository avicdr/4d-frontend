import React from "react";

const TabsComp = ({ Tabs }) => {
  const remSpace = (text) => {
    return text.split(" ").join("-").replace(/\d+/g, '');
  };
  return (
    <div className="w-80 m-auto bg-dark">
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
                          className={`nav-link ${ind === 0 && "active"}`}
                          href={`#${remSpace(item.name)}`}
                          data-toggle="tab"
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
                        className={`tab-pane ${ind === 0 && "active"}`}
                        id={remSpace(item.name)}
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
