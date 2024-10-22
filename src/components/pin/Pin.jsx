import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  console.log('ITEM:', item);
  return (
    <Marker position={[item?.location?.latitude, item?.location?.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item?.image} alt="" />
          <div className="textContainer">
            <Link to={`/${item?.id}`}>{item?.title}</Link>
            <span>{item?.criteria?.chambres} Chambres</span>
            <b>{item?.price} TND</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
