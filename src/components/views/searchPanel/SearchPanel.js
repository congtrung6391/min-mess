import React from 'react';
import axios from '../../../config/axios/axios';
import { connect } from 'react-redux';
import * as actions from '../../../config/store/actions/index';
import * as actionsType from '../../../config/store/actions/actionsType';
import UserItem from '../../common/userItem/UserItem';
import { InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOnSearch: null,
      foundUser: null,
      stateConvs: [],
      error: null,
    }
  }

  componentDidMount = async () => {
    console.log("[search mounted]");
    await this.props.onGetAll();
    const propsConvs = this.props.convs;
    this.setState({stateConvs: propsConvs});
  }

  deleteConversation = (event, peerName) => {
    event.preventDefault();
    this.props.onDelete(peerName);
  }

  createNewConversation = (event, peerName) => {
    event.preventDefault();
    this.props.onCreate(peerName);
  }

  toggleConversation = (event, conv) => {
    event.preventDefault();
    this.props.onToggle(conv);
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      foundUser: false
    });
    axios({
      method: "GET",
      url: "/user/" + event.target.value,
      params: {
        username: event.target.value
      }
    })
      .then(response => {
        // console.log("found");
        let convs = this.props.convs.find((conv) => conv.peername === this.state.userOnSearch );
        convs = [convs]
        // console.log(convs);
        if(!convs) {
          convs = [{
            peername: this.state.userOnSearch,
            createdAt: "not yet handler",
            content: [],
          }];
        }

        this.setState({
          foundUser: true,
          stateConvs: convs,
        });
      })
      .catch(error => {
        // console.log(error);
      })
  }

  onChangeHandler = (event) => {
    event.preventDefault();
    if(event.target.value === "") {
      this.props.onGetAll();
      const propsConvs = this.props.convs;
      this.setState({stateConvs: propsConvs});
    } else {
      this.setState({userOnSearch: event.target.value});
      this.onSubmitHandler(event);
    }
  }

  render() {
    const { stateConvs } = this.state;
    const usersArr = stateConvs.map(conv => {
      return (
        <ListGroup.Item key={conv.peername}>
          <UserItem 
            username={conv.peername} 
            toggleConv={(event) => this.toggleConversation(event, conv)}
            newButton={(event) => this.createNewConversation(event, conv.peername)}
            deleteButon={(event) => this.deleteConversation(event, conv.peername)}
          />
        </ListGroup.Item>
      );
    })
    // console.log(this.props.peername);
    return (
      <div className="col-md-3 my-4 p-3 border rounded shadow-sm" style={{minHeight: "85vh"}}>
        <InputGroup>
          <FormControl
            placeholder="Search a user"
            type="search"
            onChange={(event) => this.onChangeHandler(event)}
          />
          <InputGroup.Prepend>
            <Button onClick={(event) => this.onSubmitHandler(event)}>Search</Button>
          </InputGroup.Prepend>
        </InputGroup>
        <ListGroup className="mt-4">
          {usersArr}
        </ListGroup>
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    peername: state.conv.peername,
    convs: state.allConvs.convs,
  }
}
const mapDispatchProp = (dispatch) => {
  return {
    onCreate: (peername) => dispatch(actions.createConv(peername)),
    onDelete: (peername) => dispatch(actions.deleteConv(peername)),
    onToggle: (data) => dispatch({type: actionsType.CONV_SUCCESS, data: data}),
    onGetAll: () => dispatch(actions.getAllConvs()),
  }
}

export default connect(mapStateProps, mapDispatchProp)(SearchPanel);