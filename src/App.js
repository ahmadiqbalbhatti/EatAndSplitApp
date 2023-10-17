import FriendsList from "./components/FriendsList";
import Button from "./components/includes/Button";
import FormToAddFriend from "./components/FormToAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import {useReducer} from "react";
import SideBar from "./components/SideBar";

const initialFriends = [
  {
    id     : 118836,
    name   : "Clark",
    image  : "https://i.pravatar.cc/48?u=118836",
    balance: -7
  }, {
    id     : 933372,
    name   : "Sarah",
    image  : "https://i.pravatar.cc/48?u=933372",
    balance: 20
  }, {
    id     : 499476,
    name   : "Anthony",
    image  : "https://i.pravatar.cc/48?u=499476",
    balance: 0
  }
];

const ACTIONS = {
  SET_SHOW_ADD_FRIEND: "setShowAddFriend",
  SET_SELECTED_FRIEND: "setSelectedFriend",
  SET_FRIENDS        : "setFriends",
  HANDLE_SPLIT_BILL  : "handleSplitBill"
};

const initialState = {
  showAddFriend: false, selectedFriend: null, friends: initialFriends
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SHOW_ADD_FRIEND:
      return {...state, showAddFriend: !state.showAddFriend};
    case ACTIONS.SET_SELECTED_FRIEND:
      return {
        ...state,
        selectedFriend: state.selectedFriend?.id === action.payload.friend.id ? null : action.payload.friend
      };
    case ACTIONS.SET_FRIENDS:
      return {...state, friends: [...state.friends, action.payload]};
    case ACTIONS.HANDLE_SPLIT_BILL: {
      const {selectedFriend, value} = action.payload;
      if (!selectedFriend) {
        return state; // Return the current state if there's no selected friend
      }
      const updatedFriends = state.friends.map(friend => friend.id === selectedFriend.id ? {
        ...friend, balance: friend.balance + value
      } : friend);

      return {
        ...state, friends: updatedFriends, selectedFriend: null
      };
    }


    default:
      return state;
  }
}


const App = () => {
  const [
          {
            showAddFriend, selectedFriend, friends
          }, dispatch
        ] = useReducer(reducer, initialState);

  // const [showAddFriend, setShowAddFriend]   = useState(false);
  // const [selectedFriend, setSelectedFriend] = useState(null);
  // const [friends, setFriends]               = useState(initialFriends);
  //

  // console.log(selectedFriend);
  const handleShowAddFriend = function () {
    // setShowAddFriend(show => !show);
    dispatch({
      type: ACTIONS.SET_SHOW_ADD_FRIEND
    });
  };

  const handleSelection = (friend) => {
    dispatch({
      type: ACTIONS.SET_SELECTED_FRIEND, payload: {friend}
    });
  };

  const handleAddFriend = (friend) => {
    // setFriends(friends => [...friends, friend]);
    // setShowAddFriend(false);
    dispatch({
      type: ACTIONS.SET_FRIENDS, payload: friend
    });
    handleShowAddFriend();
  };


  function handleSplitBill(value) {
    // setFriends(friends => friends.map(friend => {
    //   return friend.id === selectedFriend?.id ? {
    //     ...friend, balance: friend.balance + value
    //   } : friend;
    // }));
    //
    // setSelectedFriend(null);
    dispatch({
      type: ACTIONS.HANDLE_SPLIT_BILL, payload: {selectedFriend, value}
    });

  };

  return (
    <div className={"app"}>
      <SideBar>
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormToAddFriend onAddFriend={handleAddFriend}/>}
        <Button
          onClick={handleShowAddFriend}>{!showAddFriend ? "Add Friend" : "Close"}</Button>
      </SideBar>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}
                                        onSplitBill={handleSplitBill}/>}

    </div>
  );
};

export default App;
