import React from "react";
import { useSelector } from "react-redux";
import "../Styles/ProjectProfile.css";

const ServiceList = ({ setService }) => {
  const services = useSelector((state) => state?.service?.services);
  return (
    <>
      <div className="ServiceWrap">
        {services.map((service, i) => (
          <div
            className={`${service.serviceType} service`}
            key={i}
            onClick={() => setService(service)}
          >
            {service.serviceType}
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceList;
