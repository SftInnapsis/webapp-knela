import { SVGAttributes, memo } from 'react';

import './Icon.module.sass';

interface IconProps {
   Svg: React.FC<SVGAttributes<any>>;
   size?: '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x';
   className?: string;
   classNameSvg?: string;
   style?: React.CSSProperties
}

const IconComponent: React.FC<IconProps> = ({Svg, size = '3x', className = '', classNameSvg = '', style = {}}) => {
   return (
      <i className = { `Container Icon-${size} ${className}`.trim() } style={style}>
         <Svg className={`${classNameSvg}`} style={style}/>
      </i>
   );
};

export const Icon = memo(IconComponent);
