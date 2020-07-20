import React from 'react'


const Course = ({course}) => {
  
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
       {parts.map(
         (item, idx) => {
          return (<Part key={item.id} part={item} />)
         }
       )}
      </div>
    )
  }
  const Header = (props) => {
    // console.log(props)
    return <h1>{ props.course.name }</h1>
  }
  const Part = (props) => {
    // console.log(props)
    const part = props.part
    return (
      <div>
        <h2> {part.name} : {part.exercises}</h2>
      </div>
    )
  }
  
  const Total = (props) => {
    // let total = 0
    const parts = props.course.parts
    // const parts = [1,2]
  
    // for (let index = 0; index < parts.length; index++) {
    //   total += parts[index].excercise;
    // }
  
    let totalNum = parts.reduce((pre, curVal) => {
      return pre+curVal.exercises
    }, 0)
    
  
    return (
    <div>
      <p>Total: {totalNum}</p>
    </div>
      
    )
  }


  export default Course