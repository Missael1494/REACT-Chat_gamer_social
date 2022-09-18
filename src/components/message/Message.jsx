import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;


export default function Message({ message, own, user, currentChat }) {
  const [friend, setFriend] = useState(null)

  const friendImageId = currentChat.filter( member => member !== user._id )
  console.log("friendImage", friendImageId)
  //console.log("CurrentChat", currentChat[1])

  useEffect(() => {

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendImageId);
        setFriend(res.data.profilePicture);
        console.log("friendImage", friend)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? (PF + user.profilePicture) : (PF + friend) }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
