import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'


class App extends Component {
  // state = {
  //   calendar: null
  // } 
  // componentDidMount () {
  //   const { store } = this.props
  //   store.subscribe(() => {
  //     this.setState(() => ({
  //       calendar: store.getState()
  //     }))
  //   })
  //  }
  // submitFood = () => {
  //   this.props.store.dispatch(addRecipe({
  //     day: 'monday',
  //     meal: 'breakfast',
  //     recipe: {
  //       label: this.input.value
  //     }
  //   }))
  //   this.input.value = ''
  //  }
  render() {
    console.log('props', this.props)
    return (
      <div className="App">
        Hallo!!
      </div>
    );
  }
}
const mapStateToProps = ({calendar, food}) => {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
        ? food[calendar[day]]
        : null 

        return meals
      }, {})
    }))
  }
} 
export default connect(mapStateToProps)(App);
