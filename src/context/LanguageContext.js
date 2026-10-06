import {createContext, useState} from "react";
import translation from "../languages/languages";
import {I18n} from "i18n-js";

const LanguageContext = createContext();

export const LanguageContextProvider = ({children})=>{
    const [language,setLanguage] = useState("tr");

    const i18n = new I18n(translation);
    i18n.locale = language;
    i18n.enableFallback = true;

    const values = {
        language,
        setLanguage,
        i18n
    }

    return (
        <LanguageContext.Provider value={values}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext
