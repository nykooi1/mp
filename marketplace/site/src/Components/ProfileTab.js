import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "../styles/profileTab.css";

const ProfileTab = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="listings"
        id="profile-tab"
        className="mb-3"
      >
        <Tab eventKey="listings" title="Listings">
          <p>
          Upon a hill, the golden sun does rise,
          Its rays embrace the earth with gentle touch,
          Awakening the world from night's disguise,
          And painting hues of morning's vibrant blush.

          The birds take flight, their songs fill the air,
          A chorus sweet, melodious and clear,
          They sing of love, of joy, of all that's fair,
          Their melodies enchant both far and near.
          </p>
        </Tab>
        <Tab eventKey="feedback" title="Feedback">
          <p>
          In fields of green, the flowers dance and sway,
          Their petals delicate, a colorful show,
          They bloom in splendor, a fleeting display,
          Their beauty fleeting, like the morning's glow.

          Oh, nature's wonders, how they do inspire,
          A sonnet's words, a poet's heart afire.
          </p>
        </Tab>
        
      </Tabs>
    </div>

  )
}

export default ProfileTab;

