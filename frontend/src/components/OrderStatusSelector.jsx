import { useState, forwardRef, useRef, useImperativeHandle } from "react";

let tabs = [
    { id: 'Taken', label: 'Taken' },
    { id: 'Preparing', label: 'Preparing' },
    { id: 'Canceled', label: 'Canceled' },
  ];
  

  const OrderStatusSelector = forwardRef((props, ref) => {
    let [activeTab, setActiveTab] = useState(tabs[0].id);
    const myRef = useRef(null);
  
    const getActiveTabId = () => {
      return myRef.current ? myRef.current.getAttribute('data-tab-id') : null;
    };
  
    useImperativeHandle(ref, () => ({
      getActiveTabId: getActiveTabId
    }));
  
    return (
      <div className="flex space-x-1 bg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              props.onTabSelect(tab); 
            }}
            className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2
              ${activeTab === tab.id ? 'bg-custom-coffe-brown text-white' : 'text-black hover:text-custom-brown'}`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
            data-tab-id={tab.id}
            ref={activeTab === tab.id ? myRef : null}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  });

export default OrderStatusSelector
