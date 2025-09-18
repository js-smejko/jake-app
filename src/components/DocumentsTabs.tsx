import { useState } from 'react';
import TabNavigation from './TabNavigation';
import { MAIN_NAVIGATION_PARAMS } from '../constants';
import DocumentsPage from '../pages/DocumentsPage';

const DocumentsTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(5);

  const tabs = MAIN_NAVIGATION_PARAMS.find(section => 
    section.link.title === "Documents"
  )?.subLinks

  if (!tabs) return null;

  return (
    <TabNavigation
      tabs={[...tabs.map(({ title }) => title), "All"]}
      tabRenderer={(tab, idx) => (
        <button
          className={"tab" + (activeTab === idx ? " active" : "")}
          onClick={() => setActiveTab(idx)}
        >
          <span>{tab}</span>
        </button>
      )}
    >
        {activeTab >= 0 && tabs && tabs[activeTab] ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <iframe
              title={tabs[activeTab]?.title}
              src={tabs[activeTab]?.link}
              height="800px"
              width="100%"
            />
            <p>
              <a 
                href={tabs[activeTab]?.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Open in new tab
              </a>
            </p>
          </div>
        ) : (
          <DocumentsPage />
        )}
    </TabNavigation>
  );
}

export default DocumentsTabs;