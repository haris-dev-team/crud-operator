import React from "react";
import "./style.scss";
const Index = ({ url, title, description, source }) => {
  return (
    <div>
      <div className="container">
        <div className="flex__section">
          <div className="image__div">
            {url ? (
              <img src={url} alt={title} />
            ) : (
              <video controls>
                <source src={source} type="video/*" />
              </video>
            )}
          </div>
          <div className="title__div">
            <h5>{title}</h5>
          </div>
          <div className="para__div">
            <p> {description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
