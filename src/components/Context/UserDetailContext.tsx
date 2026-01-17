'use client'
import { UserDetailVO } from "@api/codegen/user";
import { createContext, useContext, useState } from "react";
export const UserDetailContext = createContext<{ userDetailVO: UserDetailVO | null, handleUserDetailChanged: (userDetailVO: UserDetailVO) => void  } | null>(null);

export const UserDetailContextProvider = ({ children }: { children: React.ReactNode,}) => {
    const [userDetailVO, setUserDetailVO] = useState<UserDetailVO | null>(null);
    const handleUserDetailChanged = (userDetailVO: UserDetailVO) => {
        setUserDetailVO(userDetailVO);
    }

    return (
         <UserDetailContext.Provider value={{userDetailVO: userDetailVO, handleUserDetailChanged: handleUserDetailChanged}} >{children}</UserDetailContext.Provider>
    )
}

export const useUserDetailContext = () => {
    const context = useContext(UserDetailContext);
    if (context === null) {
        throw new Error("useUserDetailContext must be used within a UserDetailContextProvider");
    }
    return context;
}
