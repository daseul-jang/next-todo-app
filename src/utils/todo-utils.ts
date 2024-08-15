import { ITodoGroup } from '@/redux/slice/todo-slice';
import { formatDate } from './date-utils';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export const generateTestData = () => {
  const storedTodoGroups = localStorage.getItem('todoGroups');

  // 로컬스토리지에 todoGroups가 없을 때만 테스트 데이터를 설정합니다.
  if (!storedTodoGroups) {
    const testTodos: ITodoGroup[] = [
      {
        date: formatDate(new Date('2024-08-01T12:00:00')),
        todos: [
          {
            id: 1,
            title: '테스트1',
            isChecked: false,
            createdAt: formatDate(new Date('2024-08-01T12:00:00')),
          },
          {
            id: 2,
            title: '테스트2',
            isChecked: false,
            createdAt: formatDate(new Date('2024-08-01T12:00:00')),
          },
          {
            id: 3,
            title: '테스트3',
            isChecked: false,
            createdAt: formatDate(new Date('2024-08-01T12:00:00')),
          },
        ],
      },
      {
        date: formatDate(new Date('2024-08-05T12:00:00')),
        todos: [
          {
            id: 1,
            title: '테스트4',
            isChecked: false,
            createdAt: formatDate(new Date('2024-08-05T12:00:00')),
          },
        ],
      },
    ];

    localStorage.setItem('todoGroups', JSON.stringify(testTodos));
  }
};

export const generatePDF = async (name: string) => {
  const input = document.getElementById('todos'); // PDF로 저장할 요소

  if (input) {
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 170; // 이미지 너비
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'A4');
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width; // 페이지 너비
    let heightLeft = imgHeight;

    // 중앙 정렬을 위해 x 좌표 계산
    const xPosition = (pageWidth - imgWidth) / 2; // 수평 중앙

    // 처음 페이지에 이미지 추가
    let position = 0;

    // 페이지가 하나일 경우 수직 중앙에 위치시키기 위해 체크
    if (heightLeft <= pageHeight) {
      position = (pageHeight - imgHeight) / 2; // 수직 중앙
    }

    pdf.addImage(imgData, 'PNG', xPosition, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 이미지가 페이지를 넘어가는 경우 처리
    while (heightLeft >= 20) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', xPosition, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // 마지막 페이지가 남아있다면 추가
    if (heightLeft > 20) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', xPosition, 0, imgWidth, imgHeight);
    }

    pdf.save(`${formatDate(new Date())}_${name}_todolist`); // PDF 파일 저장
  }
};
