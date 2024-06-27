// 날짜 포멧 함수 (YYYY.MM.DD)
export const formatDateYMD = (isoString) => {
  const date = new Date(isoString); // 전달된 날짜를 Date 객체로 변환
  const year = date.getFullYear(); // Date 객체에서 연도 추출
  const month = String(date.getMonth() + 1).padStart(2, "0"); // date 객체에서 월 가져오고 0부터 시작하니까 +1, 길이가 2글자 되도록 0 채우기 ex) 6 -> 06
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

// 날짜, 시간 포멧 함수(YYYY.MM.DD HH:MM)
export const formatDateYMDHM = (isoString) => {
  const date = new Date(isoString); // 전달된 날짜를 Date 객체로 변환
  const year = date.getFullYear(); // Date 객체에서 연도 추출
  const month = String(date.getMonth() + 1).padStart(2, "0"); // date 객체에서 월 가져오고 0부터 시작하니까 +1, 길이가 2글자 되도록 0 채우기 ex) 6 -> 06
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hour}:${minutes}`;
};

// createdAt 기준 최신순(내림차순) 정렬
// 사용할때 데이터 구조 잘 보고 해야됨
export const sortedByDateDesc = (arr) => {
  return [...arr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// createdAt 기준 오래된순(오름차순) 정렬
export const sortedByDateAsc = (arr) => {
  return [...arr].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};
