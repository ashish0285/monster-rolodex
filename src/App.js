import { Component } from 'react';
import CardList from './components/card-list/card-list';
import './App.css';
import SearchBox from './components/search-box/search-box';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField:''
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users=> this.setState(
      ()=>({monsters: users, filteredMonsters: users})));
  }

  onSearchChange = (event)=>{
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(
      ()=>({searchField})
    );
  }

  render(){
  const {monsters, searchField} = this.state;
  const {onSearchChange} = this;
  const filteredMonsters = monsters.filter(monster => monster.name.toLocaleLowerCase().includes(searchField));

  return (
    <div className='App'>
    <h1 className='app-title'> Monsters Rolodex</h1>
    <SearchBox
      onChangeHandler={onSearchChange}
      placeholder='Search Monsters'
      className='monsters-search-box'/>
    <CardList monsters={filteredMonsters}/>
    </div>
  );
}
}

export default App;
