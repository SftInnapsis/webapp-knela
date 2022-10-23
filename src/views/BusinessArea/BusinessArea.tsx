import { TableDataV2 } from "@/components/common/Tablev2";
import React, { useState } from "react";


export const BusinessArea = (props) => {

    return (
        <>
        <TableDataV2
        data ={[
            { name: 'aldair' },
            { name: 'company' },
            { name: 'role' },
            { name: 'isVerified' },
            { name: 'status' },
            { name: 'xd' },
            { name: 'aldair' },
            { name: 'company' },
            { name: 'role' },
            { name: 'isVerified' },
            { name: 'status' },
            { name: 'xd' },
            { name: 'aldair' },
            { name: 'company' },
            { name: 'role' },
            { name: 'isVerified' },
            { name: 'status' },
            { name: 'xd' },
         ]}
        header={[
            { id: 'name', label: 'Name', alignRight: false },
            { id: 'company', label: 'Company', alignRight: false },
            { id: 'role', label: 'Role', alignRight: false },
            { id: 'status', label: 'Status', alignRight: false },
         ]}
        />
        </>
    );
};
