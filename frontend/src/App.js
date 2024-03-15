//import logo from './logo.svg';
import './App.css';
import { useState ,useEffect } from 'react';

const URL = 'http://localhost:8080/getAllItems';

function App() {
  
  const [items, setItems] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
          try {
              const result = await fetch(URL);
              const json = await result.json();
              console.log(json);

              setItems(json);
             
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);

  return (
    <div>
      <h1>Item List</h1>
      <table class="item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Stock</th>
            <th>Item Unit</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>{item.itemStock}</td>
              <td>{item.itemUnit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;
