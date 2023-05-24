import ProfileHeader from "../Components/ProfileHeader";
import ProfileTab from "../Components/ProfileTab";

const ProfilePage = ({email}) => {
    return (
        <>
        <ProfileHeader email={email}/>
        <ProfileTab/>
        </>
        
    )
}

export default ProfilePage;