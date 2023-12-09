# apigee-templater-custom
This project is a template to show how to create a customized version of **[apigee-templater](https://github.com/apigee/apigee-templater)**. This template has a custom API key validation plugin in `./lib/auth.apikey.plugin.ts`, which is replaces the default API key validation plugin in **apigee-templater**.

## Getting started
To get started, clone this repository and install dependencies.

```bash
# Clone this repository
git clone https://github.com/apigee/apigee-templater-custom.git
cd apigee-templater-custom
npm install
```
Then run the unit tests to see how the customized version of apigee-templater is used with a custom plugin for API key validation.
```bash
# Run the unit tests
npm run build
npm run test
```
You should have a subdirectory under `./test/proxies` with a generated proxy, included the extracted proxy bundle. As you can see in `./test/data/input1.json`, the input was a simple configuration for a proxy to https://httpbin.org with custom API key validation.

The unit tests in `./test/data/convert.text.ts` verify that the generated proxy file exists, and that the expected files and contents are included in the generated proxy bundle.

## Customizing

The file `./bin/mytemplater.js` shows you how you can create your own CLI tool with your own customized plugins. This example has a customized API key validation plugin in `./lib/auth.apikey.plugin.ts`.

## Testing

You can easily test your CLI by just running the `mytemplater.js` class using node.

```bash
# Run the CLI
npm run build
cd ./bin
node mytemplater.js
```
You should get the default functionality of apigee-templater, but with your custom plugins applied.

```bash
$ node mytemplater.js
> Welcome to Apigee Templater, use -h for more command line options. 
? What should the proxy be called? MyProxy
? Which base path should be used? /test
? Which backend target URL should be called? https://httpbin.org
? Do you want to deploy the proxy to an Apigee X environment? No
> Proxy MyProxy generated to ./MyProxy.zip in 129 milliseconds.
```
You can also test your CLI locally on your system by just linking the module, and then using the command
```bash
# Go to the project root
npm link

# Then anywhere on your system you can use the CLI
mytemplater -h

## If you want to remove it, unlink the global package
npm uninstall --global mytemplater
```
## Publishing
To publish your CLI, simply change the name and details in `package.json` and run `npm publish`.
