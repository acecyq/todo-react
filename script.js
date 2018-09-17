const Button = (props) => {
  return (
    <button id={props.index} onClick={props.click}>{props.children}</button>
  );
}

// render tasks in to-do list in grids with complete and delete buttons
const Item = (props) => {
  return (
    <div className="card">
      <div className="container">
        <div className="row">
          <p>{props.word}</p>
        </div>
        <div className="row">
          <Button index={props.index} click={props.removeItem}>delete</Button>
        </div>
        <div className="row">
          <Button index={props.index} click={props.completeTask}>complete</Button>
        </div>
      </div>
    </div>
  );
}

// render tasks in complete list in grids with delete buttons
const Complete = (props) => {
  return (
    <div className="card">
      <div className="container">
        <div className="row">
          <p>{props.word}</p>
        </div>
        <div className="row">
          <Button index={props.index} click={props.removeDone}>delete</Button>
        </div>
      </div>
    </div>
  );
}

// render the entire to-do list
class List extends React.Component {
  constructor(){
    super()

    // function called on input
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.removeDone = this.removeDone.bind(this);
  }

  state = {

    // list of items to do
    list : [],

    // list of completed tasks
    done : [],

    // words in input
    word : "",

    // error if input length is too long
    error : ""
  }

  // when user types in input...
  changeHandler(event) {

    // if input is filled with alphanumeric, underscore, whitespace, or of maximum length 20 characters
    if (/^[\w\s]{0,20}$/gi.test(event.target.value)) {
      this.setState({ 
        word : event.target.value,
        error : "" 
      });
    } else {

      // else input will not be changed and an error message will be displayed
      event.target.value = this.state.word;
      this.setState({ error : "Task title should only consists alphanumeric characters and is only of maximum 20 characters length." });
    }
  }

  // adds input task to list of to do items and sets input to empty
  clickHandler() {
    if (this.state.word !== "") {
      let newList = [...this.state.list, this.state.word];
      this.setState({ 
        list : newList,
        error : "",
        word : ""
      });
    } else {
      this.setState({
        error : "No task title is entered."
      })
    }
  }

  // remove item from list of to do items
  removeItem(event){
    let currentList = [...this.state.list];
    currentList.splice(event.target.id, 1);
    this.setState({ list : currentList });
  }

  // remove item from to do list and transfer to complete list
  completeTask(event){
    let currentList = [...this.state.list];
    let doneList = [...this.state.done, currentList[event.target.id]];
    currentList.splice(event.target.id, 1);
    this.setState({ 
      list : currentList,
      done : doneList
    });
  }

  // remove item from complete list
  removeDone(event){
    let doneList = [...this.state.done];
    doneList.splice(event.target.id, 1);
    this.setState({ done : doneList });
  }

  render() {
      // render the to-do list with a map() here
      let result = this.state.list.map((word, index) => {
        return (
          <div key={index}>
            <Item index={index} word={word} removeItem={this.removeItem} completeTask={this.completeTask} />
          </div>
        )
      });

      // render the complete list with map() function
      let completed = this.state.done.map((word, index) => {
        return (
          <div key={index}>
            <Complete index={index} word={word} removeDone={this.removeDone} />
          </div>
        )
      });

      return (
        <div className="container">
          <p id="error">{this.state.error}</p>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Task</span>
            </div>
            <input type="text" className="form-control" onChange={this.changeHandler} value={this.state.word}/>
          </div>
          <div className="row">
            <div className="mx-auto">
              <button type="button" className="btn btn-success" onClick={this.clickHandler}>Add Task</button>
            </div>
          </div>
          <br/>
          <br/>
          <h3>TO-DO LIST</h3>
          <div className="grid-container">
            {result}
          </div>
          <br/>
          <br/>
          <h3>DONE LIST</h3>
          <div className="grid-container">
            {completed}
          </div>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

