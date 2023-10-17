import Button from "./includes/Button";
import "../index.css"
import {useState} from "react";

function FormToAddFriend({onAddFriend}) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    const handleAddFriendForm = function (event){
        event.preventDefault();

        if (!name || !image ) return;


        const id = crypto.randomUUID();
        const newFriend = {
            name,
            image: `${image}?=${id}`,
            balance: 0,
            id,
        }

        onAddFriend(newFriend)
        // console.log(newFriend )
        setName("");
        setImage("https://i.pravatar.cc/48");


    }

    return <form className={"form-add-friend"} onSubmit={handleAddFriendForm}>

        <label className={"label"}>🤼 Friend Name</label>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>

        <label>🖼 Image Url</label>
        <input type="text" value={image} onChange={(event) => setImage(event.target.value)}/>

        <Button>Add</Button>
    </form>
}

export default FormToAddFriend;
