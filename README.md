# apigee-templater-custom
This project is a template on how to create a customized version of [apigee-templater](https://github.com/apigee/apigee-templater).

You can clone this project and set your own custom plugins in `./bin/mytemplater.js`. 

You can then test your custom cli (invoked with **mytemplater**, or change as needed in package.json). To test locally, simply type `npm link` in this root directory to link the module on your local machine. 

```bash
# To test, just link in the root directory
npm link

# Or go into the bin directory and call the it directly, also useful for debugging.
cd bin
node mytemplater.js
# You should see get the default cli functionality, which you can then customize with your own plugins.
```