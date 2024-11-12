
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { Button, Card, Dropdown, InputGroup, ListGroup, Modal, Nav, Offcanvas, Tab } from "react-bootstrap";
import { MENUITEMS } from "../sidebar/sidemenu";
import DatePicker from "react-datepicker";
import {store} from "../../../redux/store";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { ThemeChanger } from "../../../redux/action";
//IMAGES
import desktoplogo from "../../../assets/images/brand-logos/desktop-logo.png";
import togglelogo from "../../../assets/images/brand-logos/toggle-logo.png";
import desktopdark from "../../../assets/images/brand-logos/desktop-dark.png";
import toggledark from "../../../assets/images/brand-logos/toggle-dark.png";
import spainflag from "../../../assets/images/flags/spain_flag.jpg";
import usflag from "../../../assets/images/flags/us_flag.jpg";
import frenchflag from "../../../assets/images/flags/french_flag.jpg";
import germanyflag from "../../../assets/images/flags/germany_flag.jpg";
import russiaflag from "../../../assets/images/flags/russia_flag.jpg";
import italyflag from "../../../assets/images/flags/italy_flag.jpg";
import media34 from "../../../assets/images/media/media-34.jpg";
import media35 from "../../../assets/images/media/media-35.jpg";
import media36 from "../../../assets/images/media/media-36.jpg";
import faces16 from "../../../assets/images/faces/16.jpg";
import faces1 from "../../../assets/images/faces/1.jpg";
import faces9 from "../../../assets/images/faces/9.jpg";
import faces6 from "../../../assets/images/faces/6.jpg";

import faces14 from "../../../assets/images/faces/14.jpg";
import faces11 from "../../../assets/images/faces/11.jpg";



const role = (state:any) => state.role;
interface HeaderProps { }

const Header: FC<HeaderProps> = ({ local_varaiable, ThemeChanger }: any) => {

	const [startDatei, setStartDatei] = useState(new Date());
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [show1, setShow1] = useState(false);

	const handleClose1 = () => setShow1(false);
	const handleShow1 = () => setShow1(true);

	const [show3, setShow3] = useState(false);

	const handleClose3 = () => setShow3(false);
	const handleShow3 = () => setShow3(true);

	function menuClose() {
		const theme = store.getState();
		if (window.innerWidth <= 992) {
			ThemeChanger({ ...theme, toggled: "close" });
		}
		if (window.innerWidth >= 992) {
			ThemeChanger({ ...theme, toggled: local_varaiable.toggled ? local_varaiable.toggled : "" });
		}
	}
	//Dark Model
	const ToggleDark = () => {

		ThemeChanger({
			...local_varaiable,
			"dataThemeMode": local_varaiable.dataThemeMode == "dark" ? "light" : "dark",
			"dataHeaderStyles": local_varaiable.dataThemeMode == "dark" ? "light" : "gradient",
			"dataMenuStyles": local_varaiable.dataNavLayout == "horizontal" ? local_varaiable.dataThemeMode == "dark" ? "gradient" : "dark" : "dark"

		});
		const theme = store.getState();

		if (theme.dataThemeMode != "dark") {

			ThemeChanger({
				...theme,
				"bodyBg": "",
				"Light": "",
				"darkBg": "",
				"inputBorder": "",
				"dataHeaderStyles": "gradient"

			});
			localStorage.removeItem("velvetdarktheme");
			localStorage.removeItem("darkBgRGB1");
			localStorage.removeItem("darkBgRGB2");
			localStorage.removeItem("darkBgRGB3");
			localStorage.removeItem("darkBgRGB4");
			localStorage.removeItem("velvetMenu");
			localStorage.removeItem("velvetHeader");
		}
		else {
			localStorage.setItem("velvetdarktheme", "dark");
			localStorage.removeItem("velvetlighttheme");
			localStorage.removeItem("velvetHeader");
			localStorage.removeItem("velvetMenu");

		}

	};

      const adminrole = useSelector(role); // Retrieve authToken from Redux state


	const [_menuitems, setMenuitems] = useState(MENUITEMS);

	function closeMenuFn() {
		const closeMenuRecursively = (items: any[]) => {
			items?.forEach((item: { active: boolean; children: any; }) => {
				item.active = false;
				closeMenuRecursively(item.children);
			});
		};
		closeMenuRecursively(MENUITEMS);
		setMenuitems((arr: any) => [...arr]);
	}
	const toggleSidebar = () => {
		const theme = store.getState();
		const sidemenuType = theme.dataNavLayout;
		if (window.innerWidth >= 992) {
			if (sidemenuType === "vertical") {
				const verticalStyle = theme.dataVerticalStyle;
				const navStyle = theme.dataNavStyle;
				switch (verticalStyle) {
					// closed
					case "closed":
						ThemeChanger({ ...theme, "dataNavStyle": "" });
						if (theme.toggled === "close-menu-close") {
							ThemeChanger({ ...theme, "toggled": "" });
						} else {
							ThemeChanger({ ...theme, "toggled": "close-menu-close" });
						}
						break;
					// icon-overlay
					case "overlay":
						ThemeChanger({ ...theme, "dataNavStyle": "" });
						if (theme.toggled === "icon-overlay-close") {
							ThemeChanger({ ...theme, "toggled": "", "iconOverlay": '' });
						} else {
							if (window.innerWidth >= 992) {
								ThemeChanger({ ...theme, "toggled": "icon-overlay-close", "iconOverlay": '' });
							}
						}
						break;
					// icon-text
					case "icontext":
						ThemeChanger({ ...theme, "dataNavStyle": "" });
						if (theme.toggled === "icon-text-close") {
							ThemeChanger({ ...theme, "toggled": "" });
						} else {
							ThemeChanger({ ...theme, "toggled": "icon-text-close" });
						}
						break;
					// doublemenu
					case "doublemenu":
						ThemeChanger({ ...theme, "dataNavStyle": "" });
						if (theme.toggled === "double-menu-open") {
							ThemeChanger({ ...theme, "toggled": "double-menu-close" });
						} else {
							const sidemenu = document.querySelector(".side-menu__item.active");
							if (sidemenu) {
								if (sidemenu.nextElementSibling) {
									sidemenu.nextElementSibling.classList.add("double-menu-active");
									ThemeChanger({ ...theme, "toggled": "double-menu-open" });
								} else {

									ThemeChanger({ ...theme, "toggled": "double-menu-close" });
								}
							}
						}

						break;
					// detached
					case "detached":
						if (theme.toggled === "detached-close") {
							ThemeChanger({ ...theme, "toggled": "" });

						} else {
							ThemeChanger({ ...theme, "toggled": "detached-close", "iconOverlay": '' });
						}
						break;
					// default
					case "default":
						ThemeChanger({ ...theme, "toggled": "" });

				}
				switch (navStyle) {
					case "menu-click":
						if (theme.toggled === "menu-click-closed") {
							ThemeChanger({ ...theme, "toggled": "" });
						}
						else {
							ThemeChanger({ ...theme, "toggled": "menu-click-closed" });
						}
						break;
					// icon-overlay
					case "menu-hover":
						if (theme.toggled === "menu-hover-closed") {
							ThemeChanger({ ...theme, "toggled": "" });
							closeMenuFn();
						} else {
							ThemeChanger({ ...theme, "toggled": "menu-hover-closed" });
							// setMenuUsingUrl();
						}
						break;
					case "icon-click":
						if (theme.toggled === "icon-click-closed") {
							ThemeChanger({ ...theme, "toggled": "" });
						} else {
							ThemeChanger({ ...theme, "toggled": "icon-click-closed" });

						}
						break;
					case "icon-hover":
						if (theme.toggled === "icon-hover-closed") {
							ThemeChanger({ ...theme, "toggled": "" });
							closeMenuFn();
						} else {
							ThemeChanger({ ...theme, "toggled": "icon-hover-closed" });
							// setMenuUsingUrl();

						}
						break;
				}
			}
		}
		else {
			if (theme.toggled === "close") {
				ThemeChanger({ ...theme, "toggled": "open" });

				setTimeout(() => {
					if (theme.toggled == "open") {
						const overlay = document.querySelector("#responsive-overlay");

						if (overlay) {
							overlay.classList.add("active");
							overlay.addEventListener("click", () => {
								const overlay = document.querySelector("#responsive-overlay");

								if (overlay) {
									overlay.classList.remove("active");
									menuClose();
								}
							});
						}
					}

					window.addEventListener("resize", () => {
						if (window.screen.width >= 992) {
							const overlay = document.querySelector("#responsive-overlay");

							if (overlay) {
								overlay.classList.remove("active");
							}
						}
					});
				}, 100);
			} else {
				ThemeChanger({ ...theme, "toggled": "close" });
			}
		}
	};
	/****fullscreeen */
	const [fullScreen, setFullScreen] = useState(false);

	const toggleFullScreen = () => {
		const elem = document.documentElement;

		if (!document.fullscreenElement) {
			elem.requestFullscreen().then(() => setFullScreen(true));
		} else {
			document.exitFullscreen().then(() => setFullScreen(false));
		}
	};

	const handleFullscreenChange = () => {
		setFullScreen(!!document.fullscreenElement);
	};

	useEffect(() => {
		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	const Switchericon = () => {
		document.querySelector(".offcanvas-end")?.classList.toggle("show");
		if (document.querySelector(".switcher-backdrop")?.classList.contains("d-none")) {
			document.querySelector(".switcher-backdrop")?.classList.add("d-block");
			document.querySelector(".switcher-backdrop")?.classList.remove("d-none");
		}
	};

	
	const searchRef = useRef(null);

	const handleClick = (event: any) => {
		const searchInput: any = searchRef.current;

		if (searchInput && (searchInput === event.target || searchInput.contains(event.target))) {
			document.querySelector(".header-search")?.classList.add("searchdrop");
		} else {
			document.querySelector(".header-search")?.classList.remove("searchdrop");
		}
	};

	useEffect(() => {
		document.body.addEventListener("click", handleClick);

		return () => {
			document.body.removeEventListener("click", handleClick);
		};
	}, []);

	// search Functionality
	const [showa, setShowa] = useState(false);
	const [InputValue, setInputValue] = useState("");
	const [show2, setShow2] = useState(false);
	const [searchcolor, setsearchcolor] = useState("text-dark");
	const [searchval, setsearchval] = useState("Type something");
	const [NavData, setNavData] = useState([]);

	const myfunction = (inputvalue: string) => {
		document.querySelector(".search-result")?.classList.remove("d-none");

		const i: any = [];
		const allElement2: any = [];

		MENUITEMS.forEach((mainLevel) => {
			if (mainLevel.children) {
				setShowa(true);
				mainLevel.children.forEach((subLevel: any) => {
					i.push(subLevel);
					if (subLevel.children) {
						subLevel.children.forEach((subLevel1: any) => {
							i.push(subLevel1);
							if (subLevel1.children) {
								subLevel1.children.forEach((subLevel2: any) => {
									i.push(subLevel2);
								});
							}
						});
					}
				});
			}
		});

		for (const allElement of i) {
			if (allElement.title.toLowerCase().includes(inputvalue.toLowerCase())) {
				if (allElement.title.toLowerCase().startsWith(inputvalue.toLowerCase())) {
					setShow2(true);

					// Check if the element has a path and doesn't already exist in allElement2 before pushing
					if (allElement.path && !allElement2.some((el: { title: any; }) => el.title === allElement.title)) {
						allElement2.push(allElement);
					}
				}
			}
		}

		if (!allElement2.length || inputvalue === "") {
			if (inputvalue === "") {
				setShow2(false);
				setsearchval("Type something");
				setsearchcolor("text-dark");
			}
			if (!allElement2.length) {
				setShow2(false);
				setsearchcolor("text-danger");
				setsearchval("There is no component with this name");
			}
		}
		setNavData(allElement2);

	};

	//   sticky-pin
	const Topup = () => {
		if (window.scrollY > 30 && document.querySelector(".app-header")) {
			const Scolls = document.querySelectorAll(".app-header");
			Scolls.forEach((e) => {
				e.classList.add("sticky-pin");
			});
		} else {
			const Scolls = document.querySelectorAll(".app-header");
			Scolls.forEach((e) => {
				e.classList.remove("sticky-pin");
			});
		}
	};
	if (typeof window !== "undefined") {
		window.addEventListener("scroll", Topup);
	}

	return (
		<Fragment>
			<header className="app-header">

				<div className="main-header-container container-fluid">

					<div className="header-content-left">

						<div className="header-element">
							<div className="horizontal-logo">
								<Link to={`${import.meta.env.BASE_URL}dashboards/sales/`} className="header-logo">
									<img src={desktoplogo} alt="logo" className="desktop-logo" />
									<img src={togglelogo} alt="logo" className="toggle-logo" />
									<img src={desktopdark} alt="logo" className="desktop-dark" />
									<img src={toggledark} alt="logo" className="toggle-dark" />
								</Link>
							</div>
						</div>

						<div className="header-element">
							<Link aria-label="anchor" to="#" className="sidemenu-toggle header-link" data-bs-toggle="sidebar" onClick={() => toggleSidebar()}>
								<span className="open-toggle me-2">
									<i className="bx bx-menu header-link-icon"></i>
								</span>
							</Link>
							<div className="main-header-center  d-none d-lg-block  header-link">
								<input
									type="text"
									className="form-control form-control-lg"
									id="typehead"
									placeholder="Search for results..."
									onClick={() => { }}
									autoComplete="off"
									ref={searchRef}
									defaultValue={InputValue}
									onChange={(ele => { myfunction(ele.target.value); setInputValue(ele.target.value); })}
								/>
								<Button type="button" variant='' aria-label="button" className="btn pe-1"><i className="fe fe-search" aria-hidden="true"></i></Button>
								<div id="headersearch" className="header-search">
									<div className="p-3">
										<div className="">
											<p className="fw-semibold text-muted mb-2 fs-13">Recent Searches</p>
											<div className="ps-2">
												<Link to="#" className="search-tags me-1"><i className="fe fe-search me-1"></i>People<span></span></Link>
												<Link to="#" className="search-tags me-1"><i className="fe fe-search me-1"></i>Pages<span></span></Link>
												<Link to="#" className="search-tags me-1"><i className="fe fe-search me-1"></i>Articles<span></span></Link>
											</div>
										</div>
										{showa ?
											<Card className="custom-card search-result position-relative z-index-9 search-fix  border mt-1">
												<Card.Header className="">
													<div className="card-title me-2 text-break">Search result of {InputValue}</div>
												</Card.Header>
												<ListGroup className='m-2'>
													{show2 ?
														NavData.map((e: any) =>
															<ListGroup.Item key={Math.random()} className="">
																<Link to={`${e.path}/`} className='search-result-item' onClick={() => { setShow1(false), setInputValue(""); }}>{e.title}</Link>
															</ListGroup.Item>
														)
														: <b className={`${searchcolor} `}>{searchval}</b>}
												</ListGroup>
											</Card>
											: ""}
										<div className="mt-3">
											<p className="fw-semibold text-muted mb-2 fs-13">Apps and pages</p>
											<ul className="ps-2">
												<li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
													<Link to="#"><span><i className="bx bx-calendar me-2 fs-14 bg-primary-transparent p-2 rounded-circle"></i>Calendar</span></Link>
												</li>
												<li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
													<Link to="#"><span><i className="bx bx-envelope me-2 fs-14 bg-primary-transparent p-2 rounded-circle"></i>Mail</span></Link>
												</li>
												<li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
													<Link to="#"><span><i className="bx bx-dice-1 me-2 fs-14 bg-primary-transparent p-2 rounded-circle"></i>Buttons</span></Link>
												</li>
											</ul>
										</div>
										<div className="mt-3">
											<p className="fw-semibold text-muted mb-2 fs-13">Links</p>
											<ul className="ps-2">
												<li className="p-1 align-items-center text-muted mb-1 search-app">
													<Link to="#" className="text-primary"><u>http://spruko/spruko.com</u></Link>
												</li>
												<li className="p-1 align-items-center text-muted mb-1 search-app">
													<Link to="#" className="text-primary"><u>http://spruko/spruko.com</u></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="py-3 border-top px-0">
										<div className="text-center">
											<Link to="#" className="text-primary text-decoration-underline fs-15">View all</Link>
										</div>
									</div>
								</div>

							</div>

						</div>
						<div className="header-element header-search d-lg-none d-block" onClick={handleShow3}>
							<Link aria-label="anchor" to="#" className="header-link" data-bs-toggle="modal" data-bs-target="#searchModal">
								<i className="bx bx-search-alt-2 header-link-icon"></i>
							</Link>
						</div>
					</div>

					<div className="header-content-right">

						<Dropdown className="header-element country-selector">
							<Dropdown.Toggle variant='' aria-label="anchor" className="header-link dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">
								<i className="bx bx-globe header-link-icon"></i>
							</Dropdown.Toggle>
							<Dropdown.Menu as="ul" className="main-header-dropdown dropdown-menu border-0" data-popper-placement="none">
								<Dropdown.Item className=" d-flex align-items-center border-0">
									<span className="avatar avatar-xs lh-1 me-2">
										<img src={usflag} alt="img" />
									</span>
									English
								</Dropdown.Item>
								<Dropdown.Item className=" d-flex align-items-center border-0">
									<span className="avatar avatar-xs lh-1 me-2">
										<img src={spainflag} alt="img" />
									</span>
									Spanish
								</Dropdown.Item>
								<Dropdown.Item className=" d-flex align-items-center border-0">
									<span className="avatar avatar-xs lh-1 me-2">
										<img src={frenchflag} alt="img" />
									</span>
									French
								</Dropdown.Item>
								<Dropdown.Item className=" d-flex align-items-center border-0">
									<span className="avatar avatar-xs lh-1 me-2">
										<img src={germanyflag} alt="img" />
									</span>
									German
								</Dropdown.Item>
								<Dropdown.Item className=" d-flex align-items-center border-0">
									<span className="avatar avatar-xs lh-1 me-2">
										<img src={italyflag} alt="img" />
									</span>
									Italian
								</Dropdown.Item>
								<Dropdown.Item className=" d-flex align-items-center">
									<span className="avatar avatar-xs lh-1 me-2">
										<img src={russiaflag} alt="img" />
									</span>
									Russian
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<div className="header-element header-theme-mode">
							<Link aria-label="anchor" to="#" className="header-link layout-setting" onClick={() => ToggleDark()}>

								<i className="bx bx-sun bx-flip-horizontal header-link-icon ionicon  dark-layout"></i>

								<i className="bx bx-moon bx-flip-horizontal header-link-icon ionicon light-layout"></i>

							</Link>
						</div>

						

						
						<div className="header-element d-flex header-settings header-shortcuts-dropdown" >
							<Link aria-label="anchor" to="#" className=" header-link nav-link icon" onClick={handleShow} data-bs-toggle="offcanvas" data-bs-target="#apps" aria-controls="apps">
								<i className="bx bx-category  header-link-icon"></i>
							</Link>
						</div>

						<Offcanvas placement='end' className="offcanvas-end wd-330" tabIndex={-1} id="apps" aria-labelledby="appsLabel" show={show} onHide={handleClose}>
							<Offcanvas.Header closeButton className="offcanvas-header border-bottom">
								<h5 id="appsLabel" className="mb-0 fs-18">Related Apps</h5>
							</Offcanvas.Header>
							<div className="p-3">
								<div className="row g-3">
									<div className="col-6">
										<Link to="#">
											<div className="text-center p-3 related-app border">
												<span className="avatar fs-23 bg-success-transparent p-2 mb-2">
													<i className="bx bx-calendar text-success"></i>
												</span>
												<span className="d-block fs-13 text-muted fw-semibold">Calendar</span>
											</div>
										</Link>
									</div>
									<div className="col-6">
										<Link to="#">
											<div className="text-center p-3 related-app border">
												<span className="avatar  fs-23 bg-info-transparent p-2 mb-2">
													<i className="bx bx-envelope  text-info"></i>
												</span>
												<span className="d-block fs-13 text-muted fw-semibold">Mail</span>
											</div>
										</Link>
									</div>
									<div className="col-6">
										<Link to="#">
											<div className="text-center p-3 related-app border">
												<span className="avatar bg-warning-transparent fs-23 bg p-2 mb-2">
													<i className="bx bx-user  text-warning"></i>
												</span>
												<span className="d-block fs-13 text-muted fw-semibold">Profile</span>
											</div>
										</Link>
									</div>
									<div className="col-6">
										<Link to="#">
											<div className="text-center p-3 related-app border">
												<span className="avatar    bg-pink-transparent fs-23 bg p-2 mb-2">
													<i className="bx bx-chat text-pink"></i>
												</span>
												<span className="d-block fs-13 text-muted fw-semibold">Chat</span>
											</div>
										</Link>
									</div>
									<div className="col-6">
										<Link to="#">
											<div className="text-center p-3 related-app border">
												<span className="avatar    bg-secondary-transparent fs-23 bg p-2 mb-2">
													<i className="bx bx-phone text-secondary"></i>
												</span>
												<span className="d-block fs-13 text-muted fw-semibold">Contacts</span>
											</div>
										</Link>
									</div>
									<div className="col-6">
										<Link to="#">
											<div className="text-center p-3 related-app border">
												<span className="avatar    bg-teal-transparent fs-23 bg p-2 mb-2">
													<i className="bx bx-cog text-teal"></i>
												</span>
												<span className="d-block fs-13 text-muted fw-semibold">Settings</span>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</Offcanvas>
						<div className="header-element header-fullscreen">
							<Link aria-label="anchor" onClick={toggleFullScreen} to="#" className="header-link">
								{fullScreen ? (
									<i className="bx bx-exit-fullscreen header-link-icon  full-screen-close"></i>
								) : (
									<i className="bx bx-fullscreen header-link-icon  full-screen-open"></i>
								)}
							</Link>
						</div>

						<div className="header-element d-flex header-settings" onClick={handleShow1}>
							<Link aria-label="anchor" to="#" className=" header-link nav-link icon me-1" data-bs-toggle="offcanvas" data-bs-target="#sidebar-right" aria-controls="sidebar-right">
								<i className="bx bx-slider header-link-icon"></i>
							</Link>
						</div>

						<Dropdown className="header-element mainuserProfile">
							<Dropdown.Toggle variant='' as="a" className="header-link dropdown-toggle" id="mainHeaderProfile" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
								<div className="d-flex align-items-center">
									<div className="d-sm-flex wd-100p">
										<div className="avatar avatar-sm"><img alt="avatar" className="rounded-circle" src={faces1} /></div>
										<div className="ms-2 my-auto d-none d-xl-flex">
											<h6 className=" font-weight-semibold mb-0 fs-13 user-name d-sm-block d-none">{adminrole}</h6>
										</div>
									</div>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu as="ul" className="dropdown-menu  border-0 main-header-dropdown  overflow-hidden header-profile-dropdown" aria-labelledby="mainHeaderProfile">
								<Dropdown.Item as="li" className="border-0">
									<Link to="#"><i className="fs-13 me-2 bx bx-user"></i>Profile</Link></Dropdown.Item>
								<Dropdown.Item as="li" className="border-0">
									<Link to="#">
										<i className="fs-13 me-2 bx bx-comment"></i>Message
									</Link>
								</Dropdown.Item>
								<Dropdown.Item as="li" className="border-0">
									<Link to="#">
										<i className="fs-13 me-2 bx bx-cog"></i>Settings
									</Link>
								</Dropdown.Item>
								<Dropdown.Item as="li" className="border-0">
									<Link to="#">
										<i className="fs-13 me-2 bx bx-help-circle"></i>Help
									</Link>
								</Dropdown.Item>
								<Dropdown.Item as="li" className="border-0">
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault(); // Prevent the default anchor behavior
      window.location.replace(`${import.meta.env.BASE_URL}firebase/login`); // Replace current path
    }}
  >
    <i className="fs-13 me-2 bx bx-arrow-to-right"></i>Log Out
  </a>
</Dropdown.Item>

							</Dropdown.Menu>
						</Dropdown>

						<div className="header-element">
							<Link aria-label="anchor" to="#" className="header-link switcher-icon ms-1" data-bs-toggle="offcanvas" data-bs-target="#switcher-canvas" onClick={() => Switchericon()}>
								<i className="bx bx-cog bx-spin header-link-icon"></i>
							</Link>
						</div>

					</div>

				</div>

			</header>
			<Offcanvas placement='end' show={show1} onHide={handleClose1} className="sidebar offcanvas offcanvas-end" tabIndex={-1} id="sidebar-right">
				<Tab.Container defaultActiveKey="first">
					<Offcanvas.Header closeButton>
						<div>
							<Nav variant="tabs" className="tab-style-1 d-sm-flex d-block mb-0" defaultActiveKey="first">
								<Nav.Item>
									<Nav.Link eventKey="first"><i className="bx bx-user-plus me-1 fs-16 align-middle"></i>Team</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second"><i
										className="bx bx-pulse me-1 fs-16 align-middle"></i>Timeline</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="third"><i
										className="bx bx-message-square-dots me-1 fs-16 align-middle"></i>Chat</Nav.Link>
								</Nav.Item>
								<Nav.Item className="me-1">
									<Link to="#" className="btn-close2 nav-link" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => handleClose1()}>
										<i className="bx bx-x sidebar-btn-close"></i>
									</Link>
								</Nav.Item>
							</Nav>
						</div>
					</Offcanvas.Header>
					<Offcanvas.Body className="position-relative">
						<Tab.Content>
							<Tab.Pane eventKey="first" className="" id="orders-1" role="tabpanel">
								<div className="card-body p-0">
									<DatePicker selected={startDatei} onChange={(date: Date) => setStartDatei(date as Date)} inline />
								</div>
								<div className="d-flex pt-4 mt-3 pb-3 align-items-center">
									<div>
										<h6 className="fw-semibold mb-0">Team Members</h6>
									</div>
									<div className="ms-auto">
										<Dropdown className="dropdown">
											<Dropdown.Toggle variant="" className="btn-outline-light btn btn-sm text-muted no-caret"
												data-bs-toggle="dropdown" aria-expanded="false">
												View All<i className="ri-arrow-down-s-line align-middle ms-1"></i>
											</Dropdown.Toggle>
											<Dropdown.Menu className="" role="menu">
												<li className="border-bottom"><Dropdown.Item className="">Today</Dropdown.Item>
												</li>
												<li className="border-bottom"><Dropdown.Item className="">This
													Week</Dropdown.Item></li>
												<li><Dropdown.Item className="">Last Week</Dropdown.Item></li>
											</Dropdown.Menu>
										</Dropdown>
									</div>
								</div>
								<ul className="ps-0 vertical-scroll">
									<li className="item">
										<div className="rounded-2 p-3 border mb-2">
											<div className="d-flex">
												<Link to="#"><img src={faces16} alt="img"
													className="avatar avatar-md rounded-2 me-3" /></Link>
												<div className="me-3">
													<Link to="#">
														<h6 className="mb-0 fw-semibold text-default">Vanessa James</h6>
													</Link>
													<span className="clearfix"></span>
													<span className="fs-12 text-muted">Front-end Developer</span>
												</div>
												<Link aria-label="anchor" to="#" className="ms-auto my-auto"> <i
													className="ri-arrow-right-s-line text-muted fs-20"></i></Link>
											</div>
										</div>
									</li>
									<li className="item">
										<div className="rounded-2 p-3 border mb-2">
											<div className="d-flex">
												<Link to="#"><span
													className="avatar avatar-md rounded-2 bg-primary-transparent text-primary me-3">KH</span></Link>
												<div className="me-3">
													<Link to="#">
														<h6 className="mb-0 fw-semibold text-default">Kriti Harris</h6>
													</Link>
													<span className="clearfix"></span>
													<span className="fs-12 text-muted">Back-end Developer</span>
												</div>
												<Link aria-label="anchor" to="#" className="ms-auto my-auto"> <i
													className="ri-arrow-right-s-line text-muted fs-20"></i></Link>
											</div>
										</div>
									</li>
									<li className="item">
										<div className="rounded-2 p-3 border mb-2">
											<div className="d-flex">
												<Link to="#"><img src={faces6} alt="img"
													className="avatar avatar-md rounded-2 me-3" /></Link>
												<div className="me-3">
													<Link to="#">
														<h6 className="mb-0 fw-semibold text-default">Mira Henry</h6>
													</Link>
													<span className="clearfix"></span>
													<span className="fs-12 text-muted">UI / UX Designer</span>
												</div>
												<Link aria-label="anchor" to="#" className="ms-auto my-auto"> <i
													className="ri-arrow-right-s-line text-muted fs-20"></i></Link>
											</div>
										</div>
									</li>
									<li className="item">
										<div className="rounded-2 p-3 border mb-2">
											<div className="d-flex">
												<Link to="#"><span
													className="avatar avatar-md rounded-2 bg-secondary-transparent text-secondary me-3">JK</span></Link>
												<div className="me-3">
													<Link to="#">
														<h6 className="mb-0 fw-semibold text-default">James Kimberly</h6>
													</Link>
													<span className="clearfix"></span>
													<span className="fs-12 text-muted">Angular Developer</span>
												</div>
												<Link aria-label="anchor" to="#" className="ms-auto my-auto"> <i
													className="ri-arrow-right-s-line text-muted fs-20"></i></Link>
											</div>
										</div>
									</li>
									<li className="item">
										<div className="rounded-2 p-3 border mb-2">
											<div className="d-flex">
												<Link to="#"><img src={faces9} alt="img"
													className="avatar avatar-md rounded-2 me-3" /></Link>
												<div className="me-3">
													<Link to="#">
														<h6 className="mb-0 fw-semibold text-default">Marley Paul</h6>
													</Link>
													<span className="clearfix"></span>
													<span className="fs-12 text-muted">Front-end Developer</span>
												</div>
												<Link aria-label="anchor" to="#" className="ms-auto my-auto"> <i
													className="ri-arrow-right-s-line text-muted fs-20"></i></Link>
											</div>
										</div>
									</li>
									<li className="item">
										<div className="rounded-2 p-3 border mb-2">
											<div className="d-flex">
												<Link to="#"><span
													className="avatar avatar-md rounded-2 bg-success-transparent text-success me-3">MA</span></Link>
												<div className="me-3">
													<Link to="#">
														<h6 className="mb-0 fw-semibold text-default">Mitrona Anna</h6>
													</Link>
													<span className="clearfix"></span>
													<span className="fs-12 text-muted">UI / UX Designer</span>
												</div>
												<Link aria-label="anchor" to="#" className="ms-auto my-auto"> <i
													className="ri-arrow-right-s-line text-muted fs-20"></i></Link>
											</div>
										</div>
									</li>
								</ul>
							</Tab.Pane>
							<Tab.Pane eventKey="second" className="" id="accepted-1" role="tabpanel">
								<ul className="activity-list">
									<li className="d-flex mt-4">
										<div>
											<i className="activity-icon">
												<Link to="#"><img src={faces14} alt="img"
													className="avatar avatar-xs rounded-2 me-3" /></Link>
											</i>
											<Link to="#">
												<h6 className="text-default">Elmer Barnes
													<span className="text-muted fs-11 mx-2 fw-normal">Today 02:41 PM</span>
												</h6>
											</Link>
											<p className="text-muted fs-12 mb-0">Added 1 attachment <strong>docfile.doc</strong></p>
											<div className="btn-group file-attach mt-3" role="group" aria-label="Basic example">
												<button type="button" className="btn btn-sm btn-primary-light">
													<span className="ri-file-line me-2"></span> Image_file.jpg
												</button>
												<button type="button" className="btn btn-sm btn-primary-light" aria-label="Close">
													<span className="ri-download-2-line"></span>
												</button>
											</div>
										</div>
									</li>
									<li className="d-flex mt-4">
										<div>
											<i className="activity-icon">
												<span className="avatar avatar-xs brround bg-success">RN</span>
											</i>
											<Link to="#">
												<h6 className="text-default">Roxanne Nunez
													<span className="text-muted fs-11 mx-2 fw-normal">Today 11:40 AM</span>
												</h6>
											</Link>
											<p className="text-muted fs-12 mb-0">Commented on <strong>Task Management</strong></p>
											<div className="activity-comment mt-3">
												<p>There are many variations of passages of Lorem Ipsum available.</p>
											</div>
										</div>
									</li>
									<li className="d-flex mt-4">
										<div>
											<i className="activity-icon">
												<span className="avatar avatar-xs brround bg-primary"><i
													className="ri-shield-line text-white"></i></span>
											</i>
											<Link to="#">
												<h6 className="text-default">Shirley Vega
													<span className="text-muted fs-11 mx-2 fw-normal">Today 08:43 AM</span>
												</h6>
											</Link>
											<p className="text-muted fs-12 mb-0">Task Closed by <strong> Today</strong></p>
										</div>
									</li>
									<li className="d-flex mt-4">
										<div>
											<i className="activity-icon">
												<Link to="#"><img src={faces11} alt="img"
													className="avatar avatar-xs rounded-2 me-3" /></Link>
											</i>
											<Link to="#">
												<h6 className="text-default">Vivian Herrera
													<span className="text-muted fs-11 mx-2 fw-normal">Today 08:00 AM</span>
												</h6>
											</Link>
											<p className="text-muted fs-12 mb-0">Assigned a new Task on <strong> UI Design</strong></p>
										</div>
									</li>
									<li className="d-flex mt-4">
										<div>
											<i className="activity-icon">
												<span className="avatar avatar-xs brround bg-success">TJ</span>
											</i>
											<Link to="#">
												<h6 className="text-default">Tony Jarvis
													<span className="text-muted fs-11 mx-2 fw-normal">Yesterday 05:40 PM</span>
												</h6>
											</Link>
											<p className="text-muted fs-12 mb-0">Added 3 attachments <strong>Project</strong></p>
											<div className="activity-images mt-3">
												<Link to="#"><img src={media34} alt="thumb1" /></Link>
												<Link to="#"><img src={media35} alt="thumb1" /></Link>
												<Link to="#"><img src={media36} alt="thumb1" /></Link>
											</div>
										</div>
									</li>
									<li className="d-flex mt-4">
										<div>
											<i className="activity-icon">
												<Link to="#"><img src={faces16} alt="img"
													className="avatar avatar-xs rounded-2 me-3" /></Link>
											</i>
											<Link to="#">
												<h6 className="text-default">Russell Kim
													<span className="text-muted fs-11 mx-2 fw-normal">17 May 2022</span>
												</h6>
											</Link>
											<p className="text-muted fs-12 mb-0">Created a group <strong> Team Unity</strong></p>
										</div>
									</li>
								</ul>
							</Tab.Pane>
							<Tab.Pane eventKey="third" className="" id="declined-1" role="tabpanel">
								<div className="list-group list-group-flush">
									<div className="pt-3 fw-semibold ps-2 text-muted">Today</div>
									<div className="list-group-item d-flex align-items-center">
										<div className="me-2">
											<Link to="#"><img src={faces16} alt="img"
												className="avatar avatar-md rounded-2" /></Link>
										</div>
										<div className="">
											<Link to="#">
												<h6 className="fw-semibold mb-0">Leon Ray</h6>
												<p className="mb-0 fs-12 text-muted"> 2 mins ago </p>
											</Link>
										</div>
										<div className="ms-auto">
											<Link aria-label="anchor" to="#"
												className="btn btn-sm btn-outline-light  me-1"><i
													className="ri-phone-line text-success"></i></Link>
											<Link aria-label="anchor" to="#" className="btn btn-sm btn-outline-light"><i
												className="ri-chat-3-line text-primary"></i></Link>
										</div>
									</div>
									<div className="list-group-item d-flex align-items-center">
										<div className="me-2">
											<span className="avatar avatar-md rounded-2 bg-danger-transparent text-danger">DT
												<span className="avatar-status bg-success"></span>
											</span>
										</div>
										<div className="">
											<Link to="#">
												<h6 className="fw-semibold mb-0">Dane Tillery</h6>
												<p className="mb-0 fs-12 text-muted"> 10 mins ago </p>
											</Link>
										</div>
										<div className="ms-auto">
											<Link aria-label="anchor" to="#"
												className="btn btn-sm btn-outline-light  me-1"><i
													className="ri-phone-line text-success"></i></Link>
											<Link aria-label="anchor" to="#" className="btn btn-sm btn-outline-light"><i
												className="ri-chat-3-line text-primary"></i></Link>
										</div>
									</div>
									<div className="list-group-item d-flex align-items-center">
										<div className="me-2">
											<Link to="#"><img src={faces16} alt="img"
												className="avatar avatar-md rounded-2" /></Link>
										</div>
										<div className="">
											<Link to="#">
												<h6 className="fw-semibold mb-0">Zelda Perkins</h6>
												<p className="mb-0 fs-12 text-muted"> 3 hours ago </p>
											</Link>
										</div>
										<div className="ms-auto">
											<Link aria-label="anchor" to="#"
												className="btn btn-sm btn-outline-light  me-1"><i
													className="ri-phone-line text-success"></i></Link>
											<Link aria-label="anchor" to="#" className="btn btn-sm btn-outline-light"><i
												className="ri-chat-3-line text-primary"></i></Link>
										</div>
									</div>
									<div className="py-3 fw-semibold ps-2 text-muted">Yesterday</div>
									<div className="list-group-item d-flex align-items-center">
										<div className="me-2">
											<span className="avatar avatar-md rounded-2 bg-primary-transparent text-primary">GB
												<span className="avatar-status bg-success"></span>
											</span>
										</div>
										<div className="">
											<Link to="#">
												<h6 className="fw-semibold mb-0">Gaylord Barrett</h6>
												<p className="mb-0 fs-12 text-muted"> 12:40 pm </p>
											</Link>
										</div>
										<div className="ms-auto">
											<Link aria-label="anchor" to="#"
												className="btn btn-sm btn-outline-light  me-1"><i
													className="ri-phone-line text-success"></i></Link>
											<Link aria-label="anchor" to="#" className="btn btn-sm btn-outline-light"><i
												className="ri-chat-3-line text-primary"></i></Link>
										</div>
									</div>
									<div className="list-group-item d-flex align-items-center">
										<div className="me-2">
											<Link to="#"><img src={faces16} alt="img"
												className="avatar avatar-md rounded-2" /></Link>
										</div>
										<div className="">
											<Link to="#">
												<h6 className="fw-semibold mb-0">Roger Bradley</h6>
												<p className="mb-0 fs-12 text-muted"> 01:00 pm </p>
											</Link>
										</div>
										<div className="ms-auto">
											<Link aria-label="anchor" to="#"
												className="btn btn-sm btn-outline-light  me-1"><i
													className="ri-phone-line text-success"></i></Link>
											<Link aria-label="anchor" to="#" className="btn btn-sm btn-outline-light"><i
												className="ri-chat-3-line text-primary"></i></Link>
										</div>
									</div>
									<div className="list-group-item d-flex align-items-center">
										<div className="me-2">
											<Link to="#"><img src={faces16} alt="img"
												className="avatar avatar-md rounded-2" /></Link>
										</div>
										<div className="">
											<Link to="#">
												<h6 className="fw-semibold mb-0">Magnus Haynes</h6>
												<p className="mb-0 fs-12 text-muted"> 03:53 pm </p>
											</Link>
										</div>
										<div className="ms-auto">
											<Link aria-label="anchor" to="#"
												className="btn btn-sm btn-outline-light  me-1"><i
													className="ri-phone-line text-success"></i></Link>
											<Link aria-label="anchor" to="#" className="btn btn-sm btn-outline-light"><i
												className="ri-chat-3-line text-primary"></i></Link>
										</div>
									</div>
									<div className="list-group-item d-flex align-items-center">
										<div className="me-2">
											<span className="avatar avatar-md rounded-2 bg-secondary-transparent text-secondary">DC
												<span className="avatar-status bg-gray"></span>
											</span>
										</div>
										<div className="">
											<Link to="#">
												<h6 className="fw-semibold mb-0">Doran Chasey</h6>
												<p className="mb-0 fs-12 text-muted"> 06:00 pm </p>
											</Link>
										</div>
										<div className="ms-auto">
											<Link aria-label="anchor" to="#"
												className="btn btn-sm btn-outline-light  me-1"><i
													className="ri-phone-line text-success"></i></Link>
											<Link aria-label="anchor" to="#" className="btn btn-sm btn-outline-light"><i
												className="ri-chat-3-line text-primary"></i></Link>
										</div>
									</div>
									<div className="list-group-item d-flex align-items-center">
										<div className="me-2">
											<span className="avatar avatar-md rounded-2 bg-warning-transparent text-warning">EW
												<span className="avatar-status bg-danger"></span>
											</span>
										</div>
										<div className="">
											<Link to="#">
												<h6 className="fw-semibold mb-0">Ellery Wolfe</h6>
												<p className="mb-0 fs-12 text-muted"> 08:46 pm </p>
											</Link>
										</div>
										<div className="ms-auto">
											<Link aria-label="anchor" to="#"
												className="btn btn-sm btn-outline-light  me-1"><i
													className="ri-phone-line text-success"></i></Link>
											<Link aria-label="anchor" to="#" className="btn btn-sm btn-outline-light"><i
												className="ri-chat-3-line text-primary"></i></Link>
										</div>
									</div>
									<div className="text-center">
										<Link to="#" className="btn btn-sm text-primary text-decoration-underline">View
											all</Link>
									</div>
								</div>
							</Tab.Pane>
						</Tab.Content>
					</Offcanvas.Body>
				</Tab.Container>
			</Offcanvas>

			<Modal className="fade" id="searchModal" show={show3} onHide={handleClose3} tabIndex={-1} aria-labelledby="searchModal" aria-hidden="true">
				{/* <Modal.Dialog> */}
				<div className="modal-content">
					<Modal.Body>
						<InputGroup>
							<input type="search" className="form-control px-2 " placeholder="Search..." aria-label="Username" />
							<Link to="#" className="input-group-text bg-primary text-fixed-white" id="Search-Grid"><i className="fe fe-search header-link-icon fs-18"></i></Link>
						</InputGroup>
						<div className="mt-3">
							<div className="">
								<p className="fw-semibold text-muted mb-2 fs-13">Recent Searches</p>
								<div className="ps-2">
									<Link to="#" className="search-tags"><i className="fe fe-search me-2"></i>People<span></span></Link>
									<Link to="#" className="search-tags"><i className="fe fe-search me-2"></i>Pages<span></span></Link>
									<Link to="#" className="search-tags"><i className="fe fe-search me-2"></i>Articles<span></span></Link>
								</div>
							</div>
							<div className="mt-3">
								<p className="fw-semibold text-muted mb-2 fs-13">Apps and pages</p>
								<ul className="ps-2">
									<li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
										<Link to="#"><span><i className='bx bx-calendar me-2 fs-14 bg-primary-transparent p-2 rounded-circle '></i>Calendar</span></Link>
									</li>
									<li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
										<Link to="#"><span><i className='bx bx-envelope me-2 fs-14 bg-primary-transparent p-2 rounded-circle'></i>Mail</span></Link>
									</li>
									<li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
										<Link to="#"><span><i className='bx bx-dice-1 me-2 fs-14 bg-primary-transparent p-2 rounded-circle '></i>Buttons</span></Link>
									</li>
								</ul>
							</div>
							<div className="mt-3">
								<p className="fw-semibold text-muted mb-2 fs-13">Links</p>
								<ul className="ps-2">
									<li className="p-1 align-items-center  mb-1 search-app">
										<Link to="#" className="text-primary"><u>http://spruko/html/spruko.com</u></Link>
									</li>
									<li className="p-1 align-items-center mb-1 search-app">
										<Link to="#" className="text-primary"><u>http://spruko/demo/spruko.com</u></Link>
									</li>
								</ul>
							</div>
						</div>
					</Modal.Body>
					<div className="modal-footer d-block">
						<div className="text-center">
							<Link to="#" className="text-primary text-decoration-underline fs-15">View all results</Link>
						</div>
					</div>
				</div>
			</Modal>

		</Fragment>
	);
};

const mapStateToProps = (state: any) => ({
	local_varaiable: state
});
export default connect(mapStateToProps, { ThemeChanger })(Header);

