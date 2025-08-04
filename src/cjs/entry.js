// Expose all your components to the global scope here.

// First variant:
globalThis._createElement = require("./createElement")._createElement;

// Alternative variant:
// you might wrap your components into a library.
// This is usually used to keep the gloal scope clean and avoid naming collisions
// with other libraries.
globalThis.NoReact = require("./NoReact").NoReact;

// globalThis.TestApp = require("./TestApp").TestApp;
