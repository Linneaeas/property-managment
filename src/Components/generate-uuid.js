export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const uuid = generateUUID();
console.log("Generated UUID:", uuid);

/*Generating a UUID in JavaScript (Node.js)
UUID (Universally Unique Identifier) is a standardized way to generate unique identifiers. There are several versions of UUID, but one of the most common and widely used is version 4, which generates a random-based UUID. 
In this example, the generateUUID function generates a version 4 UUID. It replaces specific characters in a predefined pattern ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') with random hexadecimal characters.

UUIDs are generally represented as strings with 32 hexadecimal characters separated by hyphens, conforming to the pattern '8-4-4-4-12', where each 'x' represents a random hexadecimal digit, and '4' and 'y' are fixed characters.

This UUID generation is suitable for environments like Node.js or backend systems where you have access to a random number generator. If you need to generate UUIDs in a browser environment, you might need to use a different approach to generate version 4 UUIDs.*/
