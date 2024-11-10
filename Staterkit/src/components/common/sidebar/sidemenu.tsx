//Icons

const icon1 = <i className="bx bx-desktop"></i>;



//Badges

export const MENUITEMS = [
	{
		menutitle: "MAIN",
	},

	{
		title: "Onboarding", icon: icon1,  type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}onboarding/provider`, type: "link", active: false, selected: false, dirchange: false, title: "Provider", },
						{ path: `${import.meta.env.BASE_URL}onboarding/prducts`, type: "link", active: false, selected: false, dirchange: false, title: "Products", },
						{ path: `${import.meta.env.BASE_URL}user/withdrawl`, type: "link", active: false, selected: false, dirchange: false, title: "Withdrawals", },

		],
	},
];
