import "./css/AddItem.css";

function AddItem() {

    return (
        <form>
            <label className="headerLabel">Details</label>

            <label>Condition</label>
            <input id="condition"></input>
            <label>Color</label>
            <input id="color"></input>
            <label>Material</label>
            <input id="material"></input>
            
            <label className="headerLabel">Description</label>
            <textarea id="description"></textarea>
            
            <label className="headerLabel">Location</label>
            <input id="location"></input>

        </form>
    );

}

export default AddItem;