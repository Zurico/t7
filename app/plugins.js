// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import * as Register from 'utils/register';
import setupNotebookJS from 'containers/NotebookJS/setup';

setupNotebookJS(Register);
