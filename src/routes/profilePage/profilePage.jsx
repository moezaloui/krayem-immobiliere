import { Link } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import './profilePage.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ProfilePage() {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;
  console.log(apiUrl);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://real-estate-server-side-flame.vercel.app/auth/user/get-info`);
        setUserInfo(response.data);
        console.log('res', response.data[0]);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
    console.log('', userInfo);
  }, []);
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Profile Administrateur</h1>
            <Link to={'/edit-profile'}>
              <button>
                Modifier 
              </button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              {<img src={userInfo?.picture} alt="user_pic" /> ||(
              <Skeleton circle height="50px" width="50px" containerClassName="avatar-skeleton" />)}
            </span>
            <span>
              Name
              <b>
                {userInfo?.firstName  || (
                  <Skeleton
                    baseColor={'#ebebeb'}
                    width={100}
                    //height={30}
                  />
                )}
              </b>
            </span>
            <span>
              E-mail:{' '}
              <b>
                {userInfo?.email || (
                  <Skeleton
                    baseColor={'#ebebeb'}
                    width={150}
                    //height={30}
                  />
                )}
              </b>
            </span>

          </div>
          <div className="title">
            <h1>Liste</h1>
            <Link to={'/add'}><button>Creér Nouveau</button></Link>
          </div>
          <List />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
