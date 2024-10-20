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

