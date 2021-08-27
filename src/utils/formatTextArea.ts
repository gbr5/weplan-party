interface IRequest {
  textArea: HTMLTextAreaElement;
}

export default function formatTextArea(data: IRequest): number {
  const textRowCount = data.textArea.value.split('\n').length || 1;
  const rowAdd = textRowCount > 1 ? textRowCount : 1;
  const textAreaLength = data.textArea.textLength || 1;
  const col = data.textArea.cols;

  const numberOfRows = Math.ceil(textAreaLength / Number(col)) + rowAdd;

  return numberOfRows;
}
