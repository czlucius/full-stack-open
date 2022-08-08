
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
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total exercises={course.parts}/>
    </div>
  )
}


const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts;
  console.log(parts);
  
  let content = [];
  for (const part of parts) {
    console.log(part.name);
    console.log(part.exercises);
    content = content.concat(
      <Part part={part.name} exercises={part.exercises}/>
    );
  }
  return content;
}


const Part = (props) => 
  <p>{props.part} {props.exercises}</p>

const Total = (props) => {
  let total = 0
  for (const part in props.parts) {
    total += part.exercises
  }
  return (
    <p>Number of exercises {total}</p>
  )
}


export default App