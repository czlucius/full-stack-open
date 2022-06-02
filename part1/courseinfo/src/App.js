
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  document.title = "Course Info"

  return (
    <div>
      <Header course={course} />
      {/* The parts and exercises are passed into Content as an array, so they can be populated without repeating code */}
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Footer exercises={exercises1 + exercises2 + exercises3}/>
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
  const totalExercises = props.exercises;
  
  var contentJSX = [];
  for (var i = 0; i < parts.length; i++) {
    contentJSX.push(
      <Part part={parts[i]} exercises={totalExercises[i]}/>
    );
  }
  return contentJSX;
}


const Part = (props) => 
  <p>{props.part} {props.exercises}</p>

const Footer = (props) => 
  <p>Number of exercises {props.exercises}</p>


export default App