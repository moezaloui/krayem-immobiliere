import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal'; // If using react-modal
import axios from "axios"; // For sending DELETE request
import "./card.scss";

function Card({ item, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal
 
  const navigate = useNavigate(); // For navigation after deletion

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;
  const handleDelete = async () => {
    try {
      await axios.delete(`https://real-estate-server-side-flame.vercel.app/api/properties/delete-propertie/${item._id}`);
      console.log("Property deleted successfully");
      closeModal();
      window.location.reload() // Navigate to a properties page or reload the list
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  return (
    <div className="card">
      <Link to={`/properity/${item._id}`} className="imageContainer">
        <img src={item.thumbnails[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <span>
            <Link to={`/properity/${item._id}`}>{item.title}</Link>
          </span>
          {user && (
            <div className="settings">
              <Link to={`/edit-post/${item._id}`}>
                <button>Modifier</button>
              </Link>
              <button className="dangerBtn" onClick={openModal}>Supprimer</button>
            </div>
          )}
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.location.country} {item.location.address}</span>
        </p>
        <p className="price">TND {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.criteria.chambres} Chambre</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.criteria.salle_de_bain} Salle de bain</span>
            </div>
          </div>
          <div className="icons">
            <a target="_blank" href="https://wa.me/+21628072308" className="icon">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Êtes-vous sûr de vouloir supprimer ce bien ?</h2>
        <div className="modalActions">
          <button onClick={handleDelete} className="confirmBtn">Oui, supprimer</button>
          <button onClick={closeModal} className="cancelBtn">Annuler</button>
        </div>
      </Modal>
    </div>
  );
}

export default Card;
