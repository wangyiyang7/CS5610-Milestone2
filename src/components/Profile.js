import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import * as atlas from "azure-maps-control";
import "./atlas.min.css";

const ProfileComponent = () => {
  const [userInfo, setUserInfo] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const { accountId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        //console.log(token);
        const userResponse = await fetch(
          `http://localhost:5001/profile/${accountId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );
        const userData = await userResponse.json();
        // console.log(userData);
        setUserInfo(userData);

        const orderResponse = await fetch(
          `http://localhost:5001/order/${accountId}`
        );
        const orderData = await orderResponse.json();
        setOrderHistory(orderData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [accountId]);

  const mapRef = useRef(null);
  /*
  useEffect(() => {
    const map = new atlas.Map(mapRef.current, {
      center: [-123.11544, 49.28078],
      zoom: 14,
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey:
          "AQPjGnNIJmyFYXcFYW8g9XG8GOf2BqzNSY0LUZAdNOGg3d9GeSIuJQQJ99AKAC8vTInpI8XKAAAgAZMP3kjH",
      },
    });

    map.events.add("ready", () => {
      map.markers.add(
        new atlas.HtmlMarker({
          color: "DodgerBlue",
          position: [-123.11544, 49.28078],
        })
      );
    });

    return () => map.dispose();
  }, []);*/

  return (
    <div>
      <div className="user-profile">
        <div className="user-profile__sidebar">
          <h2>Hi {userInfo.firstName}</h2>
          <nav>
            <ul>
              <li>
                <a href="#personal-info">Personal Information</a>
              </li>
              <li>
                <Link to={`/profile/${userInfo.accountId}/order-history`}>
                  Order History
                </Link>
                {/*</li><---a href="#order-history">Order History</a--->*/}
              </li>
            </ul>
          </nav>
        </div>
        <div className="user-profile__content">
          <div id="personal-info" className="user-profile__personal-info">
            <h2>Personal Information</h2>
            <p>
              Name: {userInfo.firstName} {userInfo.lastName}
            </p>
            <p>Phone: {userInfo.phoneNumber}</p>
            <p>Email: {userInfo.email}</p>
            <p>Address: {userInfo.address}</p>
          </div>
          <div>
            <Link>
              <button>Edit</button>
            </Link>
          </div>
        </div>
        <div
          id="map"
          ref={mapRef}
          style={{ width: "300px", height: "300px" }}
        />
      </div>
      <div id="order-history" className="user-profile__order-history">
        <h2>Order History</h2>
        <ul>
          {orderHistory.map((order) => (
            <li key={order.orderNumber}>
              <span>Order Date: {order.orderDate}</span>
              <span> | </span>
              <span>Order Number: {order.orderNumber}</span>
              <span> | </span>
              <span>Total: ${order.total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileComponent;
