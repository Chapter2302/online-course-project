import React, { useState, useEffect } from "react"
import { Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardFooter,
  } from "reactstrap";

const DefaultAvatar = 'https://maytinhquanganh.com/images/noavatar.jpg';

const UserModal = (props) => {
    const [thisUser, setThisUser]  = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        setThisUser({
            fullName: "",
            bio: "",
            role: "student",
            address: "",
            sex: "Male",
            birthday: "",
            photoUser: "",
            authenticateMethod: {
                local: {
                    email: "",
                    password: "",
                },
                facebook: {
                    name: "",
                    id: ""
                },
                google: {
                    email : "",
                    name: "",
                    id: ""
                }    
            },
            workPlace: "",
            rating: 0,
            bankId: "",
            phoneNumber: "",
            balance: 0
        });
    }, [])

    useEffect(() => {
        setIsCreating(false);
    }, [props.show])

    return(
        <Modal {...props}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header><p></p></Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="rounded-circle"
                                            width="180px" height="180px"
                                            style={{backgroundColor: "rgb(173,181,189)"}}
                                            src={DefaultAvatar}
                                        />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between"></div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Row>
                                    <div className="col mt-4">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            <input className="btn btn-primary" type="file"/>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <ReactStars
                                                count={5}
                                                // onChange={ratingChanged}
                                                size={30}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                fullIcon={<i className="fas fa-star"></i>}
                                                activeColor="#F5365C"
                                            />
                                        </div>
                                    </div>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Row className="d-flex justify-content-center">
                                    <button className="btn btn-lg btn-primary">CONFIRM</button>{' '}
                                    <button className="btn btn-lg btn-secondary" onClick={props.onHide}>CANCEL</button>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                        <CardBody>
                            <Form>
                            <h6 className="heading-small text-muted mb-4">
                                User information
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Username
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            defaultValue="lucky.jesse"
                                            id="input-username"
                                            placeholder="Username"
                                            type="text"
                                        />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                        >
                                            Email address
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-email"
                                            placeholder="jesse@example.com"
                                            type="email"
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-city"
                                            >
                                                Date Of Birth
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="date"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-last-name"
                                            >
                                                Password
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Password"
                                                type="password"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Bank ID
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="0987-6543-210"
                                            type="text"
                                        />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            type="text"
                                        >
                                            Phone Number
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="0987654321"
                                            type="email"
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-address"
                                        >
                                            Workplace
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                            placeholder="Workplace Address"
                                            type="text"
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-address"
                                        >
                                            Address
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                            placeholder="Home Address"
                                            type="text"
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-city"
                                        >
                                            Balance
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="300"
                                            type="number"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Gender
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        type="select"
                                    >   
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Input>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Role
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        type="select"
                                        id="input-postal-code"
                                    >   
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Admin</option>
                                    </Input>
                                    </FormGroup>
                                </Col>
                                </Row>
                            </div>
                            <div className="pl-lg-4">
                                <FormGroup>
                                    <label>Biology</label>
                                <Input
                                    className="form-control-alternative"
                                    placeholder="A few words about you ..."
                                    rows="4"
                                    defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                                    Open Source."
                                    type="textarea"
                                />
                                </FormGroup>
                            </div>
                            </Form>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}

export default UserModal;