import {createContext, useRef, useState} from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [loggedIn,setLoggedIn] = useState(false);
    const [location,setLocation] = useState(null);
    const [visibleModal,setVisibleModal] = useState(false);
    const [modalData,setModalData] = useState(null);
    const [marker, setMarker] = useState([]);
    const [filteredMarkers, setFilteredMarkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null); // HomeScreen'den gelen ref
    const [notifiId,setNotifiId] = useState("");
    const [userData,setUserData] = useState(null);

    const values = {
        loggedIn,
        setLoggedIn,
        location,
        setLocation,
        visibleModal,
        setVisibleModal,
        modalData,
        setModalData,
        marker,
        setMarker,
        filteredMarkers,
        setFilteredMarkers,
        loading,
        setLoading,
        mapRef,
        notifiId,
        setNotifiId,
        userData,
        setUserData
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
