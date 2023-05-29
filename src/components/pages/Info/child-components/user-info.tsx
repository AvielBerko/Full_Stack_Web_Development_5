import { Card, Row, Col, Alert } from 'react-bootstrap';
import User from '../../../../lib/data/dataObjects/User';
import { useState } from 'react';
import EdibaleLabel from '../../../edibaleLabel/edibale-label';
import BlockButton from '../../../common/BlockButton/block-button';
import { Nullable } from '../../../../types/react.types';

type UserItemProps = {
  user: User;
  setUser: (value:Nullable<User>) => void;
};

const UserInfo = ({ user, setUser }: UserItemProps) => {
  const { id, name, username, address, phone, website, company } = user;
  const { street, suite, city, zipcode, geo } = address || {};
  const { name: companyName, catchPhrase, bs } = company || {};

  const [isEditable, setIsEditable] = useState(false);
  const [nameValue, setNameValue] = useState<string>(name ?? "");
  const [usernameValue, setUsernameValue] = useState<string>(username ?? "");
  const [streetValue, setStreetValueValue] = useState<string>(street ?? "");
  const [suiteValue, setSuiteValue] = useState<string>(suite ?? "");
  const [cityValue, setCityValue] = useState<string>(city ?? "");
  const [zipcodeValue, setZipcodeValue] = useState<string>(zipcode ?? "");
  const [phoneValue, setPhoneValue] = useState<string>(phone ?? "");
  const [websiteValue, setWebsiteValue] = useState<string>(website ?? "");
  const [companyNameValue, setCompanyNameValue] = useState<string>(companyName ?? "");
  const [catchPhraseValue, setCatchPhraseValue] = useState<string>(catchPhrase ?? "");
  const [bsValue, setBsValue] = useState<string>(bs ?? "");

  const [alert, setAlert] = useState("");

  // useEffect(() => {
  //   setUsernameValue(username ?? "");
  // }, [username]);

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



  const onSubmit = () => {
    setIsEditable(!isEditable);
    const newAddress = { street: streetValue, suite: suiteValue, city: cityValue, zipcode: zipcodeValue, geo };
    const newCompany = {name: companyNameValue, catchPhrase: catchPhraseValue, bs: bsValue};
    const newUser = new User({
      id,
      username,
      address: newAddress,
      name: nameValue,
      company: newCompany,
      phone: phoneValue,
      website: websiteValue
    });
    newUser.save();
    setUser(newUser);
  };

  return (<>
    {alert != "" && alertDOM}
    <Card className="user-card">
      <Card.Body>
      <EdibaleLabel isEditable={isEditable} label='Username' setter={setUsernameValue} value={usernameValue} WrapperComponent={Card.Title} />
        <EdibaleLabel isEditable={isEditable} label='Full Name' setter={setNameValue} value={nameValue} WrapperComponent={Card.Text} />
        {isEditable && 
          <div className="d-flex flex-row gap-2">
            <EdibaleLabel isEditable={isEditable} label='Street' setter={setStreetValueValue} value={streetValue} WrapperComponent={Card.Text} />
            <EdibaleLabel isEditable={isEditable} label='Suite' setter={setSuiteValue} value={suiteValue} WrapperComponent={Card.Text} />
            <EdibaleLabel isEditable={isEditable} label='City' setter={setCityValue} value={cityValue} WrapperComponent={Card.Text} />
            <EdibaleLabel isEditable={isEditable} label='Zipcode' setter={setZipcodeValue} value={zipcodeValue} WrapperComponent={Card.Text} />
          </div>
        }
        {!isEditable && <Card.Text>Address: {`${street}, ${suite}, ${city}, ${zipcode}`}</Card.Text> }
        {/* <div className="d-flex flex-row gap-2">
          {!isEditable && <label>Coordinates:</label>}  
          <EdibaleLabel isEditable={isEditable} label='Lat' setter={setLatValue} value={latValue} WrapperComponent={Card.Text} />
          <EdibaleLabel isEditable={isEditable} label='Lng' setter={setLngValue} value={lngValue} WrapperComponent={Card.Text} />
      </div> */}
        <EdibaleLabel isEditable={isEditable} label='Phone' setter={setPhoneValue} value={phoneValue} WrapperComponent={Card.Text} />
        <EdibaleLabel isEditable={isEditable} label='Website' setter={setWebsiteValue} value={websiteValue} WrapperComponent={Card.Text} />
        <EdibaleLabel isEditable={isEditable} label='Company' setter={setCompanyNameValue} value={companyNameValue} WrapperComponent={Card.Text} />
        <EdibaleLabel isEditable={isEditable} label='CatchPhrase' setter={setCatchPhraseValue} value={catchPhraseValue} WrapperComponent={Card.Text} />
        <EdibaleLabel isEditable={isEditable} label='BS' setter={setBsValue} value={bsValue} WrapperComponent={Card.Text} />
      </Card.Body>
    </Card>
    <BlockButton onClick={onSubmit}>{isEditable ? "Save" : "Edit"}</BlockButton>
  </>
  );
};

export default UserInfo;