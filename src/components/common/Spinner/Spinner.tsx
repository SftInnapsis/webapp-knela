import React from 'react';
import './Spinner.sass';

type SpinnerProps = {
   width?: number,
   height?: number
}

export const SpinnerGrow: React.FC<SpinnerProps> = (
   props: SpinnerProps
) : JSX.Element => (
   <>
      <div className="c-spinner" style={{
         width: props.width,
         height: props.height
      }}>
         <div className="c-spinner__double-bounce1"></div>
         <div className="c-spinner__double-bounce2"></div>
      </div>
   </>
);

export const SpinnerLoad: React.FC<SpinnerProps> = (
   props: SpinnerProps
) : JSX.Element => (
   <>
      <div className="c-spinner__load" style={{
         width: props.width
      }}>
         <div className="c-spinner__bounce1"></div>
         <div className="c-spinner__bounce2"></div>
         <div className="c-spinner__bounce3"></div>
      </div>
   </>
);

export const SpinnerRing: React.FC<SpinnerProps & {color: string}> = (
   props
) : JSX.Element => {
   const stl: React.CSSProperties = {
      width: props.width/2,
      height: props.height/2,
      borderWidth: props.height/10,
   }
   return <>
      <div className="c-spinner__ring" style={{
         width: props.width,
         height: props.height
      }}>
         <div style={stl}></div><div style={stl}></div><div style={stl}></div><div style={stl}></div> 
      </div>
   </>
}

SpinnerGrow.defaultProps = {
   width: 40,
   height: 40
}
SpinnerLoad.defaultProps = {
   width: 40,
   height: 40
}
SpinnerRing.defaultProps = {
   width: 80,
   height: 80,
   color: 'white'
}
