import React, { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import user from "../reducers/user";
import styled from 'styled-components';
import { MainContainer, MainHeading, Button } from "../styles/GlobalStyle";
// import styled from "styled-components/macro";
// import { ProfileImage } from '../styles/GlobalStyle';
import background from "../assets/background-image-profile.jpg";
import { API_URL } from "../utils/utils";

const Profile = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accessToken = useSelector((store) => store.user.accessToken);
	const username = useSelector((store) => store.user.username)

	const logout = () => {
		batch(() => {
			dispatch(user.actions.setUsername(null));
			dispatch(user.actions.setAccessToken(null));
			localStorage.removeItem("user");
		})
	};
	useEffect(() => {
		if (!accessToken) {
			navigate('/login')
		}
	}, [accessToken, navigate])

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		}

		fetch(API_URL('editprofile'), options)
			.then((res) => res.json())
			.then((data) => {
				console.log("Response: " + data);
				if (data.success) {
					// setSecret(data.message)
				}
			})
	}, [accessToken])

	return (
		<MainContainer>
			<MainHeading>
			    <Heading> " THE DREAM IS ALIVE " </Heading>
					<Heading> Welcome to your profile {username} </Heading>
					{/* <Link to= "/spaceFeed">Your Community</Link> */}
					<ProfileImage><img src={background} alt="backgroundImg" /> </ProfileImage>
					<SubHeading> Click <CommunityLink to= "/spaceFeed">Here</CommunityLink> to find your favorite Community </SubHeading>
					<SubHeading> Start navigate to our <CommunityLink to= "/spaceForm">Search</CommunityLink> menue </SubHeading>
					<Button className="profile-button-logout" onClick={logout}>
						Logout
					</Button>
			</MainHeading>
		</MainContainer>
	);
};

export default Profile;

export const ProfileImage = styled.div`
  position: fixed;
  text-align: center;
	background-size: 100vw 100vh;
	right: 0;
	top: 0;
	z-index: -1;
`;

export const Heading = styled.h1`
  display: flex;
	margin: 0 auto;
	font-size: 30px;
  color: white;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
  height: 100%;
  padding: 50px;
`;

export const SubHeading = styled.h2`
padding: 30px;
border: solid 1px rgba(0, 0, 0, 0.08);
font-size: 20px;
color: #DAA520;
font-weight: 900px;
padding: 60px;
&:hover {
  box-shadow: 0 0 12px 3px rgba(0, 0, 0, 10);
}
`;

export const CommunityLink = styled(Link)`
color: white;
text-decoration: underline;
cursor: pointer;
`;