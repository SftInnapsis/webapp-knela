import React, { useEffect, useRef, useState } from "react";
import { Protected } from "@components/layout/Protected";
import { MoreIcon } from "@toolbox/constants/icons";
import { ButtonComponent as Button } from "@components/common/Button";
import "./Setting.sass";
import { Props } from "./Seeting.type";
import { Loading } from "@/components/common/Loading";

export const SeetingView: React.FC<Props> = ({
}): JSX.Element => {
   const [loading, setLoading] = useState<boolean>(true);
   const onRegisterPeriodHandler = () => {
   //   history.push(Routes.ROUTE_SEETING_REGISTER_PERIOD, {
   //       fullPeriodYearsList,
   //       semestersPeriodList: semestersPeriodList,
   //   });
   };

   useEffect(() => {
      if (loading) {
      }
   }, // eslint-disable-next-line
   []);
   return (
      <Protected>
         <div className="c-setting">
            <div className="c-setting__header">
               <div className="button-container">
                  <Button
                     styleButton="outlined-small"
                     text={
                        <>
                           Nuevo <MoreIcon />
                        </>
                     }
                     action={onRegisterPeriodHandler}
                  />
               </div>
               </div>
            <div className="c-setting__table-container">
               <h1>COnfiguraciones</h1>
               {loading && <Loading />}
            </div>
         </div>
      </Protected>
   );
};
