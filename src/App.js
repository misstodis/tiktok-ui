import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import { Fragment } from 'react';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((value, index) => {
            const Page = value.component;

            let Layout = DefaultLayout;
            if (value.layout) {
              Layout = value.layout;
            } else if (value.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={value.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
