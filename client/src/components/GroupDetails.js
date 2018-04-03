import React, { Component } from "react";
import Drop from "./dropzone";
import axios from "axios";
import { connect } from "react-redux";
import {
  TextInput,
  Form,
  Button,
  Header,
  Anchor,
  Heading,
  Footer,
  Table,
  FormFields,
  Box,
  Select
} from "grommet";
import Spinning from "grommet/components/icons/Spinning";
import Pulse from "grommet/components/icons/Pulse";
import GroupMembers from "./GroupMembers.js";
import Status from "grommet/components/icons/Status";
import RevertIcon from "grommet/components/icons/base/Revert";
import {
  getGroupContacts,
  addContact,
  deleteContact,
  getAllContacts,
  addGroupContacts
} from "../actions";
import Auth from "../Auth";
import Notification from "grommet/components/Notification";
import Split from "grommet/components/Split";
import Sidebar from "./Sidebar";

class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      value: "",
      sub: "",
      id: "",
      show: false,
      badInputs: false,
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  getDerivedStateFromProps(nextProps) {
    // console.log("current contacts", this.props.contacts.contacts);
    // console.log("getting props within contacts", nextProps.contacts.contacts);
    //   this.props.dispatch(getContacts(this.props.match.params.id));
  }

  componentDidMount() {
    console.log(this.props.match.params.id, "here");

    this.props
      .dispatch(getGroupContacts(this.props.match.params.id))
      .then(() => {
        this.props.dispatch(getAllContacts(Auth.userID));
      })
      .then(() => {
        this.setState({
          loading: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick() {
    this.props.dispatch(
      addGroupContacts(
        this.props.match.params.id,
        this.state.id,
        this.state.value,
        this.state.sub
      )
    );
    this.setState({
      value: "",
      sub: "",
      id: "",
      badInputs: false
    });
  }

  handleDelete(id, contactid, campaignid) {
    console.log("here", id, contactid, campaignid);
    this.props.dispatch(deleteContact(id, contactid, campaignid));
    this.props.dispatch(getGroupContacts(this.props.match.params.id));
  }

  render() {
    return (
      <div>
        {console.log("all contacts", this.props.allContacts)}
        <Split flex="right" separator={false} fixed={false}>
          <Sidebar />
          <Box>
            <Button icon={<RevertIcon />} path="/groups" />
            <Form>
              <Header>
                <Heading style={{ fontSize: "25px" }}>
                  Add Contacts to Group
                </Heading>
              </Header>
              <FormFields>
                <Select
                  placeHolder="None"
                  value={this.state.value}
                  options={this.props.allContacts.map(function(contact, key) {
                    return {
                      value: contact.name,
                      sub: contact.email,
                      id: contact.id,
                      label: (
                        <Box direction="row" justify="start">
                          <span>{contact.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="secondary">
                            {contact.email}
                          </span>
                        </Box>
                      )
                    };
                  })}
                  onChange={event => {
                    this.setState(
                      {
                        value: event.option.value,
                        sub: event.option.sub,
                        id: event.option.id
                      },
                      function() {
                        console.log("clicked!", this.state.id);
                      }
                    );
                  }}
                />
              </FormFields>
              <Footer pad={{ vertical: "medium" }}>
                <Button
                  label="Add"
                  onClick={() => {
                    this.handleClick();
                  }}
                />
              </Footer>
            </Form>
          </Box>
          <Box style={{ marginLeft: "150px", marginTop: "50px" }}>
            {!this.props.contacts[0] ? (
              <Pulse />
            ) : (
              <Form style={{ width: "650px" }}>
                <FormFields>
                  <Table
                    scrollable={true}
                    style={{
                      height: "700px",
                      overflow: "auto",
                      border: "solid",
                      borderRadius: "1%"
                    }}
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subscribed</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.contacts.map((contact, index) => (
                        <GroupMembers
                          contact={contact}
                          key={index}
                          handleDelete={this.handleDelete}
                        />
                      ))}
                    </tbody>
                  </Table>
                </FormFields>
              </Form>
            )}
            {/*   </div>*/}
          </Box>
        </Split>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts.contacts,
    groups: state.groups,
    allContacts: state.allContacts.allContacts
  };
}

export default connect(mapStateToProps)(GroupDetails);