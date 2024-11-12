//Icons

const icon1 = <i className="bx bx-desktop"></i>;



//Badges

export const MENUITEMS = [
	{
		menutitle: "MAIN",
	},

	{
		title: "Onboarding", icon: icon1,  type: "sub", active: true, selected: true, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}onboarding/provider`, type: "link", active: false, selected: false, dirchange: false, title: "Provider", },
			{ path: `${import.meta.env.BASE_URL}onboarding/prducts`, type: "link", active: false, selected: false, dirchange: false, title: "Products", },
			{ path: `${import.meta.env.BASE_URL}user/withdrawl`, type: "link", active: false, selected: false, dirchange: false, title: "Withdrawals", },

		],
	},
];
export function getMenuItemsByRole(role:string) {
  return MENUITEMS.map(item => {
    // If there are children, filter them based on the role
    if (item.children) {
      let filteredChildren = item.children;

      if (role === 'onboarder') {
        // Keep only 'Provider' and 'Products' for onboarder
        filteredChildren = item.children.filter(child => 
          child.title === 'Provider' || child.title === 'Products'
        );
      } else if (role === 'creator') {
        // Keep only 'Products' for creator
        filteredChildren = item.children.filter(child => 
          child.title === 'Products'
        );
      }

      // Return item with filtered children
      return {
        ...item,
        children: filteredChildren
      };
    }

    // Return the item as-is if there are no children
    return item;
  });
}
