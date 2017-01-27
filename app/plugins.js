// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import * as Register from 'utils/register';
import setupNotebookJS from 'containers/NotebookJS/setup';
import setupNotebookTalo from 'containers/NotebookTalo/setup';
import setupNotebookGraph from 'containers/NotebookGraph/setup';

setupNotebookJS(Register);
setupNotebookTalo(Register);
setupNotebookGraph(Register);

// Desktop production workflow:
// Download NotebookJS folder to ~/.talo/packages
// On init startup (this file) loop all folders in ~/.talo/packages and foreach
// require(system.import) them and pass the Register (this should be an api for passing other modules
// as well), the required package should be ready for production (a minified build)

// Desktop dev workflow:
// Download NotebookJS folder to ~/.talo/dev-packages
// On init startup (this file) loop all folders in ~/.talo/dev-packages and foreach
// require(system.import) them with babelify and pass the Register (this should be an api for passing other modules
// as well)

// Web production workflow:
// On init startup (this file) loop all packages uris in user's/ system's packages config and foreach
// require(system.import) them and pass the Register (this should be an api for passing other modules
// as well), the required package should be ready for production (a minified build)

// Web dev workflow:
// Same workflow as creating a containers/X module (?)
