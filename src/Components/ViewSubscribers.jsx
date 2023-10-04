import React from 'react'
import "../CSS/ViewSubscribers.css"
import { useEffect, useState } from "react";

const ViewSubscribers = () => {
  const [subscriberInfo, setSubscriberInfo] = useState([]);
  const fetchData = async () => {
    await fetch("http://localhost:8080/subscriber/view")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubscriberInfo(data.data)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id='Subscribers'>Subscribers</div>
      <div className='mainView'>
        <table>
          <tr><th>Mail ID</th></tr>
          {
            subscriberInfo.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  )
}

export default ViewSubscribers