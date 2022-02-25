function Button(props) {
  let flexBasis = '100%';
  if (props.letter === 'Enter' || props.letter === '⌫') {
    flexBasis = '150%';
  }
  return (
    <button
      className="w-full h-full bg-gray-200 text-gray-800 text-base font-bold py-2 md:py-4"
      style={{ flexBasis }}
    >
      {props.letter}
    </button>
  );
}

export default function Keyboard(props) {
  let row1Keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  let row2Keys = ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''];
  let row3Keys = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'];

  return (
    <div className="flex flex-col gap-2 items-center">
      {[row1Keys, row2Keys, row3Keys].map((keys, i) => {
        return (
          <div
            key={i}
            className="w-full max-w-2xl flex flex-row gap-1 md:gap-2 justify-center"
          >
            {keys.map((letter, j) => {
              return letter ? (
                <Button key={`${i}-${j}`} letter={letter} />
              ) : (
                <div key={`${i}-${j}`} style={{ flexBasis: '50%' }}></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
