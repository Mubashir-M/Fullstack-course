import React from 'react'
import ReactDOM from 'react-dom'

const Name = 'name'
const Exer = 'exercises'

const Part = (props) => {
  return (
    <div>
    <p>
    {props.part} {props.exercise}
    </p>
  </div>
  )
  
}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
 
      <Part part= {props.parts[0][Name]} exercise= {props.parts[0][Exer]}/>
      <Part part= {props.parts[1][Name]} exercise= {props.parts[1][Exer]}/>
      <Part part= {props.parts[2][Name]} exercise= {props.parts[2][Exer]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0][Exer] + props.parts[0][Exer] + props.parts[0][Exer]}</p>
    </div>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
 
  return (
    <div>
      <Header course={course[Name]} />
      <Content parts= {course['parts']} />
      <Total parts = {course['parts']} />
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))

