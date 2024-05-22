import { useState, forwardRef, useRef, useImperativeHandle } from "react";

const ProductCategorySelector = forwardRef((props, ref) => {

  let [activeTab, setActiveTab] = useState(props.selectedCategory);

  const myRef = useRef(null);

  const getActiveTabId = () => {
    return myRef.current ? myRef.current.getAttribute('data-tab') : null;
  };

  useImperativeHandle(ref, () => ({
    getActiveTabId: getActiveTabId
  }));

  return (
    <div className="flex space-x-1 bg">
      {props.categories.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            props.onTabSelect(tab);
          }}
          className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2
            ${activeTab === tab ? 'bg-custom-coffe-brown text-white' : 'text-black hover:text-custom-brown'}`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          data-tab={tab}
          ref={activeTab === tab ? myRef : null}
        >
          {tab.toLowerCase()}
        </button>
      ))}
    </div>
  );
});

export default ProductCategorySelector;