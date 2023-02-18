import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Dna} from "react-loader-spinner";
import './Details.css';

const URL = process.env.REACT_APP_DETAILS_URL

export default function Details(props) {
  const [details, setDetails] = useState({ details: {} });
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if (props.selected) { 
      setLoading(true)
      axios(`${URL + props.selected + '.json'}`)
        .then(res => setDetails(res.data))
        .then(() => {
         setLoading(false);
      })
    }
  }, [props.selected]);


  const loader = <Dna
  visible={true}
  height="200"
  width="200"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper wrapper"
/>

  return (
    loading ? loader : 
    props.selected !== 0 && (
      <div className="details">
         <img className="details-img" src={details.avatar + `${'?img=' + props.selected}`} alt="user avatar" />
            <div className="details-text">
              <div className="details-text-item details-text-title">{details.name}</div>
              <div className="details-text-item">City: {details.details.city}</div>
              <div className="details-text-item">Company: {details.details.company}</div>
              <div className="details-text-item">Position: {details.details.position}</div>
            </div>
      </div>
    )
  );
}