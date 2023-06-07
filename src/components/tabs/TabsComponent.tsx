import { useState } from "react";
import "./TabsComponent.css";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  const renderFormInputs = () => {
    if (activeTab === 1) {
      return (
        <div className="form-container">
          <div className="form-container-itemlist">
            <label>Last name:</label>
            <input type="text" className="tab-input" />
          </div>
          <div>
            <label>First name:</label>
            <input type="text" className="tab-input" />
          </div>
          <div>
            <label>Middle name:</label>
            <input type="text" className="tab-input" />
          </div>
          <div>
            <label>Course/yr level:</label>
            <input type="text" className="tab-input" />
          </div>
          <div>
            <label>ID. No.:</label>
            <input type="text" className="tab-input" />
          </div>
        </div>
      );
    } else if (activeTab === 2) {
      return (
        <div className="form-container">
          <div>
            <label>Last name:</label>
            <input type="text" className="tab-input" />
          </div>
          <div>
            <label>First name:</label>
            <input type="text" className="tab-input" />
          </div>
          <div>
            <label>Middle name:</label>
            <input type="text" className="tab-input" />
          </div>
          <div>
            <label>Kaninong parents/guardian:</label>
            <input type="text" className="tab-input" />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div>
        <button
          className={`tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Tab 1
        </button>
        <button
          className={`tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Tab 2
        </button>
      </div>
      <div className="tab-content">{renderFormInputs()}</div>
    </div>
  );
};

export default TabsComponent;
