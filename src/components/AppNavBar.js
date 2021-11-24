import {
    Link
  } from "react-router-dom"
const AppNavBar = ({user}) => {
    const padding = { padding: 5 }
    return(
    <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/contacts">contacts</Link>
          <Link style={padding} to="/logout">logout</Link>
          <em>{user.username} logged in</em>
    </div>

)}


export default AppNavBar