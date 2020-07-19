import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const courseName = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    excercise: 10
  },
  {
    name: 'Using props to pass data',
    excercise: 7
  },
  {
    name: 'State of a component',
    excercise: 14
  }
]
  const course = {
    name: courseName,
    parts: parts
  }



  return (
    <div>
      <Header course={course} />
      <Content  course={course} />
      <Total  course={course} />
    </div>
  )
}

const Content = (props) => {
  const parts = props.course.parts

  return (
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>

    </div>
  )
}
const Header = (props) => {
  console.log(props)
  return <h1>{ props.course.name }</h1>
}
const Part = (props) => {
  console.log(props)
  const part = props.part
  return (
    <div>
      <h2> {part.name} : {part.excercise}</h2>
    </div>
  )
}

const Total = (props) => {
  let total = 0
  const parts = props.course.parts

  for (let index = 0; index < parts.length; index++) {
    total += parts[index].excercise;
  }
  console.log("total", total)
  return (
  <div>
    <p>Total: {total}</p>
  </div>
    
  )
}

ReactDOM.render(<App />, document.getElementById('root'))