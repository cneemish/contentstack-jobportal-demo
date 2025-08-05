import { Routes, Route } from "react-router-dom";
import JobApply from "./jobApply.jsx";
import ApplyForm from "./ApplyForm.jsx"; // Create this component

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobApply />} />
      <Route path="/apply" element={<ApplyForm />} />
    </Routes>
  );
}

export default App;
