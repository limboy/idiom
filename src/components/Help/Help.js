import Modal from '../Modal';

export default function Help(props) {
  const answerCn = ['不', '离', '不', '弃'];
  const answerEn = ['BU', 'JI', 'LU', 'BU'];
  const checkResult = [
    ['bg-green-600', 'bg-green-600'],
    ['bg-gray-500', 'bg-green-600'],
    ['bg-yellow-600', 'bg-green-600'],
    ['bg-yellow-600', 'bg-gray-500'],
  ];

  const description = [
    ['bg-green-600', '该字母在正确的位置'],
    ['bg-yellow-600', '该字母不在正确的位置'],
    ['bg-gray-500', '当前成语中没有该字母'],
  ];

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="拼音猜成语">
      <div className="grid grid-cols-4 gap-4 justify-center py-4 w-[260px]">
        {answerCn.map((character, i) => {
          return (
            <div key={i} className="flex flex-col gap-2 items-center">
              <div className="text-2xl">{character}</div>
              <div className="grid grid-cols-2 w-full text-center gap-[2px]">
                {answerEn[i].split('').map((letter, j) => {
                  return (
                    <div
                      key={`${i}-${j}`}
                      className={`text-base py-1 ${checkResult[i][j]} text-white`}
                    >
                      {answerEn[i].charAt(j)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col py-3 gap-2">
        {description.map((item, i) => {
          return (
            <div key={i} className="flex flex-row gap-2">
              <div className={`${item[0]} w-6 h-6`}></div>
              <div>{item[1]}</div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center justify-center pt-3 pb-4">
        <p className="font-medium">超过数量的字母会被标记为灰色。</p>
        <p className="text-gray-500">
          如答案中只有一个 N，但猜测过程中输入了两个 N，则第二个会被标记为灰色。
        </p>
      </div>

      <div className="w-[250px] py-3 mb-1 text-center bg-gray-200 text-gray-600 rounded-md">
        每小时会有一个新成语哦
      </div>
    </Modal>
  );
}
