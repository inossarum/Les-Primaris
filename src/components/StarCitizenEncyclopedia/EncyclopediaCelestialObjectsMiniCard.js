import React from "react";

const EncyclopediaCelestialObjectsMiniCard = ({data}) => {
  return (
    <div className="encyclopedia-celestial-objects-mini-card-body">
      <div className="encyclopedia-celestial-image-wrapper">
        <h2 className="celestial-object-name">{data.name}</h2>
        <span
          className="encyclopedia-celestial-card-image"
          style={{
            background: `url(${data.storeImageLarge}) center/cover no-repeat `,
          }}
        >
          <div className="encyclopedia-moons-image-wrapper">
            {data.moons &&
              data.moons.map((moon) => (
                <span
                  className="encyclopedia-moons-card-image"
                  style={{
                    background: `url(${moon.storeImageLarge}) center/cover no-repeat `,
                  }}
                  key={moon.name}
                ></span>
              ))}
          </div>
        </span>
      </div>
    </div>
  );
};

export default EncyclopediaCelestialObjectsMiniCard;
