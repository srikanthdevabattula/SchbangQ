import { BrowserRouter } from "react-router-dom";
import Routers from "./routes";
import { Provider } from "react-redux";
import {store} from './Redux/store'
function App() {
	return (
		<Provider store={store}>
		<BrowserRouter>
			<Routers />
		</BrowserRouter>
		</Provider>
	);
}

export default App;
