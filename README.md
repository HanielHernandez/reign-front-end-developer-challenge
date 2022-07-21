# Reing Front-End Codding Challenge

Hi, I'm Haniel Hernández, and this repo contains the code for the Reign Front-End Codding Challenge.

## Considerations

This Project was created using **[vite](https://vitejs.dev/)** which will allow us incredibly fast compilations times and overall a better development experience, all the styling was done by using **SASS**, options like React Styled Components were taken in count but in the end I decided to opt for plain SASS just for the sake of simplicity, the testing was done by using the **[vitest](https://vitest.dev/)** wich its a test suit powered by also vite, and like vite it's also blazingly fast and not too resource hungry. A state store like redux could have been used to set up a global state but I opted not to do so because of the low complexity of the app.  

## How to run

in order to run the project first you must install the npm package by runing the following command.

```bash
npm install
```

then you must start the serve by runing: 

```bash
npm run dev
```
after that a the server will be set up using the following addres http://127.0.0.1:5173/ .

## Lintting and Formatting

To run the litting options run the following command

```bash
npm run lint
```

To fix some of the lint errors you can run

```bash
npm run lint:fix
```

To formatt the code acording to the prettier configuration you can run the following command4

```bash
npm run format
```
## Testing
if you want to run the unit test created on the project you must run the folling commands

```bash
npm run test
```

## Component docs

you can find more info about the componets created for this project at the [docs folder](docs/index.md)