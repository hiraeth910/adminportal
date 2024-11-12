
import { Fragment, SetStateAction, useState } from "react";
import { Alert, Button, Card, Col, Form, Nav, Tab } from "react-bootstrap";
import { Link,  } from "react-router-dom";
import { auth } from "./firebaseapi";
import { useDispatch } from "react-redux";
import CryptoJS from 'crypto-js';
import {jwtDecode} from 'jwt-decode';
//IMAGES
import desktoplogo from "../assets/images/brand-logos/desktop-logo.png";
import desktopdark from "../assets/images/brand-logos/desktop-dark.png";
import firebase from "../assets/images/brand-logos/firebase.png";
import react from "../assets/images/brand-logos/react.png";
import { login } from "../utils/getapi";
import { setRole, setToken } from "../redux/action";

const Home = () => {
	const [passwordshow1, setpasswordshow1] = useState(false);
	const [err, setError] = useState("");
	const [data, setData] = useState({
		"email": "",
		"password": "",
	});
	const dispatch = useDispatch();
	const { email, password } = data;
	const changeHandler = (e: { target: { name: any; value: any; }; }) => {
		setData({ ...data, [e.target.name]: e.target.value });
		setError("");
	};
	const routeChange = () => {
  const path = `${import.meta.env.BASE_URL}dashboards/sales/`;
  
  // Clear the entire history stack and navigate to the new path
  window.location.replace(path);
};


	const Login = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
			.then((user: any) => {
				console.log(user);
				routeChange();
			})
			.catch((err: { message: SetStateAction<string>; }) => {
				console.log(err);
				setError(err.message);
			});
	};
	const Login1 = async() => {
		console.log("hi")
		if (data.email !== "" && data.password !== "") {
			const t = await login({userid:data.email,password:data.password})

			if(t){
			const decryptedToken = CryptoJS.AES.decrypt(t, 'lamjodaka').toString(CryptoJS.enc.Utf8);
			console.log(decryptedToken)
const decoded = jwtDecode(decryptedToken);
	        if (decoded && typeof decoded === 'object' && 'role' in decoded) {
    const role = decoded.role as string;
    setRole(role)(dispatch);
  }
			setToken(decryptedToken)(dispatch)

				routeChange()
			}
		}
		else {
			setError("The Auction details did not Match");
			setData({
				"email": "",
				"password": "",
			});
		}
	};
	return (
		<Fragment>
			<div className="container">
				<div className="row justify-content-center align-items-center authentication authentication-basic h-100">
					<Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
						<div className="my-5 d-flex justify-content-center">
							<Link to={`${import.meta.env.BASE_URL}dashboards/sales`}>
								<img src={desktoplogo} alt="logo" className="desktop-logo" />
								<img src={desktopdark} alt="logo" className="desktop-dark" />
							</Link>
						</div>
						<Tab.Container id="left-tabs-example" defaultActiveKey="nextjs">
							<Card>
								<Nav variant="pills" className="justify-content-center authentication-tabs">
									<Nav.Item>
										<Nav.Link eventKey="nextjs">
											<img
												src={react}
												alt="logo" className="desktop-logo" />
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="firebase">
											<img src={firebase}
												alt="logo" />
										</Nav.Link>
									</Nav.Item>

								</Nav>
								<Tab.Content>
									<Tab.Pane eventKey="nextjs" className='border-0'>
										<div className="card-body p-5 pt-1 rectangle3">
											<p className="h4 fw-semibold mb-2 text-center">Sign In</p>
											<div className="row gy-3">
												{err && <Alert variant="danger">{err}</Alert>}
												<div className="col-xl-12">
													<Form.Label htmlFor="signin-username" className="form-label text-default">Email</Form.Label>
													<Form.Control type="text" className="form-control form-control-lg" id="signin-username"
														placeholder="Enter your email"
														name="email"
														value={email}
														onChange={changeHandler}
														required />
												</div>
												<div className="col-xl-12 mb-2">
													<Form.Label htmlFor="signin-password" className="form-label text-default d-block"

													>Password<Link to="#" className="float-end text-primary"></Link></Form.Label>
													<div className="input-group">
														<input className="form-control form-control-lg" id="signin-password"
															placeholder="password"
															name="password"
															type={(passwordshow1) ? "text" : "password"}
															value={password}
															onChange={changeHandler}
															required />
														<Button variant="" className="btn btn-light bg-transparent" type="button" onClick={() => setpasswordshow1(!passwordshow1)}
															id="button-addon2"><i className={`${passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"} align-middle`}></i></Button>
													</div>
													
												</div>
												<div className="col-xl-12 d-grid mt-2">
													<Button variant="primary" className="btn btn-lg" onClick={Login1}>Sign In</Button>
												</div>
											</div>
											
											
										</div>
									</Tab.Pane>
									<Tab.Pane eventKey="firebase" className='border-0'>
										<div className="card-body p-5 rectangle3">
											<p className="h4 fw-semibold mb-2 text-center">Sign In</p>
											<div className="row gy-3">
												{err && <Alert variant="danger">{err}</Alert>}
												<div className="col-xl-12">
													<label htmlFor="signin-username" className="form-label text-default">Email</label>
													<Form.Control
														type="text" className="form-control form-control-lg" id="signin-username" placeholder="Enter your email"
														name="email"
														value={email}
														onChange={changeHandler}
														required />
												</div>
												<div className="col-xl-12 mb-2">
													<label htmlFor="signin-password" className="form-label text-default d-block">Password
														<Link to="#" className="float-end text-primary">Forget password ?</Link></label>
													<div className="input-group">
														<Form.Control className="form-control form-control-lg" id="signin-password"
															placeholder="Enter your password"
															name="password"
															type={(passwordshow1) ? "text" : "password"}
															value={password}
															onChange={changeHandler}
															required />
														<button className="btn btn-light bg-transparent" type="button"
															onClick={() => setpasswordshow1(!passwordshow1)} id="button-addon2">
															<i className={`${passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"} align-middle`}></i></button>
													</div>
													<div className="mt-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
															<label className="form-check-label text-muted fw-normal" htmlFor="defaultCheck1">
																Remember password ?
															</label>
														</div>
													</div>
												</div>
												<div className="col-xl-12 d-grid mt-2">
													<Link to={`${import.meta.env.BASE_URL}dashboards/sales`} className="btn btn-lg btn-primary" onClick={Login}>Sign In</Link>
												</div>
											</div>
											<div className="text-center">
												<p className="fs-12 text-muted mt-3">Dont have an account? <Link to="#" className="text-primary">Sign Up</Link></p>
											</div>
											<div className="text-center my-3 authentication-barrier">
												<span>OR</span>
											</div>
											<div className="btn-list text-center">
												<button className="btn btn-icon btn-light btn-wave waves-effect waves-light">
													<i className="ri-facebook-line fw-bold "></i>
												</button>
												<button className="btn btn-icon btn-light  btn-wave waves-effect waves-light">
													<i className="ri-google-line fw-bold "></i>
												</button>
												<button className="btn btn-icon btn-light  btn-wave waves-effect waves-light">
													<i className="ri-twitter-line fw-bold "></i>
												</button>
											</div>
										</div>
									</Tab.Pane>

								</Tab.Content>
							</Card>
						</Tab.Container>
					</Col>
				</div>
			</div>
		</Fragment>
	);
};
export default Home;
