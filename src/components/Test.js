import React, { useState } from "react";
import { Reorder } from "framer-motion";

const Test = () => {
  const [items, setItems] = useState([
    { id: 1, pic: "https://via.placeholder.com/150" },
    { id: 2, pic: "https://via.placeholder.com/150" },
    { id: 3, pic: "https://via.placeholder.com/150" }
  ]);
  return (
   <div className="text-white">
    <p className="text-center text-white">Testing Scroll</p>
    <Reorder.Group
      values={items}
      // Use 'setItems' to reorder the array based on the new order
      onReorder={(newOrder) => setItems(newOrder)}
    >
      {items.map((item) => (
        // Pass the whole item object to Reorder.Item's value
        <Reorder.Item key={item.id} value={item}>
          {/* Render the pic value (or any other info) */}
          <div>
            <p>Item {item.id}</p>
            <img src={item.pic} alt={`Pic ${item.id}`} />
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
    
   </div>
  );
};

export default Test;
