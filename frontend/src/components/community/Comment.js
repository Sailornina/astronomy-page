import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import Icon from "../../assets/waste-icon.png";

const Comment = ({ comment, onCommentDeleted }) => {
	const [counter, setCounter] = useState(comment.likes);
  const accessToken = useSelector((store) => store.user.accessToken);

  const onDeleteButtonClick = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    };
    fetch(`https://final-project-w5otwao4va-lz.a.run.app/comments/${comment._id}`, options)
    .then((res) => {
      if(res.status === 200) {
        onCommentDeleted(comment)
      }
    })
  };


	
  const handleLikeButton = (id) => {
    const ids = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    fetch(
      `https://final-project-w5otwao4va-lz.a.run.app/comments/${id}/like`,
      ids
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((likedComment) => {
          console.log(`Request successful: ${JSON.stringify(likedComment)}`);
          setCounter(likedComment.likes);
        });
      }
    });
  };


  return (
    <Main>
      <Container>
        <Title>{comment.author.username}</Title>
        <Paragraph>{comment.text}</Paragraph>
				<Counter>{counter}</Counter>
        <Button
          className={comment.likes}
          onClick={() => handleLikeButton(comment._id)}
        >
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </Button>
        <Moment>{moment(comment.createdAt).fromNow()}</Moment>
        <Button onClick={onDeleteButtonClick}>
          <RemoveButton src={Icon} alt="remove" />
        </Button>
      </Container>
    </Main>
  );
};

export default Comment;


export const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  text-align: center;
  background-size: cover;
  @media (max-width: 667px) {
    justify-content: center;
		overflow:hidden
  }
`;

export const Container = styled.div`
  word-break: break-all;
  width: 700px;
  height: 200px;
  border-radius: 10px;
  padding: 10px 30px;
  margin-top: 10px;
	box-shadow: -3px -3px 9px #aaa9a9a2, 3px 3px 7px rgba(147, 149, 151, 0.671);
  @media (max-width: 667px) {
    width: 320px;
    height: 200px;
    padding: 10px 0px;
  }
`;

export const Paragraph = styled.p`
  color: rgb(84, 79, 76);
  @media (max-width: 667px) {
    font-size: smaller;
  }
`;

export const Button = styled.button`
  background-color: white;
  border-radius: 80px;
  cursor: pointer;
  border: 0;
  margin-right: 5px;
  float: left;
`;

export const Title = styled.p`
  text-transform: capitalize;
  color: #008080;
	float: left;
	font-weight: bold;
  text-transform: capitalize;
  font-size: small;
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
    margin-left: auto;
  }
`;


const RemoveButton = styled.img`
  width: 12px;
  height: 12px;
	margin-top: 5px;
  &:hover {
    animation: jelly 0.5s ease;
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
  @media (max-width: 667px) {
    width: 10px;
    height: 10px;
  }
`;
