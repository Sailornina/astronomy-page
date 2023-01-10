import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import moment from 'moment';
import Icon from "../../assets/waste-icon.png";
import communityImg from "../../assets/Rocket.png";
import Comments from "./Comments"

const SpaceCommunicate = ({ post }) => {
  const [counter, setCounter] = useState(post.likes);
  const accessToken = useSelector((store) => store.user.accessToken);

  const onDeletePost = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': accessToken
      },
      body: JSON.stringify({
      }),
    }
    await fetch(`https://final-project-w5otwao4va-lz.a.run.app/posts/${id}`, options)
  }


  const handleLikeButton = (id) => {
    const ids = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(`https://final-project-w5otwao4va-lz.a.run.app/posts/${id}/like`, ids)
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((likedPost) => {
              console.log(`Request successful: ${JSON.stringify(likedPost)}`)
              setCounter(likedPost.likes)
            })
        }
      })
  };

  return (
		<Main>
		<CommunityImage><img src={communityImg} alt="backgroundImg" /> </CommunityImage>
			<Container>
				<SubContainer>
					<ParagraphTitle>{post.title}</ParagraphTitle>
					<Paragraph>{post.text}</Paragraph>
					</SubContainer>
					<Counter>{counter}</Counter>
							<Button
									className={post.likes}
									onClick={() => handleLikeButton(post._id)}>
									<span role="img" aria-label="heart">❤️</span>
							</Button>
							<Moment>{moment(post.createdAt).fromNow()}</Moment>
							<Button onClick={() => onDeletePost(post._id)}><RemoveButton
				src={Icon}  
					alt="remove" /></Button>
			</Container>
      <Comments postId={post._id} commentList={post.comments}/>
    </Main>
  )
};

export default SpaceCommunicate;


export const CommunityImage = styled.div`
  /* position: fixed;
  text-align: center;
	background-size: 100vw 100vh; */
	z-index: -1;
`;

export const Main = styled.div`
  display: grid;
	justify-content: center; 
	place-items: center;
	text-align: center;
	background-size: cover;
	@media (max-width: 667px) {
	justify-content: center;
  }
`;

export const Container = styled.div`
  word-break: break-all;
	width: 700px; 
	height: 200px;
  border-radius: 10px;
  padding: 60px 30px;
  margin-top: 10px;
  box-shadow: -3px -3px 9px #aaa9a9a2,
              3px 3px 7px rgba(147, 149, 151, 0.671);
	@media (max-width: 667px) {
    width: 300px; 
	  height: 200px;
		padding: 10px 0px;
  }
`;

export const SubContainer = styled.div`
  background-color: #eee;
	margin-top: 10px;
	width: 100%;
	height: 100px;
	border: 1px solid;
  border: none;
  border-radius: 20px;
	@media (max-width: 667px) {
		border-radius: 40px;
  }
`;

export const Button = styled.button`
  border-radius: 80px;
  cursor: pointer;
	border: 0;
	margin-right: 5px;
	float: left; 
`;

export const Paragraph = styled.p`
color: rgb(84, 79, 76);
`;

export const ParagraphTitle = styled.p`
	font-weight: bold;
	font-size: 30px;
	color: rgb(84, 79, 76);
`;

export const Counter = styled.p`
float: left;
margin-top: 0px;
font-size: 10px;
`;

export const Moment = styled.p`
	float: right;
	font-size: 10px;
	margin-top: 5px;
	@media (max-width: 667px) {
    /* width: 300px; 
	  height: 100px;
		padding: 10px 0px;
		margin-top: -15px; */
		margin-left: auto;
  }
`;


const RemoveButton = styled.img`
    /* filter: invert(100%) sepia(18%) saturate(351%) hue-rotate(149deg) brightness(100%) contrast(95%); */
		width: 15px;
    height: 15px;
  &:hover {
    animation: jelly .5s ease;
  }
  @keyframes jelly {
  from {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.25, 0.75);
  }
  40% {
    transform: scale(0.75, 1.25);
  }
  to {
    transform: scale(1, 1);
  }
  }
`