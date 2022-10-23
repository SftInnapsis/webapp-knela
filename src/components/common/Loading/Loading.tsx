import React from 'react';
import { Props } from './Loading.type';
import { SpinnerGrow } from '../Spinner/index';
import './Loading.sass';

export const Loading: React.FC<Props> = (
   props: Props
): JSX.Element => {

   const title = props.title || 'Cargando ...';

   return (
      <div className="c-loading__parent" >
         <div className="c-loading__container" >
               <div className="c-loading__content" >
                  <SpinnerGrow></SpinnerGrow>
                  <span className="c-loading__title">{title}</span>
               </div>
         </div>
      </div>
   );
}
