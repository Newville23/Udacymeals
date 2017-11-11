import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'


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
    const { calendar, remove } = this.props
    const mealOrder = [ 'breackfast', 'lunch', 'dinner']
    return (
      <div className="container">
        {/* Header of the table based on the mealOrder Array */}
        <ul className="meal-types">
          {mealOrder.map((mealType) => (
            <li key={mealType} className="subheader">
              {capitalize(mealType)}
            </li>
          ) )}
        </ul>

        <div className="calendar">
          <div className="days">
            {calendar.map(({day}) => ( <h3 key={day} className="subheader">{capitalize(day)}</h3> ))}
          </div>

          <div className='icon-grid'>
            {calendar.map((day, meals) => (
              <ul key={day}>
                {
                  mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                    ? <div className="food-item">
                      <img src={meals[meal].image} alt={meals[meal].label}/>
                      <button onClick={() => remove({meal, day})}>Clear</button>
                    </div>
                    : <button className="icon-btn">
                      <CalendarIcon size={20}/>  
                    </button>
                    }
                  </li>  
                ))}
              </ul>
            ))}
          </div>

        </div>

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
const mapDispatchToProps = (dispatch) => {
  return {
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
