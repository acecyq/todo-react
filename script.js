class List extends React.Component {
  constructor(){
    super()

    // function called on input
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.removeItem = this.removeItem.bind( this );
    this.completeTask = this.completeTask.bind( this );
  }

  state = {
    list : [],
    done : [],
    word : "",
    error : ""
  }

  changeHandler(event){
    this.setState({word:event.target.value});
    if (this.state.word.length > 10) {
      this.state.error = "too long bro";
      this.setState( { word : "" } );
    } else {
      this.state.error = "";
    }
  }

  clickHandler(event){
    var newList = this.state.list;
    newList.push(this.state.word);
    this.setState( { list : newList } );
    this.setState( { word : "" } );
  }

  removeItem(event){
    var currentList = this.state.list;
    currentList.splice(event.target.className, 1);
    this.setState( { list : currentList } );
  }

  completeTask(event){
    var doneList = this.state.done;
    var nowList = this.state.list;
    doneList.push(nowList[event.target.className]);
    nowList.splice(event.target.className, 1);
    this.setState( { 
      list : nowList,
      done : doneList
     } )
  }

  render() {
      // render the list with a map() here
      var result = this.state.list.map((word, index) => {
        return (
          <div>
            
            <Item index={index} word={word} removeItem={this.removeItem} completeTask={this.completeTask} />
          </div>
          
        )
      });

      var completed = this.state.done.map(task => {
        return (
          <div>
            <p>task</p>
          </div>
        )
      });

      console.log("rendering");
      return (
        <div className="list">
          <h1>TO-DO LIST</h1>
          <p>{this.state.error}</p>
          <div>{result}</div>
          <h2>DONE LIST</h2>
          <div>{completed}</div>
          <input onChange={this.changeHandler} value={this.state.word}/>
          <button onClick={this.clickHandler}>add item</button>
        </div>
      );
  }
}

class Item extends React.Component {
  constructor() {
    super()
    this.state = {
      task : ""
    }
  }

  render() {
    return (
      <div>
        <p className={this.props.index}>{this.props.word}</p>
        <button className={this.props.index} onClick={this.props.removeItem}>delete</button>
        <button className={this.props.index} onClick={this.props.completeTask}>complete</button>
        <br/>
        <hr/>
      </div>
    );
  } 
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

