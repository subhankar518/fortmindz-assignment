
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { EmployeeList } from "./components/EmployeeList";

// function App() {
//   return (
//     <div>
//       <EmployeeList/>
//     </div>
//   );
// }

// export default App;

import React, { Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = lazy(() => import('./components/EmployeeList'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EmployeeList />
      </Suspense>
    </div>
  );
}

export default App;

