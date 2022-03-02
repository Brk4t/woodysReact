import "./styles.css";

import Install from "./component/install"
import Home from "./component/home"

export default function App() {
  if(window.ethereum)
  {
    return <Home />;
  }else
  {
    return <Install />
  }
}
