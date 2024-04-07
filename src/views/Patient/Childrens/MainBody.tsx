import React, { createRef } from 'react';
import '@assets/styles/knela-app.css';
import '@assets/styles/knela-app.scss';
import ChatItem from '../Components/ChatItem';
import { useHistory, withRouter } from 'react-router-dom';
import { API_URL_BASE } from '@toolbox/defaults/app';

import defaultAvatarMale from '@assets/images/defaultAvatarMale.jpg'
import defaultAvatarFemale from '@assets/images/defaultAvatarFemale.jpg'
import avatarOthers from '@assets/images/avatarOthers.png';
import logoknela from '@assets/images/logoknela.png';

type ModalProps = {
   // open: boolean,
   // setOpen: any,
   actionSelect?: string,
   recoveryData?: any,
   messages?:any,
   chat?:any,
   user?:any
   //    savePatientMaster?: ({ }) => void,
   //    editPatientMaster?: ({ }) => void,
}

export const MainBody: React.FC<ModalProps> = (
   props: ModalProps
): JSX.Element => {
  const { messages = [], chat, user } = props;
  const messagesEndRef = React.useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const getImageProfile = (type) => {
   switch(type){
     case "M":
       return defaultAvatarMale;
     case "F":
       return defaultAvatarFemale;
     case "O":
       return avatarOthers;
     default:
       return logoknela;
   }
 }

  React.useEffect(scrollToBottom, [props]);

  return (
    <div className="main-chat-content" >
      {messages.map((message, index) => {
         console.log(message)
        var defaultImageType = message.userSex || "M";
        return (
          <ChatItem
            key={index}
            user={message.userFirstName + " " + message.userLastName}
            msg={message.idsend_type == 1 ? message.message: ''}
            // resend={message.resend}
            image={message.userAvatar ? (API_URL_BASE + message.userAvatar) : getImageProfile(defaultImageType)}
            isMyMessage={message.userId == user.id}
            imageUpload={message.idsend_type == 3 ? (`${API_URL_BASE}/${message.message}`) : ""}
            file={message.idsend_type == 2 ? (`${API_URL_BASE}/${message.message}`) : ''}
            hour={message.send_date}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

