import React from 'react';
import { FaPhoneAlt, FaFax, FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'; // Icons
import './style.scss'
const ContactBand = () => {
  return (
    <div className="contactBand">
      <div className="contactContainer">
        <div className="contactRow">
          {/* Phone, Fax, WhatsApp */}
          <div className="contactInfo">
            <div className="infoItem">
              <FaPhoneAlt />
              <span>96 914 701</span>
            </div>
            <div className="infoItem">
              <FaFax />
              <span>75 742 382</span>
            </div>
            <div className="infoItem">
              <FaWhatsapp />
              <span>+216 28 072 308</span>
            </div>
            <div className="infoItem">
              <FaEnvelope />
              <span>info@krayem-immobiliere.com</span>
            </div>
            <div className="infoItem">
              <span>Av. Farhat Hached Midoun</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="socialMedia">
            <a href="https://www.facebook.com/profile.php?id=100063501786276" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/krayem_agence_immobiliere/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@krayem_agence_immobilere" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBand;
