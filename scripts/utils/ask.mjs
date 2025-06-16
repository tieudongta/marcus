// utils/ask.mjs
import readline from 'readline';

let rl;

function getReadline() {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Optional: Cleanup on process exit
    process.on('exit', () => rl.close());
  }
  return rl;
}

export const ask = (question) => {
  const rl = getReadline();
  return new Promise(resolve =>
    rl.question(question + ' ', (input) =>
      resolve(input.trim().toLowerCase()) // ✅ normalize input
    )
  );
};
