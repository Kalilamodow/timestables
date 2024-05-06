function betterNumberInput(id: string) {
  (document.getElementById(id) as HTMLInputElement).addEventListener(
    "keydown",
    event => {
      if (event.ctrlKey) return;
      if (event.code == "Tab") return;
      if (event.code == "Backspace") return;
      if (event.code.startsWith("Arrow")) return;

      if (
        !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
          event.key,
        )
      ) {
        event.preventDefault();
      }
    },
  );
}

function getInput(id: string) {
  return (document.getElementById(id) as HTMLInputElement).value;
}

export { betterNumberInput, getInput };
