// import { renderToString } from 'react-dom/server';
// import { Request, Response } from 'express';
// import { getAllJobs } from '../../../services/src/main.js';
// import App from '../../../ui/src/App.js';

export const renderHomePage = async (req: Request, res: Response) => {
  //   try {
  //     // Fetch necessary data for SSR
  //     const jobsData = await getAllJobs();
  //     // Render React components to HTML
  //     const html = renderToString(<App jobs={jobsData} />);
  //     // Send the rendered HTML response to the client
  //     const renderedHTML = `<!DOCTYPE html>
  //     <html>
  //       <head>
  //         <script>
  //           window.__PRELOADED_STATE__ = ${JSON.stringify(jobsData)};
  //         </script>
  //       </head>
  //       <body>
  //         <div id="root">${html}</div>
  //       </body>
  //     </html>`;
  //     res.setHeader('Content-Type', 'text/html');
  //     res.send(renderedHTML);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Internal Server Error');
  //   }
};
