import './SingleCard.scss'
import { Link } from "react-router-dom";
const SingleCard = (item) => {
  console.log(item);
  return (
    <Link to={`/properity/${item.properity?._id}`} className='singleCard'>
        <img className='img-first' src={item.properity.thumbnails[0] ?item.properity.thumbnails[0] : '/blank-img.jpg' } alt="" />
        <div className="info">
            <h2>{item.properity?.title}</h2>
            <p>{item.properity?.description}.</p>
            <div className="features">
                {item.properity?.criteria.chambres > 0 ? (
                  <div className="feature">
                    <img src="/bed.png" alt="" />
                    <span>{item.properity?.criteria?.chambres}</span>
                </div>
                ):''}
                {item.properity?.criteria.salle_de_bain > 0 ? (
                  <div className="feature">
                    <img src="/bath.png" alt="" />
                    <span>{item.properity?.criteria?.salle_de_bain}</span>
                </div>
                ):''}
                
          </div>
        </div>
    </Link>
  )
}

export default SingleCard