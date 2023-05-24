import React, {useState} from 'react';
import '../styles/profileHeader.css'; // Import the CSS file for custom styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import the Bootstrap CSS file
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faGear, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import EditProfileModal from './EditProfileModal';
import Modal from 'react-bootstrap/Modal';



const ProfileHeader = ({username, email}) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="profile-page-container">
            <div className="profile-header p-4">
            <div className="profile-info m-3">
                <div className="profile-picture m-3">
                    <img src="profile-picture.jpg" alt="Profile" className="img-fluid rounded-circle" />
                </div>
                <div className="profile-name-location">
                    <h2 className="h4 mb-0">{username}</h2>
                    <span className="text-muted small">
                        <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
                        {' '}
                        University of Southern California
                    </span>
                </div>
            </div>
            
            
            <div className="profile-stats d-flex justify-content-center justify-content-between">
                <div className="profile-stats-followers">
                <span className="font-weight-bold">538</span>
                <span className="text-muted">Followers</span>
                </div>
                <div className="profile-stats-transactions">
                <span className="font-weight-bold">233</span>
                <span className="text-muted">Transactions</span>
                </div>
                <div className="profile-stats-ratings">
                <span className="font-weight-bold mb-0">4.8</span>
                <span className="text-muted">Ratings</span>
                </div>
            </div>
            <div className="profile-actions d-flex justify-content-end">
                <Button href="#" className="follow-btn me-2" variant="outline-dark">FOLLOW</Button>
                <Button vairant="outline-dark" onClick={() => setModalShow(true)}>
                    EDIT PROFILE
                </Button>
                <EditProfileModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    email={email}
                />
                <Button href="#" className="share-btn ms-2" variant="outline-dark">
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                </Button>
            </div>
            </div>

            <div className="user-bio-container">
                <div className="user-bio m-3">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at convallis metus. Nulla facilisi. 
                    Sed malesuada massa eget risus feugiat cursus. Mauris ut urna nec leo sollicitudin laoreet. 
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam id maximus dolor. 
                    Proin feugiat ex in ultrices commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </p>
                </div>
            </div>    
        </div>

        
    );
};

export default ProfileHeader;

