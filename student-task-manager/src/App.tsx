import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
// import { Dashboard } from "./pages/Dashboard";
// import { Tasks } from "./pages/Tasks";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					{/* <Route path="/" element={<Dashboard />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/tasks/:id" element={<TaskDetails />} /> */}
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
