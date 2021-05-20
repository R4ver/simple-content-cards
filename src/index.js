import { h, render } from "preact";

const App = () => <h1>Hello world</h1>

try {
    const Wrapper = document.querySelector("[data-spc-wrapper]");

    if (Wrapper) {
        console.log(Wrapper);
        render(<App />, Wrapper);
    } else {
        throw new Error("No element with the dataset 'data-spc-wrapper'");
    }
} catch (error) {
    console.error(error);
}