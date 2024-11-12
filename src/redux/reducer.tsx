

const initialState = {
	lang: "en",
	dir: "ltr",
	dataThemeMode: "light",
	dataMenuStyles: "dark",
	dataNavLayout: "vertical",
	dataHeaderStyles: "gradient",
	defaultHeaderStyles: "",
	dataVerticalStyle: "overlay",
	StylebodyBg: "107 64 64",
	StyleDarkBg: "93 50 50",
	toggled: "",
	dataNavStyle: "",
	horStyle: "",
	dataPageStyle: "regular",
	dataWidth: "fullwidth",
	dataMenuPosition: "fixed",
	dataHeaderPosition: "fixed",
	loader: "disable",
	iconOverlay: "",
	colorPrimaryRgb: "",
	bodyBg: "",
	Light: "",
	darkBg: "",
	inputBorder: "",
	bgImg: "",
	iconText: "",
	authToken:null,
	role:null,
	body: {
		class: ""
	},


};
export default function reducer(state = initialState, action: any) {
	const { type, payload } = action;

	switch (type) {

		case "ThemeChanger":
      return { ...state, ...payload }; // spread other values from payload
    case "SET_TOKEN":
      return { ...state, authToken: payload }; // set authToken
    case "CLEAR_TOKEN":
      return { ...state, authToken: null }; 
    case "SET_ROLE":
		return{...state,role:payload};
	case "CLEAR_ROLE":
		return{...state,role:payload}
		

		default:
			return state;
	}
}
