import {
    IconButton,
    Tooltip
} from "@mui/material";
import { Icon } from "@components/common/Icon";
import { InfoCircleIcon } from "@constants/icons";
import "./InformationIcon.sass"

interface InformationIconProps {
   title: string;
   errors: boolean;
}

// export const InformationIcon = ({title: string, errors=false})=>{
export const InformationIcon = (props: InformationIconProps)=>{
   return (
      <Tooltip
         disableHoverListener={false}
         disableFocusListener={false}
         disableTouchListener={false}
         title = {props.title}
         >
         <IconButton
            className={(props.errors) ? "e-information-icon__button buttonError-Infor" : "e-information-icon__button"}
         >
            <Icon  Svg={InfoCircleIcon}></Icon>
         </IconButton>
      </Tooltip>
   )
}
