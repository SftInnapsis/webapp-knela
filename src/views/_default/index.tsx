import React from 'react';
import { Helmet } from 'react-helmet';

import { Protected } from '@components/layout/Protected';
import { APP_DESCRIPTION_PROJECT, APP_NAME_PROJECT } from '@/toolbox/defaults/app';

export const DefaultView: React.FC = () : JSX.Element => {
   return (
      <Protected>
         <Helmet>
            <title>{`${APP_NAME_PROJECT} - ${APP_DESCRIPTION_PROJECT} :: Home`}</title>
         </Helmet>
      </Protected>
   )
};
