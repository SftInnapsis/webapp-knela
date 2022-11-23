import React, { useState } from "react";
import ChatAvatar from "./ChatAvatar";
import GetAppIcon from '@mui/icons-material/GetApp';
import moment from 'moment';
import { Markup } from 'interweave';
import { Button } from "@mui/material";

const urlTextToHTML = (txt) => {
  txt = txt.replace('</', '&lt;/');
  txt = txt.replace('<', '&lt;');
  txt = txt.replace('>', '&gt;');
  return txt.replace(/(https?:\/\/(www\.[\w\.\-]+\.[a-z]{2,}[\/\w\.\-]*|[^www\.][\w\.\-]+\.[a-z]{2,}[\/\w\.\-]*))/gi, function (url) {
    return `<a href='` + url + `' target="_blank">` + url + `</a>`;
  });
}

const ChatItem = props => {

  const [open, setOpen] = useState(false);
  const [showResendMessage, setShowResendMessage] = useState(false)

  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  }


  const handleResendMessage = () => {
    setShowResendMessage(true);
  }

  const { isMyMessage, msg, image, imageUpload, user, file, hour } = props;

  const hourChat = moment(hour).format('LT') || "00:00";

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat-item ${isMyMessage ? "me" : "other"}`}
    >
      <div className="chat-item-content">
        <div className="chat-meta">
          <span>{isMyMessage ? "Yo" : user}</span>
          <span>{hourChat}</span>
        </div>
        {
          msg && (
            <div className="chat-msg">
              <Markup content={urlTextToHTML(msg)} />
            </div>
          )

        }
          {/* <div className="chat-msg">
         sjsjssksksksk
        </div> */}
        {
          imageUpload && (
            <>
              <br />
              <a href={imageUpload} target="_blank">
                <img style={{ height: 120, width: 120, display: imageUpload ? "flex" : "none" }} src={imageUpload} />
              </a>
            </>
          )
        }
        {
          file && (
            <>
              <br />
              <Button
                variant="contained"
                color="secondary"
                href={file} target="_blank"
                endIcon={<GetAppIcon />}
              >
                Descargar
              </Button>
            </>
          )
        }
      </div>
      <ChatAvatar isOnline="active" image={image} />
    </div>
  );
}

export default ChatItem;
