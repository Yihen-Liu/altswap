import {ActionModel, ActionType } from "./state";

export function signupSpacenameAction(isConnection:boolean, value:string):ActionModel {
	return{
		type: ActionType.SIGNUP_INPUT_SPACENAME,
		walletConnection:isConnection,
		spaceNameValue:value
	}
}

export function signupPasswordAction(isConnection:boolean, value:string):ActionModel {
	return {
		type: ActionType.SIGNUP_INPUT_PASSWORD,
		walletConnection: isConnection,
		passwordValue:value
	}
}

export function walletConnectionAction(action:ActionType, isConnection:boolean):ActionModel {
	return {
		type:action,
		walletConnection:isConnection
	}
}