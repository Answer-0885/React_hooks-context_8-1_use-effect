import axios from 'axios';
import {Rings} from "react-loader-spinner";
import { useEffect, useState } from 'react';
import './List.css';

const URL = process.env.REACT_APP_LIST_URL;

export default function List(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(URL)
      .then((res) => setList(res.data))
      .catch((error) => setError(error.response.data));
      setLoading(false)
  }, []);

  const getClassName = (id) => id === props.selected ? 'list-item selected' : 'list-item';

  return (
    <div>
      {error && (
        <div>{error}</div>
      )}
      {list && (
        <ul className="list-container">
          {list.map((item) => (
            <li
              className={getClassName(item.id)}
              key={item.id}
              onClick={() => props.changeSelected(item.id)}>{item.name}
            </li>)
          )}
        </ul>
      )}
    </div>
  );
}