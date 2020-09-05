import React from 'react';
import axios from '../../../config/axios/axios';
import { connect } from 'react-redux';
import * as actions from '../../../config/store/actions/index';
import * as actionsType from '../../../config/store/actions/actionsType';
import * as routeTypes from '../../../config/router';
import Input from '../../common/input/Input';
import UserItem from '../../common/userItem/UserItem';

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOnSearch: null,
      foundUser: null,
      allConv: [],
      error: null,
    }
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("tokens"));
    // console.log("[Token will be sent] " + token);
    axios({
      method: "GET", 
      url: routeTypes.GET_ALL_CONV,
      headers: {
        'Authorization': token
      }
    })
      .then((response) => {
        // console.log("[response] ");
        const data = JSON.parse(response.data);
        // console.log(data);
        const username = JSON.parse(localStorage.getItem("username"));
        const convs = data.map(conv => {
          const peername = (conv.convUser_1.username === username
                            ? conv.convUser_2.username
                            : conv.convUser_1.username);
          return {
            createdAt: conv.createdAt,
            peername: peername,
            content: conv.messages,
          }
        });
        // console.log("[convs] ");
        // console.log(convs);
        this.setState({allConv: convs});
      })
      .catch((error) => {
        this.setState({error});
      });
  }

  deleteConversation = (event, peerName) => {
    // event.preventDefault();
    // console.log("[peername delete recieved] " + peerName);
    this.props.onDelete(peerName);
    
  }

  createNewConversation = (event, peerName) => {
    // event.preventDefault();
    // console.log("[peername create recieved] " + peerName);
    this.props.onCreate(peerName);
  }

  toggleConversation = (event, conv) => {
    this.props.onToggle(conv);
  }

  onChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      userOnSearch: event.target.value,
      foundUser: false
    });
    axios({
      method: "GET",
      url: "user/" + event.target.value,
      params: {
        username: event.target.value
      }
    })
      .then(response => {
        this.setState({
          foundUser: true,
          allConv: [{
            peername: this.state.userOnSearch
          }]
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      foundUser: false
    });
    axios({
      method: "GET",
      url: "/user/" + this.state.userOnSearch,
      params: {
        username: this.state.userOnSearch
      }
    })
      .then(response => {
        this.setState({
          foundUser: true,
          allUsers: [{
            peername: this.state.userOnSearch
          }]
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const { allConv } = this.state;
    const usersArr = allConv.map(conv => {
      return (
        <UserItem 
          username={conv.peername} 
          toggleConv={(event) => this.toggleConversation(event, conv)}
          newButton={(event) => this.createNewConversation(event, conv.peername)}
          deleteButon={(event) => this.deleteConversation(event, conv.peername)}
          key={conv.peername}
        />
      );
    })
    // console.log(this.props.peername);
    return (
      <div>
        <form onSubmit={(event) => this.onSubmitHandler(event)}>
          <Input 
            type="search" 
            label="Search for a user" 
            placeholder="username"
            changed={(event) => this.onChangeHandler(event)}
          />
          <button onClick={(event) => this.onSubmitHandler(event)}>Search</button>
        </form>
        {usersArr}
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    peername: state.conv.peername
  }
}
const mapDispatchProp = (dispatch) => {
  return {
    onCreate: (peername) => dispatch(actions.createConv(peername)),
    onDelete: (peername) => dispatch(actions.deleteConv(peername)),
    onToggle: (data) => dispatch({type: actionsType.CONV_SUCCESS, data: data}),
  }
}

export default connect(mapStateProps, mapDispatchProp)(SearchPanel);