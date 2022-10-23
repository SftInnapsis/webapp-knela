import React from 'react';
import { RouteComponentProps } from 'react-router';

const styles: {
   [key: string] : React.CSSProperties
} = {
   'logoContainer': {
      height: '80px',
      width: '100%',
      maxWidth: '100%'
   }
};

const Unauthorized = () : JSX.Element => {

   return(
      <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%', backgroundColor: '#15a550'}}>
         <h1 style={{margin: '0 auto', marginTop: '100px', width: '100%', textAlign: 'center', fontSize: '22px', color: '#fff'}}>Contenido no autorizado</h1>
      </div>
   )
};

export default(Unauthorized);
