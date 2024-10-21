import React from "react";
import {IBaseProps} from "./interfaces/props";
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { ReactNode} from 'react'

interface ProviderProps {
    forceRenderAfterLocaleChange?: boolean
    children: ReactNode
}

function Provider({  forceRenderAfterLocaleChange = true, children }: ProviderProps) {
    return (
        <I18nProvider forceRenderOnLocaleChange={forceRenderAfterLocaleChange} i18n={i18n}>
            {children}
        </I18nProvider>
    )
}

const LanguageProvider:React.FC<IBaseProps> = (props:IBaseProps)=>{
	return(
		<Provider
			forceRenderAfterLocaleChange={false}
			children={props.children}
		/>
	);
}


export {LanguageProvider}