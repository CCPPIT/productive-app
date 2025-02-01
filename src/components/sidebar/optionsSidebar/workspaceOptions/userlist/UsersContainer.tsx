"use client";
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/loadingState';
import { useTranslations } from 'next-intl';
import React from 'react'
import { UserStatusTypeList } from './UserStatusTypeList';

type Props = {}

export const UsersContainer = (props: Props) => {
    const t = useTranslations("USERS_STATUS_LIST");
    const isPending=false;

    const isError=false
    if(isError){
        return(
            <div className='flex flex-col justify-center text-center gap-6 mt-6'>
            <p className='text-sm text-muted-foreground'>{t("ERROR.MG")}</p>
            <Button
            size={"sm"}
            >
                {t("ERROR.BTN")}
            </Button>
            </div>
        )

    }else{
        return (
            <div>
                {isPending?(
                    <div className='flex justify-center items-center w-full h-28 mt-2'>
                        <LoadingState/>

                    </div>
                    
                ):(
                    <>
                    <UserStatusTypeList
                    title={t("ROLES.OWNER")}
                    users={[]}
                    active
                    />
                      <UserStatusTypeList
                    title={t("ROLES.ADMIN")}
                    users={[]}
                    active
                    />
                      <UserStatusTypeList
                    title={t("ROLES.CAN_EDIT")}
                    users={[]}
                    active
                    />
                      <UserStatusTypeList
                    title={t("ROLES.READ_ONLY")}
                    users={[]}
                    active
                    />
                      <UserStatusTypeList
                    title={t("ROLES.UNAVAILABLE")}
                    users={[]}
                   
                    />

                    </>
                    

                )}
                
            </div>
          )

    }
 
}