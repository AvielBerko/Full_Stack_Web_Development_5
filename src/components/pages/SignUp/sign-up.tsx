import Input from "../../common/Input/input";
import BlockButton from "../../common/BlockButton/block-button";
import { useState } from "react";
import User, { Address, Company, Geo } from "../../../lib/data/dataObjects/User";
import { State } from "../../../types/react.types";
import { Col, Container, Row, Alert } from "react-bootstrap";
import AddressEditor from "./address-editor";
import CompanyEditor from "./company-editor";
import { useSession } from "../../../hooks/use-session-storage/use-session";
import { UserSerializer } from "../../../lib/data/dataObjects/serialization";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress]: State<Address> = useState({});
  const [website, setWebsite] = useState("");
  const [company, setCompany]: State<Company> = useState({});
  const [alert, setAlert] = useState("");

  const [_, setAuth] = useSession("user", null, UserSerializer);

  /**
   * Validates the form.
   * @returns {string} An error message if the form is invalid, or an empty string if the form is valid.
   */
  const validateForm = () => {
    // Add your validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^\d{4}$/;
    const phoneNumberRegex = /^0[1-9]\d{7,8}$/;
    const zipCodeRegex = /^\d{5}$/;
    const englishRegex = /^[A-Za-z0-9\s]+$/;
    const userNameMaxLength = 16;

    if (!email) {
      return "Email is required.";
    }

    if (!emailRegex.test(email)) {
      return "Email is not valid.";
    }

    if (!password) {
      return "Password is required.";
    }

    if (!passwordRegex.test(password)) {
      return "Password must be a 4-digit number.";
    }

    if (!passwordConfirm) {
      return "Confirm Password is required.";
    }

    if (password !== passwordConfirm) {
      return "Password and Confirm Password must match.";
    }

    if (!userName) {
      return "User Name is required.";
    }

    if (userName.length > userNameMaxLength) {
      return "User Name cannot exceed 16 characters.";
    }

    if (!englishRegex.test(userName)) {
      return "User Name can only contain English letters and numbers.";
    }

    if (!fullName) {
      return "Full Name is required.";
    }

    if (!fullName.includes(" ")) {
      return "Full Name must contain at least two words.";
    }

    if (!phoneNumber) {
      return "Phone Number is required.";
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      return "Phone Number is not in a valid format.";
    }

    if (!address.street) {
      return "Street is required.";
    }

    if (!address.suite) {
      return "Suite is required.";
    }

    if (!address.city) {
      return "City is required.";
    }

    if (!address.zipcode) {
      return "Zip Code is required.";
    }

    if (!zipCodeRegex.test(address.zipcode)) {
      return "Zip Code is not valid.";
    }

    if (!website) {
      return "Website is required.";
    }

    try {
      new URL(`https://${website}`);
    } catch {
      return "Website is not valid.";
    }

    if (!company.name) {
      return "Company name is required.";
    }

    if (!englishRegex.test(company.name)) {
      return "Company name can only contain English letters and numbers.";
    }

    if (!company.catchPhrase) {
      return "Catch Phrase is required.";
    }

    if (!englishRegex.test(company.catchPhrase)) {
      return "Catch Phrase can only contain English letters and numbers.";
    }

    if (!company.bs) {
      return "Business slogan is required.";
    }

    if (!englishRegex.test(company.bs)) {
      return "Business slogan can only contain English letters and numbers.";
    }

    return ""; // Empty string indicates the form is valid
  };

  const onSubmit = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setAlert(errorMessage);
    } else {
      const checkUser = new User({});
      checkUser.first({ username:userName }).then(() => {
        if (checkUser.id) {
          setAlert("User Name already exists.");
          return;
        }
        const geo: Geo = {
          lat: password,
          lng: password,
        };
        setAddress({ ...address, geo });
        const newUser = new User({
          username: userName,
          address,
          name: fullName,
          company,
          phone: phoneNumber,
          website,
          email,
        });
        newUser.push().then(() => {
            setAuth(newUser);
        });
      });
    }
  };

  const closeAlert = () => {
    setAlert("");
  };

  const alertDOM = (
    <Row>
      <Col>
        <Alert variant="danger" onClose={closeAlert} dismissible>
          {alert}
        </Alert>
      </Col>
    </Row>
  );

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Sign Up</h1>
        </Col>
      </Row>
      {alert != "" && alertDOM}
      <Row>
        <Col>
          <Input
            placeholder="User Name"
            value={userName}
            setter={setUserName}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Password"
            inputType="password"
            value={password}
            setter={setPassword}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            inputType="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            setter={setPasswordConfirm}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Full Name"
            value={fullName}
            setter={setFullName}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Email" value={email} setter={setEmail} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            setter={setPhoneNumber}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Website" value={website} setter={setWebsite} />
        </Col>
      </Row>
      <Row>
        <Col>
          <AddressEditor setAddress={setAddress} value={address} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CompanyEditor setCompany={setCompany} value={company} />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlockButton variant="success" onClick={onSubmit}>
            Sign Up!
          </BlockButton>
        </Col>
      </Row>
    </Container>
  );
}
