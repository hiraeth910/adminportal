
	export const ThemeChanger = (value: any) => async (dispatch: (arg0: { type: string; payload: any}) => void) => {
		dispatch({
			type: "ThemeChanger",
			payload: value
		});
	};

	export const AddToCart = (id: any) => async (dispatch: (arg0: { type: string; payload: any}) => void) => {
		dispatch({
			type: "ADD_TO_CART",
			payload: id
		});
	};
	export const ProductReduxData = (id: any) => async (dispatch: (arg0: { type: string; payload: any}) => void) => {
		dispatch({
			type: "PRODUCT",
			payload: id
		});
	};
	// authActions.js
export const setToken = (token:string) => async (dispatch:any) => {
	dispatch({
		type: "SET_TOKEN",
		payload: token,
	});
};

export const clearToken = () => async (dispatch:any) => {
	dispatch({
		type: "CLEAR_TOKEN",
		payload: null,
	});
};
export const setRole = (role:string) => async (dispatch:any) => {
	dispatch({
		type: "SET_ROLE",
		payload: role,
	});
};

export const clearRole = () => async (dispatch:any) => {
	dispatch({
		type: "CLEAR_ROLE",
		payload: null,
	});
};


