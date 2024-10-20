//Icons

const icon1 = <i className="bx bx-desktop"></i>;
const icon6 = <i className="bx bx-error-alt"></i>;
const icon11 = <i className="bx bx-menu"></i>;


//Badges
const badge1 = <span className="badge bg-warning-transparent ms-2 d-inline-block">12</span>;

export const MENUITEMS = [
	{
		menutitle: "MAIN",
	},
	{
		title: "Dashboards", icon: icon1, badgetxt: badge1, type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}dashboards/sales`, type: "link", active: false, selected: false, dirchange: false, title: "Sales", },
		],
	},
	{
		title: "Error", icon: icon6, type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}errors/error401`, type: "link", active: false, selected: false, dirchange: false, title: "401-Error" },
		],
	},
	{
		menutitle: "web apps",
	},
	{
		title: "Nested Menu", icon: icon11, type: "sub",
		children: [
			{ path: `${import.meta.env.BASE_URL}`, type: "empty", active: false, selected: false, dirchange: false, title: "Nested-1" },
			{
				title: "Categories", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}categories/first_category`, type: "link", active: false, selected: false, dirchange: false, title: "Nested-2-1" },
					{ path: `${import.meta.env.BASE_URL}`, type: "empty", active: false, selected: false, dirchange: false, title: "Nested-2-2" },

				],
			},
		],
	},
];
