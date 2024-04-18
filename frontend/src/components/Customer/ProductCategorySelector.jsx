import { useState, forwardRef, useRef, useImperativeHandle } from "react";

let tabs = [
  { id: "Hot Beverage", label: "Hot Beverage" },
  { id: "Cold Beverage", label: "Cold Beverage" },
  { id: "Dessert", label: "Dessert" },
  { id: "Pastry", label: "Pastry" },
  { id: "Sandwich", label: "Sandwich" },
  { id: "Smoothie", label: "Smoothie" },
  { id: "Other", label: "Other" },
];

const ProductCategorySelector = forwardRef((props, ref) => {
  let [activeTab, setActiveTab] = useState(tabs[0].id);
  const myRef = useRef(null);

  const getActiveTabId = () => {
    return myRef.current ? myRef.current.getAttribute('data-tab-id') : null;
  };

  // Expose the function to get the active tab id through ref
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
            props.onTabSelect(tab); // Pass the selected item as a prop
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

export default ProductCategorySelector;
