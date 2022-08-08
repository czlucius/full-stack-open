

const Course = ({course}) => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
)


const Content = ({parts}) => 
  <ul>
  {parts.map(part => 
    <li key={part.id}>
      <Part part={part.name} exercises={part.exercises}/>
    </li>
    )}
  </ul>


const Header = (props) => {
  return (
    <h3>{props.course}</h3>
  )
}

const Part = (props) => 
  <p>{props.part} {props.exercises}</p>

const Total = (props) => {
  const total = props.parts.reduce((p, c) => p += c.exercises, 0)
  console.log("total", total)
  return (
    <p><b>Number of exercises {total}</b></p>
  )
}

export default Course